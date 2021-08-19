import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OrderScreen() {
  const [weightFrom, setWeightFrom] = useState("");
  const [weightTo, setWeightTo] = useState("");
  const [volumeFrom, setVolumeFrom] = useState("");
  const [volumeTo, setVolumeTo] = useState("");

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  //!SetDate
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  const showDatepicker = () => {
    setShow(true);
  };

  //!Set Countries and Cities
  const [fromCounty, setFromCountry] = useState("1");
  const [fromCity, setFromCity] = useState("1");
  const [fromCityString, setFromCityString] = useState("1");

  const [destinCountry, setDestinCountry] = useState("1");
  const [destinCity, setDestinCity] = useState("1");

  const [countriesList, setCountriesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);

  const getAllCountry = async () => {
    try {
      const res = await axios.get("http://test.money-men.kz/api/country");
      setCountriesList(res.data);
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
      setCitiesList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCitiesByCounrtyId();
  }, [fromCounty]);

  //!SetTransport
  const [trasport, setTrasport] = useState("1");
  const [allTrasports, setAllTransports] = useState([]);

  const getAllTypeTransports = async () => {
    try {
      const res = await axios.get(
        "https://test.money-men.kz/api/getTypeTransport"
      );
      setAllTransports(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTypeTransports();
  }, []);

  //! Payment and Price types
  const [paymentMethod, setPaymentMethod] = useState("1");
  const [typePrice, setTypePrice] = useState("1");

  const [allPaymentMethods, setAllPaymentMethods] = useState([]);
  const [allTypePrice, setAllTypePrice] = useState([]);
  const getAllPaymentMethods = async () => {
    try {
      const res = await axios.get(
        "https://test.money-men.kz/api/getPaymentType"
      );
      setAllPaymentMethods(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllTypePrice = async () => {
    try {
      const res = await axios.get("https://test.money-men.kz/api/getCurrency");
      setAllTypePrice(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPaymentMethods();
    getAllTypePrice();
  }, []);

  const handlerSubmit = async () => {
    const token = await AsyncStorage.getItem("token");
    //  console.log("Token", token);
    const order = {
      token,
      category_id: fromCounty,
      sub_id: destinCountry,
      title: "Test Товар",
      from: fromCity,
      to: destinCity,
      volume: Number(volumeFrom),
      net: Number(weightFrom),
      start_date: moment(date).format("L").replace(/[\//]/g, "."),
      end_date: moment(date).format("L").replace(/[\//]/g, "."),
      documents: [1, 2, 3],
      price: Number(priceFrom),
      price_type: typePrice,
      payment_type: paymentMethod,
      type_transport: trasport,
      type_sub_transport: trasport,
      from_string: fromCityString,
      to_string: destinCity,
    };
    console.log(order);
    //  try {
    //    const res = await axios({
    //      method: "GET",
    //      url: `https://test.money-men.kz/api/newAddPost?token=${order.token}&category_id=${order.category_id}&sub_id=${order.sub_id}&title=${order.title}&from=${order.from}&to=${order.to}&volume=${order.volume}&net=${order.net}&start_date=${order.start_date}&end_date=18.02.2022&documents[]=1,2,3&price=${order.price}&price_type=${order.price_type}&payment_type=${order.payment_type}&type_transport=${order.type_transport}&type_sub_transport[]=1&from_string=123&to_string=123`,
    //      headers: {
    //        "Content-Type": "application/json",
    //      },
    //    });
    //    console.log(res);
    //    console.log(res.data);
    //  } catch (error) {
    //    console.log(error);
    //  }
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
        {/* //!Start point */}
        <View style={styles.formBlock}>
          <Text style={styles.blockTitle}>
            Выберите страну и город отправления{" "}
          </Text>
          <View style={styles.rowPickers}>
            <View style={styles.picker}>
              <Picker selectedValue={fromCounty} onValueChange={setFromCountry}>
                {countriesList.map((country) => (
                  <Picker.Item
                    label={country.name}
                    value={country.id}
                    key={country.id}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker selectedValue={fromCity} onValueChange={setFromCity}>
                {citiesList.map((city) => (
                  <Picker.Item
                    label={city.name}
                    value={city.id}
                    key={city.id}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>
        {/* //!Destination */}
        <View style={styles.formBlock}>
          <Text style={styles.blockTitle}>
            Выберите страну и город назначения{" "}
          </Text>
          <View style={styles.rowPickers}>
            <View style={styles.picker}>
              <Picker
                selectedValue={destinCountry}
                onValueChange={setDestinCountry}
              >
                {countriesList.map((country) => (
                  <Picker.Item
                    label={country.name}
                    value={country.id}
                    key={country.id}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker selectedValue={destinCity} onValueChange={setDestinCity}>
                {citiesList.map((city) => (
                  <Picker.Item
                    label={city.name}
                    value={city.id}
                    key={city.id}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>
        {/* //!DATE and Transport*/}
        <View style={styles.formBlock}>
          <Text style={styles.blockTitle}>
            Выберите дату отправки и тип транспорта{" "}
          </Text>
          <View style={styles.rowPickers}>
            <Pressable style={styles.picker} onPress={showDatepicker}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginRight: 5,
                }}
              >
                <Text style={{ marginRight: 10 }}>
                  Датa: {moment(date.toJSON()).format("l")}
                </Text>
                <AntDesign name="caretdown" size={10} color="#706e6e" />
              </View>
            </Pressable>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={date}
                display="default"
                onChange={onChange}
              />
            )}
            <View style={styles.picker}>
              <Picker selectedValue={trasport} onValueChange={setTrasport}>
                {allTrasports.map((transp) => (
                  <Picker.Item
                    label={transp.name}
                    value={transp.id}
                    key={transp.id}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>
        {/* //!Net and Volume */}
        <View style={styles.middleBlock}>
          <View style={styles.dubleInput}>
            <Text style={styles.label}>Вес тн.</Text>
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
            <Text style={styles.label}>Объем м3</Text>
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
          {/* //!Payment and Price types */}
          <Text style={styles.blockTitle}>
            Выберите способ и валюту оплаты{" "}
          </Text>
          <View style={styles.rowPickers}>
            <View style={styles.picker}>
              <Picker
                selectedValue={paymentMethod}
                onValueChange={setPaymentMethod}
              >
                {allPaymentMethods.map((pay) => (
                  <Picker.Item label={pay.name} value={pay.id} key={pay.id} />
                ))}
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker selectedValue={typePrice} onValueChange={setTypePrice}>
                {allTypePrice.map((currency) => (
                  <Picker.Item
                    label={currency.name}
                    value={currency.id}
                    key={currency.id}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.dubleInput}>
            <Text style={styles.label}>Стоимость перевозки, тг.</Text>
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
  formBlock: {
    borderWidth: 1,
    borderColor: "green",
    marginVertical: 5,
  },
  blockTitle: {
    fontFamily: "IBM-Regular",
    fontSize: 14,
    color: "#A2A9B2",
    alignSelf: "center",
  },
  rowPickers: {
    flexDirection: "row",
    width: "100%",
  },
  picker: {
    width: "49%",
    height: 30,
    marginVertical: 10,
    borderBottomColor: "#979797",
    borderBottomWidth: 0.5,
    marginHorizontal: 2,
  },

  middleBlock: {
    borderWidth: 1,
    borderColor: "blue",
    marginVertical: 5,
  },
  downBlock: {
    borderWidth: 1,
    borderColor: "red",
    marginVertical: 5,
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
    margin: 5,
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
