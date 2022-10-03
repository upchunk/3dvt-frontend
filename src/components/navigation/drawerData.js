import React from "react";
import { BiHomeCircle } from "react-icons/bi";
import { AiOutlineFileText } from "react-icons/ai";
import { TbCameraPlus, TbCamera, TbBox } from "react-icons/tb";

export const MainMenu = [
  {
    title: " Dashboard",
    path: "/dashboard",
    icon: <BiHomeCircle />,
    cName: "nav-text",
  },
  {
    title: " Saran",
    path: "/feedback",
    icon: <AiOutlineFileText />,
    cName: "nav-text",
  },
];

export const Segmentasi = [
  {
    title: " Data Segmentasi",
    path: "/segmentasi/data",
    icon: <TbCamera />,
    cName: "nav-text",
  },
  {
    title: " Segmentasi Baru",
    path: "/segmentasi",
    icon: <TbCameraPlus />,
    cName: "nav-text",
  },
];

export const Rekonstruksi = [
  {
    title: " Data Rekonstruksi",
    path: "/rekonstruksi/data",
    icon: <TbBox />,
    cName: "nav-text",
  },
  {
    title: " Rekonstruksi Baru",
    path: "/rekonstruksi",
    icon: <TbBox />,
    cName: "nav-text",
  },
];
