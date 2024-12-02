import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { RootState } from "../../redux/store";
import { setPinStyle } from "../../redux/slices/settingsSlice";
import { useNavigation } from "@react-navigation/native";

const pinStyles = ["default", "custom1", "custom2"];

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const currentPinStyle = useSelector(
    (state: RootState) => state.settings.pinStyle
  );
  const navigation = useNavigation();

  useEffect(() => {
    const loadSavedPinStyle = async () => {
      try {
        const savedStyle = await AsyncStorage.getItem("pinStyle");
        if (savedStyle !== null) {
          dispatch(setPinStyle(savedStyle));
        }
      } catch (error) {
        console.error("Error loading saved pin style:", error);
      }
    };

    loadSavedPinStyle();
  }, [dispatch]);

  const handlePinStyleChange = async (style: string) => {
    try {
      await AsyncStorage.setItem("pinStyle", style);
      dispatch(setPinStyle(style));
    } catch (error) {
      console.error("Error saving pin style:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={"#000"} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Choose Pin Style</Text>

      {pinStyles.map((style) => (
        <TouchableOpacity
          key={style}
          style={[
            styles.option,
            currentPinStyle === style && styles.selectedOption,
          ]}
          onPress={() => handlePinStyleChange(style)}
        >
          <Ionicons
            name={
              style === "default"
                ? "location"
                : style === "custom1"
                ? "car"
                : "flash"
            }
            size={24}
            color={currentPinStyle === style ? "#fff" : "#000"}
          />
          <Text
            style={[
              styles.optionText,
              currentPinStyle === style && styles.selectedOptionText,
            ]}
          >
            {style}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
    backgroundColor: "#f5f5f5",
  },
  darkContainer: {
    backgroundColor: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  darkOption: {
    backgroundColor: "#222",
  },
  selectedOption: {
    backgroundColor: "#007AFF",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  selectedOptionText: {
    color: "#fff",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  darkBackButton: {
    backgroundColor: "#222",
  },
  backButtonText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
});
