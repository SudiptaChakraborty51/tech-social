import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "a7c2KIpr-t",
    firstName: "Sudipta",
    lastName: "Chakraborty",
    username: "schakraborty",
    email: "sudiptachakroborty20@gmail.com",
    password: "sudipta@26",
    bio: "Aspiring Frontend Developer",
    website: "https://sudiptachakraborty.netlify.app/",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
