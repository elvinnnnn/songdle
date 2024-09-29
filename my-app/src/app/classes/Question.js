export default class Question {
  constructor(name) {
    this._solved = false;
    this._lives = 3;
    this._alive = true;
    this._name = name;
    this._input = "";
    this._border = "";
    this._showAnswer = false;
  }

  get showAnswer() {
    return this._showAnswer;
  }

  get lives() {
    return this._lives;
  }

  get solved() {
    return this._solved;
  }

  get name() {
    return this._name;
  }

  get alive() {
    return this._alive;
  }

  get border() {
    return this._border;
  }

  set border(value) {
    this._border = value;
  }

  set solved(value) {
    this._solved = value;
  }

  get input() {
    return this._input;
  }

  set input(value) {
    this._input = value;
  }

  set showAnswer(value) {
    this._showAnswer = value;
  }

  removeLife() {
    this._lives -= 1;
    if (this._lives == 0) {
      this._alive = false;
    }
  }
}
