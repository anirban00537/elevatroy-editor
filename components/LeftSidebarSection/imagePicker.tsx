import { Images } from "@/helpers/core-constants";
import React from "react";
import { Upload, Image as ImageIcon } from "lucide-react";

interface ImagePickerProps {
  handleBackgroundImage: (image: string) => void;
}

const ImagePicker = ({ handleBackgroundImage }: ImagePickerProps) => {
  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div>
        <h4 className="text-xs text-zinc-400 mb-3">Upload Image</h4>
        <button
          className="w-full px-4 py-3 bg-dark-300 hover:bg-dark-400 
            rounded-lg border border-white/10 transition-colors group"
        >
          <div className="flex flex-col items-center gap-2">
            <Upload 
              size={20} 
              className="text-zinc-400 group-hover:text-zinc-300" 
            />
            <span className="text-xs text-zinc-400 group-hover:text-zinc-300">
              Click to upload or drag and drop
            </span>
          </div>
        </button>
      </div>

      {/* Image Presets */}
      <div>
        <h4 className="text-xs text-zinc-400 mb-3">Image Presets</h4>
        <div className="grid grid-cols-2 gap-2">
          {Images.map((image, index) => (
            image && (
              <button
                key={index}
                onClick={() => handleBackgroundImage(image)}
                className="relative aspect-video rounded-lg overflow-hidden 
                  group cursor-pointer hover:ring-2 hover:ring-white/20 
                  transition-all"
              >
                {/* Image Preview */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${image})` }}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 
                  group-hover:opacity-100 transition-opacity flex items-center 
                  justify-center">
                  <ImageIcon size={20} className="text-white" />
                </div>
              </button>
            )
          ))}
        </div>
      </div>

      {/* Recently Used */}
      <div>
        <h4 className="text-xs text-zinc-400 mb-3">Recently Used</h4>
        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="aspect-video rounded-lg bg-dark-300 border 
                border-white/5"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagePicker;
