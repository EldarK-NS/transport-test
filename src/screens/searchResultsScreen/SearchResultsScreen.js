import React from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SearchSectionResult from "../../components/searchSectionResult/SearchSectionResult";
import { searchResults, buttonsArray } from "./../../../assets/data";

export default function SearchResultsScreen() {
  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={buttonsArray}
          renderItem={({ item }) => (
            <Pressable style={styles.filterButton}>
              <Text style={styles.buttonText}>{item.title}</Text>
            </Pressable>
          )}
          keyExtractor={(item) => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={searchResults}
          renderItem={({ item }) => <SearchSectionResult data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  filterButton: {
    borderWidth: 0.5,
    width: 80,
    padding: 5,
    backgroundColor: "#EAF8FF",
    borderRadius: 15,
    marginTop: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#20618C",
    fontSize: 12,
    fontFamily: "IBM-Medium",
  },
});
