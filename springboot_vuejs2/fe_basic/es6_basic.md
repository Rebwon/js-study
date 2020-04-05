## ES6 Basic

### 블록 스코프, let, const

ES6에서 변수를 정의하는 데 let을 사용할 수 있고, 상수를 정의하는 데는 const를 사용할 수 있으며, 이들은 블록 레벨의 스코프를 가진다. 그리고 같은 스코프에서는 let을 사용해 변수를 재정의할 수 없다. let 또는 const에는 변수 호이스팅이 적용되지 않기 때문에 선언 이전에 let 또는 const로 정의된 변수 또는 상수에 접근할 수 없다.

```
function workout() {
  let gym = 'Gym A';    // workout 스코프

  const gymStatuses = {'Gym A': 'open', 'Gym B': 'open', 'Gym C': 'closed'};
  for (let gym in gymStatuses) {    // let gym은 for문 안에 스코프
    console.log(gym + ' is ' + gymStatuses[gym]);
  }

  {
    const gym = 'Gym B';    // {} 블록 안에 스코프
    console.log('Workout in ' + gym);
    // The following will throw TypeError
    // gym = 'Gym C';   // 스코프 안에서 재정의할 수 없으므로 에러.
  }

  console.log('Workout in ' + gym); // workout 스코프.

  {
    function gym () {   // {} 블록 안에 스코프
      console.log('Workout in a separate gym');
    }
    gym();
  }

  if (gymStatuses[gym] == 'open') {
    // if 안에 스코프
    let exercises = ['Treadmill', 'Pushup', 'Spinning'];
  }
  // exercises are no longer accessible here
  // console.log(exercises);    // if 안에 스코프 변수를 참조하려 했으므로 에러.

  try {
    // try 스코프
    let gym = 'Gym C'; 
    console.log('Workout in ' + gym);   
    throw new Error('Gym is closed');
  } catch (err) {
    console.log(err);
    // catch 스코프
    let gym = 'Gym D';
    console.log('Workout in ' + gym);   
  }
}
workout();
```

### 클래스

ES2015는 프로토타입 기반의 상속이 아닌 기본으로 문법적으로 간단한 클래스를 도입했다. 클래스 구문으로 생성자를 생성하고 상위 클래스로부터 확장하고 정적 메서드를 생성할 수 있으며, 게터와 세터도 생성할 수 있다.

```
class User {
  constructor(name, interests) {
    this.name = name;
    this.interests = interests;
  }
  greeting () {
    console.log('Hi, I\'m ' + this.name + '.');
  }
  get interestsCount () {
    return this.interests ? this.interests.length : 0;
  }
}
```

```
class TeamMember extends User {
  constructor(name, interests) {
    super(name, interests);
    this._tasks = [];
    this._welcomeText = 'Welcome to the team!';
  }
  greeting () {
    console.log('I\' m ' + this.name + '. ' + this._welcomeText);
  }
  work () {
    console.log('I\' m working on ' + this._tasks.length + ' tasks.')
  }
  set tasks (tasks) {
    let acceptedTasks = [];
    if (tasks.length > TeamMember.maxTasksCapacity()) {
      acceptedTasks = tasks.slice(0, TeamMember.maxTasksCapacity());
      console.log('It\'s over max capacity. Can only take two.');
    } else {
      acceptedTasks = tasks;
    }    
    this._tasks = this._tasks.concat(acceptedTasks);
  }
  static maxTasksCapacity () {
    return 2;
  }
}

let member = new TeamMember('Sunny', ['Traveling']);
member.greeting();   // I' m Sunny. Welcome to the team!
member.tasks = ['Buy three tickets', 'Book a hotel', 'Rent a car'];
                     // It's over max capacity. Can only take two.
member.work();       // I' m working on 2 tasks.
console.log(member.interestsCount); // 1
member.interestsCount = 2;          // This won’t save the change
console.log(member.interestsCount); // 1


User.prototype.eat = function () {
  console.log('What will I have for lunch?');
};
member.eat();  // What will I have for lunch?


User.sleep = function () {
  console.log('Go to sleep');
};
member.sleep();  // Uncaught TypeError: member.sleep is not a function
User.sleep();    // Go to sleep

console.log(User.prototype.hasOwnProperty('eat'));  // true
console.log(User.hasOwnProperty('eat'));            // true
```

### 강화된 객체 리터럴

ES6에서 객체 리터럴은 프로토타입 설정, 프로퍼티 축약 표현(프로퍼티의 값으로 변수를 사용하는 경우에 프로퍼티 이름을 생략할 수 있으며, 프로퍼티 이름은 변수의 이름으로 자동 생성됨), 메서드 축약 표현(function 키워드 생략), super 호출, 표현식을 이용한 프로퍼티 계산 기능(객체의 프로퍼티 이름을 표현식으로 지정할 수 있고 대괄호 안에 표현식을 쓴다)을 지원한다.

```
const advice = 'Stay hungry. Stay foolish.';

let advisor = {
  __proto__: new TeamMember('Adam', ['Consulting']), // 프로토타입 설정
  advice,                                            // 프로퍼티 축약 표현
  greeting () {
    super.greeting();                                // super 메서드 호출
    console.log(this.advice); 
  },
  [advice.split('.')[0]]: 'Always learn more'        // 계산된 프로퍼티 이름
};


console.log(TeamMember.prototype.isPrototypeOf(advisor));  // true
console.log(advisor instanceof TeamMember);                // true
advisor.greeting();   // I' m Adam. Welcome to the team!
                      // Stay hungry. Stay foolish.
```

### 화살표 함수(Arrow Function)

ES6에서 소개된 화살표 함수는 => 구문을 사용한 함수 축약 표현이다. 화살표 함수는 본문이 표현식으로 구성된 것뿐만 아니라 명령문 블록으로 구성된 것도 지원한다. 표현식으로 구성된 본문을 이용할 때 함수가 반환할 값은 표현식의 결과가 된다.

화살표 구문은 함수 인자로 시작해 =>, 그다음 함수 본문의 순서다.

```
const fruits = [{name: 'Apple', price: 100}, {name: 'Orange', price: 80}, {name: 'Banana', price: 120}];

// 변형1
// 인자가 없을 때 빈 괄호 세트()가 필요하다
var countFruits = () => fruits.length;
// ES5 코드
var countFruits = function () {
  return fruits.length;
}; 

// 변형2
// 하나의 인자가 있을 때 괄호는 생략할 수 있다.
// 표현식의 값은 함수의 반환 값이다.
fruits.filter(fruit => fruit.price > 100);
// equivalent to ES5
fruits.filter(function(fruit) {
  return fruit.price > 100;
});

// 변형3
// 함수가 객체 리터럴을 반환할 때 괄호로 감싸야 한다.
var inventory = fruits.map(fruit => ({name: fruit.name, storage: 1}));
// equivalent to ES5
var inventory = fruits.map(function (fruit) {
  return {
    name: fruit.name,
    storage: 1
  };
});

// 변형4
// 화살표 함수가 구문들로 이뤄진 본문을 가지고 있고 결과를 반환해야 할 때 return 구문이 필요하다.
var inventory = fruits.map(fruit => {
  console.log('Checking ' + fruit.name + ' storage');
  return {name: fruit.name, storage: 1};
});
// ES5 코드
var inventory = fruits.map(function (fruit) {
  console.log('Checking ' + fruit.name + ' storage');
  return {name: fruit.name, storage: 1};
});

// 변형3에서 주의할 사항이다.
// 화살표 함수에 중괄호를 사용하면 함수 본문은 단일 또는 여러 명령문으로 구성돼야 한다.
var sum = (a, b) => { return a + b };
sum(1, 2);    // 3

var sum = (a, b) => { a + b };
sum(1, 2);   // undefined
// 표현식을 사용하면 동작한다.
var sum = (a, b) => a + b;
sum(1, 2);    // 3


// 자신만의 this를 가지지 않는다. 
// 화살표 함수는 자신만의 this를 가지지 않는다.
// 분리된 실행 컨텍스트를 생성하는 ES5의 함수와 달리 화살표 함수는
// 상위 스코프의 실행 컨텍스트를 사용한다.

var shoppingCart = {
  items: ['Apple', 'Orange'],
  inventory: {Apple: 1, Orange: 0},
  checkout () {
    this.items.forEach(item => {
      if (!this.inventory[item]) {
        console.log('Item ' + item + ' has sold out.');
      }      
    })    
  }
}
shoppingCart.checkout();

// ES5 코드
var shoppingCart = {
  items: ['Apple', 'Orange'],
  inventory: {Apple: 1, Orange: 0},
  checkout () {
    // 컨텍스트를 재할당하고 forEach에 전달한 콜백에서
    // 참조할 수 있도록 클로저를 활용한다.
    var that = this
    this.items.forEach(function(item) {
      if (!that.inventory[item]) {
        console.log('Item ' + item + ' has sold out.');
      }      
    })    
  }
}
shoppingCart.checkout();

// Function.call, Function.apply, Function.bind는 화살표 함수의 this에 영향을 주지 못한다.
// 왜냐면 화살표 함수는 언급했듯이 상위 스코프 실행 컨텍스트를 참조하기 때문이다.

var name = 'Unknown';
var greeting = () => {
  console.log('Hi, I\'m ' + this.name); 
};
greeting.call({name: 'Sunny'});    // I'm Unknown
greeting.apply({name: 'Tod'});     // I'm Unknown
var newGreeting = greeting.bind({name: 'James'});
newGreeting();                     // I'm Unknown

// ES5의 함수와 달리 화살표 함수는 자신만의 arguments 객체를 가지지 않는다.
// arguments 객체는 상위 스코프 함수의 arguments 객체를 가리킨다.

// 화살표 함수는 상위 스코프의 실행 컨텍스트를 참조하기 때문에 객체의 메서드를 정의하는 데 사용하는 것은 적합하지 않다.

var shoppingCart = {
  items: ['Apple', 'Orange'],
  inventory: {Apple: 1, Orange: 0},
  checkout: () => {
    // Uncaught TypeError: Cannot read property 'forEach' of undefined
    this.items.forEach(item => {
      if (!this.inventory[item]) {
        console.log('Item ' + item + ' has sold out.');
      }      
    })    
  }
}
shoppingCart.checkout();

// 프로토타입 객체를 이용해 객체 메서드를 정의할 때는 화살표 함수가 동작하지 않는다.

class User {
  constructor(name) {
    this.name = name;
  }
}
User.prototype.swim = () => {
  console.log(this.name + ' is swimming');
};
var user = new User();
console.log(user.swim());   //  is swimming


// 프로토타입 객체를 가지지 않는다.

const WorkoutPlan = () => {};
// Uncaught TypeError: WorkoutPlan is not a constructor
let workoutPlan = new WorkoutPlan(); 
console.log(WorkoutPlan.prototype);  // undefined
```

### 매개변수 기본값

ES6에서는 함수 매개변수의 기본값을 정의할 수 있다. ES5에서 동일하게 구현하려면 귀찮을 뿐만 아니라 코드의 가독성을 떨어뜨리기 때문에 이것은 상당히 유용한 개선사항이었다.

```
const shoppingCart = [];
function addToCart(item, size = 1) {
  shoppingCart.push({item: item, count: size});
}
addToCart('Apple');     // size is 1
addToCart('Orange', 2); // size is 2


// ES5 코드
function addToCart(item, size) {
  size = (typeof size !== 'undefined') ? size : 1;
  shoppingCart.push({item: item, count: size});
}
```

ES6의 매개변수 기본값을 활용하면 코드의 가독성을 향상시키고 코드를 더 쉽게 유지보수할 수 있다.

### 나머지 매개변수

ES5에서는 함수 본문 내에서 함수의 매개변수들을 반복하는데 arguments 객체를 이용할 수 있다. ES6에서는 나머지 매개변수 구문으로 무한 개의 매개변수를 배열로 정의하는 데 사용할 수 있다.

```
// ES5에서 arguments 활용
function workout(exercise1) {
  var todos = Array.prototype.slice.call(arguments, workout.length);
  console.log('Start from ' + exercise1);
  console.log(todos.length + ' more to do');
}

// ES6에서 나머지 매개변수(todos) 활용
function workout(exercise1, ...todos) {
  console.log('Start from ' + exercise1);    // Start from Treadmill
  console.log(todos.length + ' more to do'); // 2 more to do
  console.log('Args length: ' + workout.length); // Args length: 1
}
workout('Treadmill', 'Pushup', 'Spinning');
```

### 전개 구문

ES6에서 3점 표기법(...)을 함수 선언 내에 사용하면 그것이 나머지 매개변수를 정의한다. 이 표기법을 배열에서 사용하면 배열의 요소들을 전개시킨다. 이 방법으로 배열의 각 요소를 함수에 전달할 수 있다. 또한 그것을 배열 리터럴 내에서도 사용할 수 있다.


```
let urgentTasks = ['Buy three tickets'];
let normalTasks = ['Book a hotel', 'Rent a car'];
let allTasks = [...urgentTasks, ...normalTasks]; // 전개 구문 활용

((first, second) => {
  console.log('Working on ' + first + ' and ' + second)
})(...allTasks); // 전개 구문 활용
```

전개 구문을 활용해 urgentTasks 배열과 normalTasks 배열을 확장한다. 아래에 ...allTasks에서는 전개 구문으로 allTasks 배열을 확장하고 함수의 인자로 각 요소를 전달한다.

### 비구조화 할당

ES6에서는 비구조화 할당으로 배열 내의 요소, 문자열 내의 문자, 객체 내의 프로퍼티를 분리하고 배열 리터럴, 객체 리터럴과 비슷한 구문을 이용해 구분된 변수들을 할당할 수 있다. 이를 변수 선언이나 변수 할당, 함수 매개변수 할당에 활용할 수 있다.

```
// 객체 비구조화

let user = {name: 'Sunny', interests: ['Traveling', 'Swimming']};
let {name, interests, tasks = []} = user;
console.log(name);       // Sunny
console.log(interests);  // ["Traveling", "Swimming"]
console.log(tasks);      // []

let {name: firstName} = user;
console.log(firstName)  // Sunny


// 배열 비구조화

let [first, second] = ['Traveling', 'Swimming', 'Shopping'];
console.log(first);   // Traveling
console.log(second);  // Swimming

// ,,으로 앞에 두개의 변수를 건너뛸 수 있다.
let [,,third, fourth = ''] = ['Traveling', 'Swimming', 'Shopping'];
console.log(third);   // Shopping
console.log(fourth);  // ''


// 중첩 비구조화

let user = {name: 'Sunny', interests: ['Traveling', 'Swimming']};
let {interests: [,second]} = user;
console.log(second);    // Swimming
console.log(interests); // ReferenceError


const fruits = [{name:'Apple', price:100},{name:'Orange', price:80}];
let [,{name:secondFruitName}] = fruits;
console.log(secondFruitName); // Orange


// 나머지 요소

let [first, ...others] = ['Traveling', 'Swimming', 'Shopping'];
console.log(others);   // ["Swimming", "Shopping"]

// other를 통해 배열의 요소를 복사했지만 이는 얇은 복제(배열만 따로 생성되고 복제된 배열의 요소는 기존 배열의 요소와 동일한 객체를 참조)일 뿐이다.

const fruits = [{name:'Apple', price:100},{name:'Orange', price:80}];
let [...myFruits] = fruits; // 비구조화 할당 구문으로 fruits 배열을 myFruits 배열로 복사했다.
console.log(myFruits[0].name);            // Apple
myFruits.push({name:'Banana', price:90});
console.log(myFruits.length);             // 3
console.log(fruits.length);               // 2
// 복사된 배열에 새로운 아이템을 추가하는 것은 원본 배열에 영향을 주지 않는다.

// 하지만 아래와 같이 복사된 배열에 프로퍼티 값을 변경하면 원본 배열 값도 변경된다.
myFruits[0].price = 110;
console.log(fruits[0].price);            // 110

// 함수 매개변수 비구조화

function workout({gym, todos}) {
  let [first] = todos;  // todos로 매개변수 비구조화를 했다.
  console.log('Start ' + first + ' in ' + gym);
}
// 따라서 값을 할당할 때, todos에 값이 포함되어 있지 않다면 TypeError가 발생한다.
let today = {gym: 'Gym A', todos: ['Treadmill']};
workout(today); // Start Treadmill in Gym A
workout()       // TypeError

// 위와 같은 에러를 막기 위해 기본값을 설정하는 방법도 있다.
function workout({gym = 'Gym A', todos=['Treadmill']} = {}) {
  let [first] = todos;
  console.log('Start ' + first + ' in ' + gym);
}
workout();  // Start Treadmill in Gym A

// 아래는 전체 매개변수 비구조화를 한 것이다.
function workout({gym, todos} = {}) {
  let [first] = todos;
  console.log('Start ' + first + ' in ' + gym);
}
workout();
```

### 템플릿 리터럴

템플릿 리터럴은 문자열 리터럴에 표현식을 포함하고 여러 라인을 지원하는 기능을 제공한다. 이 구문은 문자열을 묶는 데 작은따옴표나 큰따옴표 대신 역따옴표(`)를 사용한다.

```
let user = {
  name: 'Ted',
  greeting () {
    console.log(`Hello, I'm ${this.name}.`);
  }
};
user.greeting();  // Hello, I'm Ted.

let greeting = `Hello, I'm ${user.name}.
Welcome to the team!`;
console.log(greeting);

// 주의사항은 역따옴표 사용시 문자 내부 공백도 모두 출력된다.
let greeting = `Hello, I'm ${user.name}.
                Welcome to the team!`;
console.log(greeting); // Hello, I'm Ted.
                       //                Welcome to the team! 
```

### 프로미스(Promises)

프로미스는 자바스크립트에서 비동기 프로그래밍에 사용하는 콜백, 이벤트 이외에 선택할 수 있는 또 다른 기능이다.

```
// 콜백 버전
function getProjects(callback) {
  // 서버 API를 호출하는 데 setTimeOut 활용
  setTimeout(() => {
    callback([{id:1, name:'Project A'},{id:2, name:'Project B'}]);
  }, 100);
}

function getTasks(projects, callback) {  
  // 서버 API를 호출하는 데 setTimeOut 활용
  setTimeout(() => {
    // 구체적인 프로젝트 작업 반환
    callback([{id: 1, projectId: 1, title: 'Task A'}, 
              {id: 2, projectId: 2, title: 'Task B'}]);
  }, 100);    
}

function render({projects, tasks}) {
  console.log(`Render ${projects.length} projects and ${tasks.length} tasks`);
}

getProjects((projects) => {
  getTasks(projects, (tasks) => {
    render({projects, tasks});
  });
});

// 프로미스 버전
function getProjects() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([{id:1, name:'Project A'},{id:2, name:'Project B'}]);
    }, 100);
  });  
}

function getTasks(projects) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({projects, tasks:['Buy three tickets', 'Book a hotel']});
    }, 100);
  });
}

function render({projects, tasks}) {  
  console.log(`Render ${projects.length} projects and ${tasks.length} tasks`);
}

getProjects()
.then(getTasks)
.then(render)
.catch((error) => {
  console.log('Hanlding error', error);
});
```

프로미스는 다음 세 가지 상태 중 하나를 가진다.

- 대기(pending): 프로미스 초기 상태
- 이행(fulfilled): 작업을 성공적으로 완료했을 때의 상태
- 실패(rejected): 에러 또는 기타 이유로 작업을 성공적으로 완료하지 못했을 때의 상태