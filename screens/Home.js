import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const Home = (props) => {
    let item = {
        type: "PETROL",
        price: 30,
        quantity: 1
    }
    const navigation = useNavigation();
    const [getFuelList, setFuelList] = useState([]);
    const [getBalance, setBalance] = useState(300);

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
        setBalance(data.finalBalance)
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
            <TouchableOpacity onPress={() => {
                // alert('reate list clicked')
                console.log('Create list clicked');
                navigation.navigate('AddFuel',
                    { userMaxAllowance: getBalance, handleAddFuel: handleAddFuel });
            }} style={styles.btn}>
                <Text style={styles.btnText}>Create List</Text>
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
        width: 120,
        alignItems: 'center',
        height: 40,
        borderRadius: 5
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