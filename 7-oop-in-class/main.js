class Char {
  constructor(race, name, lang) {
    this.race = race;
    this.name = name;
    this.lang = lang;
  }

  say() {
    console.log(this.lang);
  }
}

class Ork extends Char {
  constructor(weapon, race, name, lang) {
    super(race, name, lang);
    this.weapon = weapon;
  }

  say() {
    console.log(`I am ${this.race}. My name is ${this.name}.`);
  }

  strike() {
    console.log(`I strike with ${this.weapon}`);
  }
}

class Elf extends Char {
  constructor(spell, race, name, lang) {
    super(race, name, lang);
    this.spell = spell;
  }

  say() {
    console.log(`How dare you speak with me! I am ${this.race}.`);
  }

  createSpell() {
    console.log(`I cast with ${this.spell} spell`);
  }
}

const ork = new Ork("axe", "ork", "Zughba", "orkish");

ork.say();
ork.strike();

const elf = new Elf("immortality", "elf", "Legolas", "elfish");

elf.say();
elf.createSpell();

