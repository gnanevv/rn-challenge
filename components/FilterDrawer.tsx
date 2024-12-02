import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setConnectorTypes,
  setConnectorStatuses,
} from "../redux/slices/filterSlice";
import { RootState } from "../redux/store";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const connectorTypes = ["J1772", "Type2", "CCS 2", "Type 3"];
const connectorStatuses = ["available", "unavailable"];

const FilterDrawer: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const [localTypes, setLocalTypes] = useState(filters.connectorTypes);
  const [localStatuses, setLocalStatuses] = useState(filters.connectorStatuses);
  // const [minPower, setMinPower] = useState(0);

  const toggleType = (type: string) => {
    setLocalTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleStatus = (status: string) => {
    setLocalStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const applyFilters = () => {
    dispatch(setConnectorTypes(localTypes));
    dispatch(setConnectorStatuses(localStatuses));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={"#000"} />
        </TouchableOpacity>
        <Text style={styles.title}>Filter Connectors</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connector Types</Text>
          {connectorTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.option,
                localTypes.includes(type) && styles.selectedOption,
              ]}
              onPress={() => toggleType(type)}
            >
              <Ionicons
                name="flash"
                size={20}
                color={localTypes.includes(type) ? "#fff" : "#000"}
              />
              <Text
                style={[
                  styles.optionText,
                  localTypes.includes(type) && styles.selectedOptionText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connector Status</Text>
          {connectorStatuses.map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.option,
                localStatuses.includes(status) && styles.selectedOption,
              ]}
              onPress={() => toggleStatus(status)}
            >
              <Ionicons
                name={
                  status === "available" ? "checkmark-circle" : "close-circle"
                }
                size={20}
                color={localStatuses.includes(status) ? "#fff" : "#000"}
              />
              <Text
                style={[
                  styles.optionText,
                  localStatuses.includes(status) && styles.selectedOptionText,
                ]}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#000",
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    marginHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
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
  },
  selectedOptionText: {
    color: "#fff",
  },
  powerTypes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  powerType: {
    flex: 1,
    margin: 5,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    alignItems: "center",
  },
  powerTypeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  powerValue: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
  },
  applyButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  darkApplyButton: {
    backgroundColor: "#0A84FF",
  },
  applyButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default FilterDrawer;
