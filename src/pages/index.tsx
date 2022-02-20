import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "../hooks/useCachedResources";
import useColorScheme from "../hooks/useColorScheme";
import Navigation from "../navigation";

import "redux";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "../store";
import Drawer from "../navigation/Drawer";

export default function Index() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <SafeAreaProvider>
            <StatusBar />
            <Navigation colorScheme={colorScheme} />
        </SafeAreaProvider>
    );
  }
}
