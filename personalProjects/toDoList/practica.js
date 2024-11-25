const natalia = {
  name: 'Natalia',
  age: 18,
  classList: ['py', 'js'],
  addClass(newClass) {this.classList.push(newClass)},
  // tagName() {return this.name},
  tagName(newName) {this.tag = newName},
};

function Student(name, age, classList=[]) {
  this.name = name;
  this.age = age;
  this.classList = classList;
  
  // this.addClass = function(newClass) {
  //   this.classList.push(newClass);
  // }
}

Student.prototype.addClass = function(newClass) {
  this.classList.push(newClass);
}

Object.defineProperty(Student.prototype, 'algo', {
  get: function() {return this.tagName},
  set: function(newValue) {this.tagName = newValue},
});

const ever = new Student('Ever L', 33, ['html', 'css']);

natalia.addClass('html');
ever.addClass('js');

