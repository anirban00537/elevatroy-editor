import { Images } from "@/helpers/core-constants";
import React from "react";
import { motion } from "framer-motion";
const ImageComponent = ({ handleBackgroundImage }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=" overflow-y-auto inline-block no-scrollbar text-left w-full my-3"
      style={{ maxHeight: "calc(100vh - 200px)" }}
    >
      <>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="text-sm font-medium mb-6 text-white mt-5"
        >
          Images
        </motion.h1>
      </>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className=""
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="grid grid-cols-3 lg:grid-cols-4  gap-1"
        >
          {Images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="  "
            >
              <div
                className="w-full h-20 rounded-lg overflow-hidden  cursor-pointer "
                onClick={() => {
                  handleBackgroundImage(image);
                }}
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ImageComponent;
