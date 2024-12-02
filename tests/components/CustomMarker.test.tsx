import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CustomMarker from "../../components/CustomMarker";
import { Marker } from "../../types";

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

const mockMarker: Marker = {
  _id: "1",
  title: "Test Marker",
  latitude: 0,
  longitude: 0,
  connectors: [{ type: "J1772", status: "available" }],
};

describe("CustomMarker", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <CustomMarker marker={mockMarker} pinStyle="default" onPress={() => {}} />
    );
    expect(getByTestId("mock-marker")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <CustomMarker
        marker={mockMarker}
        pinStyle="default"
        onPress={mockOnPress}
      />
    );
    fireEvent.press(getByTestId("mock-marker"));
    expect(mockOnPress).toHaveBeenCalled();
  });
});
