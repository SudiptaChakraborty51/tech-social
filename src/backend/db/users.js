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
    profileAvatar:
      "https://res.cloudinary.com/dqlasoiaw/image/upload/v1686685042/tech-social/IMG_20230117_131338_xs5yms.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [],
    followers: [],
  },
  {
    _id: "s2d3Bie-8",
    firstName: "John",
    lastName: "William",
    username: "johnwilliam",
    email: "johnwilliam03@gmail.com",
    password: "john123@03",
    bio: "Senior Software Developer at Google",
    website: "https://johnwilliam.netlify.app/",
    profileAvatar:
      "https://res.cloudinary.com/dqlasoiaw/image/upload/v1686659911/tech-social/man3_a5om95.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [],
    followers: [],
  },
  {
    _id: "e6a9Gqs-u",
    firstName: "Lina",
    lastName: "Abott",
    username: "linaabott",
    email: "linaabott56@gmail.com",
    password: "lina453@56",
    bio: "Backend Developer at Amazon",
    website: "https://linaabott.netlify.app/",
    profileAvatar:
      "https://res.cloudinary.com/dqlasoiaw/image/upload/v1686659986/tech-social/overjoyed-pretty-asian-woman-look-at-camera-with-sincere-laughter_b9hnrt.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [],
    followers: [],
  },
  {
    _id: "f1h5Jwv-m",
    firstName: "David",
    lastName: "Kyle",
    username: "davidkyle",
    email: "davidkyle24@gmail.com",
    password: "david67@24",
    bio: "Android developer",
    website: "https://davidkyle.netlify.app/",
    profileAvatar:
      "https://res.cloudinary.com/dqlasoiaw/image/upload/v1686659910/tech-social/photo-1566753323558-f4e0952af115_cocrd5.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [],
    followers: [],
  },
  {
    _id: "l0y2Krn-5",
    firstName: "Julie",
    lastName: "Adams",
    username: "julieadams",
    email: "julieadams62@gmail.com",
    password: "julie93@62",
    bio: "Full-stack developer",
    website: "https://julieadams.netlify.app/",
    profileAvatar:
      "https://res.cloudinary.com/dqlasoiaw/image/upload/v1686659986/tech-social/photo-1544005313-94ddf0286df2_qz2jqa.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [],
    followers: [],
  },
];
