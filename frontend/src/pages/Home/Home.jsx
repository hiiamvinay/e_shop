import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import SliderImage from './SliderImage'
import Products from '../../components/Products/Products'
import Spinner from '../../components/Spinner/Spinner'

const Home = () => {
  return (
    <>
    <Header/>
    <SliderImage/>
    <Products/>
   
    <Footer/>
    
    
    </>
    
  )
}

export default Home