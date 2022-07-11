import { View, Text, TextInput, StyleSheet, TouchableOpacity, NativeModules } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
import { useNavigation, useRoute } from "@react-navigation/native";
import { getMultipleData } from '../AsyncStorageUtil';
import React, { useState, useEffect } from "react";
const { ReactOneCustomMethod } = NativeModules;

const AddFuel = (props) => {
    const [getFuelData, setFuelData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [item, setItem] = useState();
    const [getBalance, setBalance] = useState();
    const route = useRoute();
    const navigation = useNavigation();
    useEffect(() => {
        console.log('load drop down data');
        console.log(route.params);
        getMultipleData((finalData) => {
            console.log('received data for dropdown');
            console.log(finalData.fuelData[0].fuelType);
            setBalance(finalData.userMaxAllowance)
            setItem({ label: finalData.fuelData[0].fuelType, value: finalData.fuelData[0].pricePerLiter });
            setFuelData(finalData.fuelData.map((obj) => { return { label: obj.fuelType, value: obj.pricePerLiter.toString() } }))
        })
    }, []);
    const submitData = () => {
        console.log("submitData");
        let total = parseFloat(inputValue) * item.value;
        let obj = {
            userMaxAllowance: getBalance,
            total: total
        }
        ReactOneCustomMethod.checkBalance(obj)
            .then((res) => {
                if (res) {
                    let data = {
                        id: Date.now() + Math.random(),
                        type: item.label,
                        price: total,
                        quantity: parseFloat(inputValue)
                    }
                    let finalBalance = getBalance - total;
                    route.params.handleAddFuel({ data, finalBalance })
                    alert("Added successfully")
                    navigation.goBack();
                } else {
                    alert("Don't have balance")
                }
            });
    }

    return (
        <View style={styles.formWrapper}>
            <DropDownPicker
                items={getFuelData}
                placeholder={"Petrol"}
                containerStyle={{ height: 40 }}
                onChangeItem={item => setItem(item)}
            />
            <TextInput
                placeholderTextColor={"black"}
                placeholder='Enter Liters/ Charge unit here'
                style={styles.textInputStyle}
                keyboardType="numeric"
                value={inputValue}
                onChangeText={(val) => setInputValue(val)}
            />
            <TouchableOpacity onPress={() => submitData()} style={styles.btn}>
                <Text style={styles.btnText}>Create</Text>
            </TouchableOpacity>
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
    textInputStyle: {
        marginVertical: 20,
        height: 40,
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10
    },
    btn: {
        backgroundColor: "black",
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 5
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
});

export default AddFuel;