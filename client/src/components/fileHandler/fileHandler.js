import React from "react";
import { useState } from "react";

const fileHandler = (event) => {
  console.log(event);

  return (
    <div>
      <input type="file" onChange={this.fileHandler} />
    </div>
  );
};

export default fileHandler;
