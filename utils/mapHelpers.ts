import { Region } from "react-native-maps";
import { Marker } from "../types";

export const filterMarkers = (
  markers: Marker[],
  region: Region,
  filters: { connectorTypes: string[]; connectorStatuses: string[] }
): Marker[] => {
  console.log("test", markers);
  return markers.filter((marker) => {
    const isInRegion =
      marker.latitude >= region.latitude - region.latitudeDelta / 2 &&
      marker.latitude <= region.latitude + region.latitudeDelta / 2 &&
      marker.longitude >= region.longitude - region.longitudeDelta / 2 &&
      marker.longitude <= region.longitude + region.longitudeDelta / 2;

    const hasMatchingConnector = marker.connectors.some(
      (connector) =>
        (filters.connectorTypes.length === 0 ||
          filters.connectorTypes.includes(connector.type)) &&
        (filters.connectorStatuses.length === 0 ||
          filters.connectorStatuses.includes(connector.status))
    );

    return isInRegion && hasMatchingConnector;
  });
};
