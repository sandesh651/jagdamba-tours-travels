/* Locale routing runs before paint; no translation API or third-party script. */
(function(){
 const isMr=location.pathname.endsWith('/mr.html'),pageLanguage=isMr?'mr':'en';
 let saved;try{saved=localStorage.getItem('jagdamba-language')}catch(_){}
 const requested=new URLSearchParams(location.search).get('lang');
 const explicit=requested==='en'||requested==='mr'?requested:null;
 const language=explicit||(isMr?'mr':saved==='mr'?'mr':saved==='en'?'en':/^mr(?:-|$)/i.test(navigator.language||'')?'mr':'en');
 if(language!==pageLanguage){location.replace(new URL((language==='mr'?'mr.html':'index.html')+'?lang='+language+location.hash,location.href).href);return}
 try{localStorage.setItem('jagdamba-language',language)}catch(_){}
})();
