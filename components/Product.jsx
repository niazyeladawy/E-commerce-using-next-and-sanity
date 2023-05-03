import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../lib/client'

const Product = ({productData :{image , name , slug , price}}) => {

    const imgUrl = urlFor(image[0]).url()
    
    return (
        <div>
            <Link href={`/product/${slug.current}`}>
                <div className='product-card'>
                    <Image  className='product-image' src={imgUrl} width={250} height={250} alt={name} />
                    <p className='product-name'>{name}</p>
                    <p className='product-price'>${price}</p>
                </div>
            </Link>
        </div>
    )
}

export default Product