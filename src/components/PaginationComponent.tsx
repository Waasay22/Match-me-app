"use client";

import { Pagination } from "@heroui/react";
import React, { useEffect } from "react";
import clsx from "clsx";
import usePaginationStore from "@/hooks/usePaginationStore";

export default function PaginationComponent({
  totalCount,
}: {
  totalCount: number;
}) {
  const setPage = usePaginationStore((s) => s.setPage);
  const setPageSize = usePaginationStore((s) => s.setPageSize);
  const setPagination = usePaginationStore((s) => s.setPagination);
  const pagination = usePaginationStore((s) => s.pagination);

  const { pageNumber, pageSize, totalPages } = pagination;

  useEffect(() => {
    setPagination(totalCount);
  }, [setPagination, totalCount]);

  const start = (pageNumber - 1) * pageSize + 1;
  const end = Math.min(pageNumber * pageSize, totalCount);
  const resultText = `Showing ${start}-${end} of ${totalCount} results`;

  return (
    <div className="border-t-2 w-full mt-5">
      <div
        className="
          flex flex-col sm:flex-row 
          justify-between items-center 
          gap-4 py-5
        "
      >
        {/* Results text */}
        <div className="text-sm md:text-base text-center sm:text-left">
          {resultText}
        </div>

        {/* Pagination control */}
        <div className="flex justify-center">
          <Pagination
            total={totalPages}
            color="default"
            page={pageNumber}
            variant="bordered"
            onChange={setPage}
          />
        </div>

        {/* Page size controls */}
        <div className="flex flex-wrap justify-center gap-2 items-center text-sm md:text-base">
          <span>Page size:</span>
          {[3, 6, 12].map((size) => (
            <div
              key={size}
              onClick={() => setPageSize(size)}
              className={clsx(
                "page-size-box cursor-pointer px-2 py-1 border rounded",
                {
                  "bg-foreground text-white hover:bg-foreground hover:text-white":
                    pageSize === size,
                }
              )}
            >
              {size}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
