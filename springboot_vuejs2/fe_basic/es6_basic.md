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

### 화살표 함수