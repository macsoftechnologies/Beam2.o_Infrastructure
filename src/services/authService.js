import api from "./api";

// ---------------- Admin APIs ----------------
export const loginAdmin = async (loginData) => {
    const response = await api.post("/admin/loginadmin", loginData);
    return response.data;
};

// export const verifyAdmin = async (payload) => {
//   const response = await api.post("/admin/verifyadmin", payload);
//   return response.data;
// };

// export const adminForgotPassword = async (Forgotload) => {
//   const response = await api.post("/admin/adminforgotpassword", Forgotload);
//   return response.data;
// };