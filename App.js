import { createContext, useReducer } from "react";
import { StyleSheet, Text, View } from "react-native";
import Contants from "expo-constants";
import Home from "./screens/Home";
import CreateEmployee from "./screens/CreateEmployee";
import Profile from "./screens/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { initialData, reducer } from "./reducers/reducer";

const store = createStore(reducer);
export const myContext = createContext();
export default function App() {
  const Stack = createStackNavigator();

  const [state, dispatch] = useReducer(reducer, initialData);
  return (
    <myContext.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <View style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Create Employee" component={CreateEmployee} />

            {/* <StatusBar style="auto" /> */}
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </myContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Contants.statusBarHeight,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#ede4e4",
  },
});
