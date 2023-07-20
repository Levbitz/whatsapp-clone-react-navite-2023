import { StyleSheet, Text, View ,Image, Pressable, Dimensions, ScrollView  } from 'react-native'

import React, { useState, useEffect, useContext } from 'react'
import { db } from '../../Lib/Firebase/Firebase'
import { AuthContext } from '../../Lib/context/auth';



import {
  collection,
  query,
  orderBy,
  where,
  limit,
  getDocs,
  doc,getDoc
} from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';

const RealChates = ({navigation}) => {

    const [chats, setChats] = useState([]);
  const { user } = useContext(AuthContext);
  const currentUser = user;
  const messagesRef = collection(db, "chats");

const {width} = Dimensions.get('window')


    useEffect(() => {
    // Query for chats where the current user is the initiator
    const initiatorQuery = query(
      messagesRef,
      where("initiator", "==", currentUser.uid),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    // Query for chats where the current user is the responder
    const responderQuery = query(
      messagesRef,
      where("responder", "==", currentUser.uid),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    // Execute both queries and combine the results
    Promise.all([getDocs(initiatorQuery), getDocs(responderQuery)])
      .then(([initiatorDocs, responderDocs]) => {
        const allChats = [];
        initiatorDocs.forEach((doc) => allChats.push(doc));
        responderDocs.forEach((doc) => allChats.push(doc));
        setChats(allChats);
      })
      .catch((error) => {
        console.log("Error getting chats:", error);
      });
  }, [currentUser.uid]);


  return (
    <View >
    <View style={{
      display:"flex",
      flexDirection:'row',
      alignCenter:'center',
     width:width,
      marginBottom:20,
      borderBottomColor:'gray',
      borderBottomWidth:1,
      elevation:10,
      backgroundColor:'white',
      paddingVertical:10
      
    }}>
    <Pressable
    onPress ={()=>navigation.navigate('Home')}
    
     style={{
      marginRight:10
      
    }}><Ionicons name="ios-arrow-back-circle-sharp" size={30} color="gray" /></Pressable>
    <Text style={{
      fontSize:16,
      color:"gray",
      fontWeight:'700',
      marginTop:5
    }}>My Chats</Text>
    </View>
      <ScrollView>

            {chats.length > 0 ? (chats.map((chat,index) => {
    
      
     let mover =  "" 
     if(chat.data().messages.length > 0 && chat.data().messages.pop().senderId === currentUser.uid){
       mover = chat.data().messages.pop().reciverId
     }else if(chat.data().messages.length){
      mover = chat.data().messages.pop().senderId
     }else{
      mover = ""
     }

   
        return(
         mover !== ""?( <Pressable 
          
           onPress={()=>{
            navigation.replace('chat',{
              combinedId:chat.id,
              userId:mover
            })
           }}
           >
         
           <View  key={index}>
           
          <ChatProfile mover={mover}>
          <Text 
          style={{
            fontSize:12,
            color:"gray",
            fontWeight:"500"
          }}
          numberOfLines={1} ellipsizeMode="tail"
          >
          {chat.data().messages.pop().text} ...
          </Text>
 
  </ChatProfile>  
           </View>
 
           
        
 
           </Pressable>):null
        )
      })):(<Text>"No Chats"</Text>)}  
      </ScrollView>
    </View>
  )
}

export default RealChates

const styles = StyleSheet.create({})
















const ChatProfile = ({mover ,children}) => {


  const {width } = Dimensions.get('window')

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoc(doc(db, "users", mover)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
        setLoading(false);
      }
    });

    
  }, [mover]);


  if (loading) {
    return <Loading />;
  } else {
    return user ? (
      <View  style={{
        display: "flex",
        flexDirection: "row",
     
        paddingHorizontal:2
      }} >

        <View
    
        
        >
        <View  style={{
          marginRight:6,
          width:width*.1
        }}>
        <Image style={{
         width:30,
         height:30,
         opacity:.8,
         objectFit:"contain"
        }}    source={{ uri: user.photo }} />
       
        </View>
       
      
        </View>
        <View
    
        
        >
        <View >
        
       
        </View>
        <View 
        style={{
          
          width:width*.9,
          borderBottomColor:'gray',
          borderBottomWidth:1
        }}
        >
        <Text style={{
          fontSize:14,
          color:"gray",
          fontWeight:"500"
        }} > {user.name}</Text>
        <Text >
        {children}
        </Text>  
        
        </View>
      
        </View>
     
     
        
      
     
    
   


       
      </View>
    ) : null;
  }
};




const Loading = () => {
  return(
    <View>
    <Text>Loading...</Text>
    </View>
  )
}
