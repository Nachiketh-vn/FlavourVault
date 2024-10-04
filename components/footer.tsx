import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          {/* Logo Section */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <Link href="/">
              <h2 className="text-2xl font-bold cursor-pointer">YourLogo</h2>
            </Link>
            <p className="mt-4">Bringing you the best services and features.</p>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Explore</h3>
            <ul>
              <li>
                <Link href="/features" className="hover:underline">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:underline">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com">
                <FaFacebook
                  size={24}
                  className="hover:text-blue-500 cursor-pointer"
                />
              </Link>
              <Link href="https://www.twitter.com">
                <FaTwitter
                  size={24}
                  className="hover:text-blue-400 cursor-pointer"
                />
              </Link>
              <Link href="https://www.instagram.com">
                <FaInstagram
                  size={24}
                  className="hover:text-pink-500 cursor-pointer"
                />
              </Link>
              <Link href="https://www.linkedin.com">
                <FaLinkedin
                  size={24}
                  className="hover:text-blue-600 cursor-pointer"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} YourLogo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
