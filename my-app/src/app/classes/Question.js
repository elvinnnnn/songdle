export default class Question {
  solved = false;
  lives = 3;
  alive = true;
  constructor(answer) {
    this.answer = answer;
  }

  get lives() {
    return this.lives;
  }

  get solved() {
    return this.solved;
  }

  get answer() {
    return this.answer;
  }

  removeLife() {
    this.lives -= 1;
    if (this.lives == 0) {
      this.alive = false;
    }
  }
}
