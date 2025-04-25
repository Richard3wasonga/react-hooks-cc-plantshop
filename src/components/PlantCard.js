import React,{useState,useEffect} from "react";

function PlantCard() {
  const [plantInfo, setplantInfo] = useState([])
  useEffect(() => {
    fetch('http://localhost:6001/plants')
    .then(res => res.json())
    .then(data => setplantInfo(data))
    .catch(error => console.error(error))
  }, [])

  const handleDelete = (id) => {
    fetch(`http://localhost:6001/plants/${id}`,{
      method: "DELETE",
    })
    .then(res => res.json())
    .then(data => console.LOG(data))
    .catch(error => console.error(error))

  }
  
  return (
    <ul>
    {plantInfo.map((plant) => (
      <li className="card" data-testid="plant-item" key={plant.id}>
      <img src={plant.image || "https://via.placeholder.com/400"} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <button className="deletebtn" onClick={() => handleDelete(plant.id)}>Delete</button>
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
