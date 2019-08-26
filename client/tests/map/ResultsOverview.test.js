import { shallow } from "enzyme";
import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ResultsOvervew from "../../src/components/trails-map/ResultsOvervew"

configure({ adapter: new Adapter() });

let wrapper;

beforeEach(() => {
    const mockTrails1 = [];
    const mockTrails2 = [];
    wrapper = shallow(
        <ResultsOvervew
            filteredTrails={mockTrails1}
            hikingProject={mockTrails2}
        />
    );
});

it("renders without crashing", () => {
    expect(wrapper).toMatchSnapshot();
});