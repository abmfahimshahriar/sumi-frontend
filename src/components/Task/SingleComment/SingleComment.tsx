import Chip from "@material-ui/core/Chip";
import moment from "moment";
import React from "react";
import { Comment } from "../../../interfaces/GlobalTypes";
import "./SingleComment.css";

type Props = {
  comment: Comment;
};
const SingleComment: React.FC<Props> = ({ comment }) => {
  return (
    <div className="single-comment-wrapper">
      <div className="commenter-details">
        <div>
          <Chip label={comment.Commenter.slice(0, 1)} color="secondary" />
        </div>
        <div className="commenter-name">{comment.Commenter}</div>
        <div className="comment-date">{moment(comment.CommentedAt).format("MM-DD-YYYY")}</div>
      </div>
      <div className="comment-text">{comment.CommentContent}</div>
    </div>
  );
};

export default SingleComment;