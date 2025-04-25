import React,{useState,useEffect}  from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
  const [plantInfo, setplantInfo] = useState([])
  const [searchTerm, setsearchTerm] = useState('')
  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(res => res.json())
      .then(data => {
        const updatedData = data.map(plant => ({ ...plant, inStock: true }));
        setplantInfo(updatedData);
      })
      .catch(error => console.error(error));
  }, []);
  

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

  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((data) => setplantInfo((prevPlants) => [...prevPlants, data]))
      .catch((err) => console.error("Error adding plant:", err));
  };

  const handleSearch = (value) => {
    setsearchTerm(value);
  };
  const filteredserarch = plantInfo.filter((plant) => plant.name.toLowerCase().includes(searchTerm.toLowerCase()))
  
  const handleToggleStock = (id) => {
    const updatedPlants = plantInfo.map((plant) =>
      plant.id === id ? { ...plant, inStock: !plant.inStock } : plant
    );
    setplantInfo(updatedPlants);
  
    const updatedPlant = updatedPlants.find((plant) => plant.id === id);
  
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPlant),
    })
      .then(res => res.json())
      .then(data => console.log("Stock status updated:", data))
      .catch(err => console.error("Toggle stock error:", err));
  };
  

  return (
    <div className="app">
      <Header />
      <PlantPage plantInfo={filteredserarch} setplantInfo={setplantInfo} handleDelete={handleDelete} handleEdit={handleEdit} handleAddPlant={handleAddPlant} handleSearch={handleSearch} handleToggleStock={handleToggleStock}/>
    </div>
  );
}

export default App;
