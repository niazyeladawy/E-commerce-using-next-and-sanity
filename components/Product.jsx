import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../lib/client'
import { useDispatch } from 'react-redux'
import { addItem } from '../store/cartSlice'
import { toast } from 'react-hot-toast'

const Product = ({ productData: { image, name, slug, price, _id } }) => {

    const dispatch = useDispatch()
    const imgUrl = urlFor(image[0]).url();
    
    const handleAddToCart = () => {
        const item = {
            id: _id,
            name: name,
            image: imgUrl,
            price: price,
            quantity: 1
        };
        console.log("first", item)
        dispatch(addItem(item));
        toast.success(`Added ${name} to cart!`);
    }

    return (
        <div>
            <Link href={`/product/${slug.current}`}>
                <div className='product-card'>
                    <Image className='product-image' src={imgUrl} width={250} height={250} alt={name} />
                    <p className='product-name'>{name}</p>
                    <p className='product-price'>${price}</p>
                </div>

            </Link>
            <button onClick={handleAddToCart} className='btn'>Add to cart</button>
        </div>
    )
}

export default Product