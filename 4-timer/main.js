// честно украденная функция из интернета для склонения в русском языке
normalizeСountForm = (number, words_arr) => {
  number = Math.abs(number);
  if (Number.isInteger(number)) {
    let options = [2, 0, 1, 1, 1, 2];
    const result =
      words_arr[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : options[number % 10 < 5 ? number % 10 : 5]
      ];
    return `${number} ${result}`;
  }
  return `${number} ${words_arr[1]}`;
};

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

  const normalizedHours =
    hours === 0
      ? ""
      : normalizeСountForm(hours, ["час", "часа", "часов"]);
  const normalizedMinutes =
    minutes === 0
      ? ""
      : normalizeСountForm(minutes, ["минута", "минуты", "минут"]);
  const normalizedSeconds =
    seconds === 0
      ? "0 секунд"
      : normalizeСountForm(seconds, ["секунда", "секунды", "секунд"]);

  return `${normalizedHours} ${normalizedMinutes} ${normalizedSeconds}`;
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

  const normalizedYears =
    counter.years === 0
      ? ""
      : normalizeСountForm(counter.years, ["год", "года", "лет"]);
  const normalizedMonths =
    counter.months === 0
      ? ""
      : normalizeСountForm(counter.months, ["месяц", "месяца", "месяцев"]);
  const normalizedDays =
    counter.days === 0
      ? ""
      : normalizeСountForm(counter.days, ["день", "дня", "дней"]);

  return `${normalizedYears} ${normalizedMonths} ${normalizedDays}`;
}

function renderCounterElement(deadline) {
  const p = document.createElement("p");
  const counterInterval = setInterval(() => {
    if (deadline.getTime() <= new Date().getTime()) {
      clearInterval(counterInterval);
      p.textContent = "Отсчёт закончен";
      return;
    }
    p.textContent = `${getDaysUntilDeadline(deadline)} ${getTimeUntillNextDay()}`;
  }, 1000);
  return p;
}

const form = document.querySelector("form");
const app = document.querySelector("#app");

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const data = new FormData(form);
  const formData = {};
  for (const [key, value] of data) {
    formData[key] = value;
  }
  const [year, month, date] = formData?.date.split("-");
  const deadline = new Date(year, Number(month) - 1, date);
  if (deadline.getTime() <= new Date().getTime()) {
    alert("Установите дату больше текущей")
  } else {
    form.querySelector('button[type=submit]').setAttribute("disabled", true)
    form.querySelector('input[type=date]').setAttribute("disabled", true)
    const counter = renderCounterElement(deadline);
    app.appendChild(counter);
  }
});
