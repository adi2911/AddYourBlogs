import React, { createContext, useReducer } from "react";

const BlogContext = createContext();

const blogReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "delete":
      return state.filter((blog) => blog.id != action.payload.id);
    case "get":
      return [...state];
    case "update":
      return state.map((blog) => {
        if (blog == action.payload.id) {
          return action.payload;
        }
        return blog;
      });
    default:
      return state;
  }
};

export const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, []);

  const addBlogPost = (post) => {
    dispatch({
      type: "add",
      payload: { title: post.title, content: post.content },
    });
    post.navigate();
  };

  const deleteBlogPost = (postId) => {
    dispatch({ type: "delete", payload: { id: postId } });
  };

  const getBlogPost = () => {
    dispatch({ type: "get" });
  };

  const updateBlogPost = (post) => {
    dispatch({
      type: "update",
      payload: { title: post.title, content: post.content, id: post.id },
    });
    post.navigate();
  };

  return (
    <BlogContext.Provider
      value={{
        data: state,
        addBlogPost,
        deleteBlogPost,
        getBlogPost,
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
