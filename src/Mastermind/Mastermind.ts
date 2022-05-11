import { CodeColours, HintColours, Messages } from '../constants/constants'

export default class Mastermind {

  secretCode: string[] = null;
  private numberOfGuesses = 0;

  constructor(code:string[] = null ) {
    this.secretCode = this.GenerateCode(code);
    this.Validate(this.secretCode);
  }

  public guess(guess: string[]):string | string[] {
    this.Validate(guess);
    var hint = [];
    var numberOfCorrectKeys = 0;
    this.numberOfGuesses += 1;

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
    if(this.numberOfGuesses >= 10) return Messages.TOO_MANY_TRIES;

    return this.shuffle(hint);
  }

  private GenerateCode(code: string[] = null): string[] {
    if(code) return code;

    var colourKeys = Object.keys(CodeColours).map(key => key.toLocaleLowerCase());
    var numberOfColours = colourKeys.length - 1;

    return [
      colourKeys[this.getRandomInt(numberOfColours)],
      colourKeys[this.getRandomInt(numberOfColours)],
      colourKeys[this.getRandomInt(numberOfColours)],
      colourKeys[this.getRandomInt(numberOfColours)]
    ]
  }

  private Validate(code: string[]) {

    // Make sure the code contains exactly 4 keys
    if(code.length !== 4) throw new Error(Messages.LENGTH_MUST_BE_4);

    // Make sure we only use valid colours.
    var colourKeys = Object.keys(CodeColours).map(key => key.toLocaleLowerCase());
    code.forEach(key => {
      if(colourKeys.indexOf(key.toLocaleLowerCase()) === -1) throw new Error(Messages.INVALID_COLOUR);
    })
  }

  private getRandomInt(max) {
    return Math.floor(Math.random() * max);
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