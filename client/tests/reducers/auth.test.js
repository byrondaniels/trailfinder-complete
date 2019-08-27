import auth from "../../src/reducers/auth"

describe("User Authorisation", () => {

    describe("Register", () => {

        test("Success", () => {
            const action = { type: "REGISTER_SUCCESS" };
            const initialState =
            {
                token: null,
                isAuthenticated: false,
                loading: true,
                user: null
            }
            const resp = auth(initialState, action);
            expect(resp.isAuthenticated).toEqual(true);
            expect(resp.loading).toEqual(false);
        });

        test("Fail", () => {
            const action = { type: "REGISTER_FAIL" };
            const initialState =
            {
                token: null,
                isAuthenticated: false,
                loading: true,
                user: null
            }
            const resp = auth(initialState, action);
            expect(resp.isAuthenticated).toEqual(false);
            expect(resp.loading).toEqual(false);
            expect(resp.token).toEqual(null);
        });


    });

    describe("Login", () => {

        test("Success", () => {
            const action = { type: "LOGIN_SUCCESS" };
            const initialState =
            {
                token: null,
                isAuthenticated: false,
                loading: true,
                user: null
            }
            const resp = auth(initialState, action);
            expect(resp.isAuthenticated).toEqual(true);
            expect(resp.loading).toEqual(false);
        });

        test("Fail", () => {
            const action = { type: "LOGIN_FAIL" };
            const initialState =
            {
                token: null,
                isAuthenticated: false,
                loading: true,
                user: null
            }
            const resp = auth(initialState, action);
            expect(resp.isAuthenticated).toEqual(false);
            expect(resp.loading).toEqual(false);
            expect(resp.token).toEqual(null);
        });

        test("Logout", () => {
            const action = { type: "LOGOUT" };
            const initialState =
            {
                token: "cheese",
                isAuthenticated: true,
                loading: true,
                user: "Byron"
            }
            const resp = auth(initialState, action);
            expect(resp.isAuthenticated).toEqual(false);
            expect(resp.loading).toEqual(false);
            expect(resp.token).toEqual(null);
        });


    });

    describe("User Loaded", () => {

        test("User Loaded", () => {
            const payload = { name: "Joey" }
            const action = { type: "dummy_action", payload: payload };
            const initialState =
            {
                token: "cheese",
                isAuthenticated: true,
                loading: true,
                user: "Byron"
            }
            const resp = auth(initialState, action);
            expect(resp.isAuthenticated).toEqual(true);
            expect(resp.loading).toEqual(false);
            expect(resp.user.name).toEqual("Joey");
        });


    });

    describe("Delete Account", () => {

        test("Delete Account", () => {
            const action = { type: "dummy_action" };
            const initialState =
            {
                token: "cheese",
                isAuthenticated: true,
                loading: true,
                user: "Byron"
            }
            const resp = auth(initialState, action);
            expect(resp.isAuthenticated).toEqual(false);
            expect(resp.loading).toEqual(false);
            expect(resp.token).toEqual(null);
        });

    });

    describe("Error", () => {

        test("Error", () => {
            const action = { type: "dummy_action" };
            const initialState =
            {
                token: "cheese",
                isAuthenticated: true,
                loading: true,
                user: "Byron"
            }
            const resp = auth(initialState, action);
            expect(resp.isAuthenticated).toEqual(false);
            expect(resp.loading).toEqual(false);
            expect(resp.token).toEqual(null);
        });


    });



});

