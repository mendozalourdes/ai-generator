import React from 'react';
import OneResult from './OneResult';
import loadingGif from  './../Images/loadingGif.svg' ;

const PromptResults = ({requestResponse, deletePrompt, loading}) => {

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
        {!loading ? everyPromptResult : <img src={loadingGif} alt="loading"></img>}
      </div>
    );
};

export default PromptResults;
