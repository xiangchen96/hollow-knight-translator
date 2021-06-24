import React, { useState, useEffect } from "react";
import { PageProps } from "gatsby";
import queryString from "query-string";

import Layout from "../components/Layout";
import TextResults from "../components/TextResults";
import Flags from "../components/Flags";
import Form from "../components/Form";

import AllText from "./all_text.json";

const normalize = (str: string) => {
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  return str.toLowerCase()
}

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
      const searchStr = normalize(inputText)
      const variables: Array<string> = [];
      Object.entries(AllText).forEach(([lang, data]: [string, object]) => {
        Object.entries(data).forEach(([k, v]: [string, string]) => {
          if (variables.includes(k)) return;
          if (!v) return;
          if (
            normalize(v).includes(searchStr) ||
            normalize(k).includes(searchStr)
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
        .map(([lang, data]) => [lang, data[variable]]);
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
        <Form
          inputText={inputText}
          setInputText={setInputText}
          selectedLanguages={Array.from(selectedLanguages).sort()}
        />
        <Flags onSelect={onSelect} selectedLanguages={selectedLanguages} />
        <div className="px-2">
          <select
            className="block appearance-none w-full border text-gray-700 py-2 my-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
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
        </div>
        <TextResults values={results} />
      </div>
    </Layout>
  );
};

export default IndexPage;
