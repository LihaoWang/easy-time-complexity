import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubAlt } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer flex-col">
      <div className="footer-icons flex-row">
        <a href="https://github.com/LihaoWang">
          <FaGithubAlt />
        </a>
        <a href="https://www.linkedin.com/in/lihaowang98/">
          <FaLinkedin />
        </a>
      </div>
      <p style={{ marginTop: "3px" }}>
        Created by <a href="https://www.leowang.codes/">Leo Wang</a> &copy; 2021{" "}
      </p>
    </div>
  );
}

export default Footer;
