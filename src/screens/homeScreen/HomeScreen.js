import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { filterItemsList, usefulWidgets } from "../../../assets/data";
import SearchSection from "../../components/searchSection/SearchSection";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.mainPart}>
        <FlatList
          data={filterItemsList}
          renderItem={({ item }) => (
            <SearchSection data={item} desc={true} path={"SearchResult"} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.middlePart}>
        <Text style={styles.middlePartTitle}>ПОЛЕЗНЫЕ ВИДЖЕТЫ</Text>
      </View>
      <View style={styles.downPart}>
        <FlatList
          data={usefulWidgets}
          renderItem={({ item }) => <SearchSection data={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //  flexDirection: "column",
    width: "100%",
  },
  middlePart: {
    height: 60,
    width: "100%",
    backgroundColor: "#F0F4F8",
    justifyContent: "flex-end",
  },
  middlePartTitle: {
    color: "#7c7f80",
    fontFamily: "IBM-Regular",
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 10,
  },
});
