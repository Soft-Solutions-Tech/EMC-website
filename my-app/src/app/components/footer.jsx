import React from "react";
import {
  Facebook,
  Linkedin,
  Instagram,
  Phone,
  MapPin,
  Mail,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-background via-accent/20 to-background py-12">
      <div className="container mx-auto px-4">
        {/* 5-column grid for desktop (lg and up) */}
        <div className="hidden lg:block mb-8">
          <div className="grid grid-cols-5 gap-8">
            {/* Column 1: EMC Header and Description */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-navy text-center">EMC</h3>
              <p className="text-gray-700 text-sm leading-relaxed text-center">
                EMC is a leading consulting firm specializing in business
                solutions, strategic planning, and operational excellence. We
                help organizations achieve their goals through innovative
                approaches and proven methodologies.
              </p>
            </div>
            {/* Column 2: Contact Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-navy text-center">
                Contact Info
              </h4>
              <div className="space-y-3 text-sm text-gray-700 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Phone size={16} className="text-blue-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-start justify-center space-x-2">
                  <MapPin size={16} className="text-blue-400 mt-0.5" />
                  <span>
                    123 Business Street, Suite 100
                    <br />
                    New York, NY 10001
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Mail size={16} className="text-blue-400" />
                  <span>info@emcconsulting.com</span>
                </div>
              </div>
            </div>
            {/* Column 3: Policies */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-navy text-center">
                Policies
              </h4>
              <div className="space-y-2 text-sm text-center">
                <a
                  href="/terms"
                  className="text-navy hover:text-accent transition-colors duration-300 block"
                >
                  Terms of Service
                </a>
                <a
                  href="/privacy"
                  className="text-navy hover:text-accent transition-colors duration-300 block"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
            {/* Column 4: Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-navy text-center">
                Quick Links
              </h4>
              <div className="space-y-2 text-sm text-center">
                <a
                  href="/about"
                  className="text-navy hover:text-accent transition-colors duration-300 block"
                >
                  About Us
                </a>
                <a
                  href="/contact"
                  className="text-navy hover:text-accent transition-colors duration-300 block"
                >
                  Contact Us
                </a>
              </div>
            </div>
            {/* Column 5: Projects by EMC */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-navy text-center">
                Projects by EMC
              </h4>
              <div className="space-y-2 text-sm text-center">
                <a
                  href="/projects?type=EPC"
                  className="text-navy hover:text-accent transition-colors duration-300 block"
                >
                  EPC
                </a>
                <a
                  href="/projects?type=CONSULTING"
                  className="text-navy hover:text-accent transition-colors duration-300 block"
                >
                  Consulting
                </a>
                <a
                  href="/projects?type=AFTERSALES"
                  className="text-navy hover:text-accent transition-colors duration-300 block"
                >
                  After Sales
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2x2 grid/centered layout for mobile/tablet (below lg) */}
        <div className="block lg:hidden mb-8">
          {/* Text Row */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-navy text-center">EMC</h3>
            <p className="text-gray-700 text-sm leading-relaxed text-center">
              EMC is a leading consulting firm specializing in business
              solutions, strategic planning, and operational excellence. We help
              organizations achieve their goals through innovative approaches
              and proven methodologies.
            </p>
          </div>
          {/* 2x2 Grid for other columns */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-navy text-center">
                Contact Info
              </h4>
              <div className="space-y-3 text-sm text-gray-700 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Phone size={16} className="text-blue-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-start justify-center space-x-2">
                  <MapPin size={16} className="text-blue-400 mt-0.5" />
                  <span>
                    123 Business Street, Suite 100
                    <br />
                    New York, NY 10001
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Mail size={16} className="text-blue-400" />
                  <span>info@emcconsulting.com</span>
                </div>
              </div>
            </div>
            {/* Policies */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-navy text-center">
                Policies
              </h4>
              <div className="space-y-2 text-sm text-center">
                <a
                  href="/terms"
                  className="text-navy hover:text-accent transition-colors duration-300 block"
                >
                  Terms of Service
                </a>
                <a
                  href="/privacy"
                  className="text-navy hover:text-accent transition-colors duration-300 block"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-navy text-center">
                Quick Links
              </h4>
              <div className="space-y-2 text-sm text-center">
                <a
                  href="/about"
                  className="text-navy hover:text-accent transition-colors duration-300 block"
                >
                  About Us
                </a>
                <a
                  href="/services"
                  className="text-navy hover:text-accent transition-colors duration-300 block"
                >
                  Services
                </a>
                <a
                  href="/contact"
                  className="text-navy hover:text-accent transition-colors duration-300 block"
                >
                  Contact Us
                </a>
              </div>
            </div>
            {/* Projects by EMC */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-navy text-center">
                Projects by EMC
              </h4>
              <div className="space-y-2 text-sm text-center">
                <a
                  href="/projects?type=EPC"
                  className="text-navy hover:text-accent transition-colors duration-300 block"
                >
                  EPC
                </a>
                <a
                  href="/projects?type=CONSULTING"
                  className="text-navy hover:text-accent transition-colors duration-300 block"
                >
                  Consulting
                </a>
                <a
                  href="/projects?type=AFTERSALES"
                  className="text-navy hover:text-accent transition-colors duration-300 block"
                >
                  After Sales
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section with Social Icons, Production Info, and Copyright */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Social Icons - Left */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-10 h-10 flex items-center justify-center group"
            >
              <div className="absolute inset-0 bg-navy rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
              <Facebook
                size={24}
                className="relative z-10 text-navy group-hover:text-white transition-colors duration-300"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-10 h-10 flex items-center justify-center group"
            >
              <div className="absolute inset-0 bg-navy rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
              <Linkedin
                size={24}
                className="relative z-10 text-navy group-hover:text-white transition-colors duration-300"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-10 h-10 flex items-center justify-center group"
            >
              <div className="absolute inset-0 bg-navy rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
              <Instagram
                size={24}
                className="relative z-10 text-navy group-hover:text-white transition-colors duration-300"
              />
            </a>
          </div>
          {/* Production Info - Center */}
          <div className="text-sm text-gray-700 text-center">
            <a
              href="https://www.instagram.com/softsolutions.eg/?utm_source=ig_web_button_share_sheet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy hover:text-accent transition-colors duration-300"
            >
              Production by Soft Solutions
            </a>
          </div>
          {/* Copyright - Right */}
          <div className="text-sm text-gray-700">
            © 1988 EMC Consulting. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
