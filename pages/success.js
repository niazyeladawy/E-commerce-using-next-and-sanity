import React from 'react'
import { BsBagCheckFill } from 'react-icons/bs'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearCart } from '../store/cartSlice'
import { runFireworks } from '../lib/utils'

const Success = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.clear();
        dispatch(clearCart());
        runFireworks();
    }, []);

    return (
        <div className='success-wrapper'>
            <div className='success'>
                <p className='icon'>
                    <BsBagCheckFill />
                </p>
                <h2>Thank You for your order!</h2>
                <p className='email-msg'>Check your email for the receipt.</p>
                <p className='description'>
                    If you have any question, please email
                    <a className='email' href="mailto:niazyadawy2@gmail.com">
                        niazyadawy2@gmail.com
                    </a>
                </p>
                <Link href='/'>
                    <button className='btn' >continue shopping</button>
                </Link>
            </div>
        </div>
    )
}

export default Success