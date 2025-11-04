import React from "react";

export default function Example(props) {
  return (
    <div className={`mx-auto border-dashed rounded-md p-6 flex justify-center items-center`}>
      { props.label || "Here's some content" }
    </div>
  );
}
