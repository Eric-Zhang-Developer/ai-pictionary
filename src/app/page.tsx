"use client"
import { ReactSketchCanvas } from "react-sketch-canvas";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col gap-4 container mx-auto">
      <h1 className="text-4xl">AI Pictionary</h1>
      <h2 className="text-3xl">Draw a Cat</h2>
      <ReactSketchCanvas className="" height="400px" strokeWidth={4} strokeColor="black"></ReactSketchCanvas>
      <button className="bg-blue-400 text-white px-10 py-3 rounded-xl text-2xl shadow-lg hover:cursor-pointer transition hover:scale-110">
        Submit Drawing
      </button>
      <div className="border-2 px-120 py-20 rounded-2xl mt-10"></div>
    </div>
  );
}
