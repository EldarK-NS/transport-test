import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { fontLoading } from "./src/utils/fontLoading";
import AppLoading from "expo-app-loading";
import RootNavigator from "./navigation/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={fontLoading}
        onFinish={() => setIsReady(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <RootNavigator />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: "IBM-SemiBold",
  },
});
