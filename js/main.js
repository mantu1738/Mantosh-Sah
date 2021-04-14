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