const elements = document.querySelectorAll(".reveal");

function onScroll() {
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", onScroll);
onScroll();
