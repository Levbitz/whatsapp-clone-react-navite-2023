import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthProvider from './src/Lib/context/auth';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen/RegisterScreen';
import { AuthContext } from './src/Lib/context/auth';
import HomePage from './src/screens/HomePage/HomePage';
import { ChatContextProvider } from './src/Lib/context/ChatContext/ChatContext';
import ChartScreen from './src/screens/ChatScreen/ChartScreen';

const Stack = createStackNavigator();

export default function App() {



  
  return (
  <AuthProvider>
  <ChatContextProvider>
  <NavigationContainer>
  <Stack.Navigator>
  <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen 
      options={{
        headerShown: false,
      }}
      name="Home" component={HomePage} />
      <Stack.Screen name="Notifications" component={Notifications} />
      
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen  options={{
        headerShown: false,
      }} name="chat" component={ChartScreen} />
    </Stack.Navigator>
  
  </NavigationContainer>
  </ChatContextProvider>
  </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const Notifications = ()=>{
  return(
    <View>
    <Text>Notifications</Text>
    </View>
  )
}

const Profile = ()=>{
  return(
    <View>
    <Text>Profile</Text>
    </View>
  )
}
const Settings = ()=>{
  return(
    <View>
    <Text>Settings</Text>
    </View>
  )
}
