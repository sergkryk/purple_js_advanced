const DEFAULT_TEXT = "Нажми меня";
const PRESSED_TEXT = "Нажата!";
const buttonsParentNode = document.querySelector(".counter__buttons");
const counterNode = document.querySelector(".counter__count");

function updateButtonsText(target) {
  for (const button of [...buttonsParentNode.children]) {
    button.textContent = DEFAULT_TEXT;
  }
  target.textContent = PRESSED_TEXT;
}

function counterController() {
  let counter = 0;
  return function() {
    counter = counter += 1;
    return counter;
  }
}

const updateCounter = counterController();

function clickHandler(event) {
  updateButtonsText(event.target);
  counterNode.textContent = updateCounter();
}

buttonsParentNode.addEventListener("click", clickHandler);
