import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Marker as Markertest, Region } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import ClusteredMapView from "react-native-map-clustering";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootState } from "../../redux/store";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";
import MarkerPopup, { MarkerPopupRef } from "../../components/MarkerPopup";
import { fetchMarkers } from "../../redux/slices/markersSlice";
import { filterMarkers } from "../../utils/mapHelpers";
import { Marker } from "../../types";
import CustomMarker from "../../components/CustomMarker";
import OfflineAlert from "../../components/OfflineAlert";
import { DrawerNavigationProp } from "@react-navigation/drawer";
export type RootParamList = {
  Map: undefined;
  Settings: undefined;
  Filters: undefined;
};
export default function MapScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation<DrawerNavigationProp<RootParamList>>();
  const markers = useSelector((state: RootState) => state.markers.markers);
  const filters = useSelector((state: RootState) => state.filters);
  const pinStyle = useSelector((state: RootState) => state.settings.pinStyle);
  const [region, setRegion] = useState<Region>({
    latitude: 42.6977,
    longitude: 23.3219,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const isOffline = useNetworkStatus();
  const popupRef = useRef<MarkerPopupRef>(null);

  useEffect(() => {
    console.log("Status: ", isOffline);
  }, [isOffline]);

  useEffect(() => {
    dispatch(fetchMarkers() as any);
  }, [dispatch]);

  const visibleMarkers = useMemo(() => {
    return filterMarkers(markers, region, filters);
  }, [markers, region, filters]);
  console.log(visibleMarkers);
  const onRegionChangeComplete = useCallback((newRegion: Region) => {
    setRegion(newRegion);
  }, []);

  const handleMarkerPress = useCallback(
    (marker: Marker) => {
      popupRef.current?.show(marker);
    },
    [popupRef]
  );

  const renderMarker = useCallback(
    (marker: Marker) => (
      <CustomMarker
        key={marker._id}
        marker={marker}
        pinStyle={pinStyle}
        onPress={() => handleMarkerPress(marker)}
      />
    ),
    [pinStyle, handleMarkerPress]
  );
  console.log(visibleMarkers);
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        {isOffline && <OfflineAlert />}
        <ClusteredMapView
          style={styles.map}
          initialRegion={region}
          clusterColor={"#000"}
          clusterTextColor={"#fff"}
          //   clusteringEnabled={true}
          //   spiralEnabled={true}
          radius={50}
          //   extent={700}
          //   minZoom={1}
          //   maxZoom={20}
          onRegionChangeComplete={onRegionChangeComplete}
          showsUserLocation={true}
          showsMyLocationButton={true}
          mapType={"standard"}
          //   onTouchStart={() => popupRef.current?.hide()}
        >
          {visibleMarkers.map(renderMarker)}
          {/* <Markertest coordinate={{ latitude: 52.4, longitude: 18.7 }} />
          <Markertest coordinate={{ latitude: 52.1, longitude: 18.4 }} />
          <Markertest coordinate={{ latitude: 52.6, longitude: 18.3 }} />
          <Markertest coordinate={{ latitude: 51.6, longitude: 18.0 }} />
          <Markertest coordinate={{ latitude: 53.1, longitude: 18.8 }} />
          <Markertest coordinate={{ latitude: 52.9, longitude: 19.4 }} />
          <Markertest coordinate={{ latitude: 52.2, longitude: 21 }} />
          <Markertest coordinate={{ latitude: 52.4, longitude: 21 }} />
          <Markertest coordinate={{ latitude: 51.8, longitude: 20 }} /> */}
        </ClusteredMapView>
        <MarkerPopup ref={popupRef} onClose={() => popupRef.current?.hide()} />
        <View style={styles.header}>
          <TouchableOpacity
            testID="left-drawer-button"
            style={styles.iconButton}
            onPress={() => navigation.openDrawer()}
          >
            <Ionicons name="menu" size={24} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity
            testID="right-drawer-button"
            style={styles.iconButton}
            onPress={() => navigation.navigate("Filters")}
          >
            <Ionicons name="filter" size={24} color={"#000"} />
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
