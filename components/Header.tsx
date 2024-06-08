import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-screen flex items-center justify-between p-2 border-b font-bold">
      <span>Xelix</span>
      <span>Pay Review</span>
      <ThemeToggle />
    </header>
  );
}
