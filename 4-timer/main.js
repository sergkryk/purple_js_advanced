const pr = new Intl.PluralRules("ru-RU");

const secondPlural = new Map([
  ["one", "секунда"],
  ["few", "секунды"],
  ["many", "секунд"],
]);
const minutePlural = new Map([
  ["one", "минута"],
  ["few", "минуты"],
  ["many", "минут"],
]);
const hourPlural = new Map([
  ["one", "час"],
  ["few", "часа"],
  ["many", "часов"],
]);
const dayPlural = new Map([
  ["one", "день"],
  ["few", "дня"],
  ["many", "дней"],
]);
const monthPlural = new Map([
  ["one", "месяц"],
  ["few", "месяца"],
  ["many", "месяцев"],
]);
const yearPlural = new Map([
  ["one", "год"],
  ["few", "года"],
  ["many", "лет"],
]);

function formatPlural(num, plurals) {
  const rule = pr.select(num);
  const suffix = plurals.get(rule);
  return `${num} ${suffix}`;
}

// считаю часы и минуты до следующих суток
function getTimeUntillNextDay() {
  const now = new Date();
  const tommorow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );
  const diff = tommorow.getTime() - now.getTime();

  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${formatPlural(hours, hourPlural)} ${formatPlural(
    minutes,
    minutePlural
  )} ${formatPlural(seconds, secondPlural)}`;
}

// считаю года, месяца и дни до окончания таймера
function getDaysUntilDeadline(deadline) {
  const counter = {
    years: 0,
    months: 0,
    days: 0,
  };
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  // добавил один день т.к. часы и минуты до следующего дня считаю отдельно
  const currentDate = today.getDate() + 1;

  const deadlineYear = deadline.getFullYear();
  const deadlineMonth = deadline.getMonth();
  const deadlineDate = deadline.getDate();
  const daysInPrevToDeadlineMonth = new Date(
    deadlineYear,
    deadlineMonth,
    0
  ).getDate();

  counter.days = deadlineDate - currentDate;

  if (counter.days < 0) {
    counter.days = counter.days + daysInPrevToDeadlineMonth;
    counter.months = counter.months - 1;
  }

  counter.months = counter.months + (deadlineMonth - currentMonth);

  if (counter.months < 0) {
    counter.months = counter.months + 12;
    counter.years = counter.years - 1;
  }

  counter.years = counter.years + (deadlineYear - currentYear);

  return `${
    formatPlural(counter.years, yearPlural) === "0 лет"
      ? ""
      : formatPlural(counter.years, yearPlural)
  } ${
    formatPlural(counter.months, monthPlural) === "0 месяцев"
      ? ""
      : formatPlural(counter.months, monthPlural)
  } ${
    formatPlural(counter.days, dayPlural) === "0 дней"
      ? ""
      : formatPlural(counter.days, dayPlural)
  }`;
}

function renderCounterElement(deadline) {
  const p = document.createElement("p");
  const counterInterval = setInterval(() => {
    if (deadline.getTime() <= new Date().getTime()) {
      clearInterval(counterInterval);
      p.textContent = "Отсчёт закончен";
      return;
    }
    p.textContent = `${getDaysUntilDeadline(
      deadline
    )} ${getTimeUntillNextDay()}`;
  }, 1000);
  return p;
}

const form = document.querySelector("form");
const app = document.querySelector("#app");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const deadline = new Date(data.get("date"));
  if (deadline.getTime() <= new Date().getTime()) {
    alert("Установите дату больше текущей");
  } else {
    form.querySelector("button[type=submit]").setAttribute("disabled", true);
    form.querySelector("input[type=date]").setAttribute("disabled", true);
    const counter = renderCounterElement(deadline);
    app.appendChild(counter);
  }
});
