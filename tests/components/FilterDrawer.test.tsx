import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import FilterDrawer from "../../components/FilterDrawer";
import { useDispatch } from "react-redux";
import { Store, UnknownAction } from "@reduxjs/toolkit";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const mockDispatch = jest.fn();
(useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

const mockStore = configureStore([]);

describe("FilterDrawer", () => {
  let store:
    | MockStoreEnhanced<unknown, {}>
    | Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    store = mockStore({
      filters: {
        connectorTypes: [],
        connectorStatuses: [],
      },
    });
    mockDispatch.mockClear();
  });

  it("renders correctly", () => {
    const { getByText } = render(
      <Provider store={store}>
        <FilterDrawer />
      </Provider>
    );
    expect(getByText("Filter Connectors")).toBeTruthy();
  });

  it('dispatches filter actions when "Apply Filters" is pressed', () => {
    const { getByText } = render(
      <Provider store={store}>
        <FilterDrawer />
      </Provider>
    );

    fireEvent.press(getByText("J1772"));
    fireEvent.press(getByText("Available"));
    fireEvent.press(getByText("Apply Filters"));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "filters/setConnectorTypes",
      payload: ["J1772"],
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "filters/setConnectorStatuses",
      payload: ["available"],
    });
  });

  it("toggles connector statuses", () => {
    const { getByText } = render(
      <Provider store={store}>
        <FilterDrawer />
      </Provider>
    );
    fireEvent.press(getByText("Available"));
    fireEvent.press(getByText("Apply Filters"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "filters/setConnectorStatuses",
      payload: ["available"],
    });
  });
});
