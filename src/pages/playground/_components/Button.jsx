import React from "react";
import { classNames } from "../../../helpers";

export default function Button({ children, disabled = false, onClick }) {
  return (
    <button
      disabled={disabled}
      type="button"
      className={classNames(
        "inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2",
        disabled
          ? "bg-gray-300 border-b-2 border-gray-400 text-white focus:ring-gray-600"
          : "bg-sky-400 border-b-2 border-sky-600 hover:bg-sky-300 focus:ring-fluree-blue"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
