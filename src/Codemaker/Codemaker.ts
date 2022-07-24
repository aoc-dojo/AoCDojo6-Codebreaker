import { CodeColours, HintColours, Messages } from '../Constants/Constants'

export default class Codemaker {
  secretCode: string[] = [];
  private numberOfGuesses = 0;

  constructor(code:string[] = []) {
    this.validate(code);
    this.secretCode = code;
  }

  public Guess(guess: string[]):string | string[] {
    this.numberOfGuesses += 1;
    if(this.numberOfGuesses > 10) return Messages.TOO_MANY_TRIES;

    this.validate(guess);

    var hint: string[] = [];
    var numberOfCorrectKeys = 0;
    // Add a marker to hint for each guess key.
    guess.forEach((key, index) => {
      var keyExistsInSecret = this.secretCode.indexOf(key) != -1;
      var keysAreSame = key === this.secretCode[index];

      if(keysAreSame) {
        numberOfCorrectKeys += 1;
        hint = hint.concat(HintColours.BLACK);
      }
      else if(keyExistsInSecret) hint = hint.concat(HintColours.WHITE);
    })

    if(numberOfCorrectKeys === 4) return Messages.WON;

    return this.shuffle(hint);
  }

  private validate(code: string[]) {

    // Make sure the code contains exactly 4 keys
    if(code.length !== 4) throw new Error(Messages.LENGTH_MUST_BE_4);

    // Make sure we only use valid colours.
    var colourKeys = Object.keys(CodeColours).map(key => key.toLocaleLowerCase());
    code.forEach(key => {
      if(colourKeys.indexOf(key.toLocaleLowerCase()) === -1) throw new Error(Messages.INVALID_COLOUR);
    })
  }

  private shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
}