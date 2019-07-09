import React from "react";
import manageBand from "../manageBand";

describe("manageBand reducer", () => {
  // default case
  it("initialized with proper state (upon @@INIT)", ()=>{

      let action = { type: "@@INIT" };
      let mockOutput = { bands: [] };

      expect(manageBand(undefined, action)).toEqual(mockOutput);
  })

  //add band
  it("adds bands properly", ()=> {
    let action1 = { type: "ADD_BAND", name: "Sinatra and the Railers"};

    let initialState1 = {
      bands: []
    };

    let outputState1 = {
      bands: [{id: 1, name: "Sinatra and the Railers"}]
    }

    let action2 = { type: "ADD_BAND", name: "option-J"};

    let initialState2 = {
      bands: [{id: 1, name: "Sinatra and the Railers"}]
    }

    let outputState2 = {
      bands: [{id: 1, name: "Sinatra and the Railers"}, {id: 2, name: "option-J"}]
    }
    expect(manageBand(initialState1, action1)).toEqual(outputState1)

    expect(manageBand(initialState2, action2 )).toEqual(outputState2)
  })

  //delete band

  it("deletes band properly", () => {
    let action = {type: "DELETE_BAND", id: 2}
    let initialState = {
      bands: [{id: 1, name: "Sinatra and the Railers"}, {id: 2, name: "option-J"}]
    }

    let outputState = {
      bands: [{id:1, name: "Sinatra and the Railers"}]
    }

    expect(manageBand(initialState, action)).toEqual(outputState)


  })

})
