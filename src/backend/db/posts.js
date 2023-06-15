import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: "sfgjuk_ftbj_6789_fghuSD",
    content:
      "Excited to share my first e-commerce website built using ReactJS, mockbee server, vanilla CSS🥳.",
    contentLink: "https://glamour-ecommerce.vercel.app/",
    mediaURL: "https://res.cloudinary.com/dqlasoiaw/video/upload/v1686771977/tech-social/Glamour_Ecommerce_-_Google_Chrome_2023-06-08_17-22-56_online-video-cutter.com_uaylnt.mp4",
    likes: {
      likeCount: 25,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "fyjksd_gb3j_37h8_fy7kBW",
        username: "davidkyle",
        text: "Awesome work Sudipta 🔥",
        votes: {
          upvotedBy: [],
          downvotedBy: []
        }
      }
    ],
    username: "schakraborty",
    createdAt: "2023-05-21T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "jdAd6u_gd8u_4g89_sHk3ED",
    content:
      "I’m happy to share that I’m starting a new position as Senior Software Engineer at Google!",
    contentLink: "",
    mediaURL: "https://res.cloudinary.com/dqlasoiaw/image/upload/v1686811863/tech-social/shutterstock_630500720-4_bwekkt.jpg",
    likes: {
      likeCount: 23,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: "gskytu_gdku_5789g_hsK4uRF",
        username: "linaabott",
        text: "Congratulations John!",
        votes: {
          upvotedBy: [],
          downvotedBy: []
        }
      }
    ],
    username: "johnwilliam",
    createdAt: "2022-03-12T10:35:21+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "gs5eubh_7hrk_6dg5_GfguQB",
    content:
      "I write my first technical blog about querySelector() and querySelectorAll() on elements in JavaScript.",
    contentLink: "https://sudipta26.hashnode.dev/introducing-queryselector-and-queryselectorall-on-elements-in-javascript",
    mediaURL: "https://res.cloudinary.com/dqlasoiaw/image/upload/v1686808219/tech-social/EDAef5fL7_zkli5s.jpg",
    likes: {
      likeCount: 6,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "schakraborty",
    createdAt: "2022-08-31T10:15:12+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: "gdko7tg_hdJu_1298_gfkiDR",
    content:
      "Optimizing Android app performance: Minimize APK size and optimize resource usage for faster app installation and startup.",
    contentLink: "",
    mediaURL: "https://res.cloudinary.com/dqlasoiaw/image/upload/v1686814593/tech-social/How_to_Become_an_Android_Developer_qe0mpv.jpg",
    likes: {
      likeCount: 12,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "davidkyle",
    createdAt: "2022-03-12T11:25:24+05:30",
    updatedAt: formatDate(),
  },
];
