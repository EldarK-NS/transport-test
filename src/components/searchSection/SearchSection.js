import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export default function SearchSection({ data, desc, path }) {
  const navigation = useNavigation();

  const handlerClick = () => {
    navigation.navigate(path, { title: data.title });
  };
  return (
    <TouchableOpacity onPress={handlerClick}>
      <View style={styles.container}>
        <View style={styles.leftSide}>
          <MaterialCommunityIcons name={data.icon} size={30} color="#008EFF" />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{data.title}</Text>
            {desc ? <Text style={styles.descr}>{data.descr}</Text> : null}
          </View>
        </View>
        <View style={styles.rightSide}>
          <Entypo name="chevron-right" size={15} color="#A2A9B2" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomColor: "#979797",
    borderBottomWidth: 1,
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 20,
  },
  title: {
    color: "#20273D",
    fontSize: 17,
    fontFamily: "IBM-Medium",
  },
  descr: {
    color: "#A2A9B2",
    fontSize: 13,
    fontFamily: "IBM-Regular",
  },
  rightSide: {},
});
