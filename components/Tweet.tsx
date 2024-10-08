import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import { TweetType } from '../types';
import { Entypo } from '@expo/vector-icons';
import IconButton from './IconButton';
import { Link } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


type TweetProps = {
    tweet: TweetType;
}


const Tweet = ({ tweet }: TweetProps) => {


    return (
        <Link href={`/tweet/${tweet.id}`} asChild>
            <Pressable style={styles.container}>


                {tweet?.user?.image ? (
                    <Image
                        src={tweet.user.image}
                        style={styles.userImage}
                    />
                ) : (
                    <MaterialCommunityIcons 
                    name="account-circle" 
                    size={40} 
                    color="grey" 
                    style={styles.accImage}/>
                )}
                <View style={styles.mainContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.name}>{tweet?.user?.name}</Text>
                        <Text style={styles.username}>{tweet?.user?.username} ·2h</Text>
                        <Entypo
                            name="dots-three-horizontal"
                            size={16}
                            color="grey"
                            style={{ marginLeft: 'auto' }}
                        />
                    </View>

                    <Text style={styles.content}>{tweet?.content}</Text>

                    {tweet.image && <Image src={tweet?.image} style={styles.image} />}

                    <View style={styles.footer}>
                        <IconButton icon="comment" text={tweet?.numberOfComments} />
                        <IconButton icon="retweet" text={tweet?.numberOfRetweets} />
                        <IconButton icon="heart" text={tweet?.numberOfLikes} />
                        <IconButton icon="chart" text={tweet?.imporessions || 0} />
                        <IconButton icon="share-apple" />


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
        borderRadius: 50,
        
    },
    accImage:{
        marginRight: 5,
        marginLeft: 5,
        borderRadius:50,
        borderColor:'black'
    },
    mainContainer: {
        marginLeft: 5,
        flex: 1,
        backgroundColor: 'white'

    },
    name: {
        fontWeight: '600',
        fontSize:15

    },
    username: {
        color: 'grey',
        marginLeft: 10,
        fontSize:14
    },
    content: {
        lineHeight: 20,
        marginTop: 5,
        fontSize:15
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
        justifyContent: 'space-between'
    }

});

export default Tweet;