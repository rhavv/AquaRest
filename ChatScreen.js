import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, TextInput, Pressable } from 'react-native';

const ChatScreen = ({ navigation }) => {
    const [chatGptResponse, setChatGptResponse] = useState('Response will appear here');
    const [userInput, setUserInput] = useState('');
    const handleSubmit = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/chatgpt?user_input=${encodeURIComponent(userInput)}', {
                method: 'GET',
            });
            const data = await response.json();
            // Check if 'response' field exists in the JSON data
            if ('response' in data) {
                setChatGptResponse(data.response);
            } else {
                setChatGptResponse('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setChatGptResponse('Error fetching data. Please try again.');
        }
    };
    

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={require('./assets/BackButton.png')}
                            style={styles.BackButton}
                        />
                    </TouchableOpacity>
                    <Image
                        source={require('./assets/BannerLogo.png')}
                        style={styles.BannerLogo}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your input"
                        onChangeText={text => setUserInput(text)}
                        value={userInput}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    {/* Use onPress to handle button press event */}
                    <Pressable style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Get Recommendation</Text>
                    </Pressable>
                </View>
                <View style={styles.responseContainer}>
                    <TextInput
                        style={styles.response}
                        multiline={true}
                        editable={false}
                        value={chatGptResponse}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    BackButton: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    BannerLogo: {
        flex: 1,
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginRight: 10,
    },
    inputContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#FBE4FF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    responseContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    response: {
        fontSize: 16,
    },
});

export default ChatScreen;