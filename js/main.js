
/***************Navigation Menu********************** */

(()=>{
      const navBtn = document.querySelector(".nav-btn");
      const navMenu = document.querySelector(".nav-menu");
      const closeNavBtn = document.querySelector(".close-nav-menu");
    //   console.log(navMenu);

    navBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", closeNavMenu);

    function showNavMenu(){
          navMenu.classList.add("show");
          bodyScrollingToggle();
    }
    
    function closeNavMenu(){
        navMenu.classList.remove("show");
        fadeOutEffect();
        bodyScrollingToggle();
  }

  function fadeOutEffect(){
      document.querySelector(".fade-out-effect").classList.add("active");
      setTimeout( ( )=>{
        document.querySelector(".fade-out-effect").classList.remove("active");
      },300 )
  }

  /********add an event handler to document ********** */
  document.addEventListener("click", (e)=>{
    // console.log(e.target);
    if(e.target.classList.contains("link-item")){

        if(e.target.hash !==" "){
              e.preventDefault();
              const hash = e.target.hash;
            //   console.log(hash);

            document.querySelector(".section.active").classList.add("hide");
            document.querySelector(".section.active").classList.remove("active");

            document.querySelector(hash).classList.add("active");
            document.querySelector(hash).classList.remove("hide");

            navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-out");
            navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
             if(navMenu.classList.contains("show")){
            e.target.classList.add("active", "inner-shadow");
            e.target.classList.remove("outer-shadow", "hover-in-out");
            closeNavMenu();
             }
             else{
                let navItems = navMenu.querySelectorAll(".link-item");
                navItems.forEach((item)=>{
                    if(hash===item.hash){
                    item.classList.add("active", "inner-shadow");
                    item.classList.remove("outer-shadow", "hover-in-out");
                    }
                });
                fadeOutEffect();
             }

             // add hsah to the window 
             window.location.hash=hash;
        }
    }
  });
})();


/*************Change the about tabs***************** */


(()=>{
    const aboutSection = document.querySelector('.about-info');
    const itemContainer =  document.querySelector('.about-info2');

    itemContainer.addEventListener("click", (e) =>{
        /*Check target contaon about-info-item class and not contaoins 
        'active class */

        if(e.target.classList.contains("about-info-item") &&
        !e.target.classList.contains("active")){

            const targeted = e.target.getAttribute("data-target");
           
            // diable existing active about-info-item

            itemContainer.querySelector(".active").classList.remove("outer-shadow", "active");

            // activate new tab

            e.target.classList.add("active", "outer-shadow");

            //deactivate existing active about-info

            document.querySelector(".about-content.active").classList.remove("active");

            /// display other contents

            document.querySelector(targeted).classList.add("active");
        }
        
    });
})();


function bodyScrollingToggle(){
    document.body.classList.toggle("stop-scroll");
}


/**********Project showcase and description************** */

( () =>{
          const projectFilter = document.querySelector(".project-filter");
          const projectContainer = document.querySelector(".project-items");
          const projectItems = document.querySelectorAll(".project-item");
          const projectPopup = document.querySelector(".project-popup");
          const prevBtn = projectPopup.querySelector(".pp-prev");
          const nextBtn = projectPopup.querySelector(".pp-next");
          const projectDetailsContainer = projectPopup.querySelector(".pp-details");
          const projectDetailsShowBtn = projectPopup.querySelector(".pp-btn");
          const closeBtn = projectPopup.querySelector(".pp-close");
          const counter = projectPopup.querySelector(".pp-counter");
          let itemIndex, slideIndex, screenShots;

          /******Filter project items***** */
           projectFilter.addEventListener('click', (e) =>{
             if(e.target.classList.contains("filter-item") &&
             !e.target.classList.contains("active")){
                 
                //Remove existing active filter item 

                projectFilter.querySelector(".active").classList.remove("outer-shadow", "active");

                // add active class to filter items

                e.target.classList.add("active", "outer-shadow" );

                const targeted = e.target.getAttribute("data-target");
                
                projectItems.forEach((item) =>{
                   if(targeted===item.getAttribute("data-category") || targeted=== "all"){
                       item.classList.remove("hide");
                       item.classList.add("show");
                   }

                   else{
                    item.classList.remove("show");
                    item.classList.add("hide");
                   }
                });

                // console.log(targeted);
             }
           });


           projectContainer.addEventListener("click", (e) =>{
               if(e.target.closest(".project-item-inner")){
                   const projectItem = e.target.closest(".project-item-inner").parentElement;
                   

                   //get the projectitem index

                   itemIndex = Array.from(projectItem.parentElement.children).indexOf(projectItem);
                //    console.log(itemIndex);

                screenShots = projectItems[itemIndex].querySelector(".project-item-img img")
                .getAttribute("data-screenshots");

                //convert screenshots into array

                screenShots = screenShots.split(",");

                if(screenShots.length===1){
                    prevBtn.style.display="none";
                    nextBtn.style.display="none";
                }
                else{
                    prevBtn.style.display="block";
                    nextBtn.style.display="block";
                }
                  
                // console.log(screenShots);

                slideIndex = 0;

                popupToggle();
                popupSlideShow();
                popupDetails();
               }
           });

           closeBtn.addEventListener("click", ()=>{
               popupToggle();
               if(projectDetailsContainer.classList.contains("active")){
                   popupDetailsToggle();
               }
           })

           function popupToggle() {
               projectPopup.classList.toggle("open");
               bodyScrollingToggle();
           }

           function popupSlideShow() {
               const imgScroll = screenShots[slideIndex];
            //    console.log(imgScroll);
            const popupImg = projectPopup.querySelector(".pp-img");

            //Preloader setup

            projectPopup.querySelector(".pre-loader").classList.add("active");

            popupImg.src = imgScroll; 

            popupImg.onload = ( ) =>{
                projectPopup.querySelector(".pre-loader").classList.remove("active");
            }

           counter.innerHTML = (slideIndex+1) + " of " + screenShots.length;
           }

           //nextslide

           nextBtn.addEventListener("click", () =>{
             if(slideIndex===screenShots.length-1){
                 slideIndex=0;
             }
             else{
                 slideIndex++;
             }

             popupSlideShow();
           });

           //prev slide

           prevBtn.addEventListener("click", ()=>{
               if(slideIndex===0){
                   slideIndex = screenShots.length;
               }
               else{
                   slideIndex--;
               }
               popupSlideShow();
           });

           function popupDetails() {
               const details =  projectItems[itemIndex].querySelector(".project-item-details").innerHTML;
               projectPopup.querySelector(".pp-project-details").innerHTML = details;
               const title = projectItems[itemIndex].querySelector(".project-item-title").innerHTML;
               projectPopup.querySelector(".pp-title h2").innerHTML = title;
               const category = projectItems[itemIndex].getAttribute("data-category");
               projectPopup.querySelector(".pp-project-categoty").innerHTML = category;
           }

           projectDetailsShowBtn.addEventListener("click", ()=>{
               popupDetailsToggle();
           });

           function popupDetailsToggle() {
            if(projectDetailsContainer.classList.contains("active")){
                projectDetailsShowBtn.querySelector("em").classList.remove("fa-minus");
                projectDetailsShowBtn.querySelector("em").classList.add("fa-plus");
                projectDetailsContainer.classList.remove("active");
                projectDetailsContainer.style.maxHeight = 0 + "px";
            }
            else{
                projectDetailsShowBtn.querySelector("em").classList.remove("fa-plus");
                projectDetailsShowBtn.querySelector("em").classList.add("fa-minus");
                projectDetailsContainer.classList.add("active");
                projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
                projectPopup.scrollTo(0, projectDetailsContainer.offsetTop);
            }
           }
           
})();

/**************hide all sections expect active ***************** */

// ( ()=>{
//        const sections = document.querySelectorAll(".section");
//     //    console.log(sections);

//     sections.forEach((section)=>{
//          if(!section.classList.contains("active")){
//              section.classList.add("hide");
//          }
//     });
// })();