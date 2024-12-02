import { Marker } from "../types";

const API_URL = "http://10.131.78.64:3000/pins";
// const API_URL = "http://192.168.1.12:3000/pins";

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
