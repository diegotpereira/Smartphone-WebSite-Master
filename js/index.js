// Navigation
const navOpen = document.querySelector(".nav_hamburger");
const navClose = document.querySelector(".close_toggle");
const menu = document.querySelector(".nav_menu");
const scrollLink = document.querySelectorAll(".scroll-link");
const navContainer = document.querySelector(".nav_menu");

navOpen.addEventListener("click", () => {
    menu.classList.add("open");
    document.body.classList.add("active");
    navContainer.style.left = "0";
    navContainer.style.width = "30rem";
});

navClose.addEventListener("click", () => {
    menu.classList.remove("open");
    document.body.classList.remove("active");
    navContainer.style.left = "-30rem";
    navContainer.style.width = "0";
});

// PopUp
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup_close");

if (popup) {
    closePopup.addEventListener("click", () => {
        popup.classList.add("hide_popup");
    });
    window.addEventListener("load", () => {
        setTimeout(() => {
            popup.classList.remove("hide_popup");
        }, 500);
    });
}

// Fixed Navigation
const navBar = document.querySelector(".navigation");
const gotoTop = document.querySelector(".goto-top");

// Smooth Scroll
Array.from(scrollLink).map(link => {
    link.addEventListener("click", e => {
        // Impedir a inadimplĂȘncia
        e.preventDefault();
        const id = e.currentTarget.getAttribute("href").slice(1);
        const element = document.getElementById(id);
        const navHeight = navBar.getBoundingClientRect().height;
        const fixNav = navBar.classList.contains("fix_nav");
        let position = element.offsetTop - navHeight;

        if (!fixNav) {
            position = position - navHeight;
        }
        window.scrollTo({
            left: 0,
            top: position,
        });
        navContainer.style.left = "-30rem";
        document.body.classList.remove("active");
    });
});

// Fix NavBar
window.addEventListener("scroll", e => {
    const scrollHeight = window.pageYOffset;
    const navHeight = navBar.getBoundingClientRect().height;
    if (scrollHeight > navHeight) {
        navBar.classList.add("fix_nav");
    } else {
        navBar.classList.remove("fix_nav");
    }

    if (scrollHeight > 300) {
        gotoTop.classList.add("show-top");
    } else {
        gotoTop.classList.remove("show-top");
    }
});