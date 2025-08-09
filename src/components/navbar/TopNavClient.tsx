"use client";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import Link from "next/link";
import React from "react";
import { GiSelfLove } from "react-icons/gi";
import NavLink from "./NavLink";
import UserMenu from "./UserMenu";
import FiltersWrapper from "./FiltersWrapper";

type Props = {
  session: boolean;
  userInfo: {
    name: string | null;
    image: string | null;
  } | null;
};

export default function TopNavClient({ session, userInfo }: Props) {
  const memberLinks = [
    { href: "/members", label: "Matches" },
    { href: "/lists", label: "Lists" },
    { href: "/messages", label: "Messages" },
  ];

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <Navbar
        maxWidth="full"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="bg-gradient-to-r from-pink-400 via-red-400 to-pink-600"
        classNames={{
          item: [
            "text-lg md:text-xl",
            "text-white",
            "uppercase",
            "data-[active=true]:text-yellow-200",
          ],
            menu: "z-[60]"
        }}
      >
        {/* Brand + Mobile Menu Button */}
        <NavbarContent justify="start">
          <NavbarMenuToggle className="md:hidden text-white" />
          <NavbarBrand as={Link} href="/">
            <GiSelfLove size={36} className="text-gray-200" />
            <span className="ml-1 font-bold text-2xl md:text-3xl text-gray-200">
              MatchMe
            </span>
          </NavbarBrand>
        </NavbarContent>

        {/* Desktop Navigation */}
        <NavbarContent justify="center" className="hidden md:flex">
          {session &&
            memberLinks.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
        </NavbarContent>

        {/* Right Side Buttons/User Menu */}
        <NavbarContent justify="end">
          {userInfo ? (
            <UserMenu userInfo={userInfo} />
          ) : (
            <div className="flex gap-2">
              <Button
                as={Link}
                href="/login"
                variant="bordered"
                size="sm"
                className="text-white"
              >
                Login
              </Button>
              <Button
                as={Link}
                href="/register"
                variant="bordered"
                size="sm"
                className="text-white"
              >
                Register
              </Button>
            </div>
          )}
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu>
          {session &&
            memberLinks.map((item) => (
              <NavbarMenuItem key={item.href}>
                <Link href={item.href} className="w-full text-lg">
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}

          {!userInfo && (
            <>
              <NavbarMenuItem>
                <Link href="/login" className="w-full text-lg">
                  Login
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="/register" className="w-full text-lg">
                  Register
                </Link>
              </NavbarMenuItem>
            </>
          )}
        </NavbarMenu>
      </Navbar>

      {/* Filters only show when menu is closed */}
      {!isMenuOpen && <FiltersWrapper />}
    </>
  );
}
