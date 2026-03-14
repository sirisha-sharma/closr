import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type DISCType, type Plan } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 30) return formatDate(dateString);
  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  if (diffMinutes > 0) return `${diffMinutes}m ago`;
  return 'Just now';
}

export function getDISCColor(discType: DISCType): string {
  const colors: Record<DISCType, string> = {
    D: '#EF4444',
    I: '#EAB308',
    S: '#22C55E',
    C: '#3B82F6',
  };
  return colors[discType];
}

export function getDISCBg(discType: DISCType): string {
  const colors: Record<DISCType, string> = {
    D: 'rgba(239, 68, 68, 0.1)',
    I: 'rgba(234, 179, 8, 0.1)',
    S: 'rgba(34, 197, 94, 0.1)',
    C: 'rgba(59, 130, 246, 0.1)',
  };
  return colors[discType];
}

export function getPlanDisplayName(plan: Plan): string {
  const names: Record<Plan, string> = {
    free: 'Free',
    starter: 'Starter',
    pro: 'Pro',
    agency: 'Agency',
  };
  return names[plan];
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '…';
}

export function isMonthlyResetDue(resetAt: string): boolean {
  const resetDate = new Date(resetAt);
  const now = new Date();
  const diffMs = now.getTime() - resetDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays >= 30;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    draft: '#71717A',
    sent: '#3B82F6',
    won: '#22C55E',
    lost: '#EF4444',
  };
  return colors[status] || '#71717A';
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
