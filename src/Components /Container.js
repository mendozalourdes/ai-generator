import React from 'react';
import { useState, useEffect } from 'react';
import PromptResults from './PromptResults';

const Container = () => {
    const [formInput, setFormInput] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("")
    const [requestResponse, setRequestResponse] = useState([])
    const key = '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'  
    
    const generatePrompt = (formText) => {
     
        return formText;
      }
    
      const data = {
        prompt: generatePrompt(formInput),
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
       };


       const getAIData = async () => {
        const response = await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
          },
          body: JSON.stringify(data),
         });
    let allData = await response.json()
        setResult(allData.choices[0].text);
        setFormInput(""); 
        setRequestResponse([ {"id": requestResponse.length, [formInput]: allData.choices[0].text}, ...requestResponse])
    }

    const onSubmit = (event) => {
        event.preventDefault();
        getAIData();
    }

    const deletePrompt = (id) => {
        const filteredResults = requestResponse.filter((result) => {
            return id!== result.id })
        setRequestResponse(filteredResults);
      }

    
      return (
        <div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="form"
              placeholder="Enter a prompt for the AI"
              value={formInput}
              onChange={(e) => setFormInput(e.target.value)}
            />
            <input type="submit" value="Generate AI Text" />
          </form> 
          <div>
             {requestResponse.length ? <PromptResults deletePrompt={deletePrompt} requestResponse={requestResponse} /> : ""}
          </div>
      </div>
    );
};
export default Container;