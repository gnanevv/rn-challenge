import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
} from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Marker } from "../types";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

interface MarkerPopupProps {
  onClose: () => void;
}

export interface MarkerPopupRef {
  show: (marker: Marker) => void;
  hide: () => void;
}

const MarkerPopup = forwardRef<MarkerPopupRef, MarkerPopupProps>(
  ({ onClose }, ref) => {
    const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
    const [currentMarker, setCurrentMarker] = React.useState<Marker | null>(
      null
    );

    const snapPoints = useMemo(() => ["55%", "50%"], []);

    const handleSheetChanges = useCallback(
      (index: number) => {
        if (index === -1) onClose();
      },
      [onClose]
    );

    useImperativeHandle(ref, () => ({
      show: (marker: Marker) => {
        setCurrentMarker(marker); // Update the state first
        setTimeout(() => {
          bottomSheetModalRef.current?.present();
        }, 0); // Ensure state update completes before presenting
      },
      hide: () => {
        bottomSheetModalRef.current?.dismiss();
        setCurrentMarker(null);
      },
    }));

    const renderBackdrop = useCallback(
      (
        props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps
      ) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.7}
        />
      ),
      []
    );

    if (!currentMarker) return null;

    return (
      <BottomSheetModalProvider test-id="mock-marker">
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={{
            backgroundColor: "#00000040",
          }}
          backgroundStyle={{
            backgroundColor: "#fff",
          }}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{currentMarker.title}</Text>
              <Text style={styles.text}>
                Latitude: {currentMarker.latitude}
              </Text>
              <Text style={styles.text}>
                Longitude: {currentMarker.longitude}
              </Text>
              <Text style={styles.subtitle}>Connectors:</Text>
              {currentMarker.connectors.map((connector, index) => (
                <View key={index} style={styles.connector}>
                  <Text style={styles.text}>Type: {connector.type}</Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        color:
                          connector.status === "available"
                            ? "#2E7D32"
                            : "#c62828",
                      },
                    ]}
                  >
                    Status: {connector.status}
                  </Text>
                </View>
              ))}
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  connector: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
});

export default MarkerPopup;
