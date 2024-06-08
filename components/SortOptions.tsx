import React from "react";
import { Button } from "./ui/button";

export default function SortOptions() {
  return (
    <div className="flex-center space-x-2">
      <Button>Sort by date</Button>
      <Button>Sort by amount</Button>
      <Button>Sort by status</Button>
    </div>
  );
}
