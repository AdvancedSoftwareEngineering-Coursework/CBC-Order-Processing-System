import api from "./api";

export const login = async (data: { username: string; password: string }) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Login failed";
  }
};
