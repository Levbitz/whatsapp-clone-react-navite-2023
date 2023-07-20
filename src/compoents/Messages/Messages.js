import { StyleSheet, Text, View,ScrollView , Dimensions, ImageBackground} from 'react-native'
import React ,{useEffect ,useState, useContext ,useRef} from 'react'
import { db } from '../../Lib/Firebase/Firebase';
import { onSnapshot, doc } from "firebase/firestore";
import { AuthContext } from '../../Lib/context/auth';

const Messages = ({chatId}) => {

  const [messages, setMessages] = useState([]);
  // const { data } = useContext(ChatContext);
  const scrollViewRef = useRef(null);
   useEffect(() => {
     const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
       doc.exists() && setMessages(doc.data().messages);
     });
 
     return () => {
       unSub();
     };
   }, [chatId]);



   useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);
  return (
    
    <ScrollView
    
      ref={scrollViewRef}
      contentContainerStyle={styles.scrollViewContent}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
    >
    <ImageBackground>
    {messages.map((m) => (
    
        <Message message={m} key={m.id} />
      ))}
    </ImageBackground>
      
    </ScrollView>

  )
}

export default Messages

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 16,
  },
});





const Message = ({ message }) => {
  const { user } = useContext(AuthContext);

  
const currentUser = user;
  const ref = useRef();

  console.log(message);
  console.log(currentUser.uid);
  const {width} = Dimensions.get('window')

  // useEffect(() => {
  //   ref.current?.scrollIntoView({ behavior: "smooth" });
  // }, [message]);

  return (
    <View
      ref={ref}
      // className={`message ${message.senderId === currentUser.uid && "owner"} `}
     
    >
     
      <View
      style={{
      
        marginBottom:10,
        paddingHorizontal:10,
      }}
      
     >
     <View style={{
      alignSelf:message.senderId === currentUser.uid ? "flex-end" : "flex-start",
      maxWidth:"70%",
      backgroundColor:message.senderId === currentUser.uid ? "#25D366" : "white",
      borderRadius:5
     }} >
        <Text
        style={{
        
        
          
        
        
          fontSize:16,
          paddingVertical:5,
          paddingHorizontal:5,
          
        }}
        
        
        >{message.text}</Text>
        <Text
        style={{
        
        
          
        
        
          fontSize:16,
          paddingVertical:5,
          paddingHorizontal:5,
          
        }}
        
        
        >{message.text}</Text>
        
        </View>
      </View>
    </View>
  );
};



