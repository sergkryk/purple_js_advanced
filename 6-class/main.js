class Car {
  #make;
  #model;
  #run;

  constructor(make, model, run) {
    this.#make = make;
    this.#model = model;
    this.#run = run;
  }

  get run() {
    return this.#run;
  }

  set run(distance) {
    this.#run = distance;
  }

  info() {
    console.log(
      `Марка автомобиля ${this.#make}, модель ${
        this.#model
      }, текущий пробег равен ${this.run} километров.`
    );
  }
}

const car1 = new Car("Toyota", "Auris", "127544");

car1.run = "127555";

car1.info();
