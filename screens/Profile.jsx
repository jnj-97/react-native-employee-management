import React, { useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { Button, Text, Card } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import Constants from "expo-constants";

function Profile(props) {
  const { BACKEND_URL } = Constants.expoConfig.extra;
  const { _id, name, designation, image, salary, email, phone } =
    props.route.params.item;

  async function deleteEmployee() {
    try {
      let data = await fetch(`${BACKEND_URL}/delete`, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          id: _id,
        }),
      });
      Alert.alert(`${name} successfully deleted`);
      props.navigation.navigate("Home");
    } catch (err) {
      console.log("error while deleting user: ", err);
    }
  }
  return (
    <View>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(234, 129, 129, 0.8)", "white"]}
        style={{ height: "40%" }}
      />
      <View style={{ alignItems: "center" }}>
        <Image
          style={styles.profilePic}
          source={{
            uri: image,
          }}
        />
      </View>
      <View style={{ alignItems: "center", margin: 5, padding: 10 }}>
        <Text variant="titleLarge">{name}</Text>
        <Text>{designation}</Text>
      </View>
      <Card
        style={styles.cardStyle}
        onPress={() => Linking.openURL(`mailto:${email}`)}
      >
        <View style={styles.cardContent}>
          <MaterialIcons name="email" color="red" size={32} />
          <Text style={styles.cardText}>{email}</Text>
        </View>
      </Card>
      <Card
        style={styles.cardStyle}
        onPress={() =>
          Platform.OS === "android"
            ? Linking.openURL(`tel:${phone}`)
            : Linking.openURL(`telprompt:${phone}`)
        }
      >
        <View style={styles.cardContent}>
          <Entypo name="phone" color="black" size={32} />
          <Text style={styles.cardText}>{phone}</Text>
        </View>
      </Card>
      <Card style={styles.cardStyle}>
        <View style={styles.cardContent}>
          <MaterialIcons name="attach-money" color="green" size={32} />
          <Text style={styles.cardText}>{salary}</Text>
        </View>
      </Card>
      <View style={styles.buttons}>
        <Button
          icon="account-edit"
          mode="contained"
          onPress={() =>
            props.navigation.navigate("Create Employee", {
              _id,
              name,
              designation,
              image,
              salary,
              email,
              phone,
            })
          }
        >
          Edit
        </Button>
        <Button icon="delete" onPress={() => deleteEmployee()} mode="contained">
          Terminate
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  profilePic: { height: 140, width: 140, borderRadius: 70, marginTop: -70 },
  cardStyle: { padding: 20, marginTop: 10 },
  cardContent: { flexDirection: "row", alignItems: "center" },
  cardText: { marginLeft: 15 },
});
export default Profile;
