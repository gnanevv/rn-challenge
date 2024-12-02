import React from "react";
import { render } from "@testing-library/react-native";
import OfflineAlert from "../../components/OfflineAlert";

describe("OfflineAlert", () => {
  it("renders correctly", () => {
    const { getByText } = render(<OfflineAlert />);
    expect(
      getByText("You are offline. Information may be outdated.")
    ).toBeTruthy();
  });
});
