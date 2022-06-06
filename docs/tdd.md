# TDD Basics
Test-Driven Development (TDD) is a software development methodology where you write a test first and then write the code to make the test pass. The tests should reflect one of the requirements or parts of it.  It works on a cycle where first we write tests that express what your system should do; then you write your code to make it meet the expectations expressed in the test, and then refactor your code to enhance its design. This cycle is also known as the Red-Green-Refactor cycle.

## Red-Green-Refactor
- Red - We write a test that reflects the requirement, or part of it, that we will work on. The test will describe a behaviour that does not exist on the code if there's any code written whatsoever so that the test will fail.
- Green - We write the minimal amount of code required to make the test pass. This code can be as dirty as required. We're not focusing on quality or clean code at this point. We just want to make the test pass as fast as possible.
- Refactor - After we have a passing test, we will focus on organizing and cleaning the code up. Here we're thinking about the design and quality of our implementation, so take your time.

## Cycle steps as design opportunities
During the TDD cycle, we have separate opportunities to think about different aspects of the design of the code we're writing. Here's one way of thinking about these.
- On the Red step, we will make decisions about the API design: what its contract looks like and what to expect.
- On the Green stage, we define the bare minimum that we need to deliver the requirement specified by the test.
- On the Refactor step, we can focus on the design of the solution, organizing the code better, removing duplications and applying patterns.

## How to start - Zero, One, Many
Normaly it can be a bit dificult to figure how to start testing, one way of dealing with that is by using the Zero-One-Many approach.
- Zero: What's the behaviour when my input is nothing. This is a good place to start and gives the opportunity to think about the contract of our API.
- One: What's the behaviour when I provide one input to my API?
- Many: When I have list on inputs, how does my API behave?

## TDD side effects
This approach to development has some side effects:
- You have a faster feedback cycle to work with. The automated tests should fast so you can have near-immediate feedback on the impact of your code changes.
- It separates the concerns (steps) of the development process by having different moments to think about meeting requirements and good design at different moments.
- It gives developers a safe net of automated tests, which facilitates refactoring the code throughout its lifespan.
- Tests can be a good way to document the intended behaviour of the code.
