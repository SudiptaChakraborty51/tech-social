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
    case "SET_ALL_BOOKMARKS":
      return { ...state, bookmarks: action.payload };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case "CREATE_NEW_POST":
      return {
        ...state,
        posts: action.payload,
      };
    case "EDIT_POST":
      return {
        ...state,
        posts: action.payload,
      };
    case "EDIT_USER":
      return {
        ...state,
        users: state?.users?.map((user) =>
          action.payload?._id === user._id ? { ...action.payload } : user
        ),
      };
    default:
      return state;
  }
};
