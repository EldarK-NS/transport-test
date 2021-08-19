import React, { useState } from "react";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export default function SearchResultsScreen() {
  const [showFilter, setShowFilter] = useState(false);
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={[styles.headerButton, { marginRight: 10 }]}
          onPress={() => setShowFilter((prevState) => !prevState)}
        >
          <Text style={styles.headerButtonText}>Фильтр</Text>
          <MaterialCommunityIcons
            name="filter-variant"
            size={24}
            color="white"
            style={{ marginRight: 5 }}
          />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      {showFilter && (
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
            style={{ marginVertical: 10 }}
          />
        </View>
      )}
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
  headerButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "IBM-Regular",
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
});
