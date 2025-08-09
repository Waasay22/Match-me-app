"use client";

import {
  deleteImage,
  setMainImage,
} from "@/app/actions/userActions";
import { Photo } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DeleteButton from "./DeleteButton";
import MemberImage from "./MemberImage";
import StarButton from "./StartButton";

type Props = {
  photos: Photo[] | null;
  editing?: boolean;
  mainImageUrl?: string | null;
};

export default function MemberPhotos({
  photos,
  editing,
  mainImageUrl,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState({
    type: "",
    isLoading: false,
    id: "",
  });

  const onSetMain = async (photo: Photo) => {
    if (photo.url === mainImageUrl) return null;
    setLoading({
      isLoading: true,
      id: photo.id,
      type: "main",
    });
    await setMainImage(photo);
    router.refresh();
    setLoading({
      isLoading: false,
      id: "",
      type: "",
    });
  };

  const onDelete = async (photo: Photo) => {
    if (photo.url === mainImageUrl) return null;
    setLoading({
      isLoading: true,
      id: photo.id,
      type: "delete",
    });
    await deleteImage(photo);
    router.refresh();
    setLoading({
      isLoading: false,
      id: "",
      type: "",
    });
  };

  return (
    <div
      className="
        grid gap-3 p-5
        grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
      "
    >
      {photos &&
        photos.map((photo) => (
          <div
            key={photo.id}
            className="relative group"
          >
            <MemberImage photo={photo} />

            {editing && (
              <>
                {/* Star Button */}
                <div
                  onClick={() => onSetMain(photo)}
                  className="absolute top-2 left-2 z-50"
                >
                  <StarButton
                    selected={photo.url === mainImageUrl}
                    loading={
                      loading.isLoading &&
                      loading.type === "main" &&
                      loading.id === photo.id
                    }
                  />
                </div>

                {/* Delete Button */}
                <div
                  onClick={() => onDelete(photo)}
                  className="absolute top-2 right-2 z-50"
                >
                  <DeleteButton
                    loading={
                      loading.isLoading &&
                      loading.type === "delete" &&
                      loading.id === photo.id
                    }
                  />
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
}
