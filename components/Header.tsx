import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between p-2 border-b font-bold">
      <span>Xelix</span>
      <span>Pay Review</span>
      <ThemeToggle />
    </header>
  );
}
