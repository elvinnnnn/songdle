declare module "Question" {
  export interface Question {
    solved: boolean;
    lives: number;
    name: string;
    alive: boolean;
    border: string;
    input: string;
    showAnswer: boolean;
  }
}
