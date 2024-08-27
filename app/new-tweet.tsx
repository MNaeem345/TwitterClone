import { useState } from 'react';
import { View, StyleSheet, Text, Image, TextInput, Pressable, SafeAreaView, StatusBar } from 'react-native';
import { Link, useRouter } from 'expo-router';

const user = {
    id: 'u1',
    username: 'VadimNotJustDev',
    name: 'Vadim',
    image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png',
}

export default function NewTweet() {
    const [text, setText] = useState("");
    const router = useRouter()

    const onTweetPress = () => {
        console.warn('Posting the tweet:', text)
        setText('');
        router.back()
    }



    return (
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>

                <View style={styles.buttonContainer}>
                    <Link href='../' style={{ fontSize: 18 }}>Cancel</Link>
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