import { EvilIcons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BlogContext from "../context/BlogPostProvider";

const ShowScreen = ({ navigation }) => {
  const postId = navigation.getParam("id");
  const { data: state, getBlogPost } = useContext(BlogContext);
  const [blog, setBlog] = useState({});
  useEffect(() => {
    getBlogPost();
  }, []);
  useEffect(() => {
    const blogPost = state && state.find((blog) => blog.id === postId);
    setBlog(blogPost);
  }, [state]);

  return (
    <View>
      <Text>{blog.title}</Text>
      <Text style={styles.contentStyle}>{blog.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Edit", { id: navigation.getParam("id") })
        }
      >
        <EvilIcons name="pencil" size={35} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  contentStyle: {
    marginTop: 10,
    margin: 5,
    borderWidth: 2,
    borderColor: "black",
  },
});

export default ShowScreen;
