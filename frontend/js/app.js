window.onload = function () {

    let arrow = document.getElementById("arrow");
    let menu = document.getElementById('categories');
    let arrContainer = document.getElementById('arrow-container');
    let categoryLi = document.getElementById('category-li');

    arrow.addEventListener("click", function(){
        if(this.classList.contains('active-arrow')){
            this.classList.remove('active-arrow');
            menu.classList.remove('active-menu');
            arrContainer.classList.remove('active-arrow-container');
        }
        else{
            this.classList.add('active-arrow');
            menu.classList.add('active-menu');
            arrContainer.classList.add('active-arrow-container');
        }
    });
  };
