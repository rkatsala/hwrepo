/* ЗАВДАННЯ
 1) Використовуючи літеральну нотацію створити обєкт car з властивістю speedometer = 0;
 2) Використовуючи методи Object додати до обєкту car наступні методи:
 setSpeedometer, що оновлює дані speedometer (сеттер)
 getSpeedometer, що повертає вміст speedometer (геттер)
 clearSpeedometr, що очищує вміст speedometer
 3) Модифікувати код таким чином, щоб можна було зробити наступне:
 car.setSpeed(200).setSpeed(300).getSpeed().clearSpeed() // Ланцюжковий виклик
 */

var car = {
 speedometer: 0
};

Object.defineProperties(car, {
 setSpeed: {
  value: function(value) {
   if (isNaN(value)) {
    throw new Error("Введено недопустиме значення!");
   }
   if (value < 0) {
    throw new Error("Введено від'ємне значення!");
   }
   if (value > 320) {
    throw new Error("Введено занадто велике значення!");
   }

   this.speedometer = value;
   //console.log(this.speedometer);
   return this;
  },
  enumerable: true
 },

 getSpeed: {
  value: function() {
   console.log(this.speedometer);
   return this;
  },
  enumerable: true
 },

 clearSpeed: {
  value: function() {
   this.speedometer = null;
   //console.log(this.speedometer)
   return this;
  },
  enumerable: true
 }
});

car.setSpeed(200).setSpeed(300).getSpeed().clearSpeed();
console.dir(car);

car.setSpeed(150).getSpeed();