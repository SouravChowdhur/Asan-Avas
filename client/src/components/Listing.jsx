import React, { useEffect, useState } from 'react'
import { categories } from '../data'
import "../styles/Listing.scss"
import ListingCard from './ListingCard'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'
import { setListings } from '../redux/state'


const Listing = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    const [selectedCategory, setSelectedCategory] = useState("All")

    const listings = useSelector((state) => state.listings)

    const getFeedListings = async () => {
        try {
            const response = await fetch(
                selectedCategory !== "All" ?
                    `http://localhost:3001/properties?category=${selectedCategory}` : "http://localhost:3001/properties", {
                method: "GET"
            }
            );


            const data = await response.json()
            dispatch(setListings({listings: data}))
            setLoading(false)
        }
        catch (error) {
             console.log("Fetch Listing Failed", error.message)
        }
    }


    useEffect(()=>{
        getFeedListings();
    }, [selectedCategory])

    console.log(listings)
    return (
        <>
        <div className='category-list'>
            {categories?.map((category, index) => (
                <div className={`category`} key={index} onClick={() => setSelectedCategory(category.label)}>
                    <div className='category_icon'>{category.icon}</div>
                    <p>{category.label}</p>
                </div>
            ))}
        </div>
         
         {loading? <Loader/> :
           <div className="listings">
               {listings.map((_id, creator, ListingPhotoPaths, city, district, country, category, type, price)=>(
                <ListingCard
                listingId = {_id}
                creator = {creator}
                ListingPhotoPaths={ListingPhotoPaths}/>
               ))}
           </div>
         }
        </>
    )
}

export default Listing