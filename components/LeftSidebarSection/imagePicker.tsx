import { Images } from "@/helpers/core-constants";
import React from "react";
import { Upload, Image as ImageIcon } from "lucide-react";

interface ImagePickerProps {
  handleBackgroundImage: (image: string) => void;
}

const ImagePicker = ({ handleBackgroundImage }: ImagePickerProps) => {
  return (
    <div className="space-y-6">
 

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

  
    </div>
  );
};

export default ImagePicker;
