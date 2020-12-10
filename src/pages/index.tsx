import React, { useState, useEffect } from "react";
import { PageProps } from "gatsby";
import queryString from "query-string";

import AllText from "./all_text.json";
import Layout from "../components/layout";
import Flags, { FlagSpan } from "../components/flags";

const TextResults = ({ values }: { values: Array<[string, string]> }) => {
  const [showAlert, setShowAlert] = useState(false);
  const cards: Array<JSX.Element> = [];
  values.sort().forEach(([k, v]) => {
    if (!v) return;
    v = v.trim();
    k = k.trim();
    cards.push(
      <div
        key={k + v}
        className="flex-grow sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 py-2"
      >
        <div className="bg-gray-100 rounded px-2 py-2 shadow h-full">
          <div
            role="button"
            tabIndex={0}
            className="focus:outline-none hover:bg-gray-400 hover:text-black text-gray-100 cursor-pointer px-2 rounded flex flex-row"
            onClick={() => {
              setShowAlert(true);
              navigator.clipboard.writeText(v);
              setTimeout(() => setShowAlert(false), 1000);
            }}
          >
            <FlagSpan value={k} />
            <p className="px-1">{showAlert ? "Copied!" : "Copy text"}</p>
          </div>
          <p
            className="px-2 py-2 break-words"
            style={{ whiteSpace: "pre-line" }}
          >
            {v}
          </p>
        </div>
      </div>
    );
  });
  return <div className="flex flex-row flex-wrap">{cards}</div>;
};

const IndexPage = ({ location }: PageProps) => {
  const [inputText, setInputText] = useState("");
  const [selectedVariable, setSelectedVariable] = useState("");
  const [variables, setVariables] = useState<Array<string>>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<Set<string>>(
    new Set()
  );
  const [results, setResults] = useState<Array<[string, string]>>([]);

  useEffect(() => {
    const params = queryString.parse(location.search);
    const inputText = params.search;
    const lang = params.lang;

    const selectedLanguages: Set<string> = new Set();
    if (lang)
      (lang as string)
        .split(",")
        .filter((x) => x.length > 0)
        .forEach((x) => selectedLanguages.add(x));
    if (inputText) {
      setInputText(inputText as string);
      setSelectedLanguages(selectedLanguages);
    }
  }, []);

  // Get text ids
  useEffect(() => {
    if (inputText === "") {
      setVariables([]);
    } else {
      const variables: Array<string> = [];
      Object.entries(AllText).forEach(([lang, data]: [string, object]) => {
        Object.entries(data).forEach(([k, v]: [string, string]) => {
          if (variables.includes(k)) return;
          if (!v) return;
          if (
            v.toLowerCase().includes(inputText.toLowerCase()) ||
            k.toLowerCase().includes(inputText.toLowerCase())
          ) {
            variables.push(k);
          }
        });
      });
      variables.sort();
      setVariables(variables);
    }
  }, [selectedLanguages]);

  // Get results
  useEffect(() => {
    let variable = selectedVariable || variables[0];

    let results: Array<[string, string]> = [];
    if (variables.length === 0) {
      setResults(results);
    } else {
      results = Object.entries(AllText)
        .filter(
          ([lang, data]) =>
            (selectedLanguages.size === 0 || selectedLanguages.has(lang)) &&
            data.hasOwnProperty(variable) &&
            data[variable]
        )
        .map(([lang, data]) => {
          let text = data[variable];
          text = text.replaceAll("<page>", "\n\n");
          text = text.replaceAll("<br>", "\n");
          return [lang, text];
        });
      setResults(results);
    }
  }, [variables, selectedLanguages, selectedVariable]);

  const onSelect = (value: string) => {
    if (value === "All") selectedLanguages.clear();
    else {
      if (selectedLanguages.has(value)) {
        selectedLanguages.delete(value);
      } else {
        selectedLanguages.add(value);
      }
    }
    setSelectedLanguages(new Set(selectedLanguages));
  };

  return (
    <Layout>
      <div>
        <form className="mx-auto w-4/5">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="text"
          >
            Search
          </label>
          <input
            id="search"
            type="text"
            name="search"
            className="shadow appearance-none border w-full rounded-3xl py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={inputText}
            placeholder="Text"
            onChange={(e) => setInputText(e.target.value)}
          />
          <input
            type="hidden"
            id="lang"
            name="lang"
            value={Array.from(selectedLanguages).sort()}
          />
        </form>
        <Flags onSelect={onSelect} selectedLanguages={selectedLanguages} />
        <select
          className="block appearance-none w-full border text-gray-700 mx-2 py-2 my-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
          value={selectedVariable}
          required
          onChange={(event) => {
            setSelectedVariable(event.target.value);
          }}
        >
          {variables.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <TextResults values={results} />
      </div>
    </Layout>
  );
};

export default IndexPage;
