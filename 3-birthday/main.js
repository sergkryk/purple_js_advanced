function isAdult(personBirthday, minAge = 14) {
  const today = new Date();
  const [year, month, date] = personBirthday.split("-");
  const personIsAdultAt = new Date(Number(year) + minAge, Number(month) - 1, date);
  return today.getTime() > personIsAdultAt.getTime();
}

console.log(isAdult('2009-07-24'));
console.log(isAdult('2009-07-25'));
console.log(isAdult('2009-07-26'));
