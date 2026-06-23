import api from "./api";

// ---------------- Admin APIs ----------------
export const login = async (loginData) => {
    const response = await api.post("/auth/login", loginData);
    return response.data;
};

export const verifyOtp = async (payload) => {
    const response = await api.post("/auth/verify-otp", payload);
    return response.data;
};



export const getLocalData = (userType, secretkey) => {
    localStorage.setItem("UserType", userType);
    localStorage.setItem("secretkey", secretkey);
};

export const getUser = () => {
    try {
        const u = localStorage.getItem("user");
        return u ? JSON.parse(u) : { username: "guest", role: "" };
    } catch {
        return { username: "guest", role: "" };
    }
};

export const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("UserType");
    localStorage.removeItem("token");
    localStorage.removeItem("tempUser");
    localStorage.removeItem("secretkey");
};

export const addDepartments = async (data) => {
    const response = await api.post("/departments", data);
    return response.data;
};
export const getDepartments = async (page = 1, limit = 10) => {
    const res = await api.get(`/departments/?page=${page}&limit=${limit}`);
    return res.data;
};
export const getDepartmentsById = async (id) => {
    const res = await api.get(`/departments/${id}`);
    return res.data;
};
export const updateDepartment = async ({ id, ...data }) => {
    const res = await api.put(`/departments/${id}`, data);
    return res.data;
};

export const deleteDepartment = async (id) => {
    const res = await api.delete(`/departments/${id}`);
    return res.data;
};