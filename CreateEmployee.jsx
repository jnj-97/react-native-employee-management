import React, { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

function CreateEmployee() {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [salary, setSalary] = useState("");
  const [modal, setModal] = useState(false);
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
        keyboardType="number-type"
        value={salary}
        onChangeText={(text) => setSalary(text)}
      />
    </View>
  );
}

export default CreateEmployee;
