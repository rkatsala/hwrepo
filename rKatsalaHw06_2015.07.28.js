/* ��������
 1) �������������� ��������� ������� �������� ���� car � ���������� speedometer = 0;
 2) �������������� ������ Object ������ �� ����� car ������� ������:
 setSpeedometer, �� ������� ��� speedometer (������)
 getSpeedometer, �� ������� ���� speedometer (������)
 clearSpeedometr, �� ����� ���� speedometer
 3) ������������ ��� ����� �����, ��� ����� ���� ������� ��������:
 car.setSpeed(200).setSpeed(300).getSpeed().clearSpeed() // ����������� ������
 */

var car = {
 speedometer: 0
};

Object.defineProperties(car, {
 setSpeed: {
  value: function(value) {
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
   this.speedometer = 0;
   //console.log(this.speedometer)
   return this;
  },
  enumerable: true
 }
});

car.setSpeed(200).setSpeed(300).getSpeed().clearSpeed();
console.dir(car);