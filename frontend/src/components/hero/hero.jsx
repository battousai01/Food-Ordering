import React from 'react'
import './hero.css'
import hero_img from '../../assets/pasta2.png'
import {FaShippingFast} from 'react-icons/fa'
import { BiSupport } from 'react-icons/bi'
import { MdPayment } from 'react-icons/md'
import { FiSend } from 'react-icons/fi'
const hero = () => {
  return (
    <div>
        <div className='hero'>
            <div className='hero-top'>
                <div className='hero-left'>
                    <h2>Enjoy Your Delicious</h2>
                    <h1>Discover Delicious Helthy Meal that Nourishes You</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipiscing elit. Facere, iure quaerat? Nihil voluptate velit nobris dolores provident</p>
                    <button>Explore Our Menu</button>
                </div>
                <div className='hero-right'>
                    <img src={hero_img} className='hero-img' alt="hero_img" />
                </div>
            </div>
            
            <div className='hero-bottom'>
                <div className="hero-content">
                    <div className="info_icon"><FaShippingFast className='hero_icon'/></div>
                    <div className="details">
                        <h3>Free Shipping</h3>
                        <p>Free shipping on order</p>
                    </div>
                </div>

                <div className="hero-content">
                    <div className="info_icon"><FiSend className='hero_icon'/></div>
                    <div className="details">
                        <h3>Worldwide Delivery</h3>
                        <p>We delivery to all countries</p>
                    </div>
                </div>

                <div className="hero-content">
                    <div className="info_icon"><BiSupport className='hero_icon'/></div>
                    <div className="details">
                        <h3>24/7</h3>
                        <p>Full support process</p>
                    </div>
                </div>

                <div className="hero-content">
                    <div className="info_icon"><MdPayment className='hero_icon'/></div>
                    <div className="details">
                        <h3>Secure payment</h3>
                        <p>Your payment is secure</p>
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default hero