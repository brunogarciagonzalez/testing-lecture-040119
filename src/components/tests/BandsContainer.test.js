import React from "react";
import BandsContainer from "../BandsContainer";
import Band from "../Band";
import { shallow } from "enzyme";

describe("< BandsContainer />", ()=>{
  it("renders props.bands as <Band /> components", () => {
    let bands = [ {id: 1, name: "Sinatra and the Railers"}, {id: 2, name: "option-J"} ]
    let wrapper = shallow(<BandsContainer bands={bands} />);

    expect(wrapper.find(Band).length).toBe(2);
  })
})
