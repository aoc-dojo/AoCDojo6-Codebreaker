import Codebreaker from "./Codebreaker";
import Codemaker from "../Codemaker/Codemaker";
import { CodeColours } from "../constants/constants";

describe("The Codebreaker", function () {
  describe("Guesses", function () {

    test("")
    
    test("should call Codemaker with entirely incorrect guess and receive empty array", function () {
      var codemaker = new Codemaker([CodeColours.BLUE, CodeColours.BLUE, CodeColours.BLUE, CodeColours.BLUE]);
      var codebreaker = new Codebreaker(codemaker);
      var guess = [CodeColours.GREEN, CodeColours.GREEN, CodeColours.GREEN, CodeColours.GREEN];
      var response = codebreaker.makeGuesses();
      expect(response).toStrictEqual([]);
    });

    /*

    Fill in more test cases here.
    Some unfinished example tests below.

    */

    // test("should only pass 4 elements when making a guess", function() {
    // });

    // test("should make at most 10 guesses", function() {
    // });


  });
})