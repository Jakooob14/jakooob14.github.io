function hamburgerMenuToggle(){
    let menu = document.getElementById("menu");
    let active = menu.classList.contains("active");

    if(active){
        menu.classList.remove("active");
    } else{
        menu.classList.add("active")
    }
}