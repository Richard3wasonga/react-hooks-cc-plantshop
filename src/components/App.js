import React,{useState,useEffect}  from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
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
  const handleEdit = (id) => {
    const currentPlant = plantInfo.find(plant => plant.id === id);
    const newPrice = window.prompt("Edit plant Price:", currentPlant.price);

    if (newPrice && newPrice !== currentPlant.price) {
      const updatedPlant = plantInfo.map(plant =>
        plant.id === id ? { ...plant, price: newPrice} : plant
      );
      setplantInfo(updatedPlant);

      fetch(`http://localhost:6001/plants/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name: currentPlant.name,
          image: currentPlant.image,
          price: newPrice,
        }),
      })
        .then(res => res.json())
        .then(data => console.log("Updated:", data))
        .catch(err => console.error("Update failed:", err));
    }
  };
  return (
    <div className="app">
      <Header />
      <PlantPage plantInfo={plantInfo} handleDelete={handleDelete} handleEdit={handleEdit}/>
    </div>
  );
}

export default App;
