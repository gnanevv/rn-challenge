import React from "react";
import "@testing-library/jest-native/extend-expect";
import "react-native-gesture-handler/jestSetup";

// jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// // Mock AsyncStorage
// jest.mock('@react-native-async-storage/async-storage', () =>
//   require('@react-native-async-storage/async-storage/jest/async-storage-mock')
// );

// Mock react-redux
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock("react-native", () => {
  const RN = jest.requireActual("react-native");

  RN.View = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-view">{children}</div>
  );

  return RN;
});

jest.mock("react-native-maps", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    Marker: ({ children, ...props }: { children: any }) => (
      <View testID="mock-marker" {...props}>
        {children}
      </View>
    ),
  };
});

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: "granted" })
  ),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({ coords: { latitude: 37.78825, longitude: -122.4324 } })
  ),
}));

jest.mock("@react-native-community/netinfo", () => ({
  addEventListener: jest.fn(),
  fetch: jest.fn(),
}));

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock("@gorhom/bottom-sheet", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    __esModule: true,
    BottomSheetModalProvider: ({ children }: { children: any }) => (
      <View>{children}</View>
    ),
    BottomSheetModal: React.forwardRef(() => <View />),
    BottomSheetBackdrop: () => <View />,
  };
});
jest.mock("react-native-gesture-handler", () => {
  const View = require("react-native").View;
  return {
    __esModule: true,
    GestureHandlerRootView: View,
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    PanGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    LongPressGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    createNativeWrapper: jest.fn(),
    Directions: {},
    attachGestureHandler: jest.fn(),
    detachGestureHandler: jest.fn(),
    updateGestureHandler: jest.fn(),
    install: jest.fn(),
  };
});
jest.mock("react-native/Libraries/Text/Text", () => {
  const React = jest.requireActual("react");
  return (props: any) => React.createElement("Text", props, props.children);
});

jest.mock("expo-font", () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true),
}));

jest.mock("@expo/vector-icons", () => {
  const MockedIcons = {
    createIconSet: jest.fn(),
    Ionicons: jest.fn((props) => <div {...props} />),
  };
  return MockedIcons;
});

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: jest.fn(() => ({ navigate: jest.fn(), goBack: jest.fn() })),
  };
});

jest.mock(
  "react-native/Libraries/Animated/NativeAnimatedHelper",
  () => ({
    addListener: jest.fn(),
    removeListeners: jest.fn(),
  }),
  { virtual: true }
);
