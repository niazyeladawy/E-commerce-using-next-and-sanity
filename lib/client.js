import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId:'27spvh0a',
    dataset:'production',
    apiVersion:'v2022-06-06',
    useCdn:true,
    token:process.env.NEXT_PUBLIC_SANITY_TOKEN
})


const builder = imageUrlBuilder(client)

export const urlFor = (source ) => {
    return builder.image(source)
}