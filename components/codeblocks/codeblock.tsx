import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import Editor from "react-simple-code-editor";
import hljs from "highlight.js";
import flourite from "flourite";
import "highlight.js/styles/atom-one-dark.css";

import { cn } from "@/lib/utils";
import { codeSnippets, fonts } from "@/helpers/options";
import {
  setAutoDetectLanguage,
  setCode,
  setDarkMode,
  setFontSize,
  setFontStyle,
  setLanguage,
  setTitle,
} from "@/store/slice/codeEditor.slice";

export default function CodeBlock() {
  const {
    title,
    code,
    language,
    darkMode,
    autoDetectLanguage,
    fontStyle,
    fontSize,
    threeD,
  } = useSelector((state: RootState) => state.code);
  const dispatch = useDispatch();
  useEffect(() => {
    const randomSnippet =
      codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    setTitle("");
    dispatch(setCode(randomSnippet.code));
  }, []);

  useEffect(() => {
    if (autoDetectLanguage) {
      const { language: detectedLanguage } = flourite(code, {
        noUnknown: true,
      });
      dispatch(setLanguage(detectedLanguage.toLowerCase() || "plaintext"));
    }
  }, [autoDetectLanguage, code]);

  return (
    <div
      className={cn(
        " w-full border-2 rounded-xl shadow-2xl",
        darkMode
          ? "bg-black/75 border-gray-600/40 text-white"
          : "bg-white/75 border-gray-200/20 text-black/75"
      )}
      style={{
        transform: `perspective(${threeD.perspective}px) rotateX(${threeD.rotateX}deg) rotateY(${threeD.rotateY}deg) rotateZ(${threeD.rotateZ}deg)`,
        transition: "all 0.5s ease-out 0s",
      }}
    >
      <header className="grid grid-cols-6 gap-3 items-center px-4 py-3">
        <div className="flex gap-1.5">
          <div className="rounded-full h-3 w-3 bg-red-500" />
          <div className="rounded-full h-3 w-3 bg-yellow-500" />
          <div className="rounded-full h-3 w-3 bg-green-500" />
        </div>
        <div className="col-span-4 flex justify-center">
          <input
            type="text"
            value={title}
            placeholder="Untitled"
            onChange={(e) => dispatch(setTitle(e.target.value))}
            spellCheck={false}
            onClick={(e: any) => e.target.select()}
            className={`bg-transparent text-center ${
              darkMode ? "text-white" : "text-black/75"
            } text-sm font-medium focus:outline-none`}
          />
        </div>
      </header>
      <div
        className={cn(
          "px-4 pb-4",
          darkMode
            ? "brightness-110"
            : "text-gray-800 brightness-50 saturate-200 contrast-200"
        )}
      >
        <Editor
          value={code}
          onValueChange={(newCode) => dispatch(setCode(newCode))}
          padding={10}
          highlight={(code) =>
            hljs.highlight(code, { language: language || "plaintext" }).value
          }
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: fontSize,
          }}
          textareaClassName="focus:outline-none"
          onClick={(e: any) => e.target.select()}
        />
      </div>
    </div>
  );
}
