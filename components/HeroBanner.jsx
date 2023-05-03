import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const HeroBanner = ({ bannerData }) => {
  const imgUrl = urlFor(bannerData.image).url()

  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{bannerData.smallText}</p>
        <h3>{bannerData.midText}</h3>
        <h1>{bannerData.largeText1}</h1>
        <Image width='500' height={500} alt={bannerData.smallText} src={imgUrl} className='hero-banner-image' />
        <div>
          <Link href={`/product/${bannerData.product}`}>
            <button type='button'>{bannerData.buttonText}</button>
          </Link>
          <div className='desc'>
            <h5>dsesss</h5>
            <p>{bannerData.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner