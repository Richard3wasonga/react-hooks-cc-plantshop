# **Plantsy app**

This is an app where users are able to buy plants.New plants can be added to the catalog,plants can also be removed and thier price edited to a new price.

---
## **Installation**

Access the live application here: [Live Link](https://react-hooks-cc-plantshop-inky-five.vercel.app/)

1. Clone this repository:
   ```bash
   git clone https://github.com/Richard3wasonga/react-hooks-cc-plantshop
   ```
2. Navigate to the project directory:
   ```bash
   cd react-hooks-cc-plantshop
   ```
3. Ensure the server is running by writing `npm run server` on terminal.
4. Run the react app with  writing `npm start` on your terminal.

---


## **How the app works**

### **NewPlantForm.js**
This part has a form where plants can be added to the server.This part mainly uses `useState` and `event listeners`

```js
import React,{useState} from "react";

function NewPlantForm() {
  const [name, setname] = useState('')
  const [image, setimage] = useState('')
  const [price, setprice] = useState('')

  const handleSubmit = (e) => {

    e.preventDefault()

    const newPlant = {
      name: name,
      image: image,
      price: price,
    }

    
      fetch('http://localhost:6001/plants',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPlant)
  
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))
  
    

    setname('')
    setimage('')
    setprice('')
  }

  
  

  const handleName = (e) => {
    setname(e.target.value)
  }
  const handleImage = (e) => {
    setimage(e.target.value)
  }
  const handlePrice = (e) => {
    setprice(e.target.value)
  }
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={name} onChange={handleName}/>
        <input type="text" name="image" placeholder="Image URL" value={image} onChange={handleImage}/>
        <input type="number" name="price" step="0.01" placeholder="Price" value={price} onChange={handlePrice}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;

```
---

### **PlantCard.js**

This part is where each individual plant is given place in the list.This is the place where the `edit` functionallity is housed and also the `delete` functionality.

```js
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

```
---
## **Features overview**

- Adding plant
- Editing plant price (using window prompt)
- Deleting plant

## **Future Improvements**

- Preventing empty spaces from being added
- Enchance the UI/UX for a mordern look.
- Automatic update without need for page refresh.

## **Authors**
- Richard Wasonga - [GitHub Profile](https://github.com/Richard3wasonga)

## **Contributors**
- Bob Oyier - [GitHub Profile](https://github.com/oyieroyier)

---

## **License**

This project is open-source and available under the MIT License.