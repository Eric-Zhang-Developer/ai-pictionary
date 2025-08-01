import { useRef } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { SketchpadProps } from "@/utils/types";
export default function Sketchpad({ setResponse }: SketchpadProps) {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  async function handleSubmit() {
    console.log("Submitting!");
    if (!canvasRef.current) {
      console.error("Canvas ref is not available yet");
      return;
    }
    const fullDataURI = await canvasRef.current.exportImage("png");
    const rawBase64Data = fullDataURI.split(",")[1]; 
    try {
      const response = await fetch("http://localhost:3000/api/generate-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: rawBase64Data }),
      });
      
      if (!response.ok) {

        throw new Error(`API Error: ${response.status} `);
      }

      const result = await response.json();
      console.log("got result!")
      console.log(result.response); 
      console.log(Object.prototype.toString.call(result.response));
      setResponse(result.response);

    } catch (error) {
      console.log(error);
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
