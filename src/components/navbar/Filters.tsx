import React from "react";
import {
  Button,
  Select,
  SelectItem,
  Slider,
  Spinner,
  Switch,
} from "@heroui/react";
import { useFilters } from "@/hooks/useFilters";

export default function Filters() {
  const {
    orderByList,
    genderList,
    selectAge,
    selectGender,
    selectOrder,
    selectWithPhoto,
    filters,
    totalCount,
    isPending,
  } = useFilters();

  const { gender, ageRange, orderBy } = filters;

  return (
    <div className="shadow-md py-2 px-2">
      {/* Outer container becomes column on small screens */}
      <div className="flex flex-col md:flex-row md:justify-around md:items-center gap-4 flex-wrap">
        
        {/* Results Count */}
        <div className="flex gap-2 items-center">
          <div className="text-default font-semibold text-lg md:text-xl">
            Results:{" "}
            {isPending ? (
              <Spinner size="sm" color="default" />
            ) : (
              totalCount
            )}
          </div>
        </div>

        {/* Gender buttons */}
        <div className="flex gap-2 items-center">
          <div className="text-sm md:text-base">Gender:</div>
          {genderList.map(({ icon: Icon, value }) => (
            <Button
              key={value}
              size="sm"
              isIconOnly
              color="default"
              variant={gender.includes(value) ? "solid" : "light"}
              onClick={() => selectGender(value)}
            >
              <Icon size={20} />
            </Button>
          ))}
        </div>

        {/* Age slider */}
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-1/4">
          <Slider
            label="Age range"
            size="sm"
            minValue={18}
            maxValue={100}
            defaultValue={ageRange}
            aria-label="Age range slider"
            color="foreground"
            onChangeEnd={(value) => selectAge(value as number[])}
          />
        </div>

        {/* With photo switch */}
        <div className="flex flex-col items-center">
          <p className="text-xs md:text-sm">With photo</p>
          <Switch
            color="default"
            defaultSelected
            size="sm"
            onChange={(checked) => selectWithPhoto(checked)}
          />
        </div>

        {/* Order By dropdown */}
        <div className="w-full md:w-1/4">
          <Select
            size="sm"
            fullWidth
            label="Order by"
            variant="bordered"
            color="default"
            aria-label="Order by selector"
            selectedKeys={new Set([orderBy])}
            onSelectionChange={selectOrder}
          >
            {orderByList.map((item) => (
              <SelectItem key={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}