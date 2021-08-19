import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [yourPhone, setYourPhone] = useState("");
  const [yourPassword, setYourPassword] = useState("");
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [bin, setBin] = useState("");

  const handlerSubmitLogin = async () => {
    const user = {
      phone: yourPhone,
      password: yourPassword,
    };
    try {
      const res = await axios({
        method: "POST",
        url: "https://test.money-men.kz/api/login",
        data: user,
      });
      if (!res.data.success) {
        setError(res.data.message);
        return;
      } else {
        await AsyncStorage.setItem("token", res.data.token);
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
    }
    setYourPhone("");
    setYourPassword("");
  };
  const handlerSubmitRegist = async () => {
    const user = {
      fullName,
      email,
      phone,
      password,
      companyName,
      companyType,
      bin,
    };
    try {
      const res = await axios({
        method: "POST",
        url: "https://test.money-men.kz/api/entityRegistration",
        data: user,
      });
      console.log(res.data);
      if (!res.data.success) {
        setError(res.data.message);
        return;
      } else {
        await AsyncStorage.setItem("token", res.data.token);
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
    }
    setFullName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setCompanyName("");
    setCompanyType("");
    setBin("");
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Warning", error, [
        { text: "OK", onPress: () => console.log("error") },
      ]);
    }
    setError("");
  }, [error]);

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>Login</Text>
      </View>
      <View style={styles.inputBlocks}>
        <View style={styles.upBlock}>
          <View style={styles.inputRow}>
            <View>
              <Text style={styles.label}>Your Phone</Text>
              <TextInput
                style={styles.input}
                onChangeText={setYourPhone}
                value={yourPhone}
                placeholder="Your Phone"
                keyboardType="numeric"
              />
            </View>
            <Entypo name="chevron-right" size={15} color="#A2A9B2" />
          </View>
          <View style={styles.inputRow}>
            <View>
              <Text style={styles.label}>Your Password</Text>
              <TextInput
                style={styles.input}
                onChangeText={setYourPassword}
                value={yourPassword}
                placeholder="Your Password"
              />
            </View>
            <Entypo name="chevron-right" size={15} color="#A2A9B2" />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "orange" }]}
          onPress={handlerSubmitLogin}
        >
          <Text style={styles.buttonTitle}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Регистрация</Text>
      </View>
      <View style={styles.inputBlocks}>
        <View style={styles.upBlock}>
          <View style={styles.inputRow}>
            <View>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={setFullName}
                value={fullName}
                placeholder="Full Name"
              />
            </View>
            <Entypo name="chevron-right" size={15} color="#A2A9B2" />
          </View>
          <View style={styles.inputRow}>
            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
              />
            </View>
            <Entypo name="chevron-right" size={15} color="#A2A9B2" />
          </View>
          <View style={styles.inputRow}>
            <View>
              <Text style={styles.label}>Phone number</Text>
              <TextInput
                style={styles.input}
                onChangeText={setPhone}
                value={phone}
                placeholder="Phone"
                keyboardType="numeric"
              />
            </View>
            <Entypo name="chevron-right" size={15} color="#A2A9B2" />
          </View>
          <View style={styles.inputRow}>
            <View>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
              />
            </View>
            <Entypo name="chevron-right" size={15} color="#A2A9B2" />
          </View>
          <View style={styles.inputRow}>
            <View>
              <Text style={styles.label}>Company Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={setCompanyName}
                value={companyName}
                placeholder="Company Name"
              />
            </View>
            <Entypo name="chevron-right" size={15} color="#A2A9B2" />
          </View>
          <View style={styles.inputRow}>
            <View>
              <Text style={styles.label}>Company Type</Text>
              <TextInput
                style={styles.input}
                onChangeText={setCompanyType}
                value={companyType}
                placeholder="Company Type"
              />
            </View>
            <Entypo name="chevron-right" size={15} color="#A2A9B2" />
          </View>
          <View style={styles.inputRow}>
            <View>
              <Text style={styles.label}>Company BIN</Text>
              <TextInput
                style={styles.input}
                onChangeText={setBin}
                value={bin}
                placeholder="BIN"
                keyboardType="numeric"
              />
            </View>
            <Entypo name="chevron-right" size={15} color="#A2A9B2" />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handlerSubmitRegist}>
          <Text style={styles.buttonTitle}>Registration</Text>
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
