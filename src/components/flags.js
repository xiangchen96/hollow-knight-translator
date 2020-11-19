import React from "react";

import Flag from "./flag";

const langs = [
  "JP",
  "FR",
  "RU",
  "PT",
  "SC",
  "ES",
  "KO",
  "IT",
  "JA",
  "DE",
  "EN",
  "BP",
  "ZH",
];
langs.sort();
langs.unshift("All");

const Flags = ({ onSelect, selectedLanguages }) => (
  <div className="flex flex-row flex-wrap w-full justify-start flex-wrap py-2">
    {langs.map((k) => (
      <Flag
        key={k}
        value={k}
        onSelect={onSelect}
        selectedLanguages={selectedLanguages}
      />
    ))}
  </div>
);

export default Flags;
