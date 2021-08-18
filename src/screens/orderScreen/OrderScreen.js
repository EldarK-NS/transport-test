import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function OrderScreen() {
  const [from, setFrom] = useState("Откуда");
  const [destin, setDestin] = useState("Куда");
  const [date, setDate] = useState("Выберите дату");
  const [trasport, setTrasport] = useState("Любой");
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Добавить груз</Text>
        <Text style={styles.subTitle}>
          Заполните всю необходимую информацию о вашем грузе
        </Text>
      </View>
      <View style={styles.inputRow}>
        <View>
          <Text style={styles.label}>Откуда</Text>
          <TextInput
            style={styles.input}
            //  onChangeText={onChangeNumber}
            value={from}
            placeholder="Откуда"
            //  keyboardType="numeric"
          />
        </View>
        <Entypo name="chevron-right" size={15} color="#A2A9B2" />
      </View>
      <View style={styles.inputRow}>
        <View>
          <Text style={styles.label}>Куда</Text>
          <TextInput
            style={styles.input}
            //  onChangeText={onChangeNumber}
            value={destin}
            placeholder="Куда"
          />
        </View>
        <Entypo name="chevron-right" size={15} color="#A2A9B2" />
      </View>
      <View style={styles.inputRow}>
        <View>
          <Text style={styles.label}>Дата погрузки</Text>
          <TextInput
            style={styles.input}
            //  onChangeText={onChangeNumber}
            value={date}
            placeholder="Выберите дату"
          />
        </View>
        <Entypo name="chevron-right" size={15} color="#A2A9B2" />
      </View>
      <View style={styles.inputRow}>
        <View>
          <Text style={styles.label}>Нужен транспорт</Text>
          <TextInput
            style={styles.input}
            //  onChangeText={onChangeNumber}
            value={trasport}
            placeholder="Любой"
          />
        </View>
        <Entypo name="chevron-right" size={15} color="#A2A9B2" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  inputRow: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomColor: "#979797",
    borderBottomWidth: 0.5,
  },
  input: {
    //  width: "90%",
  },
  label: {
    fontFamily: "IBM-Regular",
    fontSize: 13,
    color: "#A2A9B2",
    marginLeft: 15,
  },
});
