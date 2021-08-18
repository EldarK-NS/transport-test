import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { filterItemsList } from "../../../assets/data";
import SearchSection from "../../components/searchSection/SearchSection";

export default function AddOrderScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Выберите категорию</Text>
        <Text style={styles.subTitle}>
          Выберите раздел, в котором вы хотите разместить объявление
        </Text>
      </View>
      <View>
        <View style={styles.mainPart}>
          <FlatList
            data={filterItemsList}
            renderItem={({ item }) => (
              <SearchSection data={item} desc={false} path={"Order"} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    alignItems: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  title: {
    fontFamily: "IBM-Medium",
    fontSize: 21,
    color: "#20273D",
    width: "80%",
    textAlign: "center",
  },
  subTitle: {
    fontFamily: "IBM-Regular",
    fontSize: 14,
    color: "#A2A9B2",
    width: "80%",
    textAlign: "center",
  },
  mainPart: {},
});
