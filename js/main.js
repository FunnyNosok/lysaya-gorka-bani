/* Лысая Горка — интерактив */
(function(){
  'use strict';

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  function closeNav(){ document.body.classList.remove('nav-open'); if(toggle) toggle.setAttribute('aria-expanded','false'); }
  function openNav(){ document.body.classList.add('nav-open'); if(toggle) toggle.setAttribute('aria-expanded','true'); }
  if(toggle){
    toggle.setAttribute('aria-expanded','false');
    toggle.addEventListener('click', function(){
      if(document.body.classList.contains('nav-open')) closeNav(); else openNav();
    });
    document.querySelectorAll('.nav a').forEach(function(a){
      a.addEventListener('click', function(){ closeNav(); });
    });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeNav(); });
  }

  /* ---------- scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && reveals.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------- баня gallery: swap main shot ---------- */
  var gallery = document.querySelector('[data-gallery]');
  if(gallery){
    var mainImg = gallery.querySelector('.main-shot img');
    var thumbs = gallery.querySelectorAll('.thumbs button');
    thumbs.forEach(function(t){
      t.addEventListener('click', function(){
        var src = t.getAttribute('data-full') || t.querySelector('img').src;
        mainImg.src = src;
        thumbs.forEach(function(x){ x.classList.remove('active'); });
        t.classList.add('active');
      });
    });
  }

  /* ---------- lightbox ---------- */
  var lb = document.getElementById('lightbox');
  if(lb){
    var lbImg = lb.querySelector('img');
    var lbPrev = lb.querySelector('.lb-prev');
    var lbNext = lb.querySelector('.lb-next');
    var galleryLinks = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
    var current = 0;

    function openLb(i){
      current = i;
      lbImg.src = galleryLinks[i].getAttribute('data-full') || galleryLinks[i].src;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLb(){ lb.classList.remove('open'); document.body.style.overflow = ''; }
    function step(d){
      current = (current + d + galleryLinks.length) % galleryLinks.length;
      lbImg.src = galleryLinks[current].getAttribute('data-full') || galleryLinks[current].src;
    }
    galleryLinks.forEach(function(el,i){
      el.addEventListener('click', function(ev){ ev.preventDefault(); openLb(i); });
    });
    lb.querySelector('.lb-close').addEventListener('click', closeLb);
    if(lbPrev) lbPrev.addEventListener('click', function(){ step(-1); });
    if(lbNext) lbNext.addEventListener('click', function(){ step(1); });
    lb.addEventListener('click', function(e){ if(e.target===lb) closeLb(); });
    document.addEventListener('keydown', function(e){
      if(!lb.classList.contains('open')) return;
      if(e.key==='Escape') closeLb();
      if(e.key==='ArrowLeft') step(-1);
      if(e.key==='ArrowRight') step(1);
    });
  }

  /* ---------- booking form -> WhatsApp ---------- */
  var form = document.getElementById('book-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var banya = form.getAttribute('data-banya') || '';
      var name = (form.querySelector('[name=name]')||{}).value || '';
      var phone = (form.querySelector('[name=phone]')||{}).value || '';
      var date = (form.querySelector('[name=date]')||{}).value || '';
      var hours = (form.querySelector('[name=hours]')||{}).value || '';
      var people = (form.querySelector('[name=people]')||{}).value || '';
      var msg = 'Здравствуйте! Хочу забронировать баню';
      if(banya) msg += ' — ' + banya;
      msg += '.';
      if(name) msg += '\nИмя: ' + name;
      if(phone) msg += '\nТелефон: ' + phone;
      if(date) msg += '\nДата/время: ' + date;
      if(hours) msg += '\nЧасов: ' + hours;
      if(people) msg += '\nЧеловек: ' + people;
      var ok = form.querySelector('.form-ok');
      if(ok) ok.classList.add('show');
      var wa = '79530477577';
      window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(msg), '_blank');
    });
  }

  /* ---------- header shadow on scroll ---------- */
  var header = document.querySelector('.site-header');
  if(header){
    var onScroll = function(){
      if(window.scrollY > 20) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
  }

})();
