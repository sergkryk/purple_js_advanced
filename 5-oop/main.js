function Char(race, name, lang) {
  // обращаюсь к неявному this которое создаст оператор new //
  this.race = race;
  this.name = name;
  this.lang = lang;
}

function Ork(weapon, race, name, lang) {
  // в данной реализации в метод call передаётся неявное this которое будет создано оператором new //
  Char.call(this, race, name, lang);
  // связываю прото Орка с прототипом Чара
  Object.setPrototypeOf(Ork.prototype, Char.prototype);
  // добавляю уникальные для орка свойства
  this.weapon = weapon;
}

function Elf(spell, race, name, lang) {
  // в данной реализации в метод call передаётся неявное this которое будет создано оператором new //
  Char.call(this, race, name, lang);
  // связываю прото Ельфа с прототипом Чара
  Object.setPrototypeOf(Elf.prototype, Char.prototype);
  // добавляю уникальные для ельфа свойства
  this.spell = spell;
}

// набор базовых методов для Чара, которые будут доступны всем наследникам
const charFactoryFunctions = {
  say() {
    console.log(this.lang);
  },
};
// набор уникальных методов для Орка
const orkFactoryFunctions = {
  strike() {
    console.log(`I strike with ${this.weapon}`);
  },
};
// набор уникальных методов для Ельфа
const elfFactoryFunctions = {
  createSpell() {
    console.log(`I cast with ${this.spell} spell`);
  },
};

// добавляю в прототип Чара набор базовых методов
Object.assign(Char.prototype, charFactoryFunctions);
// добавляю в прототип Орка набор уникальных методов
Object.assign(Ork.prototype, orkFactoryFunctions);
// добавляю в прототип Ельфа набор уникальных методов
Object.assign(Elf.prototype, elfFactoryFunctions);

const ork = new Ork("axe", "ork", "Zughba", "orkish");

ork.strike();
ork.say();

const elf = new Elf("immortality", "elf", "Legolas", "elfish");

elf.createSpell();
elf.say();

console.log(elf);
console.log(ork);
