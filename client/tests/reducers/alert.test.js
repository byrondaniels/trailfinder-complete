import alert from "../../src/reducers/alert"

describe("Alerts: Adding and removing", () => {

    describe("Adding alerts", () => {

        test("No value, no action", () => {
            const action = { type: "dummy_action" };
            const initialState = [];
            expect(alert(undefined, action)).toEqual(initialState);
        });

        test("Has an alert with no action", () => {
            const action = { type: "dummy_action" };
            const initialState = { msg: "cheese" };
            const currentState = { msg: "cheese" };
            expect(alert(currentState, action)).toEqual(initialState);
        });
        test("Add an alert", () => {
            const action = { payload: { msg: "green", id: "1" }, type: "SET_ALERT" };
            const nextState = { msg: "green", id: "1" };
            expect(alert(undefined, action)).toEqual(nextState);
        });
        test("Add alert when 1 alert is already present", () => {
            const action = { payload: { msg: "green", id: "2" }, type: "SET_ALERT" };
            const nextState = [{ msg: "green", id: "2" }, { msg: "cheese", id: "44" }];
            const currentState = [{ msg: "cheese", id: "44" }];
            expect(alert(currentState, action)).toEqual(nextState);
        });

    });

    describe("Removing alerts", () => {

        test("Id sent does not match any", () => {
            const action = { type: "REMOVE_ALERT", payload: { id: "44" } };
            const initialState = [{ msg: "cheese", id: "33" }];
            expect(alert(initialState, action)).toEqual(initialState);
        });

        test("Remove the last alert", () => {
            const action = { type: "REMOVE_ALERT", payload: { id: "44" } };
            const initialState = [{ msg: "cheese", id: "44" }];
            const finalState = [];
            expect(alert(initialState, action)).toEqual(finalState);
        });

        test("Remove a single alert when we have a few", () => {
            const action = { type: "REMOVE_ALERT", payload: { id: "44" } };
            const initialState = [{ msg: "green", id: "2" }, { msg: "cheese", id: "44" }];
            const finalState = [{ msg: "green", id: "2" }];
            expect(alert(initialState, action)).toEqual(finalState);
        });

        test("Remove a single alert when we have a few", () => {
            const action = { type: "REMOVE_ALERT", payload: { id: "2" } };
            const initialState = [{ msg: "green", id: "2" }, { msg: "cheese", id: "44" }];
            const finalState = [{ msg: "green", id: "44" }];
            expect(alert(initialState, action)).toEqual(finalState);
        });

    });

});