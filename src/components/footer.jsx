"use client";
import {
  IconBrandX,
  IconBrandLinkedin,
  IconBrandGithub,
} from "@tabler/icons-react";

const socialLinks = [
  {
    href: "https://github.com/zeropse",
    label: "GitHub",
    icon: IconBrandGithub,
    className: "hover:text-gray-900 dark:hover:text-white",
  },
  {
    href: "https://linkedin.com/in/zeropse",
    label: "LinkedIn",
    icon: IconBrandLinkedin,
    className: "hover:text-gray-900 dark:hover:text-white",
  },
  {
    href: "https://x.com/zer0pse",
    label: "X",
    icon: IconBrandX,
    className: "hover:text-gray-900 dark:hover:text-white",
  },
];

export function Footer() {
  return (
    <footer className="w-full py-6 border-t">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <div className="flex-1 text-left text-sm ">
          &copy; {new Date().getFullYear()} ZeroGuru.
        </div>
        <div className="flex-1 flex justify-end items-center space-x-4">
          {socialLinks.map(({ href, label, icon: Icon, className }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="transition duration-200 ease-in-out transform hover:scale-105 hover:rotate-3"
            >
              {Icon && <Icon className={`h-6 w-6 ${className}`} />}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
