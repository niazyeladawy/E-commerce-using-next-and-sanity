import React, { useRef } from 'react'
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai'
import Link from 'next/link'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQty, increaseQty, removeItem } from '../store/cartSlice'
import { TiDeleteOutline } from 'react-icons/ti'
import getStripe from '../lib/getStripe'
import { toast } from 'react-hot-toast'

const Cart = ({ handleToglleCart, cartLength }) => {
    const cartRef = useRef()
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.items);
    const cartTotal = useSelector(state => state.cart.total);
    

    const handleDecreaseQty = (id) => {
        dispatch(decreaseQty({ id }))
    }

    const handleIncreaseQty = (id) => {
        dispatch(increaseQty({ id }))
    }

    const handleDeleteFromCart = (id) => {
        dispatch(removeItem({ id }))
    }

    const handleClickOnCart = (e) => {
        if (cartRef.current && !cartRef.current.contains(e.target)) {
            handleToglleCart()
        }
    }


    const handleCheckOut = async () => {
        console.log(JSON.stringify(cartItems))
        const stripe = await getStripe();

        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItems)

        })

        if (response.statusCode === 500) return;

        const data = await response.json();

        toast.loading('Redirecting ...')

        stripe.redirectToCheckout({ sessionId: data.id })
    }



    return (
        <div className='cart-wrapper' onClick={handleClickOnCart}>
            <div className='cart-container' ref={cartRef}>
                <button className='cart-heading' onClick={handleToglleCart}>
                    <AiOutlineLeft />
                    <span className='heading'>Your cart</span>
                    <span className='cart-num-items'>{cartLength} items</span>
                </button>
                {
                    cartLength < 1 && (<div className='empty-cart'>
                        <AiOutlineShopping size={150} />
                        <h3>Your Cart is empty</h3>
                        <Link href='/'>
                            <button className='btn' onClick={handleToglleCart}>
                                continue shopping
                            </button>
                        </Link>
                    </div>)
                }
                <div className='product-container'>
                    {
                        cartItems.length > 0 && cartItems.map((item) => (
                            <div className='product' key={item.id}>
                                <Image src={item.image} className='cart-product-image' alt={item.name} width={250} height={250} />
                                <div className='item-desc'>
                                    <div className='flex top'>
                                        <h5>{item.name}</h5>
                                        <h4>${item.price * item.quantity}</h4>
                                    </div>
                                    <div className='flex bottom'>
                                        <div>
                                            <p className='quantity-desc'>
                                                <span className='minus' onClick={() => handleDecreaseQty(item.id)}><AiOutlineMinus /></span>
                                                <span className='num'>{item.quantity}</span>
                                                <span className='plus' onClick={() => handleIncreaseQty(item.id)}><AiOutlinePlus /></span>
                                            </p>
                                        </div>
                                        <button className='remove-item' onClick={() => handleDeleteFromCart(item.id)}>
                                            <TiDeleteOutline />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {
                    cartItems.length > 0 && (
                        <div className='cart-bottom'>
                            <div className='total'>
                                <h3>Subtotal:</h3>
                                <h3>{cartTotal}</h3>
                            </div>
                            <div className="btn-container">
                                <button type="button" className="btn" onClick={handleCheckOut}>
                                    Pay with Stripe
                                </button>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default Cart