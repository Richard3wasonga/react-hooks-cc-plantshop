import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plantInfo,handleDelete,handleEdit}) {
  return (
    <ul className="cards">
      <PlantCard plantInfo={plantInfo} handleDelete={handleDelete} handleEdit={handleEdit}/>
    </ul>
  );
}

export default PlantList;
