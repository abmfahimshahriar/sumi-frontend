import React, { useEffect, useState } from "react";
import {
  Comment,
  CreateCommentPayload,
  ITaskMapStateToProps,
  Task,
  TaskState,
} from "../../../interfaces/GlobalTypes";
import "./TaskComments.css";
import { SingleComment } from "../../../components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import {
  createComment,
  getComments,
  clearComments,
} from "../../../store/actions/taskActions";
const comments: Comment[] = [];

type Props = {
  open: boolean;
  task: TaskState;
  getComments: Function;
  createComment: Function;
  selectedTask: Task;
  clearComments: Function;
};

const TaskComments: React.FC<Props> = ({
  open,
  task,
  getComments,
  createComment,
  selectedTask,
  clearComments,
}) => {
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    console.log(open);
    if (open) {
      const payload: CreateCommentPayload = {
        ProjectId: selectedTask.ProjectId,
        SprintId: selectedTask.SprintId,
        TaskId: selectedTask._id,
      };
      getComments(payload);
    } else {
      clearComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
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
        {task.comments.map((item) => (
          <SingleComment key={item._id} comment={item} />
        ))}
      </div>
      <div>
        <form className="create-sprint-form" autoComplete="off">
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
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={handleComment}
            >
              Comment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: ITaskMapStateToProps) => ({
  task: state.task,
  ui: state.ui,
});

const mapActionToProps = {
  getComments,
  createComment,
  clearComments,
};

export default connect(mapStateToProps, mapActionToProps)(TaskComments);
