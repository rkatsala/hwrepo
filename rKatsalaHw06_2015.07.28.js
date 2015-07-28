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
  set: function(value) {
   this.speedometer = value;
   console.log(this.speedometer);
   return this;
  }
 },

 getSpeed: {
  get: function() {
   console.log(this.speedometer);
   return this;
  }
 },

 clearSpeed: {
  set: function() {
   this.speedometer = 0;
   console.log(this.speedometer)
   return this;
  }
 }
});

//car.setSpeed(200).setSpeed(300).getSpeed().clearSpeed();
car.setSpeed(200);