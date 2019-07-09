import React from "react";
import { shallow } from "enzyme";

import BandsContainer from "../BandsContainer";
import Band from "../Band";

describe("<BandsContainer />", () => {

  it("renders props.bands as <Band /> components", () => {
    let bands = [ {id: 1, name: "Sinatra and the Railers"}, {id: 2, name: "option-J"} ];

    let wrapper = shallow(<BandsContainer bands={bands}/>);

    expect(wrapper.find(Band).length).toEqual(2)

  })

})
