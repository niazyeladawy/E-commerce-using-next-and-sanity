export default {
    name:'review',
    title:'Review',
    type:'document',
    fields:[
        {
            name:'rating',
            title:'Rating',
            type:'number',
            validation: Rule => Rule.required().min(1).max(5),
        },
        {
            name:'review',
            title:'Review',
            type:'text',
            validation: Rule => Rule.required().min(10).max(500),
        },
        {
            name:'product',
            title:'Product',
            type:'reference',
            to: [{type: 'product'}]
        }
    ]
}
