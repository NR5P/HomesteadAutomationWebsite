
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");
const commentTextArea = document.getElementById("add-comment");
const userId = document.getElementById("user-id");
const postId = document.getElementById("post-id");

/*******************nav*********************************************************/
// toggle the side bar
burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");

    // animate the links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = "";
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + .5}s`;
        }
    });
    // change burger
    burger.classList.toggle("toggle");
});
/*******************end nav*********************************************************/


