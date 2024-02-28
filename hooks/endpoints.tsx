import axios from "axios";

const BASE_URL = "https://scanner-api.fly.dev";

//get user profile
export const getUserProfile = async (token : string) => {
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
export const getEvents = async (token : string) => {
  try {
    const response = await axios.get(`${BASE_URL}/org/events`, {
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

//get live events
export const getLiveEvents = async (token : string) => {
  try {
    const response = await axios.get(`${BASE_URL}/org/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Filter events where live is true
    const liveEvents = response.data.filter(event => event.live === true);
    return liveEvents;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

//create a scan object
export const postScan = async (token : string, userId : string, eventId : string) => {
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

//example number of accepted users at a live event
export const getAcceptedUsersCount = async (token : string, eventId : string) => {
  try {
    const response = await axios.get(`${BASE_URL}/event/${eventId}/accepted-count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching accepted users count:", error);
    throw error;
  }
};

//get all users scanned at a live event
export const getLiveScans = async (token : string, eventId : string) => {
  try {
    const response = await axios.get(`${BASE_URL}/scans/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users at party:", error);
    throw error;
  }
};

//get invites


