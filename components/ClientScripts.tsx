'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function ClientScripts() {
  const pathname = usePathname();
  const navInit = useRef(false);

  // Nav toggle + header scroll — init once (persists across navigations)
  useEffect(() => {
    if (navInit.current) return;
    navInit.current = true;

    const body = document.body;
    const toggle = document.querySelector('.nav-toggle');

    function closeNav() {
      body.classList.remove('nav-open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
    function openNav() {
      body.classList.add('nav-open');
      toggle?.setAttribute('aria-expanded', 'true');
    }

    toggle?.addEventListener('click', () => {
      if (body.classList.contains('nav-open')) closeNav();
      else openNav();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNav(); });

    const header = document.querySelector('.site-header');
    if (header) {
      const onScroll = () => {
        if (window.scrollY > 20) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }, []);

  // Reveal, gallery, lightbox — re-init on each page change
  useEffect(() => {
    const body = document.body;

    // Close nav on navigation
    body.classList.remove('nav-open');

    // Close nav on link click (delegated)
    const navClickHandler = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('.nav a')) {
        body.classList.remove('nav-open');
        document.querySelector('.nav-toggle')?.setAttribute('aria-expanded', 'false');
      }
    };
    document.addEventListener('click', navClickHandler);

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      reveals.forEach((el) => io.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add('in'));
    }

    // Gallery thumbs
    const gallery = document.querySelector('[data-gallery]');
    if (gallery) {
      const mainImg = gallery.querySelector('.main-shot img') as HTMLImageElement | null;
      const thumbs = gallery.querySelectorAll<HTMLButtonElement>('.thumbs button');
      thumbs.forEach((t) => {
        t.addEventListener('click', () => {
          const src = t.getAttribute('data-full') || t.querySelector('img')?.src || '';
          if (mainImg) mainImg.src = src;
          thumbs.forEach((x) => x.classList.remove('active'));
          t.classList.add('active');
        });
      });
    }

    // Lightbox
    const lb = document.getElementById('lightbox');
    const galleryLinks = Array.from(document.querySelectorAll<HTMLElement>('[data-lightbox]'));

    function openLb(i: number) {
      if (!lb) return;
      const lbImg = lb.querySelector('img') as HTMLImageElement;
      current = i;
      lbImg.src = galleryLinks[i].getAttribute('data-full') || (galleryLinks[i] as HTMLImageElement).src;
      lb.classList.add('open');
      body.style.overflow = 'hidden';
    }
    function closeLb() {
      if (!lb) return;
      lb.classList.remove('open');
      body.style.overflow = '';
    }
    function step(d: number) {
      if (!lb) return;
      const lbImg = lb.querySelector('img') as HTMLImageElement;
      current = (current + d + galleryLinks.length) % galleryLinks.length;
      lbImg.src = galleryLinks[current].getAttribute('data-full') || (galleryLinks[current] as HTMLImageElement).src;
    }
    let current = 0;

    const linkHandlers: Array<{ el: HTMLElement; handler: (ev: Event) => void }> = [];
    galleryLinks.forEach((el, i) => {
      const handler = (ev: Event) => { ev.preventDefault(); openLb(i); };
      el.addEventListener('click', handler);
      linkHandlers.push({ el, handler });
    });

    const lbCloseHandler = () => closeLb();
    const lbPrevHandler = () => step(-1);
    const lbNextHandler = () => step(1);
    const lbClickHandler = (e: Event) => { if (e.target === lb) closeLb(); };
    const lbKeyHandler = (e: KeyboardEvent) => {
      if (!lb?.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };

    lb?.querySelector('.lb-close')?.addEventListener('click', lbCloseHandler);
    lb?.querySelector('.lb-prev')?.addEventListener('click', lbPrevHandler);
    lb?.querySelector('.lb-next')?.addEventListener('click', lbNextHandler);
    lb?.addEventListener('click', lbClickHandler);
    document.addEventListener('keydown', lbKeyHandler);

    return () => {
      document.removeEventListener('click', navClickHandler);
      linkHandlers.forEach(({ el, handler }) => el.removeEventListener('click', handler));
      lb?.querySelector('.lb-close')?.removeEventListener('click', lbCloseHandler);
      lb?.querySelector('.lb-prev')?.removeEventListener('click', lbPrevHandler);
      lb?.querySelector('.lb-next')?.removeEventListener('click', lbNextHandler);
      lb?.removeEventListener('click', lbClickHandler);
      document.removeEventListener('keydown', lbKeyHandler);
    };
  }, [pathname]);

  return (
    <div className="lightbox" id="lightbox" aria-hidden="true">
      <button className="lb-prev" aria-label="Назад">‹</button>
      <img alt="" />
      <button className="lb-next" aria-label="Вперёд">›</button>
      <button className="lb-close" aria-label="Закрыть">×</button>
    </div>
  );
}
