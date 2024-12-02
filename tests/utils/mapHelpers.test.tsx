import { filterMarkers } from "../../utils/mapHelpers";
import { Marker } from "../../types";

describe("mapHelpers", () => {
  const mockMarkers: Marker[] = [
    {
      _id: "1",
      title: "Marker 1",
      latitude: 0,
      longitude: 0,
      connectors: [{ type: "J1772", status: "available" }],
    },
    {
      _id: "2",
      title: "Marker 2",
      latitude: 1,
      longitude: 1,
      connectors: [{ type: "Type2", status: "unavailable" }],
    },
  ];

  const mockRegion = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 2,
    longitudeDelta: 2,
  };

  it("should filter markers based on region", () => {
    const filters = { connectorTypes: [], connectorStatuses: [] };
    const result = filterMarkers(mockMarkers, mockRegion, filters);
    expect(result).toEqual(mockMarkers);
  });

  it("should filter markers based on connector types", () => {
    const filters = { connectorTypes: ["J1772"], connectorStatuses: [] };
    const result = filterMarkers(mockMarkers, mockRegion, filters);
    expect(result).toEqual([mockMarkers[0]]);
  });

  it("should filter markers based on connector statuses", () => {
    const filters = { connectorTypes: [], connectorStatuses: ["available"] };
    const result = filterMarkers(mockMarkers, mockRegion, filters);
    expect(result).toEqual([mockMarkers[0]]);
  });

  it("should return empty array when no markers match filters", () => {
    const filters = { connectorTypes: ["CCS 2"], connectorStatuses: [] };
    const result = filterMarkers(mockMarkers, mockRegion, filters);
    expect(result).toEqual([]);
  });
});
