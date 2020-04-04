## FE Basic for JavaScript

프런트엔드 개발 사이클

Vue.js 2, BootStrap 4를 사용하고, ES2015로 알려진 ES6으로 프런트엔드를 작성하고 그것을 바벨을 활용해
ES5 코드로 컴파일한다. ESLint를 활용해 작성한 js 코드가 정의된 모든 규칙을 준수하는지 확인하고 플로(flow.org)를 활용해 정적 타입을 검사한다. 제스트를 사용해 단위 테스트를 작성하고 나이트워치를 이용해 엔드 투 엔드 테스트 케이스를 실행한다. 웹팩 4를 활용해 모든 의존성을 묶고 npm을 이용해 패키지를 관리한다.

### 함수와 메서드

자바스크립트에서 함수는 실제로 자바스크립트 내장 객체인 Function 생성자로 생성된 객체이기 때문에 자바의 메서드와는 매우 다르다. Function 자체가 또한 하나의 객체다. 그렇다면 자바스크립트에서 메서드란 무엇일까? 함수가 객체의 프로퍼티일 때 메서드라고 부른다. 따라서 자바스크립트에서 메서드는 함수지만, 모든 함수가 메서드는 아니다.

함수는 객체이므로 프로퍼티와 메서드를 가질 수 있다. 이 객체가 함수인지 아닌지 다음의 instanceof 명령어로 확인할 수 있다.

```
함수 표현식
var workout = function () {} ;
console.log(workout instanceof Function) // true 출력
```

Function 생성자에 의해 생성된다는 사실을 제외하고 자바스크립트에서 함수와 다른 객체 간의 차이점은 무엇일까? 우선 함수는 호출할 수 있지만 다른 객체는 호출할 수 없다. 또 다른 점은 함수는 프로토타입 프로퍼티를 가지지만 다른 객체는 그렇지 않다.

자바스크립트에서 객체를 생성하는 데는 함수를 new와 함께 사용한다. 여기서 함수는 생성자 역할을 한다. 규약에 따라 함수가 생성자의 역할을 하는 경우 대문자로 시작해야 한다. 

```
함수 선언
function User () {
}
var user = new User();
```

### 객체와 클래스

자바스크립트에서 객체를 생성하는 방법은 다음과 같다.

- Object() 생성자
- 객체 리터럴
- 생성자 함수
- Object.create()
- 생성 함수
- ES6의 클래스 

Object 생성자를 이용한 방법

```
// new를 활용한 Object 생성자 호출
var user = new Object();
user.name = 'Sunny';
user.interests = ['Traveling', 'Swimming'];
user.greeting = function() {
    console.log('Hi, I\'m' + this.name + '.');
};
user.greeting(); // Hi I'm Sunny. 출력
```

Object 생성자는 객체 래퍼를 생성한다. 이 방법은 자바스크립트에서 활용할 수 있지만 권장하지 않는다. 실제로는 코드가 간결한 객체 리터럴을 활용하는 것이 낫다.

객체 리터럴을 이용한 방법

```
// 객체 리터럴을 이용한 user 생성
var user = {
    name: 'Sunny',
    interests: ['Traveling', 'Swimming'],
    greeting: function() {
        console.log('Hi, I\'m' + this.name + '.');
    }
}
user.greeting(); // Hi I'm Sunny. 출력
```

자바스크립트에서 객체 리터럴은 객체를 생성하기 위한 간결한 문법이며 new Object()를 이용하는 것보다 권장하는 방법이다. 다음에서 보다시피 ES5부터 객체 리터럴에서 게터와 세터를 지원한다.

```
var user = {
    get role() {
        return 'Engineer';
    }
}
user.role; // Engineer 출력
```

role에 값을 할당하려고 하면 role 프로퍼티의 세터가 없으므로 변경되지 않는다. (불변성)

생성자 함수를 이용하는 방법

```
// 생성자 함수 생성
function User(name, interests) {
    this.name = name;
    this.interests = interests;
    this.greeting = function() {
        console.log('Hi, I\'m' + this.name + '.');
    }
}
// user 객체를 생성하는 데 new를 활용해 생성자 함수 호출
var user = new User('Sunny', ['Traveling', 'Swimming']);
user.greeting(); // Hi I'm Sunny. 출력
```

위 문법은 자바 문법과 매우 유사하다. 자바스크립트는 매우 관대해서 생성자를 호출할 때 괄호를 생략할 수 있다. 하지만 다음에서 보다시피 생성자에 어떤 인자도 전달하지 않는다.

```
// 생성자 함수의 프로토타입
var user = new User;
console.log(user);   // undefined 출력
```

다시 말하지만, 생성자를 호출할 때 괄호를 생략하는 것은 자바스크립트에서 유효하지만 권장하지 않는다.

Object.create()를 이용하는 방법

```
// 위에서 생성한 User 생성자 함수의 프로토타입과 Object.create() 메서드 활용
var user = Object.create(User.prototype, {
    name: { value: 'Sunny' },
    interests: { value: ['Traveling', 'Swimming'] }
});
user.greeting();    // Uncaught TypeError: user.greeting() is not a function 출력
```

여기서 greeting()이 user 객체의 함수가 아닌 이유는 Object.create() 메서드가 생성자의 프로토타입 객체로 새로운 객체를 생성하기 때문이다. 그리고 greeting 함수는 User.prototype에 정의하지 않았고 Object.create()의 두 번째 인자에 전달되지 않았다. user.greeting()을 구현하려면 프로토타입 객체에 추가하거나 Object.create()에 두 번째 인자에 전달해야 한다.

프로토타입 객체에 추가하면 해당 생성자로 생성된 모든 객체는 greeting 함수를 가진다.

```
// 프로토타입 객체에 greeting 함수 추가
User.prototype.greeting = function() {
    console.log('Hi, I\'m' + this.name + '.');
}
user.greeting(); // Hi I'm Sunny. 출력
```

자바스크립트에서 상위 클래스가 하위 클래스에 상속할 메서드를 제공하는 방법으로 프로토타입을 이용한다.

생성 함수를 이용하는 방법

```
// 객체를 반환하는 생성 함수 사용
function createUser(name, interests) {
    var user = {};
    user.name = name;
    user.interests = interests;
    user.greeting() = function() {
        console.log('Hi, I\'m' + this.name + '.');
    };
    return user;
}

// 매개변수를 이용해 생성 함수 호출
var user = createUser('Sunny', ['Traveling', 'Swimming']);
user.greeting(); // Hi I'm Sunny. 출력
```

여기서 생성 함수는 자바에서 객체를 인스턴스화할 때 사용하는 정적 팩토리 메서드 방법과 유사한 하나의 팩토리 메서드이다. 이는 단지 생성 함수 내부에서 객체 생성의 세부사항을 감싸기 위한 하나의 패턴일 뿐이다.

ES6 클래스를 이용한 방법

```
class User{
    // User 생성자 함수와 상응함
    constructor(name, interests) {
        this.name = name;
        this.interests = interests;
    }
    // User.prototype.greeting과 같다.
    greeting() {
        console.log('Hi, I\'m' + this.name + '.')
    }
}

let user = new User('Sunny', ['Traveling', 'Swimming']);
user.greeting(); // Hi I'm Sunny. 출력
```

이는 자바의 문법과 매우 유사하다. 클래스 선언을 이용하는 대신, 다음과 같이 클래스 표현식을 이용해 클래스를 생성할 수도 있다.

```
// 클래스 표현식 활용
let User = class {
    constructor(name, interests) {
        this.name = name;
        this.interests = interests;
    }
    greeting() {
        console.log('Hi, I\'m' + this.name + '.')
    }
}
```

### 객체, 프로퍼티, 프로퍼티 속성

자바스크립트에서 객체는 논리적으로 프로퍼티의 집합이다. 프로퍼티는 String 타입의 이름과 속성 리스트를 가진다. 자바스크립트에서 속성은 프로퍼티의 상태를 정의하고 설명하는 데 사용된다. 프로퍼티에는 데이터 프로퍼티와 접근 프로퍼티, 두 가지 형태가 있다.

데이터 프로퍼티는 네 가지 속성을 가진다.

- value: 자바스크립트의 모든 자료형 가능.
- writable: 데이터 프로퍼티의 변경 가능 여부를 정의.
- enumerable: for-in 구문을 이용해 열거 가능 여부를 정의.
- configurable: 제거 가능 여부, 접근 프로퍼티 변경 여부, 쓰기 불가 여부, enumerable 속성의 수정 가능 여부를 정의

접근 프로퍼티는 네 가지 속성을 가진다.

- get 접근자: Function 객체 혹은 undefined 지정.
- set 접근자: Function 객체 혹은 undefined 지정.
- enumerable: for-in 구문을 이용해 열거 가능 여부를 정의.
- configurable: 제거 가능 여부, 데이터 프로퍼티 변경 가능 여부, 다른 속성들의 수정 가능 여부를 정의.

자바스크립트에서 Object.defineProperty 또는 Object.defineProperties를 사용해 객체의 프로퍼티를 수정할 수 있다.

```
function User(name, department) {
    var _department = department;
    var _name = name;
    Object.defineProperty(this, 'name', {
        value: _name,
        writable: true,
        enumerable: true,
        configurable: false
    });
    Object.defineProperty(this, 'department', {
        get: function() {
            console.log('Retrieving department');
            return _department;
        },
        set: function() {
            console.log('Updating department value to "' + newValue + '"');
            _department = newValue;
        },
        enumrable: true,
        configurable: true
    });
    Object.defineProperty(this, 'greeting', {
        value: function() {
            console.log('Hi, I\'m' + _name + '.');
        },
        enumerable: false,
        configurable: false
    });
}
```

### 프로토타입과 상속

자바스크립트에서 상속은 생성자 함수의 프로토타입을 활용한다. 자바스크립트에서 프로토타입은 다른 객체에 공유 프로퍼티를 제공하는 객체다. 그리고 함수 객체만 프로토타입을 가진다. 왜냐하면 함수 객체만이 호출이 가능하고 다른 객체를 생성할 수 있기 때문이다. ES6에서 화살표 함수는 프로토타입을 가지지 않는다.

함수는 공장으로, 프로토타입은 공장에서 생산된 제품의 명세로 간주할 수 있다. new 키워드로 함수를 호출할 때마다 해당 제품의 주문이 들어가고 공장은 프로토타입에 지정된 방식으로 생산한다.

```
// 생성자 함수로 User 클래스 생성
function User (name, interests) {
  this.name = name;
  this.interests = interests;
}

// 프로토타입을 활용해 메서드 생성
User.prototype.greeting = function () {
   console.log('Hi, I\'m ' + this.name + '.');
}

function TeamMember (name, interests, tasks) {
   // 자바의 super()와 유사하다, 다만 첫 인자로 this를 받아야 한다.
   User.call(this, name, interests);
   this.tasks = tasks;
}

TeamMember.prototype = Object.create(User.prototype);
TeamMember.prototype.greeting = function () {
  console.log('I\'m ' + this.name + '. Welcome to the team!');
};

// greeting() 외에 work 메서드 추가
TeamMember.prototype.work = function () {
  console.log('I\'m working on ' + this.tasks.length + ' tasks');
};

var member = new TeamMember('Sunny', ['Traveling'],
                            ['Buy three tickets','Book a hotel']);
member.greeting();  // I'm Sunny. Welcome to the team!
member.work();      // I'm working on 2 tasks

// member는 모든 상위 클래스의 하위 인스턴스다.
console.log(member instanceof TeamMember); // true
console.log(member instanceof User);       // true
console.log(member instanceof Object);     // true

// 도중에 eat 메서드 추가.
User.prototype.eat = function () {
  console.log('What will I have for lunch?');
};
member.eat();     // What will I have for lunch?         

// Object로 최상위 메서드 추가.
Object.prototype.move = function () {
  console.log('Every object can move now');
};

member.move();    // Every object can move now
var alien = {};
alien.move();     // Every object can move now
User.move();      // Even the constructor function
```

### 스코프와 클로저

스코프는 변수의 접근성에 관한 것이다. 자바에서는 기본으로 중괄호쌍({})을 이용해 클래스 레벨 스코프, 메서드 레벨 스코프, 블록 레벨 스코프 등의 스코프를 정의한다.

자바에서의 스코프 예제다.

```java
public class User {
    // 클래스 레벨 스코프(프로퍼티)
    private String name;
    private List<String> interests;

    public User (String name, List<String> interests) {
        this.name = name;
        this.interests = interests;
    }

    // user의 interests에 something을 가지고 있는지 확인
    public boolean isInterestedIn(String something) {
        // 메서드 레벨 스코프(지역변수)
        boolean interested = false;
        // for문의 i는 블록 레벨 스코프
        for (int i = 0; i < interests.size(); i++) {
            if (interests.get(i).equals(something)) {
                interested = true;
                break;
            }
        }
        return interested;
    }
}
```

자바스크립트에서는 변수의 스코프가 훨씬 더 유연하다. 전역 스코프와 함수 스코프, 그리고 ES6에서 도입된 let과 const 키워드를 이용하는 블록 스코프가 있다.

```
function bookHotel (city) {
  // 함수의 스코프(지역변수)
  var availableHotel = 'None';
  for (var i=0; i<hotels.length; i++) {
    var hotel = hotels[i];
    if (hotel.city === city && hotel.hasRoom) {
      availableHotel = hotel.name;
      break;
    }
  }

  // 여기서 i와 hotel은 여전히 접근 가능하다.
  console.log('Checked ' + (i+1) + ' record(s)'); // Checked 2 record(s)
  console.log('Last checked ' + hotel.name);      // Last checked Hotel B
  {
    // 함수 안에 중첩된 함수를 클로저라 부른다.
    // 함수를 아무리 깊게 중첩해도 부모 함수 스코프에 접근 가능하며, 전역 스코프인 최상위 스코프까지도 접근 가능하다.
    function placeOrder() {
      // 함수의 스코프(지역변수)
      var totalAmount = 200;
      console.log('Order placed to ' + availableHotel);
    }
  }
  placeOrder();
  // 접근 불가
  // console.log(totalAmount);
  return availableHotel;
}

// 전역 스코프이므로 변수가 함수보다 이후에 정의되어도 사용이 가능.
var hotels = [{name: 'Hotel A', hasRoom: false, city: 'Sanya'},
              {name: 'Hotel B', hasRoom: true, city: 'Sanya'}];
console.log(bookHotel('Sanya')); // Hotel B
// 접근 불가
// console.log(availableHotel);
```

### this 키워드

자바에서 this는 항상 현재 객체를 참조하지만, 자바스크립트에서는 현재 실행 컨텍스트를 참조하며, 이 실행 컨텍스트도 하나의 객체다. 

자바스크립트에서는 논리적으로 동작 중인 실행 컨텍스트로 구성된 실행 컨텍스트 스택이 존재한다. 하나의 실행 가능한 코드에서 다른 실행 가능한 코드로 이동할 때 제어권은 이 실행 가능한 코드를 담당할 새로운 실행 컨텍스트로 진입한다. 이 컨텍스트가 현재 실행 컨텍스트가 되거나 동작 중인 실행 컨텍스트를 참조한다. 스택의 맨 아랫부분에는 자바의 main 메서드와 유사한 모든 동작의 시작점인 전역 컨텍스트가 위치한다. 현재 실행 컨텍스트는 항상 스택의 가장 윗부분이 된다.

실행 가능한 코드란 무엇일까? 자바스크립트에는 세 가지 유형이 있다.

- 전역 코드: 자바스크립트 프로그램이 시작되는 곳부터 수행되는 코드다. 브라우저의 경우에는 window 객체가 존재한다. 그리고 브라우저 콘솔을 열고 var user = new User()를 입력하면 전역 코드를 작성한 것이다.
- Eval 코드: 내장된 eval() 함수의 인자로 전달되는 문자열 값이다(실행할 작업에 대해 정확히 모른다면 eval()함수를 사용하지 말아야 한다).
- 함수 코드: 함수의 본문 코드다. 하지만 함수 내부에 작성된 모든 코드가 함수 코드를 의미하지 않는다.

```
function User (name) {
    // User 함수의 함수코드이며, 함수 선언이다.
  console.log('I\'m in "' + this.constructor.name + '" context.');
  this.name = name;
  // Speak 함수의 함수코드이며, Speak는 함수 표현식이다.
  this.speak = function () {
    console.log(this.name + ' is speaking from "' +
      this.constructor.name + '" context.');
    // Speak 안에 있는 drink 함수는 함수 코드이며 함수 표현식이다.
    // 또한 Speak 함수 내부에서만 접근 가능하다.
    var drink = function () {
      console.log('Drinking in "' + this.constructor.name + '"');
    } 
    drink(); 
  }; 
  // ask함수의 함수 코드이며, 함수 선언이다.
  function ask() {
    console.log('Asking from "' + 
      this.constructor.name + '"   context.');
    console.log('Who am I? "'  + this.name + '"');
  }
  ask();
}
var name = 'Unknown';
var user = new User('Ted');
user.speak();

// 출력결과:
// I'm in "User" context.   -> 실행 컨텍스트가 전역에서 user로 변경.
// Asking from "Window"   context. -> 전역이기 때문에 Window 객체가 출력.
// Who am I? "Unknown"    -> 전역이기 때문에 Unknown 출력.
// Ted is speaking from "User" context. -> ask()를 빠져나와 전역 코드인 speak()을 호출하면서, name으로 Ted값을 받았기 때문에 Ted가 나오고, user 객체는 실행 컨텍스트가 되므로 User가 나온다.
// Drinking in "Window" // speak안에 있는 drink()를 실행할 때 다시 전역 컨텍스트가 실행 컨텍스트로 되므로 Window 객체가 출력.
```

실행 컨텍스트는 사실 객체이기 때문에 여기서 어떤 컨텍스트인지 확인하는 데 이 객체의 .constructor.name을 사용한다. 그리고 앞 코드를 node 명령줄에서 실행하면 Window 대신에 Object가 출력된다.

자바스크립트에서 스코프와 실행 컨텍스트는 다른 개념이다. 스코프는 접근성에 관한 것이지만, 실행 컨텍스트는 동작 중인 실행 가능한 코드의 **소유권**에 대한 것이다.

speak()와 ask()는 같은 스코프 안에 있지만, 서로 다른 실행 컨텍스트를 가진다.

아래에 세 가지 메서드는 모두 Function 객체에 의해 생성된 객체이다.

- call(): 리스트 형태의 인자를 전달받는다.
- apply(): 배열 형태의 인자를 전달받는다.
  - call과 apply는 첫 번째 인자를 함수 코드의 실행 컨텍스트로 사용한다.
- bind(): 함수가 가리키는 this만 바꾸고 호출하지는 않는다?

함수를 호출하는 방법은 다음과 같다.

- 생성자 함수 호출: new User()
- 직접 함수 호출: ask()
- 메서드 호출: user.speak()
- 컨텍스트 변경 호출: ask.call(this) 또는 ask.apply(this)

생성자 함수 호출은 함수 본문 내부의 this가 this가 다른 세 가지 유형의 함수 호출로 만들어진 인스턴스를 제외하고 생성자로 생성된 객체를 참조한다.

직접 함수 호출은 함수 본문 내부의 this가 다른 세 가지 유형의 함수 호출로 만들어진 인스턴스를 제외하고 전역 컨텍스트를 참조한다.

메서드 호출은 함수 본문 내부의 this가 다른 세 가지 유형의 함수 호출로 만들어진 인스턴스를 제외하고 메서드에 속한 객체를 참조한다.

컨텍스트 변경 호출은 함수 본문 내부의 this가 다른 세 가지 유형의 함수 호출로 만들어진 인스턴스를 제외하고 call() 메서드의 첫 번째 인자로 받은 객체를 참조한다.

### 호이스팅

호이스팅은 자바스크립트의 인터프리터가 함수 선언과 변수 선언들이 속해 있는 스코프의 최상단으로 끌어올리는 방법에 관한 일종의 비유다.

쉽게 엿같이 작성해도 찰떡같이 알아서 해준다?ㅋㅋ

```
travel = 'No Plan';
var travel;
console.log(travel);

function travel() {
    console.log('Traveling');
}
travel();
```

위와 같이 코드를 작성하면 자바스크립트 인터프리터는 아래와 같이 해석한다.

```
// 함수 선언을 최상위로 이동시킨다.
function travel() {
    console.log('Traveling');
}

// 변수 선언은 함수 선언 아래에 위치시킨다.
var travel;
travel = 'No Plan';

console.log(travel); // No Plan 출력
travel();           // Uncaught TypeError: travel is not a function 출력
```

var travel = function () {}과 같은 함수 표현식은 변수 선언이기도 하기 때문에 함수 선언처럼 최상위로 이동하지 않는다. --> 참 동작이 답답하다..ㅋㅋ

```
function workout() { 
  goToGym();    // 어떻게 출력될까? --> Workout in Gym B 출력.
  var goToGym = function () {
    console.log('Workout in Gym A');
  }
  return;    
  function goToGym() {
    console.log('Workout in Gym B');
  }
}
workout();


// 인터프리터는 이렇게 이해한다.
function workout() {
  function goToGym() {
    console.log('Workout in Gym B');
  }
  var goToGym;
  goToGym();
  goToGym = function () {
    console.log('Workout in Gym A');
  }
  return;
}
workout();
```

