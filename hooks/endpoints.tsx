import axios from "axios";

//const BASE_URL = "https://fiesta-api.fly.dev"; //LIVE
//const BASE_URL = "http://localhost:8080"; //TESTING
const BASE_URL = "https://fiesta-api-preview.fly.dev" //PREVIEW

interface User {
  firstName: string;
  lastName: string;
}

//get user profile
// export const getUserProfile = async (token: string) => {
//  // try {
//     const response = await axios.get(`${BASE_URL}/user`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log(response);
//   //   return response.data;
//   // } catch (error) {
//   //   console.error("Error fetching data:", error);
//   //   throw error;
//   // }
// };

// Function to post user data
export const createUser = async (userData: User, token: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/user`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Function to post user profile picture
export const uploadProfilePic = async (file: string, token: string) => {
  try {
    const formData = new FormData();
    formData.append('profilePicture', file);

    const response = await axios.post(`${BASE_URL}/user/profile-pic`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};

export const getMe = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const getUserProfile = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

//get admin profile
export const geOrgProfile = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/org/user`, {
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

//get invites
export const getInvites = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/invites`, {
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

//get events
// export const getEvents = async (token: string) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/events`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     throw error;
//   }
// };

//get events for an organization
export const getOrgEvents = async (token: string) => {
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
export const getLiveEvents = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/org/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Filter events where live is true
    const liveEvents = response.data.filter((event) => event.live === true);
    return liveEvents;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

//create a scan object

export const postScan = async (
  token: string,
  userId: string,
  eventId: string
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/org/events/${eventId}/scans`,
      { userId: userId },
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
export const getAcceptedUsersCount = async (token: string, eventId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/event/${eventId}/accepted-count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching accepted users count:", error);
    throw error;
  }
};

//get all users scanned at a live event
export const getLiveScans = async (token: string, eventId: string) => {
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
