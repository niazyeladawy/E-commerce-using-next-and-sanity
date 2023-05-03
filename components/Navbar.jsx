import React, { useState } from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import Cart from './Cart';
import { toggleCartVisiblity } from '../store/cartSlice';

const Navbar = () => {

  const cartShow = useSelector(state => state.cart.cartShown);
  const dispatch = useDispatch()

  const cartItems = useSelector(state => state.cart.items);

  const handleToglleCart = () => {
    dispatch(toggleCartVisiblity())
  }


  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>
          Niazo-commerce
        </Link>
      </p>
      <button className='cart-icon' onClick={handleToglleCart}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{cartItems.length}</span>
      </button>
      {
        cartShow && <Cart cartLength={cartItems.length} handleToglleCart={handleToglleCart} />
      }

    </div>
  )
}

export default Navbar