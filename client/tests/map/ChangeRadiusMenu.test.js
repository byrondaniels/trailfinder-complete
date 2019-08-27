import { shallow } from "enzyme";
import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ChangeRadiusMenu from "../../src/components/trails-map/ChangeRadiusMenu"

configure({ adapter: new Adapter() });

let wrapper;

beforeEach(() => {
    let trail;
    const mockChangeRadius = input => {
        trail = input;
    };
    const mockRadius = 44;
    wrapper = shallow(
        <ChangeRadiusMenu
            radius={mockRadius}
            changeRadius={mockChangeRadius}
        />
    );
});

it("renders without crashing", () => {
    expect(wrapper).toMatchSnapshot();
});