import React from 'react';
import OneResult from './OneResult';

const PromptResults = ({requestResponse, deletePrompt}) => {

let everyPromptResult = requestResponse.map((result, i) => {
    return (
        <OneResult 
            result={Object.entries(result)[1][1]}
            key={i}
            id={result.id}
            promptTitle={Object.entries(result)[1][0]}
            deletePrompt={deletePrompt}
        />
        )
})


    return (
        <div className='prompts-container'>
        {everyPromptResult}
      </div>
    );
};

export default PromptResults;