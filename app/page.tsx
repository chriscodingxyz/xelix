import { useJsonData } from "@/context/JsonDataContext";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/upload");
}
