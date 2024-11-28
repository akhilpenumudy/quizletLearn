"use client";

import {
  Home,
  User,
  Settings,
  FolderPlus,
  Book,
  LucideMessageCircleQuestion,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

const mainSidebarItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: FolderPlus, label: "Import New Question Set", href: "/formatter" },
  { icon: Book, label: "Explore Community Sets", href: "/sets" },
  {
    icon: LucideMessageCircleQuestion,
    label: "How do I use this?",
    href: "/infopage",
  },
];

export function Sidebar() {
  return (
    <TooltipProvider>
      <aside className="fixed left-0 h-full w-16 bg-background text-foreground flex flex-col items-center border-r">
        {/* Main menu items */}
        <div className="flex flex-col items-center space-y-8 pt-8">
          {mainSidebarItems.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className="p-2 rounded-lg border border-transparent hover:bg-yellow-50 hover:border-yellow-500 transition-colors duration-200"
                >
                  <item.icon className="w-6 h-6" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Profile Icon with Initials */}
        {/* <div className="mt-auto pb-8">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/profile"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500 text-white font-bold hover:bg-yellow-600 transition-colors duration-200"
              >
                <span>AP</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Profile</p>
            </TooltipContent>
          </Tooltip>
        </div> */}
      </aside>
    </TooltipProvider>
  );
}
