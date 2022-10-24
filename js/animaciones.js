const btn_burger = document.getElementById('nav-header-menu-trigger-burger');
const control_check = document.getElementById('nav-header-menu__switch');
const menu_nav_desplegable = document.getElementById('menu_nav_desplegable');

btn_burger.addEventListener("click", () => {
    setTimeout(() => {
        if(control_check.checked) {
            btn_burger.style.backgroundColor = 'white';
            menu_nav_desplegable.style.display = 'block';
        }
        else {
            btn_burger.style.backgroundColor = 'rgba(0,0,0,0)';
            setTimeout(() => {
                menu_nav_desplegable.style.display = 'none';
            }, 600);
        }
    },10)
});