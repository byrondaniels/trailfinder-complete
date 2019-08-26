import { shallow } from "enzyme";
import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DisplayLargePicture from "../../src/components/trails-map/DisplayLargePicture"

configure({ adapter: new Adapter() });

let wrapper;

beforeEach(() => {
    let value;
    const mockHidePicture = input => {
        value = input;
    };
    const mockUrl = "www.image.com";
    wrapper = shallow(
        <DisplayLargePicture
            url={mockUrl}
            hidePicture={mockHidePicture}
        />
    );
});

it("renders without crashing", () => {
    expect(wrapper).toMatchSnapshot();
});