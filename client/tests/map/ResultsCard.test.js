import { shallow } from "enzyme";
import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ResultsCard from "../../src/components/trails-map/ResultsCard"

configure({ adapter: new Adapter() });

let wrapper;

beforeEach(() => {

    const mockDeleteTrail = input => value + input
    const mockTogglePicture = input => value + input
    const mockSaveTrailBtn = input => value + input
    const mockShowPostForm = input => value + input
    const mockSaveBtnPayload = "lots of data";
    const mockData = { name: "JOey", length: 22 }

    wrapper = shallow(
        <ResultsCard
            image={"www.image.com"}
            trailData={mockData}
            isLoggedIn={true}
            deleteTrail={mockDeleteTrail}
            togglePicture={mockTogglePicture}
            alreadySaved={true}
            saveBtnPayload={mockSaveBtnPayload}
            saveTrailBtn={mockSaveTrailBtn}
            showPostForm={mockShowPostForm}
        />
    );
});

it("renders without crashing", () => {
    expect(wrapper).toMatchSnapshot();
});