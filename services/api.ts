import { Marker } from "../types";

const API_URL = "http://localhost:3000/pins";
// android needs to be on the machine IP in order to not fail network calls
// const API_URL = "http://10.131.78.64:3000/pins";

export const fetchMarkersFromAPI = async (): Promise<Marker[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching markers:", error);
    throw error;
  }
};
