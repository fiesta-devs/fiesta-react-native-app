import axios from "axios";

const BASE_URL = "https://scanner-api.fly.dev";

//get user profile
export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

//get events
export const getEvents = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Example PUT request
export const updateData = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/data/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

// Example DELETE request
export const deleteData = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/data/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
