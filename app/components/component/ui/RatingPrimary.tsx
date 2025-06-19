"use client";
import { RatingPrimaryType } from "../../../types/ui";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import { getLabelText } from "../../../core/helper/helper";
import { labels } from "../../../core/data/constants/rating";

export default function RatingPrimary({
  name,
  onChange,
  onChangeActive,
}: RatingPrimaryType) {
  const [value, setValue] = useState<number | null>(2);
  const [hover, setHover] = useState(-1);

  return (
    <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
      <Rating
        name={name}
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
          onChange(event, newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
          onChangeActive(event, newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
