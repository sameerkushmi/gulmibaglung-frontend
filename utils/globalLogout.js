// globalLogout.js
export let isLoggedOut = true; // default to true (user not logged in)
const LOGOUT_AFTER_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

if (typeof window !== "undefined") {
    const storedStatus = localStorage.getItem("isLoggedOut"); // "true" or "false"
    const loginTime = localStorage.getItem("loginTimestamp"); // timestamp in ms

    if (!storedStatus) {
        // first-time visitor, mark as logged out
        isLoggedOut = true;
    } else if (storedStatus === "false" && loginTime) {
        // user logged in previously
        const elapsed = Date.now() - parseInt(loginTime, 10);
        if (elapsed >= LOGOUT_AFTER_MS) {
            // more than 7 days passed
            isLoggedOut = true;
            localStorage.setItem("isLoggedOut", "true");
            localStorage.removeItem("loginTimestamp");
        } else {
            isLoggedOut = false; // still within 7 days
        }
    } else {
        // storedStatus === "true" or invalid loginTime
        isLoggedOut = true;
    }
}

// Logout user
export const logoutUser = () => {
    isLoggedOut = true;
    if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedOut", "true");
        localStorage.removeItem("loginTimestamp");
    }
};

// Login user
export const loginUser = () => {
    isLoggedOut = false;
    if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedOut", "false");
        localStorage.setItem("loginTimestamp", Date.now().toString());
    }
};
