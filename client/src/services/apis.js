

const BASE_URL = import.meta.env.VITE_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {

  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",

}