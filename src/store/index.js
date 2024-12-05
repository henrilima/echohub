import Cookies from "js-cookie";
import { createStore } from "vuex";

export default createStore({
    state: {
        canAccessVerify: false,
        user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
    },
    mutations: {
        setAccessVerify(state, value) {
            state.canAccessVerify = value;
        },
        setUser(state, user) {
            state.user = user;
            Cookies.set("user", JSON.stringify(user), { expires: 2 });
        },
        clearUser(state) {
            state.user = null;
            Cookies.remove("user");
        },
    },
    actions: {
        loginUser({ commit }, user) {
            commit("setUser", user);
        },
        logoutUser({ commit }) {
            commit("clearUser");
        },
    },
});
