import { AcceptedPaymentsType } from "src/@types/payments"
import { UserDTO } from "./UserDTO";

export type ProductDTO = {
        accept_trade: boolean, 
        id: string, 
        is_new: boolean, 
        is_active?: boolean,
        name: string, 
        description?: string;
        payment_methods: [{key: AcceptedPaymentsType, name: string }], 
        price: number, 
        product_images?: 
        [{path: string, id: "string"}], 
        user?: UserDTO
}