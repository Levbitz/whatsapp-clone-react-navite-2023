import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Dimensions,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import React, { useEffect, useState, useRef, useContext } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Lib/Firebase/Firebase";
import { globalStyles } from "../../Lib/GlobalStyles/GlobalStyles";
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from "../../Lib/context/auth";



const {height} = Dimensions.get('window')

const LoginScreen = ({ navigation }) => {


  const {user} = useContext(AuthContext)

  //console.log(user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);

  //errorHandler


  const isInvalid = password === "" || email === "";
  const [loading, setLoading] = useState(false);

  //auto focus
  const inputRef = useRef(null);
  const onFocusHandler = () => {
    inputRef.current && inputRef.current.focus();
  };
  useEffect(() => {
    onFocusHandler();
  }, []);
  //auto fucus

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // console.log(authUser);
        navigation.replace("Home")
       
      }
    });
    return unsubscribe();
  }, []);

  //handle signin
  const Signin = () => {
    //navigation.replace("Home");
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      setEmail("");
      setPassword("");
      setError(error.code);
      setLoading(false);
    });
  };


  const passwordVisibilityHandler = () =>{
    setVisiblePassword(!visiblePassword)
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  
      <ScrollView
      
      style={{
        backgroundColor:'indigo'
      }}
      
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden={true} />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: 50,
            marginBottom: 200,
            backgroundColor:'indigo',
            height:height
          }}
        >
          <StatusBar style="dark" />

          <View
            style={{
              background:'red',
              paddingHorizontal: 10,
              borderTopLeftRadius:50,
              borderTopRightRadius:20,
              borderBottomLeftRadius:20,
              borderBottomRightRadius:50
            }}
          >
            <Text
              style={{
                color: "#334155",
                fontSize: 18,
                fontWeight:'800',
                textAlign: "center",
               
                  color:'green',
              
                marginVertical:30
              }}
            >
              Welcome Back To Bantumart
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
                placeholder="email ID"
                style={globalStyles.myInput}
                keyboardType="email-address"
                keyboardAppearance="dark"
                ref={inputRef}
                type="Email"
                value={email}
                placeholderTextColor="red"
                onChangeText={(text) => setEmail(text)}
              />

              <View style={globalStyles.passwordWrap}>
              
              <TextInput
                style={globalStyles.passwordInput}
                placeholder="Password"
                type="password"
                placeholderTextColor='red'
                secureTextEntry={visiblePassword ? false : true} 
                value={password}
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={Signin}
                keyboardAppearance="dark"
                keyboardType="default"
              />

              <View>
              {visiblePassword ? (
                <Ionicons onPress={passwordVisibilityHandler} name="eye-sharp" size={20} color="#334155" />
     
              ) : (

                <Ionicons onPress={passwordVisibilityHandler } name="eye-off-sharp" size={20} color="#334155" />
               
              )}
             
           
              </View>
              </View>
              
            </View>

            <View
              style={{
                marginBottom: 20,
              }}
            >
              <Pressable


              onPress={() => {
                Linking.openURL(
                  "https://bantumart.com/reset"
                );
              }}
                // onPress={() => {
                //   Alert.alert(
                //     "This Feature is only on the website. Visit  to reset"
                //   );
                //   // navigation.replace("Password Reset");
                // }}
              >
                <Text style={{
                  color:"red"
                }}>Forgot Password?</Text>
              </Pressable>
            </View>
            <View>
              <Pressable
                containerStyle={styles.button}
                buttonStyle={{
                  backgroundColor: "red",
                }}
                disabled={isInvalid}
                title="Login"
                onPress={Signin}
              >
                <View
                  style={{
                    marginBottom: 20,
                    backgroundColor: isInvalid ? "#cbd5e1" : "#334155",
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
                    {loading ? "Logging in" : "SIGN IN"}
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
            }}
          >
            <Text
              style={{
                marginBottom: 5,
                color:"red"
              }}
            >
              New User?
            </Text>
            <Pressable onPress={() => navigation.navigate("Register")}>
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
                    color: "gray",
                    textTransform: "uppercase",
                  }}
                >
                  Register
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
