import React from 'react';

const OneResult = ({promptTitle, result, id, deletePrompt}) => {
    
    const handleDelete = (event) => {
        deletePrompt(parseInt(event.target.id))
    }
    return (
        <div id={id} className='one-result'>
           <h2>Prompt: {promptTitle}</h2> 
           <p>Response: {result}</p>
           <button id={id} onClick={handleDelete}>X</button>

        </div>
    );
};

export default OneResult;