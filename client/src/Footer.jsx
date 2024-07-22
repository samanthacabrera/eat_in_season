import React from 'react';

const Footer = () => {
  return (
    <footer className="absolute bottom-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-row items-center justify-center mb-4">
            <a
            href="https://github.com/samanthacabrera/eatBySeason"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 text-white text-xs py-2 px-4 rounded-lg shadow-md hover:bg-gray-900 transition-transform transform hover:scale-105"
          >
            Contribute
          </a>  
        </div>
      </div>
    </footer>
  );
};

export default Footer;
