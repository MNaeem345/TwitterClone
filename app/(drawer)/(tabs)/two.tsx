import { StyleSheet, View, FlatList, Pressable, SafeAreaView, StatusBar, ActivityIndicator, Text,Image } from 'react-native';
import { useEffect, useState } from 'react';
//import tweets from '../../../assets/data/tweets';
import UserTweets from '@/components/userTweets';
import { TweetType } from '../../../types'
import {Entypo} from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useTweetApi } from '@/lib/api/tweets';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type TweetProps = {
  userTweets: TweetType;
}

const renderProfileInfo = ({ userTweets }: TweetProps) => {
    return(
      
      <View>
        {userTweets?.user?.image ? (
                    <Image
                    source={{ uri: userTweets.user.image }}
                        style={styles.userImage}
                    />
                ) : (
                    <MaterialCommunityIcons 
                    name="account-circle" 
                    size={40} 
                    color="grey"
                    style={styles.accImage}
                   />
                    
                )}
          <Text>
            {userTweets?.user?.name}
          </Text>

      </View>
    )
}

export default function TabTwoScreen() {

  const {listUserTweets} = useTweetApi()
  const {data, isLoading, error} = useQuery({
    queryKey: ['userTweets'], 
    queryFn: listUserTweets,
  })
  const checkEmail = async () =>{
   const check =  await AsyncStorage.getItem('email')
   
  }
  checkEmail()
  // const sortedTweets = [...userTweets].reverse();


  // const [tweets, setTweets] = useState([]);

  // useEffect(() => {
  //   const fetchTweets = async () =>{
  //    const res = await listTweets();
  //    setTweets(res)
      
  //   }

  //   fetchTweets();
  // },[]);

  if(isLoading){
    return <ActivityIndicator/>
  };

  if(error){
    return <Text>{error.message}</Text>
  }
  const {authToken} = useAuth();



  return (
    
    <View style={styles.page}>
      <View style={styles.header}>

      </View>
      <View style={styles.profileHeader}>
      {data[0]?.user?.image ? (
                    <Image
                    source={{ uri: listUserTweets.user.image }}
                        style={styles.userImage}
                    />
                ) : (
                    <MaterialCommunityIcons 
                    name="account-circle" 
                    size={80} 
                    color="grey"
                    style={styles.profileImage}
                   />
                    
                )}
        <Text style={styles.profileName}>
          {data[0]?.user?.name}
        </Text>
        <Text style={styles.profileUser}>
          @{data[0]?.user?.username}
        </Text>
        </View>
  

      <FlatList 
        data={data ? [...data].reverse() : []} 
        renderItem={({ item }) => <UserTweets userTweets={item} />} 
      
      />
   
      <Pressable style={styles.floatingButton}>
        <Link href="/new-tweet" asChild>
        <Entypo name="plus" size={24} color="white"/>
        </Link>
      </Pressable>



    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    marginTop:50
  },
  page: {
    flex: 1,
    backgroundColor:'white',
    
  },
  floatingButton:{
    backgroundColor:'#1C9BF0',
    width: 50,
    height:50,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    right: 15,
    bottom: 15,
    shadowColor:'#000',
    shadowOffset:{
      width:0,
      height:2,
    },
    shadowOpacity:0.25,
    shadowRadius:3.84,
    elevation:5,
  },
  profileImage:{
    marginRight: 5,
    marginLeft: 15,
    borderRadius:50,
    borderColor:'black',
   
    
    bottom:0
    
},
userImage: {
  width: 50,
  height: 50,
  borderRadius: 50
},
profileName:{
  marginTop:10,
  marginLeft:15,
  fontSize:25,
  fontWeight:'bold'
},
profileUser:{
  marginTop:6,
  marginLeft:15,
  marginBottom:15,
  color: 'grey',
},


});
