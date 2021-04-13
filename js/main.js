/*************Change the about tabs***************** */


(()=>{
    var aboutinfo = document.querySelector('.about-info2');
    var itemContainer = document.getElementsByClassName('about-info-item');
    for (var i = 0 ; i < itemContainer.length; i++){
    itemContainer[i].addEventListener('click', ( e)=>{
        if(e.target.classList.contains('about-info-item') && 
        !e.target.classList.contains('active')){
            const target1 = e.target.getAttribute("data-target");
            for (var i = 0 ; i < itemContainer.length; i++){
            itemContainer[i].querySelector(".active").classList.remove("outer-shadow", "active");
            e.target.classList.add("active", "outershadow");
            }
           
        }
    });
    }
})();