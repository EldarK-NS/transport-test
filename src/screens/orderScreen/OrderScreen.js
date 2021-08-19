import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

export default function OrderScreen() {
  const [fromCounty, setFromCountry] = useState("1");
  const [fromCity, setFromCity] = useState("1");

  const [destin, setDestin] = useState("");

  const [date, setDate] = useState("");
  const [trasport, setTrasport] = useState("");
  const [weightFrom, setWeightFrom] = useState("");
  const [weightTo, setWeightTo] = useState("");
  const [volumeFrom, setVolumeFrom] = useState("");
  const [volumeTo, setVolumeTo] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  const [countries, setCountries] = useState([]);
  const [citiesDepart, setCitiesDepart] = useState([]);

  const getAllCountry = async () => {
    try {
      const res = await axios.get("http://test.money-men.kz/api/country");
      setCountries(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCountry();
  }, []);

  const getCitiesByCounrtyId = async () => {
    let countryId = fromCounty;
    try {
      const res = await axios.get(
        `http://test.money-men.kz/api/city?countryID=${countryId}`
      );
      setCitiesDepart(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCitiesByCounrtyId();
  }, [fromCounty]);

  console.log("from", fromCounty, fromCity);

  const handlerSubmit = async () => {
    const token = await AsyncStorage.getItem("token");
    const order = {
      token,
      category_id: 1,
      sub_id: 1,
      title: "Товар",
      from,
      to,
      volume,
      net,
      start_date,
      end_date,
      documents,
      price,
      price_type,
      payment_type,
      type_transport,
      type_sub_transport,
      from_string,
      to_string,
    };
    try {
    } catch (error) {}
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>Добавить груз</Text>
        <Text style={styles.subTitle}>
          Заполните всю необходимую информацию о вашем грузе
        </Text>
      </View>
      <View style={styles.inputBlocks}>
        <View style={styles.upBlock}>
          <View style={styles.countryPicker}>
            <Text>Выберите страну и город отправления </Text>

            <Picker selectedValue={fromCounty} onValueChange={setFromCountry}>
              {countries.map((country) => (
                <Picker.Item
                  label={`Страна:  ${country.name}`}
                  value={country.id}
                  key={country.id}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.countryPicker}>
            <Picker selectedValue={fromCity} onValueChange={setFromCity}>
              {citiesDepart.map((city) => (
                <Picker.Item
                  label={`Город:  ${city.name}`}
                  value={city.id}
                  key={city.id}
                />
              ))}
            </Picker>
          </View>
          {/* <View style={styles.inputRow}>
            <View>
              <Text style={styles.label}>Откуда</Text>
              <TextInput
                style={styles.input}
                onChangeText={setFrom}
                value={from}
                placeholder="Откуда"
              />
            </View>
            <Entypo name="chevron-right" size={15} color="#A2A9B2" />
          </View> */}
          <View style={styles.inputRow}>
            <View>
              <Text style={styles.label}>Куда</Text>
              <TextInput
                style={styles.input}
                onChangeText={setDestin}
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
                onChangeText={setDate}
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
                onChangeText={setTrasport}
                value={trasport}
                placeholder="Любой"
              />
            </View>
            <Entypo name="chevron-right" size={15} color="#A2A9B2" />
          </View>
        </View>
        <View style={styles.middleBlock}>
          <View style={styles.dubleInput}>
            <Text style={[styles.label, { margin: 10 }]}>Вес тн.</Text>
            <View style={styles.dubleRow}>
              <TextInput
                onChangeText={setWeightFrom}
                value={weightFrom}
                placeholder="от"
                style={styles.from}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.from}
                onChangeText={setWeightTo}
                value={weightTo}
                placeholder="до"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.dubleInput}>
            <Text style={[styles.label, { margin: 10 }]}>Объем м3</Text>
            <View style={styles.dubleRow}>
              <TextInput
                onChangeText={setVolumeFrom}
                value={volumeFrom}
                placeholder="от"
                style={styles.from}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.from}
                onChangeText={setVolumeTo}
                value={volumeTo}
                placeholder="до"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <View style={styles.downBlock}>
          <View style={styles.inputRow}>
            <View>
              <Text style={styles.label}>Форма оплаты</Text>
              <TextInput
                style={styles.input}
                onChangeText={setPaymentMethod}
                value={paymentMethod}
                placeholder="Любая"
              />
            </View>
            <Entypo name="chevron-right" size={15} color="#A2A9B2" />
          </View>
          <View style={styles.dubleInput}>
            <Text style={[styles.label, { margin: 10 }]}>
              Стоимость перевозки, тг.
            </Text>
            <View style={styles.dubleRow}>
              <TextInput
                onChangeText={setPriceFrom}
                value={priceFrom}
                placeholder="от"
                style={styles.from}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.from}
                onChangeText={setPriceTo}
                value={priceTo}
                placeholder="до"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handlerSubmit}>
          <Text style={styles.buttonTitle}>ДОБАВИТЬ ОБЪЯВЛЕНИЕ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    alignItems: "center",
    marginVertical: 10,
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
  inputBlocks: {
    marginHorizontal: 7,
  },
  upBlock: {
    borderWidth: 1,
    borderColor: "green",
  },
  middleBlock: {
    borderWidth: 1,
    borderColor: "blue",
    marginVertical: 10,
  },
  downBlock: {
    borderWidth: 1,
    borderColor: "red",
    marginVertical: 10,
  },
  inputRow: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomColor: "#979797",
    borderBottomWidth: 0.5,
  },

  label: {
    fontFamily: "IBM-Regular",
    fontSize: 13,
    color: "#A2A9B2",
  },
  dubleInput: {
    marginTop: 10,
  },
  dubleRow: {
    flexDirection: "row",
  },
  from: {
    width: "50%",
    height: 45,
    borderWidth: 0.5,
    borderColor: "#A2A9B2",
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#008EFF",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
    marginVertical: 15,
  },
  buttonTitle: {
    fontFamily: "IBM-Bold",
    color: "white",
    fontSize: 15,
  },
});
