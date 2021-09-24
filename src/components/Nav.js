import React from "react";

function Nav() {
  return (
    <div className="nav">
      <div className="flex-row">
        <img src="time.gif" alt="" style={{ marginRight: "10px" }} />
        <h1>Easy Time Complexity</h1>
      </div>
      <button className="nav-btn">
        <a href="https://www.leowang.codes/">Donate</a>
      </button>
    </div>
  );
}

export default Nav;
