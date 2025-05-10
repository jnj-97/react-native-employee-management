import React, { useState } from "react";
import { Modal, View, StyleSheet, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

function CreateEmployee() {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [salary, setSalary] = useState("");
  const [modal, setModal] = useState(false);
  const [picture, setPicture] = useState("");

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
    <View style={{ flex: 1 }}>
      <TextInput
        style={{ margin: 5 }}
        mode="outlined"
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={{ margin: 5 }}
        mode="outlined"
        label="designation"
        value={designation}
        onChangeText={(text) => setDesignation(text)}
      />
      <TextInput
        style={{ margin: 5 }}
        mode="outlined"
        label="phone"
        value={phone}
        keyboardType="number-pad"
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        style={{ margin: 5 }}
        mode="outlined"
        label="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={{ margin: 5 }}
        mode="outlined"
        label="image"
        value={image}
        onChangeText={(text) => setImage(text)}
      />
      <TextInput
        style={{ margin: 5 }}
        mode="outlined"
        label="salary"
        keyboardType="number-pad"
        value={salary}
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
      <Button
        icon="content-save-outline"
        style={styles.mainButtons}
        mode="contained"
      >
        Save
      </Button>
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
  );
}

export default CreateEmployee;
