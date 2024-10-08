import { useState } from 'react';
import { View, StyleSheet, Text, Image, TextInput, Pressable, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useMutation , useQueryClient} from '@tanstack/react-query';
import { useTweetApi } from '@/lib/api/tweets';



const user = {
    id: 'u1',
    username: 'VadimNotJustDev',
    name: 'Vadim',
    image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png',
}

export default function NewTweet() {
    const [text, setText] = useState("");
    const router = useRouter();
    const { createTweet } = useTweetApi();

    const queryClient = useQueryClient();

    const {mutateAsync, isError, isLoading, error, isSuccess} = useMutation({
        mutationFn: createTweet,
        onSuccess: (newTweet) => {
            // Update the cached 'tweets' data to include the new tweet at the top
            queryClient.setQueryData(['tweets'], (existingTweets = []) => {
                return [newTweet, ...existingTweets]; // Prepend the new tweet
            });

            // If there's a separate query for 'userTweets', update that too
            queryClient.setQueryData(['userTweets'], (existingUserTweets = []) => {
                return [newTweet, ...existingUserTweets];
            });

            // Optionally refetch tweets to ensure the UI is in sync with the server
            queryClient.invalidateQueries(['tweets']);
        },
    });

    const onTweetPress = async () => {
        try{
            await mutateAsync({content:text});

            setText('');
            router.back()
        }catch(e){
            console.log("Error:", e.message)
        }

       
    }



    return (
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>

                <View style={styles.buttonContainer}>
                    <Link href='../' style={{ fontSize: 18 }}>Cancel</Link>
                    {isLoading && <ActivityIndicator/>}
                    <Pressable onPress={onTweetPress} style={styles.button}>
                        <Text style={styles.buttonText}>Tweet</Text>
                    </Pressable>


                </View>
                <View style={styles.inputContainer}>
                    <Image src={user.image} style={styles.image} />
                    <TextInput
                        value={text}
                        onChangeText={(newValue) => setText(newValue)}
                        placeholder="Whats Happening"
                        style={{ color: 'black', flex: 1 }}
                        multiline
                        numberOfLines={5}
                    />
                </View>

                {error && <Text>Error:{error.message}</Text>}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,


    },
    text: {
        color: 'black'
    },
    image: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 50,
        marginRight: 10,

    },
    inputContainer: {
        flexDirection: 'row',

    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#1C9BF0',
        padding: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,

    },
    buttonText: {
        color: 'white',
        fontWeight: 600,
        fontSize: 16,

    }

})