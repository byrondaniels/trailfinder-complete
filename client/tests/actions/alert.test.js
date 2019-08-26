import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import { setAlert } from "../../src/actions/alert";

const mockStore = configureMockStore([thunkMiddleware]);
const store = mockStore();

describe("Actions: alert", () => {
    beforeEach(() => {
        store.clearActions();
    });

    describe("setAlert", () => {
        test("Dispatches the correct action and payload", () => {
            const expectedActions = [
                {
                    payload: { msg: "hi", alertType: 1 },
                    type: "SET_ALERT"
                }
            ];
            store.dispatch(setAlert("hi", 1));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
