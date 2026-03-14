'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      theme="dark"
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#18181B',
          border: '1px solid #27272A',
          color: '#FAFAFA',
          borderRadius: '12px',
        },
        classNames: {
          success: 'border-[#22C55E]/30',
          error: 'border-[#EF4444]/30',
          warning: 'border-[#EAB308]/30',
        },
      }}
    />
  );
}
