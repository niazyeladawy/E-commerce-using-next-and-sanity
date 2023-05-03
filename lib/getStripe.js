import {loadStripe} from '@stripe/stripe-js'

let stripePormise ;

const getStripe = ()=>{
    if (!stripePormise){
        stripePormise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    }

    return stripePormise
}

export default getStripe