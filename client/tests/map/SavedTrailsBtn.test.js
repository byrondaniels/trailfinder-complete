import { shallow } from "enzyme";
import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SavedTrailsBtn from "../../src/components/trails-map/SavedTrailsBtn"

configure({ adapter: new Adapter() });

let wrapper;

beforeEach(() => {
    const mockToggleSaved = input => {
        value = input;
    };
    const mockViewTrails = true;
    wrapper = shallow(
        <SavedTrailsBtn
            viewSavedTrails={mockViewTrails}
            toggleSaved={mockToggleSaved}
        />
    );
});

it("renders without crashing", () => {
    expect(wrapper).toMatchSnapshot();
});