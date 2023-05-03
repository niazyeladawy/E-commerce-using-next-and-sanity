import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../lib/client'

const FooterBanner = ({ bannerData: { discount, largeText1, largeText2, saleTime ,smallText , midText , buttonText , desc , product ,image} }) => {

  const imgUrl = urlFor(image).url()

  
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>{discount}</p>
          <h3 >{largeText1}</h3>
          <h3 >{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className='right'>
          <p>{smallText}</p>
          <p>{midText}</p>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button>{buttonText}</button>
          </Link>

        </div>
        <Image className='footer-banner-image' src={imgUrl} width={500} height={500} alt={product} />
      </div>
    </div>
  )
}

export default FooterBanner