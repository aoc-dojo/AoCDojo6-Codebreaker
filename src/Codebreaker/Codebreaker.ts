import Codemaker from "../Codemaker/Codemaker"

export default class Codebreaker {

  private codemaker: Codemaker;

  constructor() {
    this.codemaker = new Codemaker();
  }

  public makeGuesses() {
    // TODO: add implementation
  }

  public makeGuess(guess: string[]) {
    this.codemaker.takeGuess(guess);
  }

}