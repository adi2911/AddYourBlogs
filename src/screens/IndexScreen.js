import { Feather } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BlogContext from "../context/BlogPostProvider";

const IndexScreen = ({ navigation }) => {
  const { data: blogPost, deleteBlogPost } = useContext(BlogContext); // fetching value provided to the BlogContext Provider
  const [newBlog, setNewBlog] = useState("");
  return (
    <View>
      <FlatList
        keyExtractor={(data) => data.id + "/" + data.name + "/" + data.content}
        data={blogPost}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Show", { id: item.id })}
          >
            <View style={styles.row}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.content}</Text>
              <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                <Feather name="trash" style={styles.deleteIconStyle} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
  },
  deleteIconStyle: {
    fontSize: 24,
  },
});

export default IndexScreen;
