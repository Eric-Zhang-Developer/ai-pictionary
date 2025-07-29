import { useRef } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
export default function Sketchpad() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  
  async function handleSubmit () {
    console.log("Submitting!");
    if (!canvasRef.current){
      console.error("Canvas ref is not available yet");
      return;
    }
    const image = await canvasRef.current.exportImage("png");
    console.log(image);
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
