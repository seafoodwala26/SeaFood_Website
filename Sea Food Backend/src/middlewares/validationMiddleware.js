const fieldLabels = {
  blogTitle: 'Article title',
  url: 'Article URL',
  category: 'Category',
  excerpt: 'Excerpt',
  content: 'Article content',
  seoTitle: 'Meta title',
  seoMeta: 'Meta description',
  blogImg: 'Featured image',
  faq: 'FAQ',
  tags: 'Tags',
  isActive: 'Article status',
  isFeatured: 'Featured setting',
  email: 'Email address',
  password: 'Password',
};

function formatValidationIssue(issue) {
  const field = issue.path[issue.path.length - 1];
  const label = fieldLabels[field] || String(field || 'Request').replace(/([a-z])([A-Z])/g, '$1 $2');

  if (issue.code === 'too_big' && typeof issue.maximum === 'number') {
    if (field === 'seoMeta') {
      return 'Meta description must be 160 characters or fewer. Please shorten it and try again.';
    }
    if (field === 'seoTitle') {
      return 'Meta title must be 70 characters or fewer. Please shorten it and try again.';
    }
    return `${label} must be ${issue.maximum} characters or fewer.`;
  }
  if (issue.code === 'too_small' && issue.minimum === 1) {
    return `${label} is required.`;
  }

  return issue.message;
}

function validateBody(schema) {
  return (req, res, next) => {
    try {
      const parsedBody = schema.parse(req.body);
      req.body = parsedBody;
      return next();
    } catch (error) {
      const issues = error.issues || error.errors;
      const errors = issues
        ? issues.map((err) => ({ path: err.path.join('.'), message: formatValidationIssue(err) }))
        : [{ message: error.message }];
      return res.status(400).json({ status: 'fail', message: errors[0].message, errors });
    }
  };
}

module.exports = { validateBody };
