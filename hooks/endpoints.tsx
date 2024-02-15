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
export const getLiveEvents = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/event/live`, {
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
export const scan = async (token, userId, eventId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/scan`,
      { userId: userId, eventId: eventId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
