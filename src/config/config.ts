const production = {
  baseUrl: "https://api.pikpart.com/api",
};

const development = {
  //baseUrl: 'https://testapi.mysmartgarage.in/api',
  baseUrl: "https://uatapi.pikpart.com/api",
};

const local = {
  baseUrl: "http://localhost:4000/api",
};

const razorPayTest = {
  keyId: "rzp_test_RLGbpIpferh7F4",
  keySecret: "4zxYai8lmMU4EEqE8IPYFf3B",
};

const razorPayLive = {
  keyId: "rzp_live_nFOiIYEWWcdWjf",
  keySecret: "0xMpz1K5z4KKDz7w5gGmqnYw",
};

const razorPay =
  import.meta.env.VITE_APP_ENV === "production"
    ? razorPayLive
    : import.meta.env.VITE_APP_ENV === "development"
    ? razorPayTest
    : razorPayTest;

const env =
  import.meta.env.VITE_APP_ENV === "production"
    ? production
    : import.meta.env.VITE_APP_ENV === "development"
    ? development
    : local;
const paymentButton = true;
const bookingPerPage = 200000;

const smsSender = import.meta.env.REACT_APP_ENV === "production" || false;

export const UserRole = "ADMIN";
export function isAuthenticated() {
  return !!localStorage.getItem("AuthToken");
}
export const vehicleId =
  typeof JSON.parse(localStorage.getItem("vehicleId") || "{}") !== "number"
    ? undefined
    : JSON.parse(localStorage.getItem("vehicleId") || "{}");
export const config = {
  ...env,
  smsBaseUrl: "https://2factor.in/API/V1",
  smsKey: "/53653e94-a6ff-11ea-9fa5-0200cd936042",
  smsUrl: "https://2factor.in/API/V1/53653e94-a6ff-11ea-9fa5-0200cd936042",
  razorPay,
  paymentButton,
  smsSender,
  bookingPerPage,
};
