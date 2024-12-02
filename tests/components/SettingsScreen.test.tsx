import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import SettingsScreen from "../../app/(drawer)/settings";
import { useDispatch } from "react-redux";
import { Store, UnknownAction } from "@reduxjs/toolkit";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

const mockDispatch = jest.fn();
(useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

const mockStore = configureStore([]);

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe("SettingsScreen", () => {
  let store:
    | MockStoreEnhanced<unknown, {}>
    | Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    store = mockStore({
      settings: { pinStyle: "default" },
    });
    mockDispatch.mockClear();
  });

  it("renders correctly", () => {
    const { getByText } = render(
      <Provider store={store}>
        <SettingsScreen />
      </Provider>
    );
    expect(getByText("Choose Pin Style")).toBeTruthy();
  });
});
