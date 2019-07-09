# Testing with Jest and Enzyme

This example is looking at the [Redux Delete Lab](https://learn.co/tracks/module-4-web-development-immersive-2-1/redux/react-redux/redux-delete-lab) to see how we could implement tests with the Jest and Enzyme frameworks. The lab itself uses some different frameworks, so I've deleted all the original test files and replaced the `package.json` with a copy of the one that `create-react-app` generates. This lesson just scratch the surface of TDD with Reach, so use it as a starting point when thinking about how to test your own project.

## Testing-Software Vocabulary

1. Test Runners - Figure out when and how to execute your tests
2. Assert Libraries - Give you functions to declare that some condition should be true
3. Mocking and Spying - Lets you replace a function or object with dummy versions

### Jest

[Jest](https://jestjs.io/docs/en/getting-started) was developed by Facebook, comes built in when you use `create-react-app` and provides test runners, assertion functions, and a mocking system. It is the primary system we are going to use to test our app.

### Enzyme

[Enzyme](https://airbnb.io/enzyme/) is a plugin developed by AirBnB. We are using it to extend Jest and give use functions to render our components. It will have to be installed and configured separately.

In the project directory execute:

```
npm i --save-dev enzyme enzyme-adapter-react-16
```

Create a file `src/setupTests.js`

```
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
```

## Testing simple functions

Pure-functions are simple to test because we simple need to call them and check their return value. Ideally, you want to write a test for each of the major or potentially-troublesom situations it might be used in. Here we are going to test our reducer function for each action it might need to handle. These tests are going to look similary to `rspec` files, with `describe` used to define a test-suite and `it` to define a particular test.

By convention, we can put the tests in the same directory as our code with a `.test.js` extension. Here, we are working in `src/reducers/manageBand.test.js`. Because Jest is built in, we only need two imports:

```
import React from 'react';
import manageBand from './manageBand';
```

After that, we declare our test suite with a name and a callback:

```
describe('manageBand`, () => {
  /* Tests will go here */
});
```

Each test will also need a name and a callback. If we look at the `switch` statement in our reducer, we see that there are 3 tracks it could follow (2 `case`s and the `default`). We will want a test for each one:

```
describe('manageBand`, () => {
  it ('handles @@INIT'), () => {
    // code
  });

  it ('handles ADD_BAND', () => {
    // code
  });

  it ('handles DELETE_BAND', () => {
    // code
  });
});
```

The body of each test will also follow a consistent pattern: we simply want to call the reducer and make assertions about what the result should be. Jest will mark a test as 'passed' if the assertions are all true. Just like with `RSpec`, the main assertion function is called `expect`.

```
it ('initializes state.band to empty array', () => {
  let action = { type: '@@INIT' };
  expect(manageBand(undefined, action)).toEqual({ bands: [] });
});
```

The functions we can call on the return value of `expect` are called _matchers_. There are [several](https://jestjs.io/docs/en/using-matchers) we can work with. `toEqual` compares all of the keys and values in the object we give it. So this test is going to run the reducer with an '@@INIT' action and pass if the result is an object with `bands` set to and empty array.

## Testing Container Components

Components are a little more complicated, because they are meant to be seen through a browser. Normally, the whole React system would be rendering our component(s) along with several others. When we test, however, we want to make sure that we are zeroing in on one thing at a time--on only one component. Enzyme gives use a way to do this. The `shallow` function will render some JSX without rendering child components. It will then return an object describing the result which we can use our matchers on.

Lets take a look at the `Bands` component. It only serves to take in an array of `band` objects and map them into `Band` components. To ensure that this is happening correctly we are going to need some fake data. We can then pass that fake data as props to the `Bands` component and count how many children would be generated:

```
describe('Bands', () => {
    it('should render Band components', () => {
        let mockBands = [
            { id: 1, name: 'Pat the Bunny' },
            { id: 2, name: 'Ramshackle Glory' }
        ];

        let wrapper = shallow(<Bands bands={mockBands}/>);
        expect(wrapper.find(Band).length).toBe(mockBands.length);
    });
});
```

This test does not actually render all the children--and we don't want it to--instead it lets us just look for what we care about: did all the data get mapped. To figure out if its displayed correctly we will have to turn to snapshot testing.

### Snapshot Testing

At the end of the day, if we want to know if something looks right we have to use our eyeballs. Once we know its right, however, we can ask the robots to make sure it never changes. This is where snapshot tests come it. When we get our commonent looking the way we want, we can save a description of it to a file. The test will then render the component and check the results agains this file. Jest provides a mechanizm for this automatically.

First we need our dummy data:

```
let mockProps = {
    id: 1,
    name: 'Pat the Bunny',
    deleteBand: jest.fn()
};
```

Next we need to shallow render the component, then we can expect that it matches a snapshot:

```
describe('Band', () => {
  it('renders correctly', () => {
    let wrapper = shallow(<Band {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
```

The first time we run the test a snapshot will be created which will be used on each subsequent call.

### Mocking functions

Of course, our components should also _do_ something. Ideally, the things they do will be passed down as props via pure-functions. These functions can then be tested just like the reducer above and all our component-test really needs to know is if it was called correctly. [Mock functions](https://jestjs.io/docs/en/mock-functions) give use a way to do this. Notice that the `mockProps` object above included a `deleteBand` key with the value set to `jest.fn()`--a mock function. This function doesn't do anything but remember how it was called, so we can use jest matchers on it.

We want `deleteBand()` to be called when a button in the `Band` component is click. We can test this with enzyme's `simulate` function:

```
wrapper.find('button').simulate('click');
```

Then we just need to make our assertions:

```
expect(mockProps.deleteBand).toBeCalledWith(mockProps.id);
```
