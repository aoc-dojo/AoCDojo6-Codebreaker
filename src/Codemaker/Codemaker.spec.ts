import Codemaker from "./Codemaker";
import { CodeColours, HintColours, Messages } from "../Constants/Constants";

describe("The Mastermind", function() {
  describe("Initializes", function() {
    test("should set a secret code", function() {
      var code = [CodeColours.RED, CodeColours.BLUE, CodeColours.BLUE, CodeColours.BLUE];
      var mastermind = new Codemaker(code);

      expect(mastermind.secretCode).toEqual(code);
    });

    test("should randomly generate a code if one is not specified", function() {
      var mastermind = new Codemaker();
      expect(mastermind.secretCode.length).toEqual(4);
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
      var mastermind = new Codemaker()
      
      var guess = [CodeColours.RED, CodeColours.BLUE, CodeColours.BLUE];
      expect(() => {mastermind.guess(guess)}).toThrow(Messages.LENGTH_MUST_BE_4);
  
      guess = [CodeColours.RED, CodeColours.BLUE, CodeColours.BLUE, CodeColours.BLUE, CodeColours.BLUE];
      expect(() => {mastermind.guess(guess)}).toThrow(Messages.LENGTH_MUST_BE_4);
    });
  
    test("should return a white marker for each correct colour in the guess", function() {
      var code = [CodeColours.RED, CodeColours.ORANGE, CodeColours.BLUE, CodeColours.GREEN];
      var guess = [CodeColours.PURPLE, CodeColours.RED, CodeColours.ORANGE, CodeColours.YELLOW];
      var mastermind = new Codemaker(code);
      
      expect(mastermind.guess(guess)).toEqual([HintColours.WHITE, HintColours.WHITE]);
    });

    test("should return a black marker for each correct colour in the correct position in the guess", function() {
      var code = [CodeColours.RED, CodeColours.ORANGE, CodeColours.BLUE, CodeColours.GREEN];
      var guess = [CodeColours.RED, CodeColours.YELLOW, CodeColours.BLUE, CodeColours.PURPLE];
      var mastermind = new Codemaker(code);
      
      expect(mastermind.guess(guess)).toEqual([HintColours.BLACK, HintColours.BLACK]);
    });

    test("should not return a marker for colours in the guess that are not in the secret", function() {
      var code = [CodeColours.RED, CodeColours.ORANGE, CodeColours.BLUE, CodeColours.GREEN];
      var guess = [CodeColours.RED, CodeColours.YELLOW, CodeColours.BLUE, CodeColours.PURPLE];
      var mastermind = new Codemaker(code);
      
      expect(mastermind.guess(guess)).toEqual([HintColours.BLACK, HintColours.BLACK]);
    });

    test("should return a valid hint for the guess", function() {
      var code = [CodeColours.RED, CodeColours.ORANGE, CodeColours.BLUE, CodeColours.GREEN];
      var guess = [CodeColours.RED, CodeColours.BLUE, CodeColours.ORANGE, CodeColours.GREEN];
      var expectedWhiteMarkers = 2;
      var expectedBlackMarkers = 2;

      var mastermind = new Codemaker(code);
      var hint = mastermind.guess(guess) as string[];
      var actualWhiteMarkers = 0;
      var actualBlackMarkers = 0;

      hint.forEach(key => {
        key === HintColours.BLACK ? actualBlackMarkers++ : actualWhiteMarkers++;
      })

      expect(actualWhiteMarkers).toEqual(expectedWhiteMarkers);
      expect(expectedBlackMarkers).toEqual(actualBlackMarkers);

    });

    test("should return a win message for a correct guess", function() {
      var code = [CodeColours.RED, CodeColours.ORANGE, CodeColours.BLUE, CodeColours.GREEN];
      var guess = [CodeColours.RED, CodeColours.ORANGE, CodeColours.BLUE, CodeColours.GREEN];
      var mastermind = new Codemaker(code);

      expect(mastermind.guess(guess)).toEqual(Messages.WON);
    });

    test("should return a lose message after 10 incorrect guesses", function() {
      var code = [CodeColours.RED, CodeColours.ORANGE, CodeColours.BLUE, CodeColours.GREEN];
      var guess = [CodeColours.RED, CodeColours.BLUE, CodeColours.ORANGE, CodeColours.GREEN];
      var mastermind = new Codemaker(code);

      // Make 9 guesses
      for(var i = 0; i < 9; i++) mastermind.guess(guess)
     
      // Make the 10th guess which is also incorrect.
      expect(mastermind.guess(guess)).toEqual("Error: you have had more than 10 tries!");
    });

    test("should return a win message if the 10th guess is correct", function() {
      var code = [CodeColours.RED, CodeColours.ORANGE, CodeColours.BLUE, CodeColours.GREEN];
      var guess = [CodeColours.RED, CodeColours.BLUE, CodeColours.ORANGE, CodeColours.GREEN];
      var correctGuess = [CodeColours.RED, CodeColours.ORANGE, CodeColours.BLUE, CodeColours.GREEN];
      var mastermind = new Codemaker(code);

      // Make 9 guesses
      for(var i = 0; i < 9; i++) mastermind.guess(guess)
     
      // Make the 10th guess which is correct.
      expect(mastermind.guess(correctGuess)).toEqual(Messages.WON);
    });
  });
});