const MONTHS_IN_YEAR = 12;
const DAYS_IN_DECEMBER = 31;

function monthLeft() {
  const currentMonth = new Date().getMonth() + 1;
  return MONTHS_IN_YEAR - currentMonth;
}

function daysLeft() {
  const currentDay = new Date().getDate();
  return DAYS_IN_DECEMBER - currentDay;
}
 
function timeLeft() {
  const today = new Date();
  const nextDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );
  const diff = nextDay.getTime() - today.getTime();

  const hoursLeft = Math.floor(diff / 1000 / 60 / 60);
  const minutesLeft = Math.floor((diff / 1000 / 60) % 60);
  const secondsLeft = Math.floor((diff / 1000) % 60);

  return `${hoursLeft} часов, ${minutesLeft} минут, ${secondsLeft} секунд.`
}

function updateCounter() {
  return `${monthLeft()} месяцев, ${daysLeft()} дней, ${timeLeft()}`;
}

function renderTitle(title) {
  const el = document.createElement("h1");
  el.textContent = title;
  return el;
}

function renderCounter() {
  const el = document.createElement("p");
  setInterval(() => {
    el.textContent = updateCounter();
  })
  return el;
}


const app = document.querySelector('#app');
app.appendChild(renderTitle("До Нового Года осталось:"));
app.appendChild(renderCounter());

console.log(timeLeft());
