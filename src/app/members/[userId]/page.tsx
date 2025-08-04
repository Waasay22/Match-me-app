import { getMemberByUserId } from "@/app/actions/memberActions";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import { notFound } from "next/navigation";
import React from "react";

export default async function MemberDetailedPage({
  params,
}: {
    params: Promise<{ userId: string }>;
}) {
  const paramz = await params
  const member = await getMemberByUserId(
    paramz.userId
  );

  if (!member) return notFound();

  return (
     <CardInnerWrapper
      header="Profile"
      body={member.description}
    />
  );
}