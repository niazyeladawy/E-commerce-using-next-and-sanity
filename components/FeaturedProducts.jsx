import React from 'react'
import Product from './Product'

const FeaturedProducts = ({products}) => {
    return (
        <div className='maylike-products-wrapper'>
            <h2>You may also like</h2>
            <div className='marquee'>
                <div className='maylike-products-container track'>
                    {
                        products?.map((product) => <Product productData={product} key={product._id}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default FeaturedProducts