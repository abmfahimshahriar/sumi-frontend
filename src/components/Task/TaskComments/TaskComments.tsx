import React, { useState } from "react";
import { Comment } from "../../../interfaces/GlobalTypes";
import "./TaskComments.css";
import { SingleComment } from "../../../components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const comments: Comment[] = [
  {
    Commenter: "Fahim",
    CommentContent: "1st comment",
    CommentedAt: "2021-03-15T00:57:33.049Z",
  },
  {
    Commenter: "Shahriar",
    CommentContent: "2nd comment",
    CommentedAt: "2021-03-15T00:57:33.049Z",
  },
  {
    Commenter: "Reed",
    CommentContent: "3rd comment",
    CommentedAt: "2021-03-15T00:57:33.049Z",
  },
  {
    Commenter: "Tahia",
    CommentContent: "4th comment",
    CommentedAt: "2021-03-15T00:57:33.049Z",
  },
];
const TaskComments = () => {
  const [commentContent, setCommentContent] = useState("");
  const handleComment = () => {
    console.log("commented");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "commentContent") setCommentContent(value);
  };
  return (
    <div>
      <div>
        {comments.map((item) => (
          <SingleComment key={item.Commenter} comment={item} />
        ))}
      </div>
      <div>
        <form
          className="create-sprint-form"
          autoComplete="off"
        >
          <div className="form-item">
            <TextField
              className="full-width"
              id="commentContent"
              name="commentContent"
              type="text"
              value={commentContent}
              placeholder="Comment"
              label="Comment"
              multiline
              rows={4}
              onChange={handleInputChange}
            />
          </div>
          <div className="comment-btn">
            <Button variant="contained" color="primary" type="button" onClick={handleComment}>
              Comment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskComments;
