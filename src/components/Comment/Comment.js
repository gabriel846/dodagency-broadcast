// Packages
import { ref, remove } from "firebase/database";
import React from "react";
import { useSelector } from "react-redux";

// Firebase
import { db } from "../../environment/firebase/Firebase";

// Components
import { UserAvatar } from "../UserAvatar/UserAvatar";

// Theme
import COLORS from "../../environment/theme/Colors";

// Stylings
import {
  StyledComment,
  StyledCommentDataContainer,
  StyledDeleteCommentIcon,
} from "./Comment.style";

export function Comment(props) {
  const { comment, user } = props;
  const commentDate = new Date(comment.date);

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
      {!!authenticatedUser && !!user && (
        <UserAvatar
          style={{
            backgroundColor:
              authenticatedUser.id === user.id
                ? COLORS.TERTIARY
                : COLORS.SECONDARY,
            color: COLORS.PRIMARY,
          }}
          user={user}
        />
      )}
      <StyledCommentDataContainer>
        <div>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", gap: "0.5em" }}>
              {!!authenticatedUser && !!user && (
                <p
                  style={{
                    color:
                      authenticatedUser.id === user.id
                        ? COLORS.TERTIARY
                        : COLORS.SECONDARY,
                    margin: 0,
                  }}
                >
                  {user.name}
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
          {!!authenticatedUser &&
            !!user &&
            authenticatedUser.id === user.id && (
              <StyledDeleteCommentIcon onClick={removeCommentHandler} />
            )}
        </div>
      </StyledCommentDataContainer>
    </StyledComment>
  );
}
