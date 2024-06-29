import React, { useContext, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import BlogContext from "../context/BlogPostProvider";

const CreateScreen = ({ navigation }) => {
  const { addBlogPost } = useContext(BlogContext);
  const [newBlog, setNewBlog] = useState({});

  return (
    <View>
      <Text style={styles.label}>Enter Title</Text>
      <TextInput
        style={styles.textInput}
        value={newBlog.title}
        onChangeText={(text) => setNewBlog({ ...newBlog, title: text })}
      />
      <Text style={styles.label}>Enter Content</Text>
      <TextInput
        style={styles.textInput}
        value={newBlog.content}
        onChangeText={(text) => setNewBlog({ ...newBlog, content: text })}
      />
      <Button
        title="Add Blog Post"
        onPress={() => {
          setNewBlog({});
          addBlogPost({
            title: newBlog.title,
            content: newBlog.content,
            id: Math.floor(Math.random() * 99999),
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
export default CreateScreen;
