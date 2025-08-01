import { useRef } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { SketchpadProps } from "@/utils/types";
export default function Sketchpad({ setResponse }: SketchpadProps) {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  // Currently this function as well as the API function is very very janky. This is Proof of Concept Code 
  // The core code itself is fine however there are no guard rails and the code is a nightmare to debug
  // To-do: write tests
  async function handleSubmit() {
    if (!canvasRef.current) {
      console.error("Canvas ref is not available yet");
      return;
    }

    // Gemini API only accepts rawBase64Data not DataURI 
    const fullDataURI = await canvasRef.current.exportImage("png");
    const rawBase64Data = fullDataURI.split(",")[1]; 

    try {
      // API Call 
      const response = await fetch("http://localhost:3000/api/generate-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: rawBase64Data }),
      });
      
      // To-Do : More Robust Error Handling, write tests for this function. 
      // Better idea is to separate this try catch block into its own function 
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} `);
      }

      const result = await response.json();
      setResponse(result.response);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <ReactSketchCanvas
        className=""
        height="400px"
        strokeWidth={4}
        strokeColor="black"
        ref={canvasRef}
      ></ReactSketchCanvas>
      <button
        onClick={handleSubmit}
        className="bg-blue-400 text-white px-10 py-3 rounded-xl text-2xl shadow-lg hover:cursor-pointer transition hover:scale-110"
      >
        Submit Drawing
      </button>
    </>
  );
}
