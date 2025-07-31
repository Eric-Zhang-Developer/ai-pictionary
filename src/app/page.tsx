"use client"
import Sketchpad from "@/components/Sketchpad";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  return (
    <div className="flex items-center justify-center flex-col gap-4 container mx-auto">
      <h1 className="text-4xl">AI Pictionary</h1>
      <h2 className="text-3xl">Draw a Cat</h2>
      <Sketchpad setResponse={setResponse}></Sketchpad>
      <div className="border-2 px-120 py-20 rounded-2xl mt-10">{response}</div>
    </div>
  );
}
 