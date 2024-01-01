export type ProductDTO = {
        accept_trade: boolean, 
        id: string, 
        is_new: boolean, 
        is_active?: boolean,
        name: string, 
        payment_methods: [{key: string, name: "string"}], 
        price: number, 
        product_images?: 
        [{path: string, id: "string"}], 
        user?: {avatar: "string"}
}