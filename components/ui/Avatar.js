import React from "react";

function Avatar({ size, user, ...props }) {
  return (
    <figure>
      <img
        className={`h-${size} w-${size} rounded-full`}
        src={user.avatar}
        alt={user.username}
      />
    </figure>
  );
}

export default Avatar;
