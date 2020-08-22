import React from "react";

export default function Streak({ days, text = false }) {
  return (
    <span>
      🔥 {days}
      {text ? " day streak" : ""}
    </span>
  );
}
