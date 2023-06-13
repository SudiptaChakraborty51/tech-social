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
    profileAvatar: "https://res.cloudinary.com/dqlasoiaw/image/upload/v1686643850/tech-social/IMG-20211012-WA0170_pizgca.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
