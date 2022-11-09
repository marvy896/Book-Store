import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://fudap-books-api.herokuapp.com/books/")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator
          testID="loading"
          accessibilityLabel="App is loading books"
        />
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "green",
              textAlign: "center",
              paddingBottom: 10,
            }}
          >
            Articles:
          </Text>
          <FlatList
            accessibilityLabel="books"
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text testID="book">{item.id + ". " + item.title}</Text>
            )}
          />
        </View>
      )}
    </View>
  );
}
