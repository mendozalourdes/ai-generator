import React from "react";
import { useState, useEffect } from "react";
import PromptResults from "./PromptResults";

const Container = () => {
  const useLocalStorage = (storageKey, defaultState) => {
    const [value, setValue] = useState(
      JSON.parse(localStorage.getItem(storageKey)) ?? defaultState
    );

    useEffect(() => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value, storageKey]);

    return [value, setValue];
  };

  const [formInput, setFormInput] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(null);
  const [requestResponse, setRequestResponse] = useLocalStorage(
    "requestResponse",
    []
  );

  const generatePrompt = (formText) => {
    return formText;
  };

  const data = {
    prompt: generatePrompt(formInput),
    temperature: 1,
    max_tokens: 94,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  const getAIData = async () => {
    const response = await fetch(
      "https://api.openai.com/v1/engines/text-curie-001/completions",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify(data),
      }
    );
    let allData = await response.json();
    setResult(allData.choices[0].text);
    setFormInput("");
    setLoading(false);
    setRequestResponse([
      { id: requestResponse.length, [formInput]: allData.choices[0].text },
      ...requestResponse,
    ]);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    getAIData();
    setLoading(true);
  };

  const deletePrompt = (id) => {
    const filteredResults = requestResponse.filter((result) => {
      return id !== result.id;
    });
    setRequestResponse(filteredResults);
  };

  return (
    <div>
      <form className="input-form" onSubmit={onSubmit}>
        <input
          type="text"
          name="form"
          className="form-input"
          placeholder="Enter a prompt for the AI"
          value={formInput}
          required
          onChange={(e) => setFormInput(e.target.value)}
        />
        <button disabled={!formInput} type="submit" value="Generate AI Text">
          Generate AI Text
        </button>
      </form>
      <div>
        {requestResponse.length ? (
          <PromptResults
            loading={loading}
            deletePrompt={deletePrompt}
            requestResponse={requestResponse}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Container;
