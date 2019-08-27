import { shallow } from "enzyme";
import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ResultsList from "../../src/components/trails-map/ResultsList"

configure({ adapter: new Adapter() });

let wrapper;

beforeEach(() => {
    let value;
    const mockFun1 = input => value + input
    const mockFun2 = input => value + input
    const mockFun3 = input => value + input
    const mockFun4 = input => value + input
    const mockTrails = []
    const mockProfile = { name: "Joey", location: "Canada" }
    wrapper = shallow(
        <ResultsList
            trails={mockTrails}
            viewSavedTrails={mockFun1}
            togglePicture={mockFun2}
            userProfile={mockProfile}
            addAPIHike={mockFun3}
            deleteAPIHike={mockFun4}
            showPostForm={true}
        />
    );
});

it("renders without crashing", () => {
    expect(wrapper).toMatchSnapshot();
});