import React from "react";

function PlantCard({plantInfo,handleEdit,handleDelete}) {
  
  
  return (
    <ul>
    {plantInfo.map((plant) => (
      <li className="card" data-testid="plant-item" key={plant.id}>
      <img src={plant.image || "https://via.placeholder.com/400"} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <button className="deletebtn" onClick={() => handleDelete(plant.id)}>Delete</button>
      <button className="editbtn" onClick={() => handleEdit(plant.id)}>Edit</button>
      {true ? (
        <button className="primary">In Stock</button>
      ) : (
        <button>Out of Stock</button>
      )}
    </li>

    ))}
    </ul>
    
  );
}

export default PlantCard;
