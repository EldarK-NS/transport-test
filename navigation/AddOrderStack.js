import React from "react";
import { Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../src/screens/homeScreen/HomeScreen";
import SearchResultsScreen from "../src/screens/searchResultsScreen/SearchResultsScreen";
import { Pressable } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import AddOrderScreen from "./../src/screens/addOrderScreen/AddOrderScreen";
import OrderScreen from "./../src/screens/orderScreen/OrderScreen";

const Stack = createStackNavigator();

export default function AddOrderStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#008EFF",
        },
        headerTitleStyle: {
          fontFamily: "IBM-SemiBold",
          color: "white",
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="AddOrder" component={AddOrderScreen} />
      <Stack.Screen name="Order" component={OrderScreen} />
      {/* <Stack.Screen
        name="SearchResult"
        component={SearchResultsScreen}
        options={({ navigation, route }) => ({
          headerTitle: route.params.title,
          headerLeft: () => (
            <Pressable
              style={styles.leftButton}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="left" size={24} color="white" />
              <Text style={styles.buttonText}>Поиск</Text>
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              style={[styles.leftButton, { marginRight: 10 }]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Фильтр</Text>
              <MaterialCommunityIcons
                name="filter-variant"
                size={24}
                color="white"
              />
            </Pressable>
          ),
        })}
      /> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  leftButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "IBM-Regular",
  },
});
