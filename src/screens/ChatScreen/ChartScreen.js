import { KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View,Platform } from 'react-native'
import React ,{useState ,useContext}from 'react'
import Messages from '../../compoents/Messages/Messages'
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,

} from "firebase/firestore";
import { db } from '../../Lib/Firebase/Firebase';
import { v4 as uuid } from "uuid";
import { AuthContext } from '../../Lib/context/auth';

const ChartScreen = ({route ,navigation}) => {
//  console.log(route.params)
  const {userId ,combinedId}  =route.params
  const [text, setText] = useState("");

  const invalid = text === ""

  const {user } = useContext(AuthContext);

  const currentUser = user

  const handleSend = async () => {
  

      await updateDoc(doc(db, "chats", combinedId), {
        messages: arrayUnion({
         //  id: uuid(),
          text,
          senderId: currentUser.uid,
          reciverId:userId,
          // isRead:false,
          date: Timestamp.now(),
        }),
      });



    setText("");
    // setImg(null);
  };
  return (
    <SafeAreaView style={styles.container}>
    <View >
    <Pressable onPress={() => navigation.navigate('Home')}>
    <Text>chat   {combinedId}</Text>
   
  </Pressable>
    </View>
    
        <Messages chatId={combinedId} />
      

      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height" }
      keyboardVerticalOffset={90}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Say something"
            value={text}
            multiline={true}
            onChangeText={(text) => setText(text)}
          />

          {invalid?null:(<Pressable
            style={{
              backgroundColor:'#064757',
              padding:2,
              borderRadius:50
            }}
            onPress={handleSend}>
            <Ionicons style={{
              marginLeft:4
            }}  name="ios-send" size={15} color="#fff" />
            </Pressable>)}
          
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  scrollView: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
     paddingRight: 10,
     marginHorizontal:20,
    marginBottom:5,
    alignItems: 'center',
    // backgroundColor: 'red',
    // borderTopWidth: 1,
    // borderTopColor: '#ccc',
    justifyContent: 'flex-end', // Align items at the bottom
    borderRadius:10, 
    borderWidth: 1,
    // padding: 10,
    marginRight: 10,
    borderRadius:10,
    height:38
  },
  textInput: {
    flex: 1,
    // borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius:10,
    height:40
  },
  sendButton: {
    backgroundColor: '#0084ff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
