import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Alert } from "react-native";
import Button from "../components/Button";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { initFuelInfo } from "../AsyncStorageUtil";
export default function LoginPage() {
  const navigation = useNavigation();
  const [getButtonText, setButtonText] = useState("SignIn/Signup")
  const [values, setValues] = useState({
    email: "",
    pwd: "",
  });

  useEffect(() => {
    if (auth.currentUser) {
      initFuelInfo()
      navigation.navigate("Home", { email: values.email });
    }
  },[]); 

  function handleChange(text, eventName) {
    setValues((prev) => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  }

  const handleButtonClick = () => {
    console.log("handleButtonClick");
    console.log(auth.currentUser);
    if (auth.currentUser === null) {
      addUser()
    } else {
      login()
    }
  }

  const login = () => {
    const { email, pwd } = values;
    console.log("login called");
    signInWithEmailAndPassword(auth, email, pwd)
      .then(() => {
        console.log("sign-in success");
        initFuelInfo();
        navigation.replace("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  const addUser = () => {
    console.log("addUser");
    const { email, pwd } = values;
    if(email === '' && pwd === '') {
      Alert.alert('Enter details to signup!')
    } else {
      createUserWithEmailAndPassword(auth, email, pwd)
      .then((res) => {
        
        console.log('User registered successfully!')
        
        setButtonText("Login")
      })
      .catch(error => this.setState({ errorMessage: error.message }))      
    }
  }

  return (
    <View style={styles.view}>
      <Text style={{ fontSize: 34, fontWeight: "800", marginBottom: 20 }}>
        {"Fuel Usage Record"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        onChangeText={(text) => handleChange(text, "email")}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        onChangeText={(text) => handleChange(text, "pwd")}
        secureTextEntry={true}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "92%",
        }}
      >
        <Button onClick={handleButtonClick} title={getButtonText} />
        

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    margin: 15,
    paddingHorizontal: 10,
    width: "80%",
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
});
