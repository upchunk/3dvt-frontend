import React from "react";
import { BiHomeCircle } from "react-icons/bi";
import { AiOutlineFileText } from "react-icons/ai";
import { TbCameraPlus, TbCamera, TbBox, TbLayout } from "react-icons/tb";

export const MainMenu = [
  {
    title: " Dashboard",
    path: "/dashboard",
    icon: <BiHomeCircle />,
    cName: "nav-text",
  },
  {
    title: " Saran",
    path: "/saran",
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

export const StaffOnly = [
  {
    title: " Edit Landing Page",
    path: "/edit-landing-page",
    icon: <TbLayout />,
    cName: "nav-text",
  },
  {
    title: " Lihat Saran",
    path: "/saran/data",
    icon: <TbLayout />,
    cName: "nav-text",
  },
];
