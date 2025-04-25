import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plantInfo,handleDelete,handleEdit, handleToggleStock}) {
  return (
    <ul className="cards">
      <PlantCard plantInfo={plantInfo} handleDelete={handleDelete} handleEdit={handleEdit} handleToggleStock={handleToggleStock}/>
    </ul>
  );
}

export default PlantList;
