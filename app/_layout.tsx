import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapScreen from "./(drawer)";
import SettingsScreen from "./(drawer)/settings";
import { store } from "../redux/store";
import { setPinStyle } from "../redux/slices/settingsSlice";
import FilterDrawer from "../components/FilterDrawer";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Drawer Navigator for Left Drawer (Main App Navigation)
function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Map"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="Map"
        component={MapScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

// Root Layout with Modal for Filters
export default function RootLayout() {
  useEffect(() => {
    const loadSavedPinStyle = async () => {
      try {
        const savedStyle = await AsyncStorage.getItem("pinStyle");
        if (savedStyle !== null) {
          store.dispatch(setPinStyle(savedStyle));
        }
      } catch (error) {
        console.error("Error loading saved pin style:", error);
      }
    };

    loadSavedPinStyle();
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack.Navigator>
          <Stack.Screen
            name="MainDrawer"
            component={MainDrawer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Filters"
            component={FilterDrawer}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </GestureHandlerRootView>
    </Provider>
  );
}
