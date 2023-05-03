import React from 'react'
import { client } from '../lib/client'
import { HeroBanner, FooterBanner, Product } from '../components'

const Home = ({ products, bannerData }) => {

  return (
    <>
      <HeroBanner bannerData={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>Best selling products</h2>
        <p>speakers of many varients</p>
      </div>
      <div className='products-container'>
        {products?.map((product) => <Product key={product._id} productData={product} />)}
      </div>
      <FooterBanner bannerData={bannerData.length && bannerData[0]} />
    </>
  )
}

export const getServerSideProps = async () => {

  const query = '*[_type=="product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type=="banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home