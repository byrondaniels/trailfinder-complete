import { shallow } from "enzyme";
import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilterMenu from "../../src/components/trails-map/FilterMenu"

configure({ adapter: new Adapter() });

let wrapper;

beforeEach(() => {
    const mockHandleChangeCheckbox = input => {
        value = input;
    };
    const mockfilterValues = ["www.image.com", "123"];
    wrapper = shallow(
        <FilterMenu
            filterValues={mockfilterValues}
            handleChangeCheckbox={mockHandleChangeCheckbox}
        />
    );
});

it("renders without crashing", () => {
    expect(wrapper).toMatchSnapshot();
});