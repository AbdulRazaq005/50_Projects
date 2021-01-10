const panels = document.querySelectorAll(".panel");
var i = 0;

var setAnimation = setInterval(animation, 2500);

panels.forEach((panel, index) => {
  panel.addEventListener("click", () => {
    removeOtherActiveClasses();
    panel.classList.add("active");
    i = index;
    clearInterval(setAnimation);
    setAnimation = setInterval(animation, 2500);
  });
});

document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowLeft":
      removeOtherActiveClasses();
      i--;
      if (i == -1) i = 4;
      panels[i].classList.add("active");
      clearInterval(setAnimation);
      setAnimation = setInterval(animation, 2500);
      break;

    case "ArrowRight":
      removeOtherActiveClasses();
      i++;
      i = i % 5;
      panels[i].classList.add("active");
      clearInterval(setAnimation);
      setAnimation = setInterval(animation, 2500);
      break;
  }
});

function animation() {
  removeOtherActiveClasses();
  i++;
  i = i % 5;
  panels[i].classList.add("active");
}

function removeOtherActiveClasses() {
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });
}
