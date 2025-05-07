import React from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { Card, FAB } from "react-native-paper";

function Home() {
  const sampleData = [
    {
      id: 1,
      name: "John Doe",
      image:
        "https://images.unsplash.com/photo-1656918358725-faeeadfdfee8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      designation: "FSD",
    },
    {
      id: 2,
      name: "Emilia Clark",
      image:
        "https://images.unsplash.com/photo-1656918358725-faeeadfdfee8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      designation: "Backend Developer",
    },
    {
      id: 3,
      name: "Derrick Baker",
      image:
        "https://images.unsplash.com/photo-1656918358725-faeeadfdfee8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      designation: "Front end Developer",
    },
    {
      id: 4,
      name: "Adam Russo",
      image:
        "https://images.unsplash.com/photo-1656918358725-faeeadfdfee8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      designation: "Analyst",
    },
    {
      id: 5,
      name: "Mathew Herd",
      image:
        "https://images.unsplash.com/photo-1656918358725-faeeadfdfee8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      designation: "HR",
    },
    {
      id: 6,
      name: "Steve Johnson",
      image:
        "https://images.unsplash.com/photo-1656918358725-faeeadfdfee8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      designation: "Marketing Specialist",
    },
    {
      id: 7,
      name: "Jack Daniel",
      image:
        "https://images.unsplash.com/photo-1656918358725-faeeadfdfee8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      designation: "CFO",
    },
    {
      id: 8,
      name: "Joanne Beltz",
      image:
        "https://images.unsplash.com/photo-1656918358725-faeeadfdfee8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      designation: "Project Manager",
    },
  ];

  const renderCard = ({ item }) => {
    return (
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Image style={styles.profilePicture} source={{ uri: item.image }} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.designation}>{item.designation}</Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View>
      <FlatList
        data={sampleData}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        small={false}
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "#e6948e",
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  designation: {
    fontSize: 14,
    color: "#fff",
  },
  fab: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 16,
  },
});

export default Home;
