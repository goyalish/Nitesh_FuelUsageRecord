import AsyncStorage from '@react-native-async-storage/async-storage'
const initFuelInfo = () => {
    let fuelData = [
        {
            fuelType: "Petrol",
            pricePerLiter: 30
        },
        {
            fuelType: "Diesel",
            pricePerLiter: 40
        },
        {
            fuelType: "Battery Charge",
            pricePerLiter: 10
        },
    ]
    AsyncStorage.setItem("fuelData", JSON.stringify(fuelData))
    AsyncStorage.setItem("userMaxAllowance", JSON.stringify(300))
}

const getMultipleData = (callback) => {
    try {
      AsyncStorage.multiGet(["fuelData", "userMaxAllowance"]).then((savedData) => {
        // console.log(savedData);
        const data = Object.fromEntries(savedData);
        let finalData = {
          fuelData: JSON.parse(data.fuelData),
          userMaxAllowance: parseInt(data.userMaxAllowance)
        }
        console.log(finalData);
        callback(finalData)
      })
    } catch (error) {
      console.log(error);
    }
  };

export {initFuelInfo, getMultipleData}