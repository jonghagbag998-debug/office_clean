// in-page anchor navigation (fixes links occasionally being treated as external)
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  const targetId = link.getAttribute('href').slice(1);
  const target = document.getElementById(targetId);
  if(!target) return;
  link.addEventListener('click', (e)=>{
    e.preventDefault();
    target.scrollIntoView({ behavior:'smooth', block:'start' });
  });
});

// scroll reveal
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in-view');
      observer.unobserve(e.target);
    }
  });
}, {threshold:0.15});
document.querySelectorAll('.fade-up').forEach(el=>{
  const siblings = Array.from(el.parentElement.children).filter(c=>c.classList.contains('fade-up'));
  el.style.setProperty('--index', siblings.indexOf(el));
  observer.observe(el);
});

// pause any playing hero video the instant a real navigation link is
// clicked, so an actively-decoding autoplay video doesn't compete with
// the browser for the main thread and delay the page transition
document.querySelectorAll('a[href]').forEach(link=>{
  const href = link.getAttribute('href');
  if(!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) return;
  link.addEventListener('click', ()=>{
    document.querySelectorAll('video').forEach(v=> v.pause());
  });
});

// mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
if(navToggle && mainNav){
  navToggle.addEventListener('click', ()=>{
    const open = mainNav.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', open);
  });
  mainNav.querySelectorAll('a').forEach(link=>{
    link.addEventListener('click', ()=>{
      mainNav.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// to-top button
const totop = document.getElementById('totop');
if(totop){
  window.addEventListener('scroll', ()=>{
    totop.classList.toggle('show', window.scrollY > 500);
  });
  totop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
}

// subtle hero background parallax
const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const parallaxHeroes = document.querySelectorAll('.hero, .page-hero');
if(!motionReduced && parallaxHeroes.length){
  let parallaxFrame = null;
  const updateHeroBackgrounds = ()=>{
    parallaxHeroes.forEach(hero=>{
      const shift = Math.max(-24, Math.min(24, -hero.getBoundingClientRect().top * 0.055));
      hero.style.setProperty('--bg-shift-y', `${shift.toFixed(1)}px`);
    });
    parallaxFrame = null;
  };
  window.addEventListener('scroll', ()=>{
    if(parallaxFrame === null) parallaxFrame = requestAnimationFrame(updateHeroBackgrounds);
  }, {passive:true});
  updateHeroBackgrounds();
}
