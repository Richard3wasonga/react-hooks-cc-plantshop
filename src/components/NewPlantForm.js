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
