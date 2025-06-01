import React from 'react'
import './Add.css'
import upload_img from '../../assets/upload_img.png'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image,setImage] = useState(null)
  const [name,setName] = useState("") 
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("All")

  const OnSubmitHandler = async (e) => {
     e.preventDefault();
    try{
      const formData = new FormData(); 
      formData.append("name",name);
      formData.append("description",description);
      formData.append("price",price);
      formData.append("category",category);
      if(image) formData.append("image", image)

        const response = await axios.post(`${backendUrl}/api/product/add`,formData,{headers:{token}})

        console.log(response)

        if(response.data.success){
          toast.success(response.data.message)
          setName("")
          setDescription("")
          setPrice("")
          setImage(null)
        }else{
          toast.error(response.data.message)
        }
    }catch(error){
        console.log(error)
        toast.error(error.message)
    }
  }

  return (
    
    <form onSubmit={OnSubmitHandler} className='form-container'>
      <div>
        <p className='form-label'>Upload Image</p>
        <div className='image_upload_container'>
          <label htmlFor="image">
            <img src={!image ? upload_img : URL.createObjectURL(image)} alt ="" className='img-preview'/>
            <input onChange={(e)=> setImage(e.target.files[0])} type="file"  id="image" hidden/>
          </label>
        </div>
      </div>
      <div className="form-group">
        <p className="form-label">Product Name</p>
        <input onChange={(e)=> setName(e.target.value)} value={name} type="text" className='form-input' placeholder='Enter product Name' required />
      </div>
      <div className="form-group">
        <p className="form-label">Product Description</p>
        <textarea onChange={(e)=> setDescription(e.target.value)} value={description} className='form-input' placeholder='Type Product Description' type='text' required /> 
      </div>
      <div className="form-group-horizontal">
        <div>
          <p className="form-label">Product Category</p>
          <select onChange={(e)=> setCategory(e.target.value)} value={category} className='form-select'>
            <option value="All">All</option>
            <option value="Spaghetti">Spaghetti</option>
            <option value="Pizza">Pizza</option>
            <option value="Rice">Rice</option>
            <option value="Chicken">Chicken</option>
            <option value="Noodles">Noodles</option>
            <option value="Drinks">Drinks</option>
          </select>
        </div>
        <div>
          <p className="form-label">Product Price</p>
          <input onChange={(e)=> setPrice(e.target.value)} value={price} type="number" placeholder='30' className='form-input price-input' />
        </div>
      </div>
      <button type="submit" className='submit-btn'>ADD PRODUCT</button>
    </form>
  )
}

export default Add
