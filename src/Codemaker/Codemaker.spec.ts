import Codemaker from "./Codemaker";
import { CodeColours, HintColours, Messages } from "../Constants/Constants";

describe("The Mastermind", function() {
  describe("Initializes", function() {
    test("should set a secret code", function() {
      var code = [CodeColours.RED, CodeColours.BLUE, CodeColours.BLUE, CodeColours.BLUE];
      var mastermind = new Codemaker(code);

      expect(mastermind.secretCode).toEqual(code);
    });

    test("should only choose valid colours", function() {
      var code = ["pink", CodeColours.BLUE, CodeColours.BLUE, CodeColours.BLUE];
      expect(() => {
        new Codemaker(code)
      }).toThrow(Messages.INVALID_COLOUR);
    });

    test("should pass in exactly 4 colours", function() {
      var code = [CodeColours.RED, CodeColours.BLUE, CodeColours.BLUE, CodeColours.BLUE, CodeColours.GREEN];
      expect(() => {
        new Codemaker(code)
      }).toThrow(Messages.LENGTH_MUST_BE_4);

      var code = [CodeColours.RED, CodeColours.BLUE, CodeColours.GREEN];
      expect(() => {
        new Codemaker(code)
      }).toThrow(Messages.LENGTH_MUST_BE_4);
    });
  });

  describe("Guesses", function() {
    test("should only allow 4 elements", function() {
      const code = [CodeColours.RED, CodeColours.BLUE, CodeColours.BLUE, CodeColours.BLUE]
      const mastermind = new Codemaker(code)
      
      let guess = [CodeColours.RED, CodeColours.BLUE, CodeColours.BLUE];
      expect(() => {mastermind.Guess(guess)}).toThrow(Messages.LENGTH_MUST_BE_4);
  
      guess = [CodeColours.RED, CodeColours.BLUE, CodeColours.BLUE, CodeColours.BLUE, CodeColours.BLUE];
      expect(() => {mastermind.Guess(guess)}).toThrow(Messages.LENGTH_MUST_BE_4);
    });
  
    test("should return a white marker for each correct colour in the guess", function() {
      const code = [CodeColours.RED, CodeColours.ORANGE, CodeColours.BLUE, CodeColours.GREEN];
      const guess = [CodeColours.PURPLE, CodeColours.RED, CodeColours.ORANGE, CodeColours.YELLOW];
      const mastermind = new Codemaker(code);
      
      expect(mastermind.Guess(guess)).toEqual([HintColours.WHITE, HintColours.WHITE]);
    });

    test("should return a black marker for each correct colour in the correct position in the guess", function() {
      const code = [CodeColours.RED, CodeColours.ORANGE, CodeColours.BLUE, CodeColours.GREEN];
      const guess = [CodeColours.RED, CodeColours.YELLOW, CodeColours.BLUE, CodeColours.PURPLE];
      const mastermind = new Codemaker(code);
      
      expect(mastermind.Guess(guess)).toEqual([HintColours.BLACK, HintColours.BLACK]);
    });

    test("should not return a marker for colours in the guess that are not in the secret", function() {
      const code = [CodeColours.RED, CodeColours.ORANGE, CodeColours.BLUE, CodeColours.GREEN];
      const guess = [CodeColours.RED, CodeColours.YELLOW, CodeColours.BLUE, CodeColours.PURPLE];
      const mastermind = new Codemaker(code);
      
      expect(mastermind.Guess(guess)).toEqual([HintColours.BLACK, HintColours.BLACK]);
    });

    test("should return a valid hint for the guess", function() {
      const code = [CodeColours.RED, CodeColours.ORANGE, CodeColours.BLUE, CodeColours.GREEN];
      const guess = [CodeColours.RED, CodeColours.BLUE, CodeColours.ORANGE, CodeColours.GREEN];
      const expectedWhiteMarkers = 2;
      const expectedBlackMarkers = 2;

      const mastermind = new Codemaker(code);
      const hint = mastermind.Guess(guess) as string[];
      let actualWhiteMarkers = 0;
      let actualBlackMarkers = 0;

      hint.forEach(key => {
        key === HintColours.BLACK ? actualBlackMarkers++ : actualWhiteMarkers++;
      })

      expect(actualWhiteMarkers).toEqual(expectedWhiteMarkers);
      expect(expectedBlackMarkers).toEqual(actualBlackMarkers);

    });

    test("should return a win message for a correct guess", function() {
      const code = [CodeColours.RED, CodeColours.ORANGE, CodeColours.BLUE, CodeColours.GREEN];
      const guess = [CodeColours.RED, CodeColours.ORANGE, CodeColours.BLUE, CodeColours.GREEN];
      const mastermind = new Codemaker(code);

      expect(mastermind.Guess(guess)).toEqual(Messages.WON);
    });

    test("should return a lose message after 10 incorrect guesses", function() {
      const code = [CodeColours.RED, CodeColours.ORANGE, CodeColours.BLUE, CodeColours.GREEN];
      const guess = [CodeColours.RED, CodeColours.BLUE, CodeColours.ORANGE, CodeColours.GREEN];
      const mastermind = new Codemaker(code);

      // Make 9 guesses
      for(let i = 0; i < 10; i++) mastermind.Guess(guess)
     
      // Make the 10th guess which is also incorrect.
      expect(mastermind.Guess(guess)).toEqual("Error: you have had more than 10 tries!");
    });

    test("should return the lose message after every guess after the 10th one", function() {
      const code = [CodeColours.RED, CodeColours.ORANGE, CodeColours.BLUE, CodeColours.GREEN];
      const guess = [CodeColours.RED, CodeColours.BLUE, CodeColours.ORANGE, CodeColours.GREEN];
      const mastermind = new Codemaker(code);

      // Make 10 guesses
      for(let i = 0; i < 10; i++) mastermind.Guess(guess)
     
      // Make the 10th guess which is also incorrect.
      expect(mastermind.Guess(guess)).toEqual("Error: you have had more than 10 tries!");
      expect(mastermind.Guess(code)).toEqual("Error: you have had more than 10 tries!");
    });

    test("should return a win message if the 10th guess is correct", function() {
      const code = [CodeColours.RED, CodeColours.ORANGE, CodeColours.BLUE, CodeColours.GREEN];
      const guess = [CodeColours.RED, CodeColours.BLUE, CodeColours.ORANGE, CodeColours.GREEN];
      const correctGuess = [CodeColours.RED, CodeColours.ORANGE, CodeColours.BLUE, CodeColours.GREEN];
      const mastermind = new Codemaker(code);

      // Make 9 guesses
      for(let i = 0; i < 9; i++) mastermind.Guess(guess)
     
      // Make the 10th guess which is correct.
      expect(mastermind.Guess(correctGuess)).toEqual(Messages.WON);
    });
  });
});