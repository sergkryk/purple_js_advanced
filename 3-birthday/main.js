function isAdult(personBirthday, minAge = 14) {
  const today = new Date();
  const [year, month, date] = personBirthday.split("-");
  const personIsAdultAt = new Date(Number(year) + minAge, Number(month) - 1, date);
  return today.getTime() > personIsAdultAt.getTime();
}

function isAdultV2(personBirthday, minAge = 14) {
  const [year, month, date] = personBirthday.split("-");
  const birthday = new Date(Number(year), Number(month) + 1, date);
  const diff = new Date().getTime() - birthday.getTime();
  return (new Date(diff).getUTCFullYear() - 1970) > minAge;
}

console.log(isAdult('2010-07-19'));
console.log(isAdult('2002-10-20'));
console.log(isAdult('1983-06-07'));

console.log('break');

console.log(isAdultV2('2010-07-19'));
console.log(isAdultV2('2002-02-20'));
console.log(isAdultV2('1983-06-07'));