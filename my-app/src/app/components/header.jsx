"use client";
import * as React from "react";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ProjectType } from "../../../data/projects.js";

const projectTypeEntries = ProjectType ? Object.entries(ProjectType) : [];

const NAV_ITEMS = [
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  {
    name: "Projects",
    href: "/projects?type=ALL",
    dropdown: true,
    items: [
      { name: "All", href: "/projects?type=ALL", type: "ALL" },
      ...projectTypeEntries.map(([key, value]) => ({
        name: value,
        href: `/projects?type=${key}`,
        type: key,
      })),
    ],
  },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [clientPathname, setClientPathname] = React.useState("");
  const [mobileDropdownOpen, setMobileDropdownOpen] = React.useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const toggleMobileMenu = React.useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
    setMobileDropdownOpen(false);
  }, []);

  const toggleMobileDropdown = React.useCallback(() => {
    setMobileDropdownOpen((prev) => !prev);
  }, []);

  React.useEffect(() => {
    setClientPathname(pathname || "");
    setIsMobileMenuOpen(false);
    setMobileDropdownOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(".mobile-menu")) {
        setIsMobileMenuOpen(false);
        setMobileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const currentType = searchParams.get("type") || "ALL";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent supports-[backdrop-filter]:bg-background/60 shadow-sm pointer-events-none">
      <div className="flex items-center justify-between p-4 pointer-events-auto">
        <Link
          href="/"
          className="flex items-center"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <Image
            src="/uploads/logos/EMC-LOGO.png"
            alt="EMC Logo"
            width={128}
            height={128}
            quality={100}
            priority
            className="h-8 w-auto object-contain"
            style={{
              imageRendering: "auto",
              imageRendering: "-webkit-optimize-quality",
            }}
            unoptimized={false}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-end flex-1">
          <NavigationMenu>
            <NavigationMenuList className="gap-3">
              {NAV_ITEMS.map((item) =>
                item.dropdown ? (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuTrigger
                      className={cn(
                        "relative bg-transparent hover:bg-primary/10 text-muted-foreground hover:text-primary px-4 py-2 font-medium rounded-lg border-2 border-transparent hover:border-primary/20 transition-all duration-300",
                        pathname.startsWith("/projects") &&
                          "text-primary font-semibold bg-primary/10 border-primary/30"
                      )}
                      onClick={() => router.push(item.href)}
                    >
                      {item.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[280px] gap-1 p-3 bg-background border border-border/20 rounded-xl shadow-lg backdrop-blur-sm">
                        {item.items.map((subItem) => (
                          <NavigationMenuLink key={subItem.href} asChild>
                            <Link
                              href={subItem.href}
                              replace
                              className={cn(
                                "block px-4 py-3 text-sm rounded-lg border border-transparent text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/20 transition-all duration-300",
                                pathname.startsWith("/projects") &&
                                  currentType === subItem.type &&
                                  "text-primary font-semibold bg-primary/10 border-primary/30"
                              )}
                            >
                              {subItem.name}
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "px-4 py-2 text-sm rounded-lg font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 border-2 border-transparent hover:border-primary/20 transition-all duration-300",
                        pathname === item.href &&
                          "text-primary font-semibold bg-primary/10 border-primary/30"
                      )}
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="z-50 ml-auto text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 border-2 border-transparent hover:border-primary/20 rounded-lg"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.div>
          </Button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileMenu
              onClose={toggleMobileMenu}
              pathname={clientPathname}
              currentType={currentType}
              mobileDropdownOpen={mobileDropdownOpen}
              toggleMobileDropdown={toggleMobileDropdown}
            />
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function MobileMenu({
  onClose,
  pathname,
  currentType,
  mobileDropdownOpen,
  toggleMobileDropdown,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="mobile-menu fixed top-0 left-0 w-full h-screen bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 text-muted-foreground"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-5 right-4 z-50 text-muted-foreground hover:bg-primary/10 hover:text-primary border-2 border-transparent hover:border-primary/20 rounded-lg"
      >
        <motion.div animate={{ rotate: 180 }} transition={{ duration: 0.3 }}>
          <X size={28} />
        </motion.div>
      </Button>

      <nav className="flex flex-col items-center space-y-6 w-full max-w-sm px-8">
        {NAV_ITEMS.map((item, index) =>
          item.dropdown ? (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="w-full text-center"
            >
              <Button
                variant="ghost"
                onClick={toggleMobileDropdown}
                className="w-full justify-center items-center text-lg font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 py-4 px-6 transition-all duration-300 border-2 border-transparent hover:border-primary/20 rounded-xl"
              >
                {item.name}
                <motion.div
                  animate={{ rotate: mobileDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-2"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </Button>
              <AnimatePresence>
                {mobileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-2 mt-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
                      {item.items.map((subItem, subIndex) => (
                        <motion.div
                          key={subItem.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: subIndex * 0.05 + 0.1 }}
                        >
                          <Link
                            href={subItem.href}
                            replace
                            onClick={onClose}
                            className={cn(
                              "block px-4 py-3 text-sm rounded-lg border border-transparent text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/20 transition-all duration-300",
                              pathname.startsWith("/projects") &&
                                currentType === subItem.type &&
                                "text-primary font-semibold bg-primary/10 border-primary/30"
                            )}
                          >
                            {subItem.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="w-full text-center"
            >
              <Link
                href={item.href}
                onClick={onClose}
                className={cn(
                  "w-full inline-block py-4 px-6 text-lg font-medium rounded-xl border-2 border-transparent text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/20 transition-all duration-300",
                  pathname === item.href &&
                    "text-primary font-semibold bg-primary/10 border-primary/30"
                )}
              >
                {item.name}
              </Link>
            </motion.div>
          )
        )}
      </nav>

      {/* Background blur circles */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/50 to-primary/5 -z-10" />
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10" />
    </motion.div>
  );
}
