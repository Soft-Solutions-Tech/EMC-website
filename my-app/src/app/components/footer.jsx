import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  MapPin,
  Mail,
} from "lucide-react";
import footerData from "../../../data/footer.js";
import { hero } from "../../../data/hero.js";

export const Footer = () => {
  const { contact, quickLinks, projects, social, production, copyright } =
    footerData;

  const iconMap = {
    Facebook: Facebook,
    Instagram: Instagram,
    Linkedin: Linkedin,
  };

  return (
    <footer>
      <div className="container mx-auto px-4">
        {/* Desktop Layout (lg and up) - 4 column grid */}
        <div className="hidden lg:block mb-8">
          <div className="grid grid-cols-4 gap-8">
            {/* Column 1: EMC Logo */}
            <div className="flex items-center justify-center">
              <img
                src={hero.logo}
                alt="EMC Logo"
                className="h-16 w-auto object-contain"
              />
            </div>

            {/* Column 2: Contact Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary text-center">
                {contact.title}
              </h4>
              <div className="space-y-3 text-sm text-muted-foreground text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Phone size={16} className="text-primary" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-primary hover:text-primary-light transition-colors duration-300"
                  >
                    {contact.phone}
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Mail size={16} className="text-primary" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-primary hover:text-primary-light transition-colors duration-300"
                  >
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-start justify-center space-x-2">
                  <MapPin size={16} className="text-primary mt-0.5" />
                  <a
                    href="https://maps.app.goo.gl/awsrZKi68wX8mgC49"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-light transition-colors duration-300 whitespace-pre-line"
                  >
                    {contact.address}
                  </a>
                </div>
              </div>
            </div>

            {/* Column 3: Projects */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary text-center">
                {projects.title}
              </h4>
              <div className="space-y-2 text-sm text-center">
                {projects.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-primary hover:text-primary-light transition-colors duration-300 block"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 4: Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary text-center">
                {quickLinks.title}
              </h4>
              <div className="space-y-2 text-sm text-center">
                {quickLinks.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-primary hover:text-primary-light transition-colors duration-300 block"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout (below lg) - 2x2 grid */}
        <div className="block lg:hidden mb-8">
          <div className="grid grid-cols-2 gap-6">
            {/* Cell 1: EMC Logo */}
            <div className="flex items-center justify-center">
              <img
                src={hero.logo}
                alt="EMC Logo"
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Cell 2: Contact Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary text-center">
                {contact.title}
              </h4>
              <div className="space-y-3 text-sm text-muted-foreground text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Phone size={16} className="text-primary" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-primary hover:text-primary-light transition-colors duration-300 text-xs"
                  >
                    {contact.phone}
                  </a>
                </div>
                <div className="flex items-start justify-center space-x-2">
                  <MapPin size={16} className="text-primary mt-0.5" />
                  <a
                    href="https://maps.app.goo.gl/awsrZKi68wX8mgC49"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-light transition-colors duration-300 whitespace-pre-line text-xs"
                  >
                    {contact.address}
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Mail size={16} className="text-primary" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-primary hover:text-primary-light transition-colors duration-300 text-xs"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Cell 3: Projects */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary text-center">
                {projects.title}
              </h4>
              <div className="space-y-2 text-sm text-center">
                {projects.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-primary hover:text-primary-light transition-colors duration-300 block text-xs"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Cell 4: Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary text-center">
                {quickLinks.title}
              </h4>
              <div className="space-y-2 text-sm text-center">
                {quickLinks.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-primary hover:text-primary-light transition-colors duration-300 block text-xs"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-2 pb-4">
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
                    <div className="absolute inset-0 bg-primary rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
                    <Icon
                      size={24}
                      className="relative z-10 text-primary group-hover:text-primary-foreground transition-colors duration-300"
                    />
                  </a>
                );
              })}
            </div>

            {/* Production Information */}
            <div className="text-sm text-muted-foreground text-center">
              <a
                href={production.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-light transition-colors duration-300"
              >
                {production.name}
              </a>
            </div>

            {/* Copyright */}
            <div className="text-sm text-muted-foreground">{copyright}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
