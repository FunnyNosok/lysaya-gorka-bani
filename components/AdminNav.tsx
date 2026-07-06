'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = { href: string; label: string };

export function AdminNav({ items }: { items: NavItem[] }) {
  const path = usePathname();
  return (
    <nav style={{ display: 'flex', gap: '18px', flex: '1 1 auto', flexWrap: 'wrap' }}>
      {items.map((n) => (
        <Link
          key={n.href}
          href={n.href}
          style={{
            color: path === n.href ? 'var(--amber)' : 'rgba(245,235,214,.7)',
            fontWeight: 600,
            fontSize: '.92rem',
          }}
        >
          {n.label}
        </Link>
      ))}
    </nav>
  );
}
