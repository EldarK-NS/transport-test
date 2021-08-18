import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import moment from "moment";
import {
  FontAwesome5,
  AntDesign,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";

export default function SearchSectionResult({ data }) {
  const info = data.details[0];
  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  const ratingsStar = (num, max) => {
    let rating = [];
    for (let i = 1; i < max; i++) {
      let x = max - num - i;
      rating.push(x);
    }
    return rating.reverse();
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.leftSide}>
          <Text style={styles.title}>{info.from_string} </Text>
          <FontAwesome5
            name="arrow-right"
            size={12}
            color="black"
            style={styles.arrowIcon}
          />
          <Text style={styles.title}>{info.to_string}</Text>
          <Text style={styles.distance}>{info.distance}</Text>
        </View>
        <View style={styles.rightSide}>
          <Text style={styles.price}>
            {numberWithSpaces(info.price)}
            {""}
            <Text style={styles.currency}> &#8376;</Text>
          </Text>
          <Text style={styles.tax}>без НДС</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.leftSide}>
          <Text style={styles.text}>
            {info.net} тн, {info.volume} m3, {info.type_transport}
          </Text>
          {/* //TODO: date to russian*/}
          <Text style={styles.text}>
            {moment(info.start_date).format("ll")}, {info.title}
          </Text>
        </View>
        <View style={styles.rightSide}>
          <AntDesign
            name="staro"
            size={22}
            color="#A2A9B2"
            style={styles.iconStar}
          />
        </View>
      </View>
      <View style={styles.row}>
        {info.rating ? (
          <View style={styles.stars}>
            {ratingsStar(info.rating, 6).map((item, index) => {
              return (
                <FontAwesome
                  name="star"
                  size={17}
                  color="#43CC8E"
                  key={index}
                  style={styles.smallStar}
                />
              );
            })}
            <Text style={[styles.tax, { marginLeft: 4 }]}>
              ТОО &laquo;ОУСА Альянс&raquo;
            </Text>
          </View>
        ) : (
          <View style={styles.stars}>
            <MaterialIcons name="lock" size={14} color="#A2A9B2" />
            <Text style={[styles.tax, { marginLeft: 2, fontSize: 12 }]}>
              Контакты доступны после регистрации
            </Text>
          </View>
        )}
        <Text style={styles.tax}>
          изм. {moment(data.updated_at).format("LT")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 26,
    borderBottomWidth: 1,
    borderBottomColor: "#DFE2E5",
    paddingTop: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  leftSide: {
    flexDirection: "row",
    maxWidth: "70%",
    flexWrap: "wrap",
    alignItems: "center",
  },
  title: {
    color: "#20273D",
    fontSize: 17,
    fontFamily: "IBM-Medium",
    paddingRight: 3,
  },
  arrowIcon: {
    marginHorizontal: 3,
  },
  distance: {
    color: "#008EFF",
    fontSize: 14,
    fontFamily: "IBM-Regular",
  },
  rightSide: {
    flexDirection: "column",
    alignItems: "center",
  },
  price: {
    color: "#20273D",
    fontSize: 14,
    fontFamily: "IBM-Medium",
    paddingRight: 3,
  },
  currency: {
    color: "#20273D",
    fontSize: 12,
    fontFamily: "IBM-Medium",
  },
  tax: {
    color: "#A2A9B2",
    fontFamily: "IBM-Medium",
    fontSize: 12,
    justifyContent: "flex-end",
  },
  iconStar: {
    marginRight: 5,
  },
  text: {
    color: "#20273D",
    fontFamily: "IBM-Medium",
    fontSize: 12,
  },
  stars: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallStar: {
    marginLeft: 2,
  },
});
