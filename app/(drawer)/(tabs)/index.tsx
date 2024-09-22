import { StyleSheet, View, FlatList, Pressable, SafeAreaView, StatusBar, ActivityIndicator, Text } from 'react-native';
import { useEffect, useState } from 'react';
//import tweets from '../../../assets/data/tweets';
import Tweet from '@/components/Tweet';
import {Entypo} from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useTweetApi } from '@/lib/api/tweets';
import { useQuery } from '@tanstack/react-query';

export default function TabOneScreen() {
  const [page, setPage] = useState("");

  

  const {listTweets} = useTweetApi()
  const {data, isLoading, error} = useQuery({
    queryKey: ['tweets'], 
    queryFn: listTweets,
  })

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

  return (
    
    <View style={styles.page}>
      <StatusBar barStyle="dark-content"/>

      <FlatList 
        data={data ? [...data].reverse() : []} 
        renderItem={({ item }) => <Tweet tweet={item} />} 
      
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
  }

});
