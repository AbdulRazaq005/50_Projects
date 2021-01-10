const panels = document.querySelectorAll(".panel");
var i = 1;

panels.forEach((panel, index) => {
  panel.addEventListener("click", () => {
    removeOtherActiveClasses();
    panel.classList.add("active");
    i = index;
    clearInterval(setAnimation);
    i++;
    i = i % 5;
    setAnimation = setInterval(animation, 2500);
  });
});

var setAnimation = setInterval(animation, 2500);

function animation() {
  removeOtherActiveClasses();
  panels[i].classList.add("active");
  i++;
  i = i % 5;
}

function removeOtherActiveClasses() {
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });
}
