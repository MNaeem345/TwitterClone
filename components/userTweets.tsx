import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import { TweetType } from '../types';
import { Entypo } from '@expo/vector-icons';
import IconButton from './IconButton';
import {Link} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';



type TweetProps = {
    userTweets: TweetType;
}


const UserTweets = ({ userTweets }: TweetProps) => {
    // const saveId = async () =>{
    //     try {
    //         const getEmail = await AsyncStorage.getItem('email');
    //         const checkEmail = tweet.user.email;
    
    //         // Check if userId is already stored
    //         const storedUserId = await AsyncStorage.getItem('userId');
    
    //         // Proceed only if userId is not already stored and emails match
    //         if (!storedUserId && getEmail === checkEmail) {
    //             console.log("Storing user ID:", tweet.user.id);
    //             await AsyncStorage.setItem("userId", tweet.user.id.toString());
    //             const id = await AsyncStorage.getItem('userId');
    //             console.log(id)
    //             return
    //         } else if (storedUserId) {
               
    //             return
    //         } else {
    //             console.log("Emails do not match, or userId is already stored.");
    //         }
    //     } catch (error) {
    //         console.error("Error saving ID:", error);
    //     }
    //     console.log(await AsyncStorage.getItem('userId'))
    // };
    const getUser = async () => {
        try {
          const userData = await AsyncStorage.getItem("userId")
          
        } catch (error) {
         console.log(error); 
        }
      };
      
      
    
   
    getUser()

    return (
        <Link href={`/tweet/${userTweets.id}`} asChild>
        <Pressable style={styles.container}>
           

        {userTweets?.user?.image ? (
                    <Image
                        source={{ uri: userTweets.user.image }}
                        style={styles.userImage}
                    />
                ) : (
                    <Image
                        source={{ uri: 'https://default-image-url.com/default.png' }} // Provide a default image URL
                        style={styles.userImage}
                    />
                )}

            <View style={styles.mainContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.name}>{userTweets?.user?.name}</Text>
                    <Text style={styles.username}>{userTweets?.user?.username} ·2h</Text>
                    <Entypo
                        name="dots-three-horizontal"
                        size={16}
                        color="grey"
                        style={{ marginLeft: 'auto' }}
                    />
                </View>

                <Text style={styles.content}>{userTweets?.content}</Text>

                {userTweets.image && <Image src={userTweets?.image} style={styles.image} />}

                <View style={styles.footer}>
                    <IconButton icon="comment" text={userTweets?.numberOfComments}/>
                    <IconButton icon="retweet" text={userTweets?.numberOfRetweets}/>
                    <IconButton icon="heart" text={userTweets?.numberOfLikes}/>
                    <IconButton icon="chart" text={userTweets?.imporessions || 0}/>
                    <IconButton icon="share-apple"/>


                </View>
            </View>

        </Pressable>
        </Link>
    )
}


const styles = StyleSheet.create({
    container: {

        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'lightgrey',
        backgroundColor: 'white',

    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    mainContainer: {
        marginLeft: 5,
        flex: 1,
        backgroundColor: 'white'

    },
    name: {
        fontWeight: '600',

    },
    username: {
        color: 'grey',
        marginLeft: 5,
    },
    content: {
        lineHeight: 20,
        marginTop: 5,
    },
    image: {
        width: '100%',
        aspectRatio: 16 / 9,
        marginVertical: 10,
        borderRadius: 15,
    },
    footer: {
        flexDirection: 'row',
        marginVertical: 5,
        justifyContent:'space-between'
    }

});

export default UserTweets;