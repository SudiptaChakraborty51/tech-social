export const dataReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL_USERS":
      return { ...state, users: action.payload };
    case "SET_ALL_POSTS":
      return { ...state, posts: action.payload };
    case "USERS_LOADING":
      return { ...state, usersLoading: action.payload };
    case "POSTS_LOADING":
      return { ...state, postsLoading: action.payload };
    default:
      return state;
  }
};
