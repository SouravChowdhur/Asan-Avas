import React from 'react'
import "../styles/CreateListing.scss"
import Navbar from '../components/Navbar'
import { categories, types, facilities } from '../data'
import { RemoveCircleOutline, AddCircleOutline } from '@mui/icons-material'
import variables from "../styles/variables.scss"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { IoIosImages } from "react-icons/io"
import { useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { FaRupeeSign } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const CreateListing = () => {
  const [photos, setPhotos] = useState([])
  const [category, setCategory] = useState("");
  const [type, setType] = useState("")
  const [amenities, setAmenities] = useState([])

  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    houseName: "",
    city: '',
    district: '',
    country: ''
  })


  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value
    })
  }

  // console.log(formLocation)

  const [guestsCount, setGuestsCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedsCount, setBedsCount] = useState(1);
  const [washroomCount, setWashroomCount] = useState(1);



  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) => prevAmenities.filter((option) => option !== facility))
    }
    else {
      setAmenities((prev) => [...prev, facility])
    }
  }

  // console.log(amenities)


  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos])
  }

  const handleDragPhoto = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setPhotos(items)
  }

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, index) => index !== indexToRemove))
  }


  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    heighlight: "",
    heighlightDescription: "",
    price: 0
  })


  const handleChangeDescription = (e) => {
    const { name, value } = e.target
    setFormDescription({
      ...formDescription,
      [name]: value
    })
  }


  const creatorId = useSelector((state) => state.user._id)

  const navigate = useNavigate()
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const listingForm = new FormData()
      listingForm.append("creator", creatorId)
      listingForm.append("category", category)
      listingForm.append("type", type)
      listingForm.append("streetAddress", formLocation.streetAddress)
      listingForm.append("houseName", formLocation.houseName)
      listingForm.append("city", formLocation.city)
      listingForm.append("district", formLocation.district)
      listingForm.append("country", formLocation.country)
      listingForm.append("guestCount", guestsCount)
      listingForm.append("bedroomCount", bedroomCount)
      listingForm.append("bedCount", bedsCount)
      listingForm.append("washroomCount", washroomCount)
      listingForm.append("amenities", amenities)
      listingForm.append("title", formDescription.title)
      listingForm.append("description", formDescription.description)
      listingForm.append("heighlight", formDescription.heighlight)
      listingForm.append("heighlightDescription", formDescription.heighlightDescription)
      listingForm.append("price", formDescription.price)


      photos.forEach((photo)=>{
        listingForm.append("listingPhotos", photo)
      })


      const response = await fetch("http://localhost:3001/properties/create",{
        method: "POST",
        body: listingForm
      })

      if(response.ok){
        navigate("/")
      }

    }
    catch (err) {
        console.log("publish listing failed", err.message)
    }
  }
  return (
    <>
      <Navbar />

      <div className="create-listing">
        <h1>Let's Publish Your Home</h1>
        <form onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2>Step 1: Enter your place data</h2>
            <hr />
            <h3>Select categories your place</h3>
            <div className="category-list">
              {
                categories?.map((item, index) => (
                  <div className={`category ${category === item.label ? 'selected' : ''}`} key={index} onClick={() => setCategory(item.label)}>
                    <div className="category_icon">{item.icon}</div>
                    <p>{item.label}</p>
                  </div>
                ))
              }
            </div>

            <h3>Select Type of room</h3>
            <div className="type-list">
              {
                types?.map((item, index) => (
                  <div className={`type ${type === item.name ? 'selected' : ""}`} key={index} onClick={() => setType(item.name)}>
                    <div className="type_text">
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                    </div>
                    <div className="type_icon">{item.icon}</div>
                  </div>
                ))
              }
            </div>


            <h3>Enter your address</h3>
            <div className="full">
              <div className="location">
                <p>Address</p>
                <input type="text" placeholder='Enter Address' name="streetAddress" value={formLocation.streetAddress} onChange={handleChangeLocation} required />
              </div>
            </div>


            <div className="half">
              <div className="location">
                <p>House Name/Number</p>
                <input type="text" placeholder='Enter House Name' name="houseName" value={formLocation.houseName} onChange={handleChangeLocation} required />
              </div>
              <div className="location">
                <p>City</p>
                <input type="text" placeholder='Enter City' name="city" value={formLocation.city} onChange={handleChangeLocation} required />
              </div>
            </div>


            <div className="half">
              <div className="location">
                <p>District</p>
                <input type="text" placeholder='Enter District' name="district" value={formLocation.district} onChange={handleChangeLocation} required />
              </div>
              <div className="location">
                <p>Country</p>
                <input type="text" placeholder='Enter Country' name="country" value={formLocation.country} onChange={handleChangeLocation} required />
              </div>
            </div>


            <h3>More Information</h3>
            <div className="basics">
              <div className="basic">
                <p>Persons</p>
                <div className="basic_count">
                  <RemoveCircleOutline onClick={() => { guestsCount > 1 && setGuestsCount(guestsCount - 1) }} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.green } }} />
                  <p>{guestsCount}</p>
                  <AddCircleOutline onClick={() => { setGuestsCount(guestsCount + 1) }} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.green } }} />
                </div>
              </div>

              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline onClick={() => { bedroomCount > 1 && setBedroomCount(bedroomCount - 1) }} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.green } }} />
                  <p>{bedroomCount}</p>
                  <AddCircleOutline onClick={() => { setBedroomCount(bedroomCount + 1) }} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.green } }} />
                </div>
              </div>


              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  <RemoveCircleOutline onClick={() => { bedsCount > 1 && setBedsCount(bedsCount - 1) }} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.green } }} />
                  <p>{bedsCount}</p>
                  <AddCircleOutline onClick={() => { setBedsCount(bedsCount + 1) }} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.green } }} />
                </div>
              </div>


              <div className="basic">
                <p>Washrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline onClick={() => { washroomCount > 1 && setWashroomCount(washroomCount - 1) }} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.green } }} />
                  <p>{washroomCount}</p>
                  <AddCircleOutline onClick={() => { setWashroomCount(washroomCount + 1) }} sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.green } }} />
                </div>
              </div>
            </div>
          </div>




          <div className="create-listing_step2">
            <h2>Step 2: Extras in your place</h2>

            <hr />
            <h3>Select your offer to guests</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div className={`facility ${amenities.includes(item.name) ? "selected" : ""}`} key={index} onClick={() => { handleSelectAmenities(item.name) }}>
                  <div className="facility_icon">
                    {item.icon}
                  </div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>

            <h3>Add Photos Of The Place</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {
                  (provided) => (
                    <div className='photos' {...provided.droppableProps} ref={provided.innerRef}>
                      {photos.length < 1 && (
                        <>
                          <input type="file" id="image" style={{ display: "none" }} accept='image/*' onChange={handleUploadPhotos} multiple />
                          <label htmlFor="image" className='alone'>
                            <div className="icon"><IoIosImages /></div>
                            <p>Browse Photos</p>
                          </label>
                        </>
                      )}


                      {
                        photos.length >= 1 && (
                          <>
                            {photos.map((photo, index) => {
                              return (
                                <Draggable key={index} draggableId={index.toString()} index={index}>
                                  {
                                    (provided) => (
                                      <div className='photo' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <img src={URL.createObjectURL(photo)} alt="place" />
                                        <button type="button" onClick={() => handleRemovePhoto(index)}><BiTrash /></button>
                                      </div>
                                    )
                                  }
                                </Draggable>
                              )
                            })}


                            <input type="file" id="image" style={{ display: "none" }} accept='image/*' onChange={handleUploadPhotos} multiple />
                            <label htmlFor="image" className='together'>
                              <div className="icon"><IoIosImages /></div>
                              <p>Browse Photos</p>
                            </label>
                          </>
                        )
                      }
                    </div>
                  )
                }
              </Droppable>
            </DragDropContext>



            <h3>Enter Title, Description and Highlights</h3>
            <div className="description">
              <p>Title</p>
              <input type="text" placeholder='Enter Title' name="title" value={formDescription.title} onChange={handleChangeDescription} required />
              <p>Description</p>
              <textarea type="text" placeholder='Enter description' name="description" value={formDescription.description} onChange={handleChangeDescription} required />
              <p>Highlight</p>
              <input type="text" placeholder='Enter heighlight' name="heighlight" value={formDescription.heighlight} onChange={handleChangeDescription} required />
              <p>Highlight Details</p>
              <textarea type="text" placeholder='Enter Heighlight Details' name="heighlightDescription" value={formDescription.heighlightDescription} onChange={handleChangeDescription} required />
              <p>Set Your Rent</p>
              <span><FaRupeeSign /></span>
              <input type="number" placeholder='8000' name="price" className='price' value={formDescription.price} onChange={handleChangeDescription} required />
            </div>
          </div>

          <button className="submit_btn" type='submit'>List Your Home</button>
        </form>
      </div>
    </>
  )
}

export default CreateListing