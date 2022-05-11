# TypeScript Testing
In this repository, we're using [Jest](https://jestjs.io/en/) as our test framework.

## Writing tests
To write a test, you should use the `test` function. It takes a string as its first argument and a function as the second. The string is the test description, and the function is the test code:
```ts
test('should receive a CSV string', function() { /* Test code here */ });
```

You can use the `describe` function to group your tests. It has the same signature as the `test` function, receiving a string and a function as arguments. You should add your tests to the body of the second argument:
```ts
describe('add', function() {
    test('should receive a csv string', function() { /* Test code here */ });
    test('should sum all comma separated elements in the string', function() { /* Test code here */ });
});
```
### Re-using the same test for multiple test cases
You can use dynamic test to simplify your code.
```ts
var testCases = [
    { input: "input1", expected: "output1" },
    { input: "input2", expected: "output2" }
];

testCases.forEach(function({input, expected}) {
    test(`should output ${expected} for input ${input}.`, function() {
        const actual = methodUnderTest(input);

        expect(actual).toEqual(expected);
    });
});
```

## Asserting
For assertation this repo follows the convention of using the [expect](https://jestjs.io/docs/en/expect) notation for the tests assertations.
```ts
expect(value).toBeTruthy()
expect(value).toEqual(true);
expect(value).not.toEqual(false);
expect(value).not.toBeFalsy(false);
```

### Errors
There are two styles to assert errors: one uses a try/catch block and asserts on the error object in the catch block. The second uses the [toThrow](https://jestjs.io/docs/en/expect#tothrowerror) method of the `expect` object. For this second method you need to wrap your code in a function for it to work.
```ts
// Using a try/catch block
test('should throw an error', function() {
    try {
        brokenFunction();
    } catch(error) {
        expect(error.message).toEqual('I am an error message');
    }
});
```

```ts
// Using the expect.toThrow method
test('should throw an error', function() {
    var wrapperFunction = function() {
        borkenFunction();
    }

    expect(wrapperFunction.toThrow();
    // or, if you want to be more specific
    expect(wrapperFunction).toThrow(new Error('I am an error message'));
});
```

## Filenames
This repository is using the following convention for test file names: `<name>.spec.ts`.
If you use the `.spec.ts` extension for your file, the test runner will pick it up automatically and execute all available tests.