// Branch locations rarely change, so like ministries these are edited
// directly here rather than through the admin dashboard. To update:
// 1. Drop the photo in public/locations/your-file.jpg
// 2. Reference it below as "/locations/your-file.jpg"

export type Location = {
  name: string;
  address?: string;
  serviceTimes: string;
  image?: string; // e.g. "/locations/lagos-mainland.jpg"
};

export const locations: Location[] = [
  {
    name: "Lagos (Mainland)",
    address: "",
    serviceTimes: "Sundays 8:00 & 10:30 AM · Wednesdays 6:00 PM",
    image: "/locations/lagos-mainland.png",
  },
  {
    name: "Lagos (Island)",
    address: "",
    serviceTimes: "Sundays 9:00 AM",
    image: "/locations/lagos-island.png",
  },
  {
    name: "Abuja",
    address: "",
    serviceTimes: "Sundays 9:00 AM",
    image: "/locations/abuja.png",
  },
  {
    name: "Online",
    address: "Streamed live",
    serviceTimes: "Sundays 9:00 AM WAT",
    image: "/locations/online.png",
  },
];
