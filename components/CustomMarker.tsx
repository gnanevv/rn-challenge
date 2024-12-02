import React, { memo } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { Marker as MarkerType } from "../types";

interface CustomMarkerProps {
  marker: MarkerType;
  pinStyle: string;
  onPress: () => void;
}

const CustomMarker: React.FC<CustomMarkerProps> = memo(
  ({ marker, pinStyle, onPress }) => {
    const getPinColor = () => {
      switch (pinStyle) {
        case "custom1":
          return "#FF5733";
        case "custom2":
          return "#33FF57";
        default:
          return "#3366FF";
      }
    };

    return (
      <Marker
        testID="mock-marker"
        coordinate={{
          latitude: marker.latitude,
          longitude: marker.longitude,
        }}
        onPress={onPress}
        tracksViewChanges={false}
      >
        <View
          style={[styles.markerContainer, { backgroundColor: getPinColor() }]}
        >
          <Ionicons name="flash" size={16} color="white" />
        </View>
      </Marker>
    );
  }
);

const styles = StyleSheet.create({
  markerContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export default CustomMarker;
