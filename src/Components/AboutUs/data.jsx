import React from "react";

export const PurposeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const TrustIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const QualityIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 2-2 7-7 2 7 2 2 7 2-7 7-2-7-2-2-7z" />
    <path d="M3 21v-2" />
    <path d="M3 14v-2" />
    <path d="M21 3v2" />
    <path d="M21 10v2" />
    <path d="M10 3H8" />
    <path d="M17 3h-2" />
    <path d="M21 17v-2" />
    <path d="M8 21H3" />
    <path d="M14 21h7" />
  </svg>
);

export const services = [
  { id: 1, title: "Driven by Purpose", icon: <PurposeIcon /> },
  { id: 2, title: "Built on Trust", icon: <TrustIcon /> },
  { id: 3, title: "Quality You Can See", icon: <QualityIcon /> },
];
