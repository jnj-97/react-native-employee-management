import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

function CreateEmployee({ navigation, route }) {
  const [name, setName] = useState(getDetails("name"));
  const [designation, setDesignation] = useState(getDetails("designation"));
  const [phone, setPhone] = useState(getDetails("phone"));
  const [email, setEmail] = useState(getDetails("email"));
  const [salary, setSalary] = useState(getDetails("salary"));
  const [modal, setModal] = useState(false);
  const [picture, setPicture] = useState(getDetails("picture"));
  const [shift, setShift] = useState(false);
  const { BACKEND_URL } = Constants.expoConfig.extra;

  function getDetails(detail) {
    if (route.params) {
      return route.params[detail];
    } else {
      return "";
    }
  }
  async function submitData() {
    try {
      let data = await fetch(`${BACKEND_URL}/`, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          image: picture,
          designation,
          salary,
        }),
      });
      Alert.alert(`${name} created successfully`);
      navigation.navigate("Home");
    } catch (err) {
      console.log("error posting employee: ", err);
    }
  }
  async function updateData() {
    try {
      let data = await fetch(`${BACKEND_URL}/update`, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          id: route.params._id,
          name,
          email,
          phone,
          image: picture,
          designation,
          salary,
        }),
      });
      Alert.alert(`${name} updated successfully`);
      navigation.navigate("Home");
    } catch (err) {
      console.log("error posting employee: ", err);
    }
  }
  async function galleryPicker() {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.25,
      });
      console.log(data);
      if (!result.canceled && result.assets && result.assets.length > 0) {
        let asset = result.assets[0];
        let newFile = {
          uri: asset.uri,
          type: `test/${asset.uri.split(".").pop()}`,
          name: `test.${asset.uri.split(".").pop()}`,
        };
        handleUpload(newFile);
      }
    } else Alert.alert("gallery permission denied");
  }

  async function cameraPicker() {
    let { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.25,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        let asset = result.assets[0];
        let newFile = {
          uri: asset.uri,
          type: `test/${asset.uri.split(".")[1]}`,
          name: `test.${asset.uri.split(".")[1]}`,
        };
        handleUpload(newFile);
      }
    } else Alert.alert("gallery permission denied");
  }

  function handleUpload(image) {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "employee_app");
    data.append("cloud_name", "dovti3yk8");

    fetch("https://api.cloudinary.com/v1_1/dovti3yk8/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPicture(data.url);
        setModal(false);
      })
      .catch((err) => {
        console.log("Error uploading image: ", err);
      });
  }
  const styles = StyleSheet.create({
    mainButtons: {
      margin: 5,
    },
    modal: {
      position: "absolute",
      bottom: 2,
      width: "100%",
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
    },
  });
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="position"
      enabled={shift}
    >
      <View>
        <TextInput
          style={{ margin: 5 }}
          mode="outlined"
          label="Name"
          value={name}
          onFocus={() => setShift(false)}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={{ margin: 5 }}
          mode="outlined"
          label="designation"
          value={designation}
          onFocus={() => setShift(false)}
          onChangeText={(text) => setDesignation(text)}
        />
        <TextInput
          style={{ margin: 5 }}
          mode="outlined"
          label="phone"
          value={phone}
          keyboardType="number-pad"
          onFocus={() => setShift(false)}
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          style={{ margin: 5 }}
          mode="outlined"
          label="email"
          value={email}
          onFocus={() => setShift(true)}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={{ margin: 5 }}
          mode="outlined"
          label="salary"
          keyboardType="number-pad"
          value={salary}
          onFocus={() => setShift(true)}
          onChangeText={(text) => setSalary(text)}
        />
        <Button
          icon={picture === "" ? "upload" : "check"}
          style={styles.mainButtons}
          mode="contained"
          onPress={() => setModal(true)}
        >
          Upload Image
        </Button>
        {route.params ? (
          <Button
            icon="content-save-outline"
            style={styles.mainButtons}
            mode="contained"
            onPress={() => updateData()}
          >
            Update
          </Button>
        ) : (
          <Button
            icon="content-save-outline"
            style={styles.mainButtons}
            mode="contained"
            onPress={() => submitData()}
          >
            Save
          </Button>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => setModal(false)}
        >
          <View style={styles.modal}>
            <View style={styles.modalButtons}>
              <Button
                icon="camera"
                mode="contained"
                onPress={() => cameraPicker()}
              >
                Take Photo
              </Button>
              <Button
                icon="image-area"
                mode="contained"
                onPress={() => galleryPicker()}
              >
                From Gallery
              </Button>
            </View>
            <Button
              icon="image-area"
              mode="contained"
              onPress={() => {
                setModal(false);
              }}
            >
              Cancel
            </Button>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}

export default CreateEmployee;
