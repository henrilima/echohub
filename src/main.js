import { createApp } from "vue";
import App from "./App.vue";

import store from "./store/index";
import router from "./router/index";
import "./assets/style.css";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as IconsFa from "oh-vue-icons/icons/fa";
import * as IconsHi from "oh-vue-icons/icons/hi";
import * as IconsMd from "oh-vue-icons/icons/md";
const iconSets = [IconsFa, IconsHi, IconsMd];
const Icons = iconSets.flatMap(Object.values);

const Icon = Object.values({ ...Icons });
addIcons(...Icon);

const app = createApp(App);

app.use(router);
app.use(store);
app.component("v-icon", OhVueIcon);

app.config.globalProperties.$baseUrl = "https://echohub-api.vercel.app";
app.config.globalProperties.$isStrongPassword = function isStrongPassword(
    password,
    config = {}
) {
    const {
        minLength = 8,
        maxLength = 20,
        minUpperCase = 1,
        minLowerCase = 1,
        minNumbers = 1,
        minSpecialChar = 1,
        minNonAlphaNumeric = 1,
        minUniqueChars = 0,
        minRepeatChars = 0,
        minConsecutiveChars = 0,
        minConsecutiveNumeric = 0,
        minConsecutiveSpecialChar = 0,
        minConsecutiveNonAlphaNumeric = 0,
        minConsecutiveUniqueChars = 0,
    } = config;

    // Check length constraints
    if (password.length < minLength || password.length > maxLength) {
        return false;
    }

    // Count character types
    const upperCaseCount = (password.match(/[A-Z]/g) || []).length;
    const lowerCaseCount = (password.match(/[a-z]/g) || []).length;
    const numberCount = (password.match(/\d/g) || []).length;
    const specialCharCount = (password.match(/[!@#$%^&*()_+]/g) || []).length;
    const nonAlphaNumericCount = (password.match(/[^a-zA-Z0-9]/g) || []).length;
    const uniqueChars = new Set(password).size;

    // Check minimum character requirements
    if (upperCaseCount < minUpperCase) return false;
    if (lowerCaseCount < minLowerCase) return false;
    if (numberCount < minNumbers) return false;
    if (specialCharCount < minSpecialChar) return false;
    if (nonAlphaNumericCount < minNonAlphaNumeric) return false;
    if (uniqueChars < minUniqueChars) return false;

    // Check repeating characters
    const repeatCharCounts = {};
    for (const char of password) {
        repeatCharCounts[char] = (repeatCharCounts[char] || 0) + 1;
    }
    const repeatCount = Object.values(repeatCharCounts).filter(
        (count) => count > 1
    ).length;
    if (repeatCount < minRepeatChars) return false;

    // Check consecutive characters
    const isConsecutive = (arr) => {
        let count = 1;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] === arr[i - 1]) {
                count++;
                if (count > minConsecutiveChars) return true;
            } else {
                count = 1;
            }
        }
        return false;
    };

    if (minConsecutiveChars > 0 && isConsecutive(password.split("")))
        return false;

    // Check consecutive numbers, special chars, etc.
    const numChars = password.match(/\d/g) || [];
    const specialChars = password.match(/[!@#$%^&*()_+]/g) || [];
    const nonAlphaNumericChars = password.match(/[^a-zA-Z0-9]/g) || [];
    const uniqueCharArray = [...new Set(password)];

    if (minConsecutiveNumeric > 0 && isConsecutive(numChars)) return false;
    if (minConsecutiveSpecialChar > 0 && isConsecutive(specialChars))
        return false;
    if (
        minConsecutiveNonAlphaNumeric > 0 &&
        isConsecutive(nonAlphaNumericChars)
    )
        return false;
    if (minConsecutiveUniqueChars > 0 && isConsecutive(uniqueCharArray))
        return false;

    return true;
};

import toastr from "toastr";
toastr.options = {
    maxOpened: 2,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: "toast-bottom-right",
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: process.env.VUE_APP_TIMEOUT,
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
};
import "toastr/build/toastr.min.css";

app.mount("#app");
