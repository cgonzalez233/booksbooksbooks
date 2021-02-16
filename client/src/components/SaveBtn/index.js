import React, { useState } from "react";
import API from "../../utils/API";

function SaveBtn(props) {
  return (
    <span className="save-btn" {...props} role="button" tabIndex="0">
      ❤
    </span>
  );
}

export default SaveBtn;
