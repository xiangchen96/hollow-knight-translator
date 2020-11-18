import React, { Component } from "react";

export default class Flag extends Component {
  renderIcon() {
    const { value } = this.props;
    const lowerCaseSuffix = ["JP", "FR", "RU", "PT", "ES", "IT", "DE"];
    let flagSuffix;
    if (lowerCaseSuffix.indexOf(value) >= 0) {
      flagSuffix = value.toLowerCase();
    } else {
      switch (value) {
        case "SC":
          flagSuffix = "cn";
          break;
        case "KO":
          flagSuffix = "kr";
          break;
        case "JA":
          flagSuffix = "jp";
          break;
        case "EN":
          flagSuffix = "gb";
          break;
        case "BP":
          flagSuffix = "br";
          break;
        case "ZH":
          flagSuffix = "cn";
          break;
        default:
          return null;
      }
    }
    const className = `flag-icon flag-icon-${flagSuffix}`;
    return <span className={className} />;
  }

  render() {
    const { value, onSelect, selectedLanguages } = this.props;
    const checked =
      selectedLanguages.has(value) ||
      (value === "All" && selectedLanguages.size === 0);
    return (
      <div
        className={`flex flex-row justify-around rounded-full w-20 mx-3 my-2 px-3 py-1 active:bg-gray-500 hover:bg-gray-400 bg-gray-${
          checked ? "400" : "200"
        }`}
        role="button"
        onClick={() => {
          if (onSelect) onSelect(value);
        }}
      >
        {this.renderIcon()}
        <p className="select-none">{value}</p>
      </div>
    );
  }
}
