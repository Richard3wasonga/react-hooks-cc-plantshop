import React from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({plantInfo,handleDelete,handleEdit,handleAddPlant,handleSearch,handleToggleStock}) {
  return (
    <main>
      <NewPlantForm  handleAddPlant={handleAddPlant} />
      <Search handleSearch={handleSearch}/>
      <PlantList plantInfo={plantInfo} handleDelete={handleDelete} handleEdit={handleEdit} handleToggleStock={handleToggleStock}/>
    </main>
  );
}

export default PlantPage;
