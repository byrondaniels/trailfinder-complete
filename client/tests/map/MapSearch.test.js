import { shallow } from "enzyme";
import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MapSearch from "../../src/components/trails-map/MapSearch"

configure({ adapter: new Adapter() });

beforeEach(() => {

    const mockGetTrails = input => input + 1
    const mockGetProfile = input => input + 1
    const mockProfile = { name: "Joey" };
    const mockhikingProject = [];
    wrapper = shallow(
        <MapSearch
            hikingProject={mockhikingProject}
            getHikingProjectTrails={mockGetTrails}
            isAuthenticated={true}
            userProfile={mockProfile}
            getCurrentProfile={mockGetProfile}
        />
    );
});

it("renders without crashing", () => {
    expect(wrapper).toMatchSnapshot();
});