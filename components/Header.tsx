"use client";

import React from "react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import { Download, FolderOutput } from "lucide-react";
import { useJsonData } from "@/context/JsonDataContext";

export default function Header() {
  const { data, setData } = useJsonData();
  return (
    <header className="w-full flex items-center justify-between p-2 border-b font-bold">
      <span>
        <a href="">PayWorks</a>
      </span>
      {data && data.length > 0 && (
        <Button variant={"linkHover2"} size={"sm"}>
          Export <FolderOutput className="p-1" /> Approved
        </Button>
      )}

      <ThemeToggle />
    </header>
  );
}
