import React, { FormEvent, useEffect, useState } from "react";
import {
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
import { inputValidator } from "../../../utility/validators/inputValidator";

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
  const [formErrors, setFormErrors] = useState<any>({});

  useEffect(() => {
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

  const inputs = [
    {
      fieldValue: commentContent,
      fieldName: "commentContent",
      validations: ["required"],
      minLength: 1,
      maxLength: 1,
    },
  ];
  const handleComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorsObject = inputValidator(inputs);
    setFormErrors(errorsObject);
    if (!errorsObject.hasError) {
      const payload: CreateCommentPayload = {
        ProjectId: selectedTask.ProjectId,
        SprintId: selectedTask.SprintId,
        TaskId: selectedTask._id,
        CommentContent: commentContent,
      };
      createComment(payload);
      setCommentContent("");
    }
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
        <form
          className="create-sprint-form"
          autoComplete="off"
          onSubmit={handleComment}
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
              rows={2}
              onChange={handleInputChange}
              error={
                formErrors.commentContent?.errors.length > 0 ? true : false
              }
              helperText={
                formErrors.commentContent?.errors.length > 0
                  ? formErrors.commentContent?.errors[0]
                  : null
              }
            />
          </div>
          <div className="comment-btn">
            <Button variant="contained" color="primary" type="submit">
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
