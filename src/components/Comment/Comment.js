// Packages
import React, { useEffect, useState } from "react";

// Components
import { UserAvatar } from "../UserAvatar/UserAvatar";

// Theme
import { getUserPersonalInformation } from "../../environment/theme/Methods";

export function Comment(props) {
  const [userPersonalInformation, setUserPersonalInformation] = useState(null);
  const { comment } = props;

  useEffect(() => {
    getUserPersonalInformation(comment.userID).then((result) =>
      setUserPersonalInformation(result)
    );
  }, [comment.userID]);

  return (
    <li
      style={{
        display: "flex",
        listStyleType: "none",
        alignItems: "flex-start",
        gap: "1em",
      }}
    >
      {!!userPersonalInformation && (
        <UserAvatar
          authenticatedUser={userPersonalInformation}
          style={{ backgroundColor: "red", color: "white" }}
        />
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: "0.5em" }}>
          {!!userPersonalInformation && (
            <p style={{ color: "red", margin: 0 }}>
              {userPersonalInformation.name}
            </p>
          )}
          <span>&#x2605;</span>
          <p style={{ margin: 0 }}>{comment.date}</p>
        </div>
        <p style={{ margin: 0 }}>{comment.message}</p>
      </div>
    </li>
  );
}
