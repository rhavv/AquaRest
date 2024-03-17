import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, TextInput, Pressable } from 'react-native';
import * as FileSystem from 'expo-file-system';
import {Picker} from '@react-native-picker/picker';

const SleepScreen = ({ navigation }) => {
    const [sleepHours, setSleepHours] = useState('');
    const [sleepinessLevel, setSleepinessLevel] = useState('');

    const handleSleepHoursChange = (hours) => {
        // Ensure that the input is numeric or empty
        if (/^\d*\.?\d*$/.test(hours)) {
            setSleepHours(hours);
        }
    };

    const saveSleepData = async () => {
        try {
            console.log('Saving sleep data...');
            const currentDate = new Date().toISOString().split('T')[0];
            const sleepData = { date: currentDate, hours: sleepHours, sleepinessLevel: sleepinessLevel };
            const customDirectory = `${FileSystem.documentDirectory}AquaRest/`;
            const filePath = customDirectory + 'sleepData.json';
            await FileSystem.makeDirectoryAsync(customDirectory, { intermediates: true });
    
            let existingData;
            try {
                const fileContents = await FileSystem.readAsStringAsync(filePath);
                existingData = JSON.parse(fileContents);
                if (!Array.isArray(existingData)) {
                    existingData = []; 
                }
            } catch (error) {
                existingData = []; 
            }
            existingData.push(sleepData);
            const jsonData = JSON.stringify(existingData);
            await FileSystem.writeAsStringAsync(filePath, jsonData);   
            console.log('Sleep data saved successfully!', customDirectory);
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
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Select your sleepiness level:</Text>
                    <Picker
                        selectedValue={sleepinessLevel}
                        onValueChange={(itemValue) => setSleepinessLevel(itemValue)}
                    >
                        <Picker.Item label="1 - Feeling active, vital, alert, or wide awake" value="1" />
                        <Picker.Item label="2 - Functioning at high levels, but not at peak; able to concentrate" value="2" />
                        <Picker.Item label="3 - Awake, but relaxed; responsive but not fully alert" value="3" />
                        <Picker.Item label="4 - Somewhat foggy, let down" value="4" />
                        <Picker.Item label="5 - Foggy; losing interest in remaining awake; slowed down" value="5" />
                        <Picker.Item label="6 - Sleepy, woozy, fighting sleep; prefer to lie down" value="6" />
                        <Picker.Item label="7 - No longer fighting sleep, sleep onset soon; having dream-like thoughts" value="7" />
                    </Picker>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={saveSleepData}>
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
});

export default SleepScreen;
