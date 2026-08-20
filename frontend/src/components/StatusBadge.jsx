import React from 'react';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

export default function StatusBadge({ status }) {
  const normalized = (status || 'PENDING').toUpperCase();

  if (normalized === 'APPROVED') {
    return (
      <span className="badge badge-approved">
        <CheckCircle2 size={14} /> APPROVED
      </span>
    );
  } else if (normalized === 'REJECTED') {
    return (
      <span className="badge badge-rejected">
        <XCircle size={14} /> REJECTED
      </span>
    );
  } else {
    return (
      <span className="badge badge-pending">
        <Clock size={14} /> PENDING LAB
      </span>
    );
  }
}
