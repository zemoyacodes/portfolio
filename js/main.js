(function(){
var $=function(s,c){return(c||document).querySelector(s)},$$=function(s){return[].slice.call(document.querySelectorAll(s))};
var hd=$('#hd'),bg=$('#bg'),mn=$('#mn');
function menu(o){mn.classList.toggle('o',o);bg.setAttribute('aria-expanded',o);mn.setAttribute('aria-hidden',!o);bg.setAttribute('aria-label',o?'Close menu':'Open menu');document.body.style.overflow=o?'hidden':''}
bg.addEventListener('click',function(){menu(!mn.classList.contains('o'))});
$$('.mn a').forEach(function(a){a.addEventListener('click',function(){menu(false)})});
document.addEventListener('keydown',function(e){if(e.key==='Escape')menu(false)});
addEventListener('scroll',function(){hd.classList.toggle('s',scrollY>10)},{passive:true});
var links=$$('.dn a.l'),secs=['home','about','services','projects','contact'].map(function(i){return document.getElementById(i)});
if('IntersectionObserver' in window){
 var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
 secs.forEach(function(s){so.observe(s)});
 var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}})},{threshold:.12});
 $$('.rv').forEach(function(r){ro.observe(r)});
}else{$$('.rv').forEach(function(r){r.classList.add('in')})}
$('#yr').textContent=new Date().getFullYear();
var f=$('#f'),st=$('#st');
f.addEventListener('submit',function(e){
 e.preventDefault();
 if(!f.checkValidity()){st.textContent='Please fill in your name, a valid email, project type and description.';f.reportValidity();return}
 if(f.elements.access_key.value.indexOf('YOUR_')===0){st.textContent='The form is not connected yet. Please use WhatsApp or email instead.';return}
 st.textContent='Sending…';
 fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}})
 .then(function(r){return r.json().then(function(j){if(!j.success)throw 0;return j})})
 .then(function(){f.reset();st.textContent='Thank you. Your message was sent and I’ll reply soon.'})
 .catch(function(){st.textContent='The message could not be sent. Please use WhatsApp or email instead.'});
});
})();
