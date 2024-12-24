import React from "react";

const DevelopmentContact = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 px-4 py-2 bg-dark-300 rounded-full border border-dark-100 shadow-lg animate-glow">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">
            Contact for SaaS Development
          </span>
          <span className="text-gray-600 text-xs">•</span>
          <a
            href="https://www.linkedin.com/in/anirban00537/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full transition-colors flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentContact;
