function myLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const myLoc = myLocation()
  .then((data) => console.log("Мои координаты", data))
  .catch((error) => console.log("Произошла ошибка", error));
