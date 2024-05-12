import React from 'react'
import {categories} from "../data"
import { Link } from 'react-router-dom'
import "../styles/Categories.scss"

const Categories = () => {
  return (
    <div className='categories'>
        <h1>Choose Among Top Categories</h1>
        <p>Welcome to our Home Rental Platform, where your perfect living space awaits! Browse through our diverse categories of homes, from cozy apartments to spacious houses, and find the ideal match for your lifestyle. Whether you're seeking a modern urban loft or a serene countryside retreat, we've got you covered</p>

        <div className="categories_list">
            {categories?.slice(1, 7).map((category, index)=>(
                <Link to="">
                    <div className="category" key={index}>
                        <img src={category.img} alt={category.label} />
                        <div className="overlay"></div>
                        <div className="category_text">
                            <div className="category_text_icon">{category.icon}</div>
                            <p>{category.label}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Categories