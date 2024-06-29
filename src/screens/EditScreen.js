import React, { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import BlogContext from "../context/BlogPostProvider";

const EditScreen = ({ navigation }) => {
  const postId = navigation.getParam("id");
  const { data: state, getBlogPost, updateBlogPost } = useContext(BlogContext);
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
      <Text style={styles.label}> Title</Text>
      <TextInput
        style={styles.textInput}
        value={blog.title}
        onChangeText={(text) => setBlog({ ...blog, title: text })}
      />
      <Text style={styles.label}> Content</Text>
      <TextInput
        style={styles.textInput}
        value={blog.content}
        onChangeText={(text) => setBlog({ ...blog, content: text })}
      />
      <Button
        title="Update Blog Post"
        onPress={() => {
          setBlog({});
          updateBlogPost({
            title: blog.title,
            content: blog.content,
            id: blog.id,
            navigate: () => {
              navigation.navigate("Index");
            },
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
  },
});
export default EditScreen;
