import React, { createContext, useReducer } from "react";
import jsonServer from "../api/jsonServer";
import { blogReducer } from "./reducer";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, []);

  const getBlogPosts = async () => {
    const response = await jsonServer.get("/blogposts");
    dispatch({ type: "get", payload: response.data });
  };

  const addBlogPost = async (post) => {
    payload = {
      title: post.title,
      content: post.content,
    };
    await jsonServer.post("/blogposts", payload);

    // dispatch({
    //   type: "add",
    //   payload,
    // });

    post.navigate();
  };

  const deleteBlogPost = async (postId) => {
    await jsonServer.delete(`/blogposts/${postId}`);
    dispatch({ type: "delete", payload: { id: postId } });
  };

  const updateBlogPost = async (post) => {
    const payload = {
      title: post.title,
      content: post.content,
    };
    await jsonServer.put(`/blogposts/${post.id}`, payload);

    // dispatch({
    //   type: "update",
    //   payload: { title: post.title, content: post.content, id: post.id },
    //});

    post.navigate();
  };

  return (
    <BlogContext.Provider
      value={{
        data: state,
        addBlogPost,
        deleteBlogPost,
        getBlogPosts,
        updateBlogPost,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;

/*
import createDataContext from "./createDataContext";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    default:
      return state;
  }
};
const addBlogPost = (dispatch) => {
  return (post)=>{
  dispatch({ type: "add", payload:post });
}
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost }, //can add more function to the object
  []
);

*/
