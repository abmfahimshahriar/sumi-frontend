import React from "react";
import {
  GITHUB_LINK,
  LINKEDIN_LINK,
  MY_NAME,
  RIGHTS_RESERVED,
} from "../../../utility/constants/footerConstants";
import "./Footer.css";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import IconButton from "@material-ui/core/IconButton";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <h5>
        &copy; {new Date().getFullYear()},<span>{MY_NAME}</span>,
      </h5>
      <h5>{RIGHTS_RESERVED}</h5>
      <IconButton>
        <a href={LINKEDIN_LINK} target="_blank" rel="noreferrer">
          <LinkedInIcon/>
        </a>
      </IconButton>
      <IconButton>
        <a href={GITHUB_LINK} target="_blank" rel="noreferrer">
          <GitHubIcon />
        </a>
      </IconButton>
    </footer>
  );
};

export default Footer;
