import React from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({plantInfo,handleDelete,handleEdit}) {
  return (
    <main>
      <NewPlantForm />
      <Search />
      <PlantList plantInfo={plantInfo} handleDelete={handleDelete} handleEdit={handleEdit}/>
    </main>
  );
}

export default PlantPage;
