import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../Lib/Firebase/Firebase";
import { globalStyles } from "../../Lib/GlobalStyles/GlobalStyles";
import { Timestamp, doc, setDoc } from "firebase/firestore";


const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  // const [privateData, setPrivateData] = useState([]);

  const disabled = name === "" || email === "" || password === "";
  const [loading, setLoading] = useState(false);

 

  //auto focus
  const inputRef = useRef(null);
  const onFocusHandler = () => {
    inputRef.current && inputRef.current.focus();
  };
  useEffect(() => {
    onFocusHandler();
  }, []);

  // useEffect(() => {
  //   fetch("https://ipapi.co/json/")
  //     .then(function (response) {
  //       response.json().then((jsonData) => {
  //         setPrivateData(jsonData);
  //         // console.log(jsonData);
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, [""]);

  const register = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        setDoc(doc(db, "users", authUser.user.uid), {
          uid: authUser.user.uid,

          name,
          email,
          createdAt: Timestamp.fromDate(new Date()),
          isOnline: true,
          number,
          platform: "Android",
        });
      })
      .catch((error) => {
        setError(error.code);
        setLoading(false);
      });
  };
  return (
    <ScrollView
    
  
    
    showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          marginTop: 50,
          marginBottom: 200,
        }}
      >
        <View
          style={{
            backgroundColor:"indigo",
            paddingHorizontal: 10,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "#ffe799",
              fontSize: 18,
              textAlign: "center",
              marginTop: 30,
            }}
          >
            Create Account
          </Text>
          {!!error && (
            <View
              style={{
                backgroundColor: "red",
                paddingVertical: 14,
                marginVertical: 30,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  color: "#fff",
                }}
              >
                {error}
              </Text>
            </View>
          )}
          <View
            style={{
              marginVertical: 15,
            }}
          >
            <TextInput


            
              style={globalStyles.myInput}
              ref={inputRef}
              placeholder="Full Name"
              placeholderTextColor='red'
              autofocus={true}
              type="text"
              value={name}
              onChangeText={(text) => setName(text)}
              keyboardAppearance="dark"
            />
            <TextInput
              style={globalStyles.myInput}
              placeholder="Phone Number"
              autofocus={true}
              type="text"
              keyboardType="number-pad"
              value={number}
              placeholderTextColor='red'
              onChangeText={(text) => setNumber(text)}
              keyboardAppearance="dark"
              maxLength={10}
            />
            <TextInput
              style={globalStyles.myInput}
              placeholder="email"
              type="email"
              keyboardType="email-address"
              value={email}
              placeholderTextColor='red'
              onChangeText={(text) => setEmail(text)}
              keyboardAppearance="dark"
            />
            <TextInput
              style={globalStyles.myInput}
              placeholder="password"
              type="password"
              keyboardType="default"
              secureTextEntry
              placeholderTextColor='red'
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <Pressable disabled={disabled} onPress={register}>
            <View
              style={{
                marginBottom: 20,
                backgroundColor: disabled ? "#ffe799" : "coral",
                width: "100%",
                paddingVertical: 15,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  color: "#fff",
                  fontWeight: "500",
                }}
              >
                {loading ? "Registering" : "Register"}
              </Text>
            </View>
          </Pressable>
        </View>
        <View
          style={{
            marginTop: 30,
          }}
        >
          <Text
            style={{
              marginBottom: 5,
              color:'red'
            }}
          >
            Already Have Account?
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <View
              style={{
                borderColor: "#fff",
                borderWidth: 2,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor: "white",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                }}
              >
                Login
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
