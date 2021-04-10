import React, { FormEvent, useEffect, useState } from "react";
import { MyButton } from "../../../utility/components";
import "./ProfileCard.css";
import Edit from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import { inputValidator } from "../../../utility/validators/inputValidator";
import Button from "@material-ui/core/Button";
import {
  IUserMapStateToProps,
  UserState,
} from "../../../interfaces/GlobalTypes";
import { connect } from "react-redux";
import { getUserDetails, updateUser } from "../../../store/actions/userActions";

type Props = {
  user: UserState;
  getUserDetails: Function;
  updateUser: Function;
};
const ProfileCard: React.FC<Props> = ({ user, getUserDetails, updateUser }) => {
  const [imageUrl, setImageUrl] = useState(
    "https://res.cloudinary.com/fshahriar008/image/upload/v1609701702/user_bccush.png"
  );
  const hidden = true;
  const [profileImage, setProfileImage] = useState<any>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [formErrors, setFormErrors] = useState<any>({});

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setUserName(user.userDetails.Name);
    setUserEmail(user.userDetails.Email);
    if (user.userDetails.ProfileImageUrl)
      setImageUrl(user.userDetails.ProfileImageUrl);
  }, [user.userDetails]);
  const inputs = [
    {
      fieldValue: userName,
      fieldName: "userName",
      validations: ["required"],
      minLength: 8,
      maxLength: 20,
    },
    {
      fieldValue: userEmail,
      fieldName: "userEmail",
      validations: ["required"],
      minLength: 8,
      maxLength: 20,
    },
  ];
  const handleImageChange = (event: any) => {
    const image = event.target.files[0];
    let src = URL.createObjectURL(event.target.files[0]);
    let preview: any = document.getElementById("image-preview");
    preview.src = src;
    setProfileImage(image);
  };
  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput?.click();
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "userName") setUserName(value);
    if (name === "userEmail") setUserEmail(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorsObject = inputValidator(inputs);
    setFormErrors(errorsObject);
    if (!errorsObject.hasError) {
      // update the user
      const formData = new FormData();
      formData.append("image", profileImage);
      formData.append("Name", userName);
      formData.append("Email", userEmail);
      updateUser(formData);
    }
  };
  return (
    <div className="profile-card">
      <div className="image-wrapper">
        <img
          src={imageUrl}
          id="image-preview"
          alt="profile"
          className="profile-image"
        />
        <input
          type="file"
          id="imageInput"
          hidden={hidden}
          onChange={handleImageChange}
        />
        <MyButton tip="Edit profile picture" onClick={handleEditPicture}>
          <Edit color="primary" />
        </MyButton>
      </div>

      <form
        className="create-sprint-form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="form-item">
          <TextField
            className="full-width"
            id="userName"
            name="userName"
            type="text"
            value={userName}
            placeholder="Username"
            label="Username"
            error={formErrors.userName?.errors.length > 0 ? true : false}
            helperText={
              formErrors.userName?.errors.length > 0
                ? formErrors.userName?.errors[0]
                : null
            }
            onChange={handleInputChange}
          />
        </div>
        <div className="form-item">
          <TextField
            className="full-width"
            id="userEmail"
            name="userEmail"
            type="text"
            value={userEmail}
            placeholder="User Email"
            label="User Email"
            error={formErrors.userEmail?.errors.length > 0 ? true : false}
            helperText={
              formErrors.userEmail?.errors.length > 0
                ? formErrors.userEmail?.errors[0]
                : null
            }
            onChange={handleInputChange}
          />
        </div>
        <div className="form-item btn-container">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <Button variant="contained" color="secondary" type="button">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: IUserMapStateToProps) => ({
  user: state.user,
  ui: state.ui,
});

const mapActionToProps = {
  getUserDetails,
  updateUser,
};

export default connect(mapStateToProps, mapActionToProps)(ProfileCard);
