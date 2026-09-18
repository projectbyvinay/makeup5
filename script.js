gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Loader
const loader = document.querySelector(".loader");
const loaderLine = document.querySelector(".loader-line span");
const intro = gsap.timeline({defaults:{ease:"power4.out"}});
intro.to(loaderLine,{x:"0%",duration:1.15,ease:"power2.inOut"})
  .to(loader,{yPercent:-100,duration:1.1,delay:.15})
  .from(".nav",{y:-25,opacity:0,duration:.7},"-=.55")
  .from(".hero-kicker",{y:25,opacity:0,duration:.6},"-=.35")
  .from(".hero-title span",{y:80,opacity:0,duration:1},"-=.3")
  .from(".hero-title em",{y:50,opacity:0,duration:.8},"-=.55")
  .from(".hero-video",{clipPath:"inset(0 100% 0 0)",duration:1.25},"-=.55")
  .from(".hero-desc",{y:25,opacity:0,duration:.6},"-=.55")
  .from(".hero-actions",{y:20,opacity:0,duration:.6},"-=.4")
  .from(".hero-side span",{x:25,opacity:0,stagger:.08,duration:.4},"-=.5");

window.addEventListener("load", () => setTimeout(() => document.body.classList.add("loaded"), 900));

// Scroll progress + nav state
gsap.to(".scroll-progress span",{scaleX:1,ease:"none",scrollTrigger:{start:0,end:"max",scrub:.2}});
ScrollTrigger.create({
  start:"top -80",
  onEnter:()=>document.querySelector(".nav").classList.add("scrolled"),
  onLeaveBack:()=>document.querySelector(".nav").classList.remove("scrolled")
});

// Hero parallax
gsap.to(".hero-bg",{yPercent:12,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}});
gsap.to(".hero-video video",{scale:1.15,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1.2}});
gsap.to(".hero-copy",{yPercent:-8,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}});
gsap.to(".hero-side",{y:35,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}});

// Generic entrance animations
gsap.utils.toArray(".about-copy > *").forEach((el,i)=>{
  gsap.from(el,{y:45,opacity:0,duration:.8,delay:i*.06,scrollTrigger:{trigger:el,start:"top 82%"}})
});
gsap.from(".about-photo",{clipPath:"inset(0 0 100% 0)",duration:1.2,ease:"power4.inOut",scrollTrigger:{trigger:".about",start:"top 75%"}});

gsap.to(".signature:before",{yPercent:10,ease:"none",scrollTrigger:{trigger:".signature",start:"top bottom",end:"bottom top",scrub:1.4}});
gsap.from(".signature-inner > *",{y:60,opacity:0,stagger:.1,duration:.9,scrollTrigger:{trigger:".signature",start:"top 72%"}});

gsap.utils.toArray(".section-head").forEach(head=>gsap.from(head.children,{y:60,opacity:0,stagger:.15,duration:.9,scrollTrigger:{trigger:head,start:"top 78%"}}));
gsap.from(".service-card",{y:90,opacity:0,scale:.96,stagger:.16,duration:1,ease:"power3.out",scrollTrigger:{trigger:".service-grid",start:"top 78%"}});

gsap.from(".gallery-head > *",{y:55,opacity:0,stagger:.15,duration:.8,scrollTrigger:{trigger:".gallery",start:"top 75%"}});
gsap.utils.toArray(".reveal").forEach((el,i)=>{
  gsap.to(el.querySelector(".reveal-curtain"),{xPercent:100,duration:1.25,ease:"power4.inOut",delay:i*.12,scrollTrigger:{trigger:el,start:"top 78%"}})
});
gsap.from(".gallery-side .mini",{y:70,opacity:0,stagger:.15,duration:.9,scrollTrigger:{trigger:".gallery-side",start:"top 80%"}});

gsap.from(".quote blockquote",{y:80,opacity:0,duration:1,scrollTrigger:{trigger:".quote",start:"top 75%"}});

gsap.from(".journey-grid article",{y:60,opacity:0,stagger:.14,duration:.85,scrollTrigger:{trigger:".journey-grid",start:"top 78%"}});
gsap.from(".journey-line",{scaleX:0,transformOrigin:"left",duration:1.4,scrollTrigger:{trigger:".journey",start:"top 70%"}});

gsap.from(".insta-item",{y:80,opacity:0,scale:.97,stagger:.1,duration:.9,scrollTrigger:{trigger:".insta-grid",start:"top 80%"}});

gsap.from(".contact > *:not(.contact-glow):not(.contact-ring)",{y:55,opacity:0,stagger:.1,duration:.8,scrollTrigger:{trigger:".contact",start:"top 72%"}});

// Gentle floating glass quote
if (!reduceMotion) gsap.to(".glass-line",{y:-6,duration:2.2,repeat:-1,yoyo:true,ease:"sine.inOut"});

// 3D tilt on desktop service cards
if (!reduceMotion && window.matchMedia("(pointer:fine)").matches) {
  document.querySelectorAll(".service-card,.hero-video").forEach(card=>{
    card.addEventListener("mousemove",e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      gsap.to(card,{rotateY:x*4,rotateX:-y*4,duration:.35,ease:"power2.out",transformPerspective:900});
    });
    card.addEventListener("mouseleave",()=>gsap.to(card,{rotateY:0,rotateX:0,duration:.6,ease:"power3.out"}));
  });
}

// Magnetic buttons + custom cursor
if (window.matchMedia("(pointer:fine)").matches && !reduceMotion) {
  document.body.classList.add("has-cursor");
  const dot=document.querySelector(".cursor-dot"), ring=document.querySelector(".cursor-ring");
  let mx=0,my=0,rx=0,ry=0;
  window.addEventListener("mousemove",e=>{
    mx=e.clientX; my=e.clientY;
    gsap.to(dot,{x:mx,y:my,duration:.12,opacity:1});
  });
  gsap.ticker.add(()=>{
    rx+=(mx-rx)*.14; ry+=(my-ry)*.14;
    gsap.set(ring,{x:rx,y:ry,opacity:1});
  });
  document.querySelectorAll("a,.magnetic").forEach(el=>{
    el.addEventListener("mouseenter",()=>gsap.to(ring,{scale:1.5,duration:.25}));
    el.addEventListener("mouseleave",()=>gsap.to(ring,{scale:1,duration:.25}));
  });
  document.querySelectorAll(".magnetic").forEach(el=>{
    el.addEventListener("mousemove",e=>{
      const r=el.getBoundingClientRect(), x=(e.clientX-r.left-r.width/2)*.12, y=(e.clientY-r.top-r.height/2)*.12;
      gsap.to(el,{x,y,duration:.3,ease:"power2.out"});
    });
    el.addEventListener("mouseleave",()=>gsap.to(el,{x:0,y:0,duration:.45,ease:"elastic.out(1,.5)"}));
  });
}

// Mobile menu
const menuBtn=document.querySelector(".menu-toggle"), menu=document.querySelector(".mobile-menu");
let menuOpen=false;
menuBtn?.addEventListener("click",()=>{
  menuOpen=!menuOpen;
  gsap.to(menu,{x:menuOpen?"0%":"100%",duration:.65,ease:"power4.inOut"});
});
menu?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  menuOpen=false; gsap.to(menu,{x:"100%",duration:.55,ease:"power4.inOut"});
}));

// Keep ScrollTrigger accurate after media/layout changes.
window.addEventListener("resize",()=>ScrollTrigger.refresh());

// Booking journey: turn form details into a ready-to-send WhatsApp enquiry.
const bookingForm = document.querySelector("#bookingForm");
bookingForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const occasion = document.querySelector("#occasion").value;
  const date = document.querySelector("#eventDate").value;
  const city = document.querySelector("#city").value.trim();
  const notes = document.querySelector("#notes").value.trim();
  if (!occasion || !date || !city) return;
  const formattedDate = new Date(date + "T12:00:00").toLocaleDateString("en-IN", {
    day:"2-digit", month:"long", year:"numeric"
  });
  const message =
    `Hi Vibha, I'd like to enquire about a makeup appointment.%0A%0A` +
    `Occasion: ${encodeURIComponent(occasion)}%0A` +
    `Date: ${encodeURIComponent(formattedDate)}%0A` +
    `City: ${encodeURIComponent(city)}%0A` +
    (notes ? `Details: ${encodeURIComponent(notes)}%0A` : "");
  window.open(`https://wa.me/919875779956?text=${message}`, "_blank", "noopener");
});

gsap.from(".signature-points span",{y:20,opacity:0,stagger:.08,duration:.55,scrollTrigger:{trigger:".signature-points",start:"top 82%"}});
gsap.from(".booking-intro > *",{y:45,opacity:0,stagger:.1,duration:.75,scrollTrigger:{trigger:".booking",start:"top 76%"}});
gsap.from(".booking-form",{x:60,opacity:0,duration:1,scrollTrigger:{trigger:".booking-form",start:"top 78%"}});

// Footer and editorial gallery finishing motion
gsap.from(".footer-top > *",{y:35,opacity:0,stagger:.1,duration:.7,scrollTrigger:{trigger:".site-footer",start:"top 88%"}});
gsap.from(".footer-bottom > *",{opacity:0,stagger:.08,duration:.5,scrollTrigger:{trigger:".footer-bottom",start:"top 92%"}});
