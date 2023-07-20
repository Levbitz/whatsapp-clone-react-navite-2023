import { StyleSheet, Text, View ,Image ,Pressable ,SafeAreaView} from 'react-native'
import React ,{useState, useEffect ,useContext} from 'react'
import { AuthContext } from '../../Lib/context/auth';
import { ChatContext } from '../../Lib/context/ChatContext/ChatContext';

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
  getDocs,
  startAfter,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc
} from "firebase/firestore";
import { db } from '../../Lib/Firebase/Firebase';
import RealChates from '../../compoents/RealChats/RealChates';

const HomePage = ({ navigation }) => {

  const usersRef = collection(db, "users");


  const [users, setUsers] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collectionIsEmpty, setCollectionIsEmpty] = useState(false);

  const {user} = useContext(AuthContext)
  const {data } = useContext(ChatContext)


  const currentUser = user



  useEffect(() => {
    const q = query(
      usersRef,

      // orderBy("createdAt", "desc"),
      // limit(5)
    );

    onSnapshot(q, (snapshoot) => {
      if (snapshoot.size === 0) {
        //alert("collection is empty");
        setLoading(false);
        setCollectionIsEmpty(true);
      } else {
       
        setLoading(true);
        // setTimeout(() => {

        const term = snapshoot.docs.map((doc) =>
          
          ({
            id: doc.id,
            data: doc.data(),
          })
        );

        setUsers(term);
        setLoading(false);
        //get the last doc
        setLastDoc(snapshoot.docs[snapshoot.docs.length - 1]);
      }
    });
    // eslint-disable-next-line
  }, []);

 
  

  const NewData = collection(db, "users");

  const LoadMoreHandeler = () => {
    setLoading(true);

    const q = query(
      NewData,

      orderBy("createdAt", "desc"),
      limit(5),
      startAfter(lastDoc)
    );

    getDocs(q).then((snapshoot) => {
      if (snapshoot.size === 0) {
        setLoading(false);
        setCollectionIsEmpty(true);
      } else {
        const term = snapshoot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        setUsers([...users, ...term]);
        setLastDoc(snapshoot.docs[snapshoot.docs.length - 1]);
        setLoading(false);
      }
    });
  };

 // console.log(users.length);


 

  return (
    <SafeAreaView>
      
<Sucker/>
      <View>
      <View>

      {users.map((user ,index) =>{

        console.log(user.data.photo);
        return(
          <>
         <Pressable 
         key={index}
         onPress={ async ()=>{
          if(currentUser.uid === user.id){
            alert("you cant chat your self")
            navigation.replace(`/profile/${currentUser.uid }`)
          }else{
           // alert(`you are going to chat with ${user.data.name}  whose id is ${user.data.uid} and your id is ${currentUser.uid}`)
           const combinedId =
           currentUser.uid > user.id
             ? currentUser.uid + user.id
             : user.id + currentUser.uid;
         try {
           const res = await getDoc(doc(db, "chats", combinedId));
     
           if (!res.exists()) {
             //create a chat in chats collection
             await setDoc(doc(db, "chats", combinedId), {
              chartId: combinedId,
              createdAt: serverTimestamp(),
              initiator:currentUser.uid,
               responder:user.id,
              messages: [] });

            // await navigation.replace(`/chart/${combinedId}/${user.id}`)
           await  navigation.replace('chat',{
              combinedId,
              userId:user.id
            })
            
           }else{
           // alert("you are already chatting with this user")
            navigation.replace('chat',{
              combinedId,
              userId:user.id
            })
           }
         } catch (err) {}
     
        //  setUser(null);
        //  setUsername("")
          }
        
        }
        }
         
         >
          <View
          
         
          
          
          
          style={{
            backgroundColor
           : user.data.uid === currentUser.uid
            ? 'red' :'green',
          // display: 'flex',
          // marginBottom:1,
          // borderRadius:10,
        
          // justifyContent:'space-between',
          // alignItems:'center',
          // display: user.data.uid === currentUser.uid
          // ? 'none' :'block',
      
          }}>
          <Image
          style={{
            width:50,
            height:50,
          }}
          source={{uri:user.data.photo}}
          />
          <Text>{user.data.name}</Text>
      <Text>{user.data.email}</Text>
          <Text>{user.data.number}</Text>
          </View>
          </Pressable>
          </>
        )
      })}
            
    </View>
      
      </View>
      <RealChates navigation={navigation}/>
    </SafeAreaView>
  )
}

export default HomePage

const styles = StyleSheet.create({})





const Sucker = () =>{


  const ApiCallHandler =  async()=>{
  try {
    const response = await fetch('http://192.168.0.10:3000/api/v1/uganda/ads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: 'value' }), // Replace with your actual data object
    });

    // if (response.ok) {
    //   // Request was successful
    //   const responseData = await response.json();
    //   console.log(responseData);
    // } else {
    //   // Request failed
    //   console.log('Request failed:', response.status);
    // }
  } catch (error) {
    console.log('Error:', error.message);
  }
   
 
 }
  return(
    <>
    <Pressable
onPress ={ApiCallHandler}
>
<View style={{
  backgroundColor:"indigo",
  height:50
}}>
<Text>Api Call</Text>
</View>

</Pressable>
    </>
  )
}
