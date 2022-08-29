import Codemaker from "../Codemaker/Codemaker"
import { Outcome } from "../constants/constants";

export default class Codebreaker {

  private codemaker: Codemaker;

  constructor(codemaker: Codemaker) {
    this.codemaker = codemaker;
  }

  public makeGuesses(): Outcome {
    // TODO: add implementation
    return Outcome.LOST
  }

  private makeGuess(guess: string[]): string | string[] {
    return this.codemaker.takeGuess(guess);
  }

}