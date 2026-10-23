(function(){
 'use strict';
 const locale=document.documentElement.lang==='mr'?'mr':'en';
 const form=document.querySelector('#tripform');
 const phone=form.elements.namedItem('phone');phone.inputMode='tel';
 phone.pattern='[+0-9०-९ ()-]{10,16}';
 const config={en:{title:'Jagdamba Tours & Travels | A little more Konkan',required:'Please fill in this field.',phone:'Enter a valid mobile number (10–16 characters).',range:'Enter a number of travellers from 1 to 100.',date:'Choose today or a future date.'},mr:{title:'जगदंबा टूर्स अँड ट्रॅव्हल्स | आपलं कोकण',required:'कृपया ही माहिती भरा.',phone:'कृपया योग्य मोबाइल क्रमांक लिहा (10–16 अक्षरे/अंक).',range:'प्रवासी संख्या 1 ते 100 दरम्यान लिहा.',date:'आजची किंवा पुढील तारीख निवडा.'}}[locale];
 document.title=config.title;
 document.querySelectorAll('[data-language]').forEach(link=>{
  if(link.dataset.language===locale)link.setAttribute('aria-current','page');
  link.addEventListener('click',()=>{
   try{
    localStorage.setItem('jagdamba-language',link.dataset.language);
    const fields=[...form.elements].filter(el=>el.name).map(el=>({name:el.name,value:el.value,index:el.tagName==='SELECT'?el.selectedIndex:null}));
    sessionStorage.setItem('jagdamba-language-draft',JSON.stringify({fields,region:document.querySelector('#region').value,mood:document.querySelector('#mood').value}));
   }catch(_){}
   link.href=new URL((link.dataset.language==='mr'?'mr.html':'index.html')+'?lang='+link.dataset.language+location.hash,location.href).href;
  });
 });
 try{
  const raw=sessionStorage.getItem('jagdamba-language-draft');sessionStorage.removeItem('jagdamba-language-draft');
  if(raw){const draft=JSON.parse(raw);for(const field of draft.fields||[]){const el=form.elements.namedItem(field.name);if(!el)continue;if(el.tagName==='SELECT'&&Number.isInteger(field.index))el.selectedIndex=field.index;else el.value=String(field.value||'')}
   const region=document.querySelector('#region'),moodSelect=document.querySelector('#mood');
   if([...region.options].some(o=>o.value===draft.region))region.value=draft.region;
   if([...moodSelect.options].some(o=>o.value===draft.mood))moodSelect.value=draft.mood;
   // Filter without scrolling or changing the visitor's restored form.
   current=region.value;mood=moodSelect.value;render();
  }
 }catch(_){}
 form.querySelectorAll('input,textarea,select').forEach(field=>{
  field.addEventListener('input',()=>field.setCustomValidity(''));
  field.addEventListener('change',()=>field.setCustomValidity(''));
  field.addEventListener('invalid',()=>{field.setCustomValidity('');if(field.validity.valueMissing)field.setCustomValidity(config.required);else if(field.name==='phone'&&field.validity.patternMismatch)field.setCustomValidity(config.phone);else if(field.name==='travellers'&&!field.validity.valid)field.setCustomValidity(config.range);else if(field.name==='date'&&!field.validity.valid)field.setCustomValidity(config.date)});
 });
})();
