const nodemailer = require('nodemailer');
const Inquiry = require('../modules/inquiry.model');

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getMailer() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_SECURE } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    const error = new Error('Email service is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASSWORD.');
    error.statusCode = 503;
    throw error;
  }

  const port = Number(SMTP_PORT || 587);
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465 ? SMTP_SECURE === 'true' : false,
    family: 4,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });
}

async function createInquiry(req, res) {
  const inquiry = req.body;
  const savedInquiry = await Inquiry.create(inquiry);

  try {
    const transporter = getMailer();
    const adminEmail = process.env.CONTACT_RECIPIENT || process.env.SMTP_USER;
    const customerEmail = inquiry.email.trim();
    const replyTo = `${inquiry.fullName} <${inquiry.email}>`;
    const fields = [
      ['Name', inquiry.fullName], ['Company', inquiry.company || '-'], ['Email', inquiry.email],
      ['Phone', inquiry.phone], ['Country', inquiry.country], ['Product', inquiry.product],
      ['Quantity', inquiry.quantity], ['Message', inquiry.message],
    ];
    const htmlRows = fields.map(([label, value]) =>
      `<tr><td style="padding:8px 12px;font-weight:600;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 12px;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
    ).join('');
    const text = fields.map(([label, value]) => `${label}: ${value}`).join('\n');
    const from = process.env.SMTP_FROM || `Seafood Wala Website <${process.env.SMTP_USER}>`;

    // Customer confirmation must succeed before the frontend shows success.
    const customerDelivery = await transporter.sendMail({
      from,
      to: customerEmail,
      envelope: { from: process.env.SMTP_USER, to: customerEmail },
      replyTo: adminEmail,
      subject: 'We received your inquiry - Seafood Wala',
      text: `Hello ${inquiry.fullName},\n\nThank you for contacting Seafood Wala. We received your inquiry and our team will respond shortly.\n\nInquiry details:\n${text}`,
      html: `<p>Hello ${escapeHtml(inquiry.fullName)},</p><p>Thank you for contacting Seafood Wala. We received your inquiry and our team will respond shortly.</p><h3>Inquiry details</h3><table cellpadding="0" cellspacing="0" style="border-collapse:collapse">${htmlRows}</table>`,
    });
    console.log('Customer inquiry email accepted:', customerDelivery.accepted);

    res.status(201).json({ status: 'success', data: savedInquiry, message: 'Your inquiry has been sent successfully.' });

    // Admin notification should not delay the customer's confirmation.
    transporter.sendMail({
      from,
      to: adminEmail,
      envelope: { from: process.env.SMTP_USER, to: adminEmail },
      replyTo,
      subject: `New website inquiry from ${inquiry.fullName}`,
      text,
      html: `<h2>New website inquiry</h2><table cellpadding="0" cellspacing="0" style="border-collapse:collapse">${htmlRows}</table>`,
    }).catch((error) => console.error('Admin inquiry email delivery failed:', error));
  } catch (error) {
    console.error('Inquiry email delivery failed:', error);
    if (!res.headersSent) {
      res.status(503).json({
        status: 'fail',
        message: 'Inquiry saved, but the confirmation email could not be sent. Please try again later.',
      });
    }
  }
}

async function listInquiries(req, res) {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  res.json({ status: 'success', data: inquiries });
}

async function replyToInquiry(req, res) {
  const inquiry = await Inquiry.findById(req.params.id);
  if (!inquiry) {
    return res.status(404).json({ status: 'fail', message: 'Inquiry not found.' });
  }

  const transporter = getMailer();
  const from = process.env.SMTP_FROM || `Seafood Wala <${process.env.SMTP_USER}>`;
  const adminEmail = process.env.CONTACT_RECIPIENT || process.env.SMTP_USER;
  const { subject, message } = req.body;

  await transporter.sendMail({
    from,
    to: inquiry.email,
    replyTo: adminEmail,
    subject,
    text: `Hello ${inquiry.fullName},\n\n${message}\n\nRegards,\nSeafood Wala`,
    html: `<p>Hello ${escapeHtml(inquiry.fullName)},</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p><p>Regards,<br>Seafood Wala</p>`,
  });

  inquiry.status = inquiry.status === 'new' ? 'contacted' : inquiry.status;
  await inquiry.save();
  return res.json({ status: 'success', data: inquiry, message: 'Reply sent successfully.' });
}

async function deleteInquiry(req, res) {
  const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
  if (!inquiry) {
    return res.status(404).json({ status: 'fail', message: 'Inquiry not found.' });
  }

  return res.status(204).send();
}

module.exports = { createInquiry, listInquiries, replyToInquiry, deleteInquiry };
