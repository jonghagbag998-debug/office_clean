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

// to-top button
const totop = document.getElementById('totop');
if(totop){
  window.addEventListener('scroll', ()=>{
    totop.classList.toggle('show', window.scrollY > 500);
  });
  totop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
}
