import { useEffect, useState } from 'react';
import { FlatList, View, Pressable, ActivityIndicator, Text, StatusBar, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useTweetApi } from '@/lib/api/tweets';
import { useQuery } from '@tanstack/react-query';
import Tweet from '@/components/Tweet';

export default function TabOneScreen() {
  const [tweets, setTweets] = useState(null); // Local state to store tweets

  const { listTweets } = useTweetApi();

  // Fetch tweets only if the tweets state is null
  const { isLoading, error } = useQuery({
    queryKey: ['tweets'],
    queryFn: async () => {
      if (!tweets) {
        const fetchedTweets = await listTweets();
        setTweets(fetchedTweets); // Store tweets in state once fetched
        return fetchedTweets;
      }
      return tweets; // If tweets are already in state, return them
    },
    enabled: !tweets, // Disable query if tweets are already in state
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <View style={styles.page}>
      <StatusBar barStyle="dark-content" />

      <FlatList
        data={tweets} // Use the locally stored tweets
        renderItem={({ item }) => <Tweet tweet={item} />}
        keyExtractor={(item) => item.id.toString()}
      />

      <Pressable style={styles.floatingButton}>
        <Link href="/new-tweet" asChild>
          <Entypo name="plus" size={24} color="white" />
        </Link>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  floatingButton: {
    backgroundColor: '#1C9BF0',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 15,
    bottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
