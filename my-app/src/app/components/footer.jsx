import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  MapPin,
  Mail,
} from "lucide-react";
import footerData from "../../../data/footer";

export const Footer = () => {
  const {
    company,
    contact,
    policies,
    quickLinks,
    projects,
    social,
    production,
    copyright,
  } = footerData;

  const iconMap = {
    Facebook: Facebook,
    Instagram: Instagram,
    Linkedin: Linkedin,
  };

  return (
    <footer className="bg-gradient-to-br from-background via-accent/20 to-background py-12">
      <div className="container mx-auto px-4">
        {/* Desktop Layout (lg and up) - 5 column grid */}
        <div className="hidden lg:block mb-8">
          <div className="grid grid-cols-5 gap-8">
            {/* Column 1: EMC Logo */}
            <div className="flex items-center justify-center">
              <img
                src="/logos/EMC-LOGO.png"
                alt="EMC Logo"
                className="h-16 w-auto object-contain"
              />
            </div>

            {/* Column 2: Contact Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-navy text-center">
                {contact.title}
              </h4>
              <div className="space-y-3 text-sm text-gray-700 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Phone size={16} className="text-blue-400" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-start justify-center space-x-2">
                  <MapPin size={16} className="text-blue-400 mt-0.5" />
                  <span className="whitespace-pre-line">{contact.address}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Mail size={16} className="text-blue-400" />
                  <span>{contact.email}</span>
                </div>
              </div>
            </div>

            {/* Column 3: Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-navy text-center">
                Services
              </h4>
              <div className="space-y-2 text-sm text-center">
                {policies.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-navy hover:text-accent transition-colors duration-300 block"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 4: Projects */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-navy text-center">
                {projects.title}
              </h4>
              <div className="space-y-2 text-sm text-center">
                {projects.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-navy hover:text-accent transition-colors duration-300 block"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 5: Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-navy text-center">
                {quickLinks.title}
              </h4>
              <div className="space-y-2 text-sm text-center">
                {quickLinks.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-navy hover:text-accent transition-colors duration-300 block"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout (below lg) */}
        <div className="block lg:hidden mb-8">
          {/* Logo Section */}
          <div className="flex items-center justify-center mb-6">
            <img
              src="/logos/EMC-LOGO.png"
              alt="EMC Logo"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* 2x2 Grid for content sections */}
          <div className="grid grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-navy text-center">
                {contact.title}
              </h4>
              <div className="space-y-3 text-sm text-gray-700 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Phone size={16} className="text-blue-400" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-start justify-center space-x-2">
                  <MapPin size={16} className="text-blue-400 mt-0.5" />
                  <span className="whitespace-pre-line text-xs">
                    {contact.address}
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Mail size={16} className="text-blue-400" />
                  <span className="text-xs">{contact.email}</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-navy text-center">
                Services
              </h4>
              <div className="space-y-2 text-sm text-center">
                {policies.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-navy hover:text-accent transition-colors duration-300 block"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-navy text-center">
                {projects.title}
              </h4>
              <div className="space-y-2 text-sm text-center">
                {projects.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-navy hover:text-accent transition-colors duration-300 block"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-navy text-center">
                {quickLinks.title}
              </h4>
              <div className="space-y-2 text-sm text-center">
                {quickLinks.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-navy hover:text-accent transition-colors duration-300 block"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-2">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Icons */}
            <div className="flex space-x-4">
              {social.map((item, index) => {
                const Icon = iconMap[item.icon];
                return (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-10 h-10 flex items-center justify-center group"
                  >
                    <div className="absolute inset-0 bg-navy rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
                    <Icon
                      size={24}
                      className="relative z-10 text-navy group-hover:text-white transition-colors duration-300"
                    />
                  </a>
                );
              })}
            </div>

            {/* Production Information */}
            <div className="text-sm text-gray-700 text-center">
              <a
                href={production.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy hover:text-accent transition-colors duration-300"
              >
                {production.name}
              </a>
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-700">{copyright}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
