/* ��������
 1) �������������� ��������� ������� �������� ���� car � ���������� speedometer = 0;
 2) �������������� ������ Object ������ �� ����� car �������� ������:
 setSpeedometer, �� ������� ���� speedometer (������)
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