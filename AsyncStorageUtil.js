import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeModules } from 'react-native';
const { ReactOneCustomMethod } = NativeModules;
const initFuelInfo = () => {
    ReactOneCustomMethod.getFuelData()
            .then((res) => {
                AsyncStorage.setItem("fuelData", JSON.stringify(res.data))
                AsyncStorage.setItem("userMaxAllowance", JSON.stringify(res.userMaxAllowance))
            })
}

const getMultipleData = (callback) => {
    try {
      AsyncStorage.multiGet(["fuelData", "userMaxAllowance"]).then((savedData) => {
        const data = Object.fromEntries(savedData);
        let finalData = {
          fuelData: JSON.parse(data.fuelData),
          userMaxAllowance: parseInt(data.userMaxAllowance)
        }
        // console.log(finalData);
        callback(finalData)
      })
    } catch (error) {
      console.log(error);
    }
  };

export {initFuelInfo, getMultipleData}