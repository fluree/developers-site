import React from "react";
import { classNames } from "../../helpers";

export default function ExampleTabs({ tabs, current, onClick, onChange }) {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select an example tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs.find(() => current).label}
          onChange={onChange}
        >
          {tabs.map((tab) => (
            <option key={tab.key} value={tab.key}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={classNames(
                current === tab.key
                  ? "bg-icicle text-flurple"
                  : "text-gray-500 hover:text-gray-700",
                "px-3 py-2 font-medium text-sm rounded-md"
              )}
              aria-current={current === tab.key ? "page" : undefined}
              onClick={onClick}
              name={tab.key}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
