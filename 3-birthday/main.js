function isAdult(personBirthday, min_age = 14) {
  const today = new Date();
  const [year, month, date] = personBirthday.split("-");
  const personIsAdultAt = new Date(Number(year) + min_age, Number(month) - 1, date);
  return today.getTime() > personIsAdultAt.getTime();
}

console.log(isAdult('2020-10-20'));
console.log(isAdult('2002-10-20'));
console.log(isAdult('1983-06-07'));