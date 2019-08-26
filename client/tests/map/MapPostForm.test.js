import { shallow } from "enzyme";
import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MapPostForm from "../../src/components/trails-map/MapPostForm"

configure({ adapter: new Adapter() });

let wrapper;

beforeEach(() => {
    const mock1 = input => value + input
    const mock2 = input => value + input
    const mock3 = input => value + input
    wrapper = shallow(
        <MapPostForm
            displayPostForm={mock1}
            hidePostForm={mock2}
            addSharedPost={mock3}
        />
    );
});

it("renders without crashing", () => {
    expect(wrapper).toMatchSnapshot();
});