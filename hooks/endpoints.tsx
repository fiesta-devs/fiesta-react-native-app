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
export const postScan = async (token, userId, eventId) => {
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
