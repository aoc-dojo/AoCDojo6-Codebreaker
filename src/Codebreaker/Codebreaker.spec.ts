import Codebreaker from "./Codebreaker";
import Codemaker from "../Codemaker/Codemaker";
jest.mock("../Codemaker/Codemaker")

describe("The Codebreaker", function() {
  describe("Initializes", function() {
    test("should return a Codebreaker object", function() {
      var codebreaker = new Codebreaker();
      expect(codebreaker).not.toBeNull();
    });
  })
  describe("Guesses", function() {
    test("should call Codemaker", function() {
      var codebreaker = new Codebreaker();
      var guess = [];
      codebreaker.makeGuess(guess);
      expect(Codemaker).toHaveBeenCalled();
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