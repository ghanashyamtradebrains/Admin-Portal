"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  House,
  Info,
  Mail,
  Settings,
  Menu,
  ChevronDown,
  ChevronUp,
  Gem,
  BadgeIndianRupee,
  KeyRound,
  ChartCandlestick,
  MessageCircleCode,
  BellDot,
  UserCheck,
  Activity,
  PaintBucket,
  SprayCan,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Sidebar.module.css";

const ICONS = {
  Users,
  House,
  Info,
  Mail,
  Settings,
  Gem,
  BadgeIndianRupee,
  KeyRound,
  ChartCandlestick,
  MessageCircleCode,
  BellDot,
  UserCheck,
  Activity,
  PaintBucket,
  SprayCan,
};
const Sidebar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleDropdownToggle = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };
  const sideBarItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "House",
    },
    {
      name: "Users List",
      href: "/user-list",
      icon: "Users",
    },
    {
      name: "Premium Support",
      href: "/premium-support",
      icon: "Gem",
    },
    {
      name: "Transaction Details",
      href: "/transaction",
      icon: "BadgeIndianRupee",
    },
    {
      name: "Coupons",
      href: "/coupons",
      icon: "KeyRound",
    },
    {
      name: "Superstar Portfolio",
      href: "/superstar",
      icon: "ChartCandlestick",
    },
    {
      name: "Feedback",
      href: "/feedback",
      icon: "MessageCircleCode",
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: "BellDot",
    },
    {
      name: "User Management",
      href: "/user-management",
      icon: "UserCheck",
    },
    {
      name: "Stock Details",
      href: "/stock-details",
      icon: "Activity",
    },
    {
      name: "Buckets",
      href: "/buckets",
      icon: "PaintBucket",
    },
    {
      name: "Affiliate",
      icon: "SprayCan",
      hasDropdown: true,
      subItems: [
        { name: "Approvals", href: "/affiliate/approvals" },
        { name: "All Sign-ups", href: "/affiliate/sign-ups" },
        { name: "All Affiliate", href: "/affiliate/all-affiliate" },
        { name: "Sales Performance", href: "/affiliate/sales-performance" },
        { name: "Payout Details", href: "/affiliate/payout-details" },
        { name: "Reports", href: "/affiliate/reports" },
        { name: "Promotions", href: "/affiliate/promotions" },
        { name: "Help Center", href: "/affiliate/help-center" },
      ],
    },
  ];

  return (
    <div
      className={`${styles.sidebarContainer} ${
        isSideBarOpen ? styles.sidebarOpen : styles.sidebarClosed
      }`}
    >
      <div className={styles.sidebarInner}>
        <button
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className={styles.toggleButton}
        >
          <Menu size={24} style={{ color: "white" }} />
        </button>

        <nav className={styles.navContainer}>
          {sideBarItems.map((item) => {
            const IconComponent = ICONS[item.icon];
            const isActive =
              pathname === item.href ||
              item.subItems?.some((sub) => pathname === sub.href);

            return (
              <div key={item.name}>
                <div
                  className={`${styles.navItem} ${
                    isActive ? styles.navItemActive : ""
                  }`}
                  onClick={() => {
                    if (item.hasDropdown) {
                      handleDropdownToggle(item.name);
                    } else {
                      router.push(item.href);
                    }
                  }}
                >
                  <IconComponent
                    size={20}
                    style={{ minWidth: "20px", color: "white" }}
                  />
                  {isSideBarOpen && (
                    <span className={styles.navText}>
                      {item.name}{" "}
                      {item.hasDropdown && (
                        <span className={styles.dropdown_icon}>
                          {openDropdown ? <ChevronUp /> : <ChevronDown />}
                        </span>
                      )}
                    </span>
                  )}
                </div>

                {/* Dropdown items */}
                {item.hasDropdown &&
                  openDropdown === item.name &&
                  isSideBarOpen && (
                    <div className={styles.dropdownContainer}>
                      {item.subItems.map((subItem) => (
                        <div
                          key={subItem.name}
                          className={`${styles.navItem} ${
                            pathname === subItem.href
                              ? styles.navItemActive
                              : ""
                          }`}
                          onClick={() => router.push(subItem.href)}
                        >
                          <span
                            className={styles.navText}
                            style={{ paddingLeft: "30px" }}
                          >
                            {subItem.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
