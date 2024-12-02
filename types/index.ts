export interface Connector {
  type: "J1772" | "Type2" | "CCS 2" | "Type 3";
  status: "available" | "unavailable";
}

export interface Marker {
  _id: string;
  title: string;
  latitude: number;
  longitude: number;
  connectors: Connector[];
}
