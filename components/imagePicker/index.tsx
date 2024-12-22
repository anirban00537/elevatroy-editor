import { useExport } from "@/hooks/useScreenshotEditor";
import { Upload } from "lucide-react";
import React, { useState } from "react";

const ImagePicker = () => {
  const { handleImageUploadDrop } = useExport();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    setUploadStatus("Uploading...");
    try {
      await handleImageUploadDrop(droppedFiles);
      setUploadStatus("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("Upload failed. Please try again.");
    }
  };

  return (
    <div
      className={`droppable-area p-2 border-[12px] border-[#f2f0f069] rounded-3xl bg-gray-100  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20  shadow-xl text-xs px-2 flex flex-col items-center justify-center text-white mt-4 md:mt-0  ${
        isDragging ? "border-dashed border-4 border-blue-500" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label
        htmlFor="fileInput"
        className="cursor-pointer text-center p-4 md:p-16 m-12 md:my-16 flex flex-col items-center"
      >
        <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full border border-white p-3">
          <Upload className="w-12 h-12 text-white" size={32} />
        </div>
        <p className="mt-3 text-white max-w-xs mx-auto">
          {uploadStatus ? (
            <span className="font-medium text-indigo-600">{uploadStatus}</span>
          ) : (
            <span className="text-xl">
              Paste your image by pressing{" "}
              <span className="font-semibold">CTRL + V</span> or{" "}
              <span className="font-semibold">⌘ + V</span>
              <br />
              Alternatively, click to choose or drop your file here
            </span>
          )}
        </p>
      </label>
      <input id="fileInput" type="file" accept="image/*" className="hidden" />
    </div>
  );
};

export default ImagePicker;
