'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Search, Eye, Trash2, ClipboardList, Mail, Phone, Calendar, Send, Loader2 } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from '@/components/ui/select';
import { formatDate } from '@/lib/utils/format';
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle} from '@/components/ui/dialog';
import { inquiryApi } from '@/lib/api';
import { Textarea } from '@/components/ui/textarea';
interface InquiryRecord {
  id: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  quantity: string;
  message: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  createdAt: string;
}

const statusConfig: Record<InquiryRecord['status'], { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
  new: { label: 'New', variant: 'default' },
  contacted: { label: 'Contacted', variant: 'secondary' },
  quoted: { label: 'Quoted', variant: 'outline' },
  closed: { label: 'Closed', variant: 'destructive' },
};

export default function AdminInquiriesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [replyFeedback, setReplyFeedback] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { data: inquiries = [], isLoading, error: loadError } = useQuery({
    queryKey: ['inquiries'],
    queryFn: inquiryApi.list,
  });

  const deleteMutation = useMutation({
    mutationFn: inquiryApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inquiries'] }),
  });

  const replyMutation = useMutation({
    mutationFn: ({ id, subject, message }: { id: string; subject: string; message: string }) =>
      inquiryApi.reply(id, { subject, message }),
    onSuccess: (updatedInquiry) => {
      queryClient.setQueryData<InquiryRecord[]>(['inquiries'], (current = []) =>
        current.map((inquiry) => inquiry.id === updatedInquiry.id ? updatedInquiry : inquiry)
      );
      setSelectedInquiry(updatedInquiry);
      setReplyFeedback('Reply sent successfully.');
      setReplyMessage('');
    },
    onError: (error: Error) => setReplyFeedback(error.message),
  });

  const filtered = inquiries.filter((inq) => {
    const matchSearch =
      inq.fullName.toLowerCase().includes(search.toLowerCase().trim()) ||
      inq.email.toLowerCase().includes(search.toLowerCase().trim()) ||
      inq.company.toLowerCase().includes(search.toLowerCase().trim());
    const matchStatus = statusFilter === 'all' || inq.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id: string) => deleteMutation.mutate(id);

  const openInquiry = (inquiry: InquiryRecord) => {
    setSelectedInquiry(inquiry);
    setReplySubject(`Re: Inquiry about ${inquiry.product}`);
    setReplyMessage('');
    setReplyFeedback(null);
  };

  const handleReply = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedInquiry) return;

    setReplyFeedback(null);
    replyMutation.mutate({ id: selectedInquiry.id, subject: replySubject, message: replyMessage });
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Inquiries"
        description="Manage customer inquiries and quote requests."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: 'Total Inquiries', value: inquiries.length, icon: ClipboardList },
          { label: 'New', value: inquiries.filter((i) => i.status === 'new').length, icon: Mail },
          { label: 'Contacted', value: inquiries.filter((i) => i.status === 'contacted').length, icon: Phone },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 font-heading text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card shadow-soft">
        {loadError && <p className="border-b border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">Unable to load inquiries.</p>}
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-xs flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search inquiries..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
              </SelectContent>
            </Select>
            <span className="whitespace-nowrap text-sm text-muted-foreground">{filtered.length} inquiries</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Qty</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-muted-foreground">Loading inquiries...</td></tr>
              ) : filtered.map((inq) => (
                <tr key={inq.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="font-medium text-foreground">{inq.fullName}</p>
                      <p className="text-xs text-muted-foreground">{inq.company}</p>
                      <p className="text-xs text-muted-foreground">{inq.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-xs text-foreground">{inq.product}</p>
                    <p className="text-xs text-muted-foreground">{inq.country}</p>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-foreground">{inq.quantity}</td>
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                       {formatDate(inq.createdAt)}          
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={statusConfig[inq.status].variant}>{statusConfig[inq.status].label}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                        <button type="button" onClick={() => openInquiry(inq)} aria-label={`View inquiry from ${inq.fullName}`}>
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(inq.id)} disabled={deleteMutation.isPending}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ClipboardList className="h-10 w-10 text-muted-foreground/40" />
            <h3 className="mt-4 font-heading text-base font-semibold text-foreground">No inquiries found</h3>
            <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters.</p>
          </div>
        )}
      </div>

      <Dialog open={selectedInquiry !== null} onOpenChange={(open) => !open && setSelectedInquiry(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          {selectedInquiry && (
            <>
              <DialogHeader>
                <DialogTitle>Inquiry Details</DialogTitle>
                <DialogDescription>
                  Submitted on {new Date(selectedInquiry.createdAt).toLocaleString()}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['Full Name', selectedInquiry.fullName],
                  ['Company', selectedInquiry.company || 'Not provided'],
                  ['Email', selectedInquiry.email],
                  ['Phone', selectedInquiry.phone],
                  ['Country', selectedInquiry.country],
                  ['Product', selectedInquiry.product],
                  ['Quantity', selectedInquiry.quantity],
                  ['Status', statusConfig[selectedInquiry.status].label],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-border bg-muted/20 p-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
                    <p className="mt-1 break-words text-sm font-medium text-foreground">{value}</p>
                  </div>
                ))}
                <div className="rounded-lg border border-border bg-muted/20 p-3 sm:col-span-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Message</p>
                  <p className="mt-1 whitespace-pre-wrap break-words text-sm text-foreground">{selectedInquiry.message}</p>
                </div>
              </div>

              <form onSubmit={handleReply} className="space-y-4 border-t border-border pt-4">
                <div>
                  <label htmlFor="reply-subject" className="text-sm font-medium text-foreground">Subject</label>
                  <Input id="reply-subject" value={replySubject} onChange={(event) => setReplySubject(event.target.value)} className="mt-1.5" required maxLength={200} />
                </div>
                <div>
                  <label htmlFor="reply-message" className="text-sm font-medium text-foreground">Reply message</label>
                  <Textarea id="reply-message" value={replyMessage} onChange={(event) => setReplyMessage(event.target.value)} className="mt-1.5" rows={5} required maxLength={10000} placeholder={`Write a reply to ${selectedInquiry.fullName}...`} />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {replyFeedback && <p className={`text-sm ${replyFeedback.includes('successfully') ? 'text-brand-accent' : 'text-destructive'}`}>{replyFeedback}</p>}
                  <Button type="submit" disabled={replyMutation.isPending} className="sm:ml-auto">
                    {replyMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    {replyMutation.isPending ? 'Sending...' : 'Send Reply'}
                  </Button>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
