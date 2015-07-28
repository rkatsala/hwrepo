/* ЗАВДАННЯ
 Розробити функцію (аналог Math), яка б виконувала прості математичні операції (додавання, віднімання, множення, ділення), а попередній обрахований результат кешувала (меморизація, мемойз, memoization)
 */

//alert("Вивід дивіться в консолі.")

// Створимо функцію-обгортку в замиканні якої буде зберігатися кеш.
// При цьому, у кожної обгорнутої функції буде свій кеш.
function memoize(f) {
    var cache = {};

    function self() {
        var key = [].join.call(arguments, ',');

        if (key in cache) {
            return cache[key];
        }

        return cache[key] = f.apply(this, arguments);
    }

    // Властивість, що посилається на кеш
    self.cache = cache;

    // Метод, що виводить кеш в консоль
    self.showCache = function() {
        console.dir(cache);
    }

    // Метод, який повертає n останніх результатів
    self.lastResults = function(n) {
        n = n || 3;
        var results = [];
        for (var key in cache) {
            results.push(cache[key]);
        }

        return results.slice(-n);
    }

    return self;
}


// Функція (аналог Math), кожний з методів якої обгорнутий функцією memoize
function myMath() {
    var str = "Функція, котра є дещо скороченим аналогом об'єкту Math.\n\n"
        + "Містить в собі наступні методи:\n"
        + "  sum - повертає сумму аргументів;\n"
        + "  sub - повертає різницю першого й наступних аргументів;\n"
        + "  mul - повертає добуток аргументів;\n"
        + "  div - повертає частку першого й наступних аргументів;\n"
        + "  min - повертає найменший з аргументів;\n"
        + "  max - повертає найбільший з аргументів;\n"
        + "  pow - повертає перший аргумент в степені другого аргументу;\n"
        + "  sin - повертає синус першого аргументу;\n"
        + "  cos - повертає косинус першого аргументу;\n"
        + "  tan - повертає тангенс першого аргументу.\n\n"
        + "Також має наступні властивості:\n"
        + "  PI - математична константа " + String.fromCharCode(0x03C0) + ";\n"
        + "  SQRT2 - математична константа корінь квадратний із 2.\n"

    console.log(str);
};
// Тут функцію myMath можна задати також як об'єкт
// myMath = {};


// Додавання
myMath.sum = memoize( function() {
    var result = arguments[0];

    for (var i = 1; i < arguments.length; i++) {
        result += arguments[i];
    }

    return result;
} );

// Віднімання (від першого аргументу віднімаються всі інші)
myMath.sub = memoize( function() {
    var result = arguments[0];

    for (var i = 1; i < arguments.length; i++) {
        result -= arguments[i];
    }

    return result;
} );

// Множення
myMath.mul = memoize( function() {
    var result = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        result *= arguments[i];
    }

    return result;
} );

// Ділення (перший аргумент ділиться на другий, результат на третій і т. д.)
myMath.div = memoize( function() {
    var result = arguments[0];

    for (var i = 1; i < arguments.length; i++) {
        result /= arguments[i];
    }

    return result;
} );


// Мінімальний з аргументів
myMath.min = memoize( function() {
    var result = arguments[0];

    for (var i = 1; i < arguments.length; i++) {
        if (result > arguments[i]) result = arguments[i];
    }

    return result;
} );

// Мінімальний з аргументів
myMath.max = memoize( function() {
    var result = arguments[0];

    for (var i = 1; i < arguments.length; i++) {
        if (result < arguments[i]) result = arguments[i];
    }

    return result;
} );


// Константа PI
myMath.PI = 3.141592653589793;

// Константа корінь квадратний із 2
myMath.SQRT2 = 1.4142135623730951;


// Степінь (підносить x в степінь n, n - ціле)
myMath.pow = memoize( function self(x, n) {
    if (n % 1 != 0) return NaN;
    if (n == 0 && x == 0) return NaN;
    if (n == 0 && x != 0) return 1;
    if (n < 0) return 1 / self(x, -n);

    var result = x;

    for (var i = 1; i < n; i++) {
        result *= x;
    }

    return result;
} );


// Синус
// Використовується розвинення цієї функції в степеневий ряд Тейлора
// в околі точки PI/4.
// Обчислення проводяться за допомогою схеми Горнера.
myMath.sin = memoize( function(x) {
    var sign = 1; // знак результату

    // Приводимо x до проміжку [0, 2 * PI]
    while (x < 0) x += 2 * this.PI;
    while (x >= 2 * this.PI) x -= 2 * this.PI;

    // Приводимо x до проміжку [0, PI/2]
    if (x > this.PI / 2 && x <= this.PI) {
        x = this.PI - x;
    } else if (x > this.PI && x <= 3 * this.PI / 2) {
        x = x - this.PI;
        sign = -1;
    } else if (x > 3 * this.PI / 2 && x <= 2 * this.PI) {
        x = 2 * this.PI - x;
        sign = -1;
    };

    // Рахуємо...
    var result = 0;
    var xt = x - this.PI / 4;

    for (var i = 32; i > 0; i--) {
        result = 1 + this.pow(-1, i - 1) * xt / i * result;
    }

    return sign * this.SQRT2 / 2 * result;
});


// Косинус
// Використовується розвинення цієї функції в степеневий ряд Тейлора
// в околі точки PI/4.
// Обчислення проводяться за допомогою схеми Горнера.
myMath.cos = memoize( function(x) {
    var sign = 1; // знак результату

    // Приводимо x до проміжку [0, 2 * PI]
    while (x < 0) x += 2 * this.PI;
    while (x >= 2 * this.PI) x -= 2 * this.PI;

    // Приводимо x до проміжку [0, PI/2]
    if (x > this.PI / 2 && x <= this.PI) {
        x = this.PI - x;
        sign = -1;
    } else if (x > this.PI && x <= 3 * this.PI / 2) {
        x = x - this.PI;
        sign = -1;
    } else if (x > 3 * this.PI / 2 && x <= 2 * this.PI) {
        x = 2 * this.PI - x;
    };

    // Рахуємо...
    var result = 0;
    var xt = x - this.PI / 4;

    for (var i = 32; i > 0; i--) {
        result = 1 + this.pow(-1, i) * xt / i * result;
    }

    return sign * this.SQRT2 / 2 * result;
} );


// Тангенс
// Використовується розвинення цієї функції в ланцюговий дріб Тіле
// в околі точки PI/4.
// Обчислення проводяться за допомогою оберненого рекурентного алгоритму.
myMath.tan = memoize( function(x) {
    var sign = 1; // знак результату

    // Приводимо x до проміжку (-PI/2, PI/2]
    while (x <= -this.PI / 2) x += this.PI;
    while (x > this.PI / 2) x -= this.PI;

    if (x == this.PI / 2) return NaN;

    // Приводимо x до проміжку [0, PI/2)
    if (x < 0) {
        x = -x;
        sign = -1;
    };

    // Рахуємо...
    var result = 0;
    var xt = x - this.PI / 4;

    for (var i = 32; i > 0; i--) {
        if (i % 2 == 0) {
            result = xt / (this.pow(-1, (i / 2) - (i / 2) % 1) * 2 + result);
        } else {
            result = xt / (i / 2 + result)
        };
    };

    return sign * (1 + result);
} );



myMath();

console.log("########## Приклади використання ##########");

console.log("========== sum ==========");

console.log(myMath.sum(1, 2));
console.log(myMath.sum(1, 2, 3));
console.log(myMath.sum(1, 2, 4, 8));
console.log(myMath.sum(1, 2, 4, 8));
console.log(myMath.sum(1, 2, 4, 82.2, -54.7));
console.log(myMath.sum(1, 2, 31, 2, 2, 4, 8));

console.log(myMath.sum.cache);
myMath.sum.showCache();
console.log(myMath.sum.lastResults(5));

console.log("========== sub ==========");

console.log(myMath.sub(1, 2));
console.log(myMath.sub(1, 2, 3));
console.log(myMath.sub(1, 2, 4, 8));
console.log(myMath.sub(1, 2, 4, 8));
console.log(myMath.sub(1, 2, 4, 82.2, -54.7));
console.log(myMath.sub(1, 2, 31, 2, 2, 4, 8));

console.log(myMath.sub.cache);
myMath.sub.showCache();
console.log(myMath.sub.lastResults(5));

console.log("========== mul ==========");

console.log(myMath.mul(1, 2));
console.log(myMath.mul(1, 2, 3));
console.log(myMath.mul(1, 2, 4, 8));
console.log(myMath.mul(1, 2, 4, 8));
console.log(myMath.mul(1, 2, 4, 82.2, -54.7));
console.log(myMath.mul(1, 2, 31, 2, 2, 4, 8));

console.log(myMath.mul.cache);
myMath.mul.showCache();
console.log(myMath.mul.lastResults(5));

console.log("========== div ==========");

console.log(myMath.div(1, 2));
console.log(myMath.div(1, 2, 3));
console.log(myMath.div(1, 2, 4, 8));
console.log(myMath.div(1, 2, 4, 8));
console.log(myMath.div(1, 2, 4, 82.2, -54.7));
console.log(myMath.div(1, 2, 31, 2, 2, 4, 8));

console.log(myMath.div.cache);
myMath.div.showCache();
console.log(myMath.div.lastResults(5));

console.log("========== min ==========");
console.log(Math.min(1,2,3,4,5) == myMath.min(1,2,3,4,5));
console.log(Math.min(-1,2,-3,4,-5) == myMath.min(-1,2,-3,4,-5));

console.log(myMath.min.cache);
myMath.min.showCache();
console.log(myMath.min.lastResults(5));

console.log("========== max ==========");
console.log(Math.max(1,2,3,4,5) == myMath.max(1,2,3,4,5));
console.log(Math.max(-1,2,-3,4,-5) == myMath.max(-1,2,-3,4,-5));

console.log(myMath.max.cache);
myMath.max.showCache();
console.log(myMath.max.lastResults(5));

console.log("========== pow ==========");
console.log(Math.pow(2, 2) - myMath.pow(2, 2));
console.log(Math.pow(10.5, 20) - myMath.pow(10.5, 20));
console.log(Math.pow(2, -6) - myMath.pow(2, -6));
console.log(Math.pow(-3.5, -4) - myMath.pow(-3.5, -4));
console.log(Math.pow(3, 4.5));
console.log(Math.pow(0, 0));
console.log(Math.pow(13, 0));

console.log(myMath.pow.cache);
myMath.pow.showCache();
console.log(myMath.pow.lastResults(5));

console.log("========== sin ==========");
console.log(Math.sin(0) - myMath.sin(0));
console.log(Math.sin(0.3) - myMath.sin(0.3));
console.log(Math.sin(0.4) - myMath.sin(0.4));
console.log(Math.sin(0.5) - myMath.sin(0.5));
console.log(Math.sin(-0.5) - myMath.sin(-0.5));
console.log(Math.sin(2.5) - myMath.sin(2.5));
console.log(Math.sin(4.5) - myMath.sin(4.5));
console.log(Math.sin(5.5) - myMath.sin(5.5));
console.log(Math.sin(10.5) - myMath.sin(10.5));
console.log(Math.sin(-20.5) - myMath.sin(-20.5));

console.log(myMath.sin.cache);
myMath.sin.showCache();
console.log(myMath.sin.lastResults(5));

console.log("========== cos ==========");
console.log(Math.cos(0) - myMath.cos(0));
console.log(Math.cos(0.3) - myMath.cos(0.3));
console.log(Math.cos(0.4) - myMath.cos(0.4));
console.log(Math.cos(0.5) - myMath.cos(0.5));
console.log(Math.cos(-0.5) - myMath.cos(-0.5));
console.log(Math.cos(2.5) - myMath.cos(2.5));
console.log(Math.cos(4.5) - myMath.cos(4.5));
console.log(Math.cos(5.5) - myMath.cos(5.5));
console.log(Math.cos(10.5) - myMath.cos(10.5));
console.log(Math.cos(-20.5) - myMath.cos(-20.5));

console.log(myMath.cos.cache);
myMath.cos.showCache();
console.log(myMath.cos.lastResults(5));

console.log("========== tan ==========");
console.log(Math.tan(0) - myMath.tan(0));
console.log(Math.tan(0.3) - myMath.tan(0.3));
console.log(Math.tan(0.4) - myMath.tan(0.4));
console.log(Math.tan(0.5) - myMath.tan(0.5));
console.log(Math.tan(1) - myMath.tan(1));
console.log(Math.tan(1.5) - myMath.tan(1.5));
console.log(Math.tan(1.57) - myMath.tan(1.57));
console.log(Math.tan(-0.3) - myMath.tan(-0.3));
console.log(Math.tan(-10.4) - myMath.tan(-10.4));
console.log(Math.tan(32.2) - myMath.tan(32.2));
console.log(Math.tan(13) - myMath.tan(13));
console.log(Math.tan(-1.5) - myMath.tan(-1.5));
console.log(Math.tan(-1.57) - myMath.tan(-1.57));

console.log(myMath.tan.cache);
myMath.tan.showCache();
console.log(myMath.tan.lastResults(5));
