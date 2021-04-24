
/***Toggle Style Switcher***/

const styleToggler = document.querySelector(".style-toggler");
styleToggler.addEventListener("click", ()=>{
   document.querySelector(".style-switcher").classList.toggle("open");
});

// hide switcher while scrolling

window.addEventListener("scroll", () =>{
  if(  document.querySelector(".style-switcher").classList.contains("open")){
    document.querySelector(".style-switcher").classList.remove("open");
  }
});

/*************Theme color************** */

const alternateStyle = document.querySelectorAll(".alternate-style");

function setActiveStyle(color){
    alternateStyle.forEach( (style)=>{
        if(color === style.getAttribute("title")){
            style.removeAttribute("disabled");
        }
        else{
            style.setAttribute("disabled", "true");
        }
    });
}

/**********Theme for light and dark mode********* */

const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", ()=>{
    dayNight.querySelector("em").classList.toggle("fa-sun");
    dayNight.querySelector("em").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");
});

window.addEventListener("load", ()=>{
if(document.body.classList.contains("dark")){
  dayNight.querySelector("em").classList.add("fa-sun");
}
else{
    dayNight.querySelector("em").classList.add("fa-moon");
}
});