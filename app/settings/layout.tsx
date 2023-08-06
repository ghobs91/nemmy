"use client";

import { useEffect } from "react";
import { useNavbar } from "@/hooks/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { navbar, setNavbar } = useNavbar();

  useEffect(() => {
    setNavbar({
      ...navbar!,
      showSort: false,
      showFilter: false,
      showSearch: false,
      showback: false,
      hidden: false,
      titleOverride: "Settings",
      icon: "page_info",
      showUser: true,
    });
  }, []);

  return (
    <div className="flex-col, mb-6  flex min-h-screen w-full justify-center py-4">
      {children}
    </div>
  );
}
