import React from "react";

const OneResult = ({ promptTitle, result, id, deletePrompt }) => {
  const capitalizeTitle = () => {
    let split = promptTitle.split(" ");
    let capitalize = split.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalize.join(" ");
  };
  const handleDelete = (event) => {
    deletePrompt(parseInt(event.target.id));
  };
  return (
    <div id={id} className="one-result">
      <div className="card-close">
        <a className="close" id={id} onClick={handleDelete}></a>
      </div>
      <h2> {capitalizeTitle()}</h2>
      <p>{result}</p>
    </div>
  );
};

export default OneResult;
