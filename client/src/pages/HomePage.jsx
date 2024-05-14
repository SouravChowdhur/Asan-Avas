import React from 'react'
import Navbar from '../components/Navbar'
import Slide from '../components/Slide'
import Categories from '../components/Categories'
import Listing from '../components/Listing'

const HomePage = () => {
  return (
    <>
     <Navbar/>
     <Slide/>
     <Categories/>
     <Listing/>
    </>
  )
}

export default HomePage