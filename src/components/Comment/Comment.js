// Packages
import { ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Firebase
import { db } from "../../environment/firebase/Firebase";

// Components
import { UserAvatar } from "../UserAvatar/UserAvatar";

// Theme
import COLORS from "../../environment/theme/Colors";
import { getUserPersonalInformation } from "../../environment/theme/Methods";

// Stylings
import {
  StyledComment,
  StyledCommentDataContainer,
  StyledDeleteCommentIcon,
} from "./Comment.style";

export function Comment(props) {
  const [userPersonalInformation, setUserPersonalInformation] = useState(null);
  const { comment } = props;
  const commentDate = new Date(comment.date);

  useEffect(() => {
    getUserPersonalInformation(comment.userID).then((result) =>
      setUserPersonalInformation(result)
    );
  }, [comment.userID]);

  const authenticatedUser = useSelector(
    (state) => state.auth.authenticatedUser
  );

  const removeCommentHandler = () => {
    remove(ref(db, `comments/${comment.id}`)).catch((error) =>
      console.log(error)
    );
  };

  return (
    <StyledComment>
      {!!userPersonalInformation && (
        <UserAvatar
          style={{
            backgroundColor:
              !!authenticatedUser &&
              authenticatedUser.id === userPersonalInformation.id
                ? COLORS.TERTIARY
                : COLORS.SECONDARY,
            color: COLORS.PRIMARY,
          }}
          user={userPersonalInformation}
        />
      )}
      <StyledCommentDataContainer>
        <div>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", gap: "0.5em" }}>
              {!!userPersonalInformation && (
                <p
                  style={{
                    color:
                      !!authenticatedUser &&
                      authenticatedUser.id === userPersonalInformation.id
                        ? COLORS.TERTIARY
                        : COLORS.SECONDARY,
                    margin: 0,
                  }}
                >
                  {userPersonalInformation.name}
                </p>
              )}
              <span>&#x2605;</span>
              <p
                style={{ margin: 0 }}
              >{`${commentDate.toDateString()}, ${commentDate.getHours()}:${commentDate.getMinutes()}:${commentDate.getSeconds()}`}</p>
            </div>
          </div>
          <p style={{ margin: 0 }}>{comment.message}</p>
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <StyledDeleteCommentIcon onClick={removeCommentHandler} />
        </div>
      </StyledCommentDataContainer>
    </StyledComment>
  );
}
