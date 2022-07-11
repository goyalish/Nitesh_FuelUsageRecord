import { View, Text, StyleSheet, NativeModules } from 'react-native';
import React, { useState, useEffect } from "react";
const DeviceInfoScreen = (props) => {

    const [getUniqueDeviceId, setUniqueDeviceId] = useState('');
    const [getPhoneInfo, setPhoneInfo] = useState({});
    const { ReactOneCustomMethod } = NativeModules;

    useEffect(() => {
        ReactOneCustomMethod.getPhoneInfo()
            .then((res) => {
                console.log('loading device info screen');
                setPhoneInfo(res);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <View style={styles.formWrapper}>
            <Text style={styles.label} >Unique Device ID: {getPhoneInfo.Id}</Text>
            <Text style={styles.label} >Device Type / Manufacturer: {getPhoneInfo.Manufacturer}</Text>
            <Text style={styles.label} >Device Name: {getPhoneInfo.Device}</Text>
            <Text style={styles.label} >Device Model: {getPhoneInfo.Model}</Text>
            <Text style={styles.label} >System Version: {getPhoneInfo.OS_VERSION ? getPhoneInfo.OS_VERSION : getPhoneInfo.versionCode}</Text>
            <Text style={styles.label} >Device Locale Language: {getPhoneInfo.language}</Text>
            <Text style={styles.label} >Build Number: {getPhoneInfo.versionName}</Text>
            <Text style={styles.label} >Bundle ID: {getPhoneInfo.versionCode}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    formWrapper: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        padding: 30,
        backgroundColor: '#f4f4f4',
        flexDirection: "column",
    },
    label: {
        marginVertical: 10,
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
});

export default DeviceInfoScreen;