/* Locale routing runs before paint; no translation API or third-party script. */
(function(){
 // Start every document visit at the top; in-page section clicks remain native.
 try{
  history.scrollRestoration='manual';
  if(location.hash)history.replaceState(history.state,'',location.pathname+location.search);
 }catch(_){}
 let interacted=false;
 ['pointerdown','touchstart','wheel','keydown'].forEach(type=>
  addEventListener(type,()=>{interacted=true},{passive:true,once:true}));
 function startAtTop(){
  if(!interacted)scrollTo({top:0,left:0,behavior:'instant'});
 }
 startAtTop();
 document.addEventListener('DOMContentLoaded',startAtTop,{once:true});
 addEventListener('load',startAtTop,{once:true});
 addEventListener('pageshow',event=>{
  if(event.persisted)interacted=false;
  startAtTop();
 });

 const isMr=location.pathname.endsWith('/mr.html'),pageLanguage=isMr?'mr':'en';
 let saved;try{saved=localStorage.getItem('jagdamba-language')}catch(_){}
 const requested=new URLSearchParams(location.search).get('lang');
 const explicit=requested==='en'||requested==='mr'?requested:null;
 const language=explicit||(isMr?'mr':saved==='mr'?'mr':saved==='en'?'en':/^mr(?:-|$)/i.test(navigator.language||'')?'mr':'en');
 if(language!==pageLanguage){location.replace(new URL((language==='mr'?'mr.html':'index.html')+'?lang='+language,location.href).href);return}
 try{localStorage.setItem('jagdamba-language',language)}catch(_){}
})();
