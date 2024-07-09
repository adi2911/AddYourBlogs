export const blogReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "delete":
      return state.filter((blog) => blog.id != action.payload.id);
    case "get":
      return action.payload;
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
