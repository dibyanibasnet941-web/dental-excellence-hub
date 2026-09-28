import { Facebook, Twitter, Youtube, Instagram, MapPin, Phone, Mail, ArrowUp } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full">
      <div className="bg-gradient-to-r from-slate-600 to-blue-500 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
            <ul className="space-y-3 text-sm text-blue-50">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <span>P88H+RFX, Gairidhara Rd, Kathmandu 23690</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0" />
                <span>01-4536276</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0" />
                <span>info@gargdental.com</span>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Information</h3>
            <ul className="space-y-3 text-sm text-blue-50">
              <li><a href="/company-info" className="hover:underline">Company Info</a></li>
              <li><a href="/legal-registration" className="hover:underline">Legal Registration</a></li>
              <li><a href="/returns-refund" className="hover:underline">Return &amp; Refund Policy</a></li>
              <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Our Company */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Our Company</h3>
            <ul className="space-y-3 text-sm text-blue-50">
              <li><a href="/about" className="hover:underline">About us</a></li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
              <li><a href="/terms" className="hover:underline">Terms and Conditions</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Join our Newsletter</h3>
            <div className="flex overflow-hidden rounded-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                className="w-full px-3 py-2 text-sm text-gray-800 outline-none"
              />
              <button
                type="button"
                className="shrink-0 bg-blue-900 px-4 py-2 text-sm font-bold hover:bg-blue-950"
              >
                SUBSCRIBE
              </button>
            </div>
            <p className="mt-3 text-xs text-blue-50">
              Subscribe to the mailing list to receive updates on promotions, new arrivals, discount and coupons.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="#" className="flex items-center gap-2 rounded-md bg-black px-3 py-2 text-xs font-semibold">
                Google Play
              </a>
              <a href="#" className="flex items-center gap-2 rounded-md bg-black px-3 py-2 text-xs font-semibold">
                Apple Store
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between bg-slate-900 px-4 py-4 text-xs text-slate-300 sm:px-6 lg:px-8">
        <span>Copyright © {new Date().getFullYear()} Garg Dental. All Right Reserved</span>
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
