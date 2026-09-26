// Ministries rarely change, so unlike sermons/events these are edited
// directly here rather than through the admin dashboard. To update:
// 1. Drop the photo in public/ministries/your-file.jpg
// 2. Reference it below as "/ministries/your-file.jpg"

export type Ministry = {
  name: string;
  description: string;
  leader?: string;
  image?: string; // e.g. "/ministries/youth.jpg"
};

export const ministries: Ministry[] = [
  {
    name: "Youth Ministry",
    description:
      "A space for teenagers to grow in faith together through weekly meetups, mentorship, and events built for their stage of life.",
    leader: "",
    image: "/ministries/youth.png",
  },
  {
    name: "Men's Fellowship",
    description:
      "Men gathering for accountability, Bible study, and practical support as husbands, fathers, and leaders.",
    leader: "",
    image: "/ministries/mens.png",
  },
  {
    name: "Women's Fellowship",
    description:
      "A community of women encouraging one another through prayer, fellowship, and the Word.",
    leader: "",
    image: "/ministries/womens.png",
  },
];
