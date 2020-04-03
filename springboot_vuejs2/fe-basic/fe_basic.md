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

