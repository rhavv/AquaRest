import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, TextInput, Pressable } from 'react-native'; // Updated import statement
import * as FileSystem from 'expo-file-system';

const SleepScreen = ({ navigation }) => {
    const [sleepHours, setSleepHours] = useState('');

    const handleSleepHoursChange = (hours) => {
        setSleepHours(hours);
    };

    const saveSleepData = async () => {
        try {
            console.log('Saving sleep data...');
            const currentDate = new Date().toISOString();
            const sleepData = { date: currentDate, hours: sleepHours };
            const filePath = FileSystem.documentDirectory + 'sleepData.json';
            const existingData = await FileSystem.readAsStringAsync(filePath);
            let parsedData = existingData ? JSON.parse(existingData) : [];
            parsedData.push(sleepData);
            await FileSystem.writeAsStringAsync(filePath, JSON.stringify(parsedData));
            console.log('Sleep data saved successfully!');
        } catch (error) {
            console.error('Error saving sleep data:', error);
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
                    <TouchableOpacity>
                        <Image
                            source={require('./assets/SettingsGear.png')}
                            style={styles.SettingsGear}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>How much sleep did you get last night?</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Enter hours"
                        value={sleepHours}
                        onChangeText={handleSleepHoursChange}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={saveSleepData}> {/* Changed Button to Pressable */}
                        <Text style={styles.buttonText}>Save</Text>
                    </Pressable>
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
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginRight: 10,
    },
    SettingsGear: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    inputContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default SleepScreen;
