'use client';

import { ReactNode } from 'react';

interface ZoomablePrototypeProps {
  children: ReactNode;
  width?: string | number;
}

export default function ZoomablePrototype({ children, width }: ZoomablePrototypeProps) {
  return (
    <div className="relative">
      {/* 直接显示原型，不再需要缩放控制 */}
      <div className="overflow-visible">
        <div style={{ width: width || 'auto', minWidth: 'auto', maxWidth: 'none' }}>
          {children}
        </div>
      </div>
    </div>
  );
} 