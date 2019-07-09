// required modules
import React from "react";
import manageBand from "../manageBand";

// 'test suite' : group of tests, bundled together due to some context
// see : https://en.wikipedia.org/wiki/Test_suite
// see : https://jestjs.io/docs/en/api#describename-fn

// 'unit test' : https://en.wikipedia.org/wiki/Unit_testing

describe("manageBand", () => {
  // this reducer is initialized with proper state
  it("initialized with proper state (upon @@INIT)", () => {
    // herein we make our assertions
    let action = { type: "@@INIT" };

    expect(manageBand(undefined, action)).toEqual({ bands: [] });
  });

  // adds bands correctly
  it("adds band", () => {
    let action = { type: "ADD_BAND", name: "Sinatra and the Railers" };
    let initialState = { bands: [] };
    let outputState = { bands: [{ id: 1, name: "Sinatra and the Railers" }] };
    expect(manageBand(initialState, action)).toEqual(outputState);
  });

  // deletes bands correctly
  it("deletes band", () => {
    let action = {type: "DELETE_BAND", id: 1};
    let initialState = { bands: [{ id: 1, name: "Sinatra and the Railers" }] };
    let outputState = { bands: [] };

    expect(manageBand(initialState, action)).toEqual(outputState);
  })
});
