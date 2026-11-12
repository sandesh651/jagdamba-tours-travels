/* Progressive enhancement: content and navigation do not depend on this script. */
(()=>{
 const hero=document.querySelector('.hero');if(!hero)return;
 const mr=document.documentElement.lang==='mr';
 const ornament=document.createElement('div');ornament.className='cinema-orbit';ornament.setAttribute('aria-hidden','true');ornament.innerHTML=mr?'<span>समुद्राच्या सोबतीने<b>कोकण</b>तुमच्या गतीने</span>':'<span>THE COAST IS CALLING<b>Konkan</b>TAKE THE SCENIC WAY</span>';hero.append(ornament);
 const cue=document.createElement('a');cue.className='cinema-scroll';cue.href='#packages';cue.innerHTML='<i aria-hidden="true"></i><span>'+(mr?'तुमची सहल शोधा':'Scroll into your next escape')+'</span>';hero.append(cue);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');const photo=hero.querySelector(':scope > img');let frame=0,inView=true;
 function paint(){frame=0;if(!photo||reduced.matches||!inView||document.hidden)return;const rect=hero.getBoundingClientRect();const offset=Math.max(-25,Math.min(25,-rect.top*.055));photo.style.transform=`translate3d(0,${offset}px,0) scale(1.085)`;}
 function queue(){if(!frame)frame=requestAnimationFrame(paint)}
 if('IntersectionObserver'in window)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView)queue()}).observe(hero);
 addEventListener('scroll',queue,{passive:true});reduced.addEventListener('change',()=>{if(reduced.matches)photo.style.transform='none';else queue()});queue();
 // Short, one-time entrances keep text readable and avoid permanent hidden content.
 if(!reduced.matches&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.animate([{opacity:.65,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.2,.65,.3,1)'});observer.unobserve(entry.target)}),{threshold:.08});document.querySelectorAll('.packages-intro,.story .split,.stay-banner,#services .heading').forEach(el=>observer.observe(el))}
})();
