import"./assets/styles-5dd7d6cc.js";import{f as m,i as r}from"./assets/vendor-77e16229.js";document.addEventListener("DOMContentLoaded",function(){const n=document.getElementById("datetime-picker"),t=document.querySelector(".btn-start"),d=document.querySelector("[data-days]"),i=document.querySelector("[data-hours]"),c=document.querySelector("[data-minutes]"),u=document.querySelector("[data-seconds]");function a(e){return String(e).padStart(2,"0")}function f(e){const h=Math.floor(e/864e5),b=Math.floor(e%864e5/36e5),y=Math.floor(e%36e5/6e4),C=Math.floor(e%6e4/1e3);return{days:h,hours:b,minutes:y,seconds:C}}m(n,{enableTime:!0,time_24hr:!0,minuteIncrement:1,onClose:function(e){const o=e[0];o?o<new Date?(r.error({title:"Error",message:"Please choose a date in the future"}),t.disabled=!0):t.disabled=!1:t.disabled=!0}}),n.addEventListener("focus",function(){m.parseDate(n.value,"Y-m-d H:i")||(t.disabled=!0)}),t.disabled=!0,t.addEventListener("click",function(){n.disabled=!0,t.disabled=!0;const e=new Date(n.value);if(e<=new Date){r.error({title:"Error",message:"Please choose a date in the future"}),n.disabled=!1,t.disabled=!1;return}let o=e.getTime()-new Date().getTime();const l=setInterval(function(){if(o-=1e3,o<=0)clearInterval(l),d.textContent="00",i.textContent="00",c.textContent="00",u.textContent="00",n.disabled=!1,t.disabled=!1,r.success({title:"Countdown Finished",message:"Timer has ended!"});else{const s=f(o);d.textContent=a(s.days),i.textContent=a(s.hours),c.textContent=a(s.minutes),u.textContent=a(s.seconds)}},1e3)})});
//# sourceMappingURL=commonHelpers.js.map
