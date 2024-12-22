// components/BuyMeACoffee.js
import Link from "next/link";

const BuyMeACoffee = () => {
  const handleClick = () => {
    // Handle any additional actions when the button is clicked
  };

  return (
    <div className="">
      <a
        target="_blank"
        href="https://www.buymeacoffee.com/anirban00537"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-lg overflow-hidden  hover:bg-yellow-600 transition duration-300 ease-in-out "
        onClick={handleClick}
      >
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
          className="h-8"
        />
      </a>
    </div>
  );
};

export default BuyMeACoffee;
