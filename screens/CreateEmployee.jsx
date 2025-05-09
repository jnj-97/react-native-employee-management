import React, { useState } from "react";
import { Modal, View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

function CreateEmployee() {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [salary, setSalary] = useState("");
  const [modal, setModal] = useState(false);

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
        icon="upload"
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
            <Button icon="camera" mode="contained">
              Take Photo
            </Button>
            <Button icon="image-area" mode="contained">
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
