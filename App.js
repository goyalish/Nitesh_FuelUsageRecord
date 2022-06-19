import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddFuel from "./screens/AddFuel";
import Home from "./screens/Home";
import LoginPage from "./screens/LoginPage";

export default function App() {
  const stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="LoginPage" component={LoginPage} options={{ title: '', headerLeft: ()=> null }} />
        <stack.Screen name="Home" component={Home} options={{ title: 'Fuel List' }} />
        <stack.Screen name="AddFuel" component={AddFuel} options={{ title: 'Add Fuel' }} />
      </stack.Navigator>
    </NavigationContainer>
  );
}

