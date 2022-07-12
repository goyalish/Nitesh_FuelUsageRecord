import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, NativeModules } from 'react-native';
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getMultipleData } from '../AsyncStorageUtil';

const Home = (props) => {
    
    const navigation = useNavigation();
    const [getFuelList, setFuelList] = useState([]);
    const [getBalance, setBalance] = useState(300);
    const [getDeviceId, setDeviceId] = useState("");
    const [getDeviceType, setDeviceType] = useState("");
    const { ReactOneCustomMethod } = NativeModules;
    
    useEffect(() => {
        // Update the document title using the browser API
        console.log("Calling NM");
        getMultipleData((finalData) => {
            setBalance(finalData.userMaxAllowance)
        });
        ReactOneCustomMethod.getPhoneID()
            .then((res: string) => {
                setDeviceId(res);
                console.log("Caaling getPhoneID");
                console.log(res);
            })
            .catch((err: any) => {
                console.error(err);
            });

        ReactOneCustomMethod.getDeviceType()
            .then((res: string) => {
                setDeviceType(res);
                console.log("Caaling getDeviceType");

                console.log(res);
            })
            .catch((err: any) => {
                console.error(err);
            });
    }, []);

    const removeData = (item) => {
        let updatedList = getFuelList.filter((obj) => obj.id !== item.id)
        setFuelList(updatedList)
        let updatedBalance = getBalance + item.price;
        setBalance(updatedBalance)
        Alert.alert("Removed successfully")
    }

    const _renderItem = ({ item }) => {

        return (
            <View style={styles.mainStyle}>
                <View>
                    <Text style={styles.text}>Fuel Type: {item.type}</Text>
                    <Text style={styles.text}>Fuel Used: {item.quantity}</Text>
                </View>
                <View>
                    <Text style={styles.text}>Price: {item.price}</Text>
                    <TouchableOpacity onPress={() => removeData(item)}>
                        <Text style={[styles.text, { color: 'red' }]}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const handleAddFuel = (data) => {
        console.log("handleAddFuel");
        console.log(data.data);
        let balance = getBalance - data.data.price;
        setBalance(balance)
        let newItem = data.data
        setFuelList((prev) => [
            ...prev,
            {
                id: newItem.id,
                type: newItem.type,
                price: newItem.price,
                quantity: newItem.quantity
            }
        ])
    }

    return (
        <View style={styles.formWrapper}>
            <Text style={styles.label} >Device ID: {getDeviceId}</Text>
            <Text style={styles.label} >Device type: {getDeviceType}</Text>
            <TouchableOpacity onPress={() => {
                // alert('reate list clicked')
                console.log('Create list clicked');
                navigation.navigate('AddFuel',
                    { userMaxAllowance: getBalance, handleAddFuel: handleAddFuel });
            }} style={styles.btn}>
                <Text style={styles.btnText}>Create List</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                // alert('reate list clicked')
                console.log('Show Device Info clicked');
                navigation.navigate('DeviceInfoScreen');
            }} style={styles.btn}>
                <Text style={styles.btnText}>Show Device Info</Text>
            </TouchableOpacity>

            <Text style={styles.label} >User Allowance Remaining: {getBalance}</Text>
            
            <FlatList
                data={getFuelList}
                renderItem={_renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    formWrapper: {
        flex: 1,
        display: "flex",
        padding: 30,
        backgroundColor: '#f4f4f4',
        flexDirection: "column",
    },
    btn: {
        backgroundColor: "grey",
        justifyContent: 'center',
        width: '80%',
        alignItems: 'center',
        height: 40,
        borderRadius: 5,
        marginVertical: 8
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    label: {
        marginVertical: 10,
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    mainStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: 'grey',
        padding: 10,
        marginVertical: 10
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Home;