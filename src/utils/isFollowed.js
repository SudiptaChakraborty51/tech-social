export const isFollowed = (users, userId) => {
  const localStorageData = JSON.parse(localStorage.getItem("data"));
  return users
    ?.find(({ _id }) => _id === localStorageData?.user?._id)
    ?.following?.find(({ _id }) => _id === userId)
    ? true
    : false;
};
