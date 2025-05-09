import React, { useState } from "react";
import { Image, View, StyleSheet, Linking, Platform } from "react-native";
import { Button, Text, Card } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Entypo } from "@expo/vector-icons";

function Profile() {
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
            uri: "https://images.unsplash.com/photo-1602024290243-cb6c7609dd6b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        />
      </View>
      <View style={{ alignItems: "center", margin: 5, padding: 10 }}>
        <Text variant="titleLarge">John Wick</Text>
        <Text>HR</Text>
      </View>
      <Card
        style={styles.cardStyle}
        onPress={() => Linking.openURL("mailto:nobinjohnson3@gmail.com")}
      >
        <View style={styles.cardContent}>
          <MaterialIcons name="email" color="red" size={32} />
          <Text style={styles.cardText}>sample@email.com</Text>
        </View>
      </Card>
      <Card
        style={styles.cardStyle}
        onPress={() =>
          Platform.OS === "android"
            ? Linking.openURL("tel:9234454321")
            : Linking.openURL("telprompt:9234454321")
        }
      >
        <View style={styles.cardContent}>
          <Entypo name="phone" color="black" size={32} />
          <Text style={styles.cardText}>9234454321</Text>
        </View>
      </Card>
      <Card style={styles.cardStyle}>
        <View style={styles.cardContent}>
          <MaterialIcons name="attach-money" color="green" size={32} />
          <Text style={styles.cardText}>8,00,000</Text>
        </View>
      </Card>
      <View style={styles.buttons}>
        <Button icon="account-edit" mode="contained">
          Edit
        </Button>
        <Button icon="delete" mode="contained">
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
