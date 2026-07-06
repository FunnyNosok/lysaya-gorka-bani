'use client';

import { useEffect } from 'react';

export function ClientScripts() {
  useEffect(() => {
    const body = document.body;

    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

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
    document.querySelectorAll('.nav a')?.forEach((a) =>
      a.addEventListener('click', closeNav)
    );
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeNav(); };
    document.addEventListener('keydown', onKey);

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

    const lb = document.getElementById('lightbox');
    if (lb) {
      const lbEl = lb;
      const lbImg = lbEl.querySelector('img') as HTMLImageElement;
      const lbPrev = lbEl.querySelector('.lb-prev') as HTMLButtonElement;
      const lbNext = lbEl.querySelector('.lb-next') as HTMLButtonElement;
      const galleryLinks = Array.from(document.querySelectorAll<HTMLImageElement>('[data-lightbox]'));
      let current = 0;

      function openLb(i: number) {
        current = i;
        lbImg.src = galleryLinks[i].getAttribute('data-full') || galleryLinks[i].src;
        lbEl.classList.add('open');
        body.style.overflow = 'hidden';
      }
      function closeLb() {
        lbEl.classList.remove('open');
        body.style.overflow = '';
      }
      function step(d: number) {
        current = (current + d + galleryLinks.length) % galleryLinks.length;
        lbImg.src = galleryLinks[current].getAttribute('data-full') || galleryLinks[current].src;
      }
      galleryLinks.forEach((el, i) =>
        el.addEventListener('click', (ev) => { ev.preventDefault(); openLb(i); })
      );
      lbEl.querySelector('.lb-close')?.addEventListener('click', closeLb);
      lbPrev?.addEventListener('click', () => step(-1));
      lbNext?.addEventListener('click', () => step(1));
      lbEl.addEventListener('click', (e) => { if (e.target === lbEl) closeLb(); });
      const lbKey = (e: KeyboardEvent) => {
        if (!lbEl.classList.contains('open')) return;
        if (e.key === 'Escape') closeLb();
        if (e.key === 'ArrowLeft') step(-1);
        if (e.key === 'ArrowRight') step(1);
      };
      document.addEventListener('keydown', lbKey);
    }

    const header = document.querySelector('.site-header');
    if (header) {
      const onScroll = () => {
        if (window.scrollY > 20) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="lightbox" id="lightbox" aria-hidden="true">
      <button className="lb-prev" aria-label="Назад">‹</button>
      <img alt="" />
      <button className="lb-next" aria-label="Вперёд">›</button>
      <button className="lb-close" aria-label="Закрыть">×</button>
    </div>
  );
}
