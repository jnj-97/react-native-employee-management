import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Card, FAB } from "react-native-paper";
import Constants from "expo-constants";
import { useSelector, useDispatch } from "react-redux";

function Home(props) {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  const { BACKEND_URL } = Constants.expoConfig.extra;

  const { data, loading } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("backend url: ", BACKEND_URL);
        const response = await fetch(BACKEND_URL + "/");
        let result = await response.json();
        dispatch({ type: "ADD_DATA", payload: result });
        dispatch({ type: "SET_LOADING", payload: false });
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  const onRefresh = async () => {
    try {
      const response = await fetch(BACKEND_URL + "/");
      let result = await response.json();
      dispatch({ type: "ADD_DATA", payload: result });
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (err) {
      console.error("Refresh error:", err);
    }
  };

  const renderCard = ({ item }) => {
    return (
      <Card
        style={styles.card}
        onPress={() => props.navigation.navigate("Profile", { item })}
      >
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
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderCard}
          keyExtractor={(item) => item._id}
          refreshing={loading}
          onRefresh={() => onRefresh()}
        />
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        small={false}
        onPress={() => props.navigation.navigate("Create Employee")}
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
