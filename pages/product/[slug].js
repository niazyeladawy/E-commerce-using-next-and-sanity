import React, { useEffect, useState } from 'react'
import { client, urlFor } from '../../lib/client'
import Image from 'next/image'
import { AiFillStar, AiOutlineMacCommand, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai'
import FeaturedProducts from '../../components/FeaturedProducts'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, toggleCartVisiblity } from '../../store/cartSlice'
import { useRouter } from 'next/router'
import { Toaster, toast } from 'react-hot-toast'

const ProductDetails = ({ product: { image, name, details, price, _id , reviews }, products }) => {

    const [imgindex, setImgindex] = useState(0);
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()

    const router = useRouter()


    const handleAddToCart = () => {

        const item = {
            id: _id,
            name: name,
            image: urlFor(image[0]).url(),
            price: price,
            quantity: qty
        };
        dispatch(addItem(item));
        toast.success(`Added ${name} to cart!`);
    }

    const handleIncreaseQty = () => {
        setQty((prev) => prev + 1)
    }

    const handleDecreaseQty = () => {
        setQty((prev) => {
            if (prev === 1) {
                return prev
            }
            else {
                return prev - 1
            }
        })
    }

    const handleBuyNow = ()=>{
        handleAddToCart();
        dispatch(toggleCartVisiblity())
    }

    useEffect(() => {
        setQty(1)
    }, [router.asPath])



    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='product-detail-container'>
                <div>
                    <div className=''>
                        <Image width={500} height={500} src={urlFor(image[imgindex]).url()} alt={name} className='product-detail-image' />
                    </div>
                    <div className='small-images-container'>
                        {
                            image?.map((item, idx) => (
                                <Image width={250} height={250} src={urlFor(image[idx]).url()} className={idx === imgindex ? 'small-image selected-image' : 'small-image'} key={item._key} alt={name} onMouseEnter={() => setImgindex(idx)} />
                            ))
                        }
                    </div>
                </div>
                <div className='product-detail-desc'>
                    <h1>{name}</h1>
                    <div className='reviews'>
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>({reviews.length})</p>

                    </div>
                    <h4>Details:</h4>
                    <p>{details}</p>
                    <p className='price'>${price}</p>
                    <div className='quantity'>
                        <h3>Quantity:</h3>
                        <p className='quantity-desc'>
                            <span className='minus' onClick={handleDecreaseQty}><AiOutlineMinus /></span>
                            <span className='num'>{qty}</span>
                            <span className='plus' onClick={handleIncreaseQty}><AiOutlinePlus /></span>
                        </p>
                    </div>
                    <div className='buttons'>
                        <button className='add-to-cart' onClick={handleAddToCart}>Add to cart</button>
                        <button className='add-to-cart' onClick={handleBuyNow}>But Now</button>
                    </div>
                </div>
            </div>
            <FeaturedProducts products={products} />
        </div>
    )
}

export const getStaticPaths = async () => {
    const query = '*[_type == "product"]{slug}';
    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: { slug: product.slug.current },
    }));

    return { paths, fallback: 'blocking' };
};

export const getStaticProps = async ({ params }) => {
    const { slug } = params;

    const query = `*[_type=="product" && slug.current == $slug][0]{
        ..., 
        "reviews": *[ _type == "review" && references(^._id) ]{
            rating,
            review
        }
      }`;
    const product = await client.fetch(query, { slug });

    



    const productsQuery = `*[_type=="product"]`;
    const products = await client.fetch(productsQuery);

    return {
        props: { product, products },
    };
};



export default ProductDetails

