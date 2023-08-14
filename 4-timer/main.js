const secondPlural = ["секунда", "секунды", "секунд"];
const minutePlural = ["минута", "минуты", "минут"];
const hourPlural = ["час", "часа", "часов"];
const dayPlural = ["день", "дня", "дней"];
const monthPlural = ["месяц", "месяца", "месяцев"];
const yearPlural = ["год", "года", "лет"];

const pluralRules = new Intl.PluralRules("ru-RU");

function formatPlural(num, plurals) {
  const [one, few, many] = plurals;
  const rule = pluralRules.select(num);
  const cases = {
    one,
    few,
    many,
  };
  if (rule in cases) {
    return `${num} ${cases[rule]}`;
  } else {
    return `${num} ${cases.one}`
  }
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
    counter.years === 0 ? "" : formatPlural(counter.years, yearPlural)
  } ${counter.months === 0 ? "" : formatPlural(counter.months, monthPlural)} ${
    counter.days === 0 ? "" : formatPlural(counter.days, dayPlural)
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
