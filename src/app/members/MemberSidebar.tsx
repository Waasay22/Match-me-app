"use client";
import PresenceDot from "@/components/PresenceDot";
import { calculateAge } from "@/lib/util";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@heroui/react";
import { Member } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaUser, FaImages, FaComments } from "react-icons/fa";

type Props = {
  member: Member;
  navLinks: { name: string; href: string }[];
};

export default function MemberSidebar({ member, navLinks }: Props) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile view — icons in a row */}
      <div className="flex md:hidden justify-around items-center py-2 bg-white rounded shadow">
        {navLinks.map((link) => {
          const Icon =
            link.name === "Profile"
              ? FaUser
              : link.name === "Photos"
              ? FaImages
              : FaComments;
          return (
            <Link
              href={link.href}
              key={link.name}
              className={`flex flex-col items-center text-sm ${
                pathname === link.href ? "text-default" : "text-gray-500"
              }`}
            >
              <Icon className="text-xl mb-1" />
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* Desktop view — full sidebar */}
      <Card className="hidden md:flex w-full mt-10 items-center h-[80vh]">
        <Image
          height={200}
          width={200}
          src={member.image || "/images/user.png"}
          alt="User profile main image"
          className="rounded-full mt-6 aspect-square object-cover"
        />
        <CardBody className="overflow-hidden">
          <div className="flex flex-col items-center">
            <div className="flex">
              <div className="text-2xl">
                {member.name}, {calculateAge(member.dateOfBirth)}
              </div>
              <div>
                <PresenceDot member={member} />
              </div>
            </div>
            <div className="text-sm text-neutral-500">
              {member.city}, {member.country}
            </div>
          </div>
          <Divider className="my-3" />
          <nav className="flex flex-col p-4 ml-4 text-2xl gap-4">
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.name}
                className={`block rounded ${
                  pathname === link.href
                    ? "text-default"
                    : "hover:text-default/50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </CardBody>
        <CardFooter>
          <Button
            as={Link}
            href="/members"
            fullWidth
            color="default"
            variant="bordered"
          >
            Go back
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
