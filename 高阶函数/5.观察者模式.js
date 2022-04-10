class Subject {
  constructor(name) {
    this.name = name;
    this.state = 'Happy';
    this.observers = [];
  }
  attach(o) {
    this.observers.push(o);
  }
  setState(newState) {
    this.state = newState;
    this.observers.forEach((o) => o.update(this.name, newState));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  update(name, state) {
    console.log(name, state);
  }
}

let s = new Subject('Baby');
let o1 = new Observer('Dad');
let o2 = new Observer('Mum');
s.attach(o1);
s.attach(o2);
s.setState('Sad');
