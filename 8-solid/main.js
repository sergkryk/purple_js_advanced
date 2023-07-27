/* Решил писать комментарии т.к. не совсем понял задание. Следую ТЗ
1. Спроектируйте класс Billing со свойством amount и методом calculateTotal для расчёта счёта.
*/
class Billing {
  #amount
  constructor(amount) {
    this.#amount = amount
  }

  get amount() {
    return this.#amount;
  }

  calculateTotal() {
    return this.amount;
  }
}
/* 
2. Сделайте разный calculateTotal для разных типов.
Что это значит? Каких типов? Как я понял нужно написать классы разных наследников класса Billing которые будут возвращать общую сумму в зависимости
от метода расчёта: почасовая оплата, оплата за каждую услугу или товар, фиксированная оплата.

Отсюда еще один вопрос. Зачем класс FixBilling если родитель и так может вернуть общую сумму. Не делаю такой класс и добавляю только классы
где можно получить оплату по часам и за каждую услугу / товар.
*/

class HourBilling extends Billing {
  constructor(pricePerHour, hours) {
    super(pricePerHour)
    this.hours = hours;
  }

  calculateTotal() {
    return this.amount * this.hours;
  }

}

class ItemBilling extends Billing {
  constructor(pricePerItem, items) {
    super(pricePerItem)
    this.items = items;
  }

  calculateTotal() {
    return this.amount * this.items;
  }

}

const fixBill = new Billing(120);
console.log(fixBill.calculateTotal());

const hoursBill = new HourBilling(100, 20);
console.log(hoursBill.calculateTotal());

const itemsBill = new ItemBilling(15, 3);
console.log(itemsBill.calculateTotal());