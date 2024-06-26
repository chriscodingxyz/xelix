"use client";

import React, { useCallback, useRef } from "react";
import { useJsonData } from "@/context/JsonDataContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FolderSearch } from "lucide-react";
import { examplejson } from "@/lib/data";

export default function UploadPage() {
  const { setUploadedJsonData } = useJsonData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileUpload = useCallback(
    (file: File | undefined) => {
      if (!file) {
        console.error("No file provided.");
        return;
      }

      if (file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const json = JSON.parse(e.target?.result as string);
            setUploadedJsonData(json);
            console.log("uploaded json data");
            console.log(json);
            router.push("/review");
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        };
        reader.readAsText(file);
      } else {
        console.error("Please upload a valid JSON file.");
      }
    },
    [setUploadedJsonData, router]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      handleFileUpload(file);
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      handleFileUpload(file);
    },
    [handleFileUpload]
  );

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <main
      className="flex-center min-h-[100dvh] flex-col w-full"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="p-4 rounded shadow-md w-64 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
        <p className="text-center">Drag and drop a .json file</p>
        <Button onClick={handleButtonClick}>
          Browse Files <FolderSearch className="p-1" />
        </Button>
        <input
          type="file"
          accept=".json"
          onChange={handleChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>
      <div className="mt-4 flex-center flex-col">
        <Button
          onClick={() => {
            setUploadedJsonData(examplejson);
            router.push("/review");
          }}
          variant={"linkHover1"}
        >
          Use example file
        </Button>
      </div>
    </main>
  );
}
