import React from "react";
import { shallow } from "enzyme";
import Band from "../Band";

describe("<Band />", ()=>{
  let mockProps = {
    id: 1,
    name: "Sinatra and the Railers",
    deleteBand: jest.fn()
  }

  let wrapper = shallow(<Band {...mockProps} />);

  it("renders correctly", ()=> {

    expect(wrapper).toMatchSnapshot()

  })

  it("deletes band onClick", ()=>{
    wrapper.find("button").simulate("click");

    expect(mockProps.deleteBand).toBeCalledWith(mockProps.id);

  })

})
