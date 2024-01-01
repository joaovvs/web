import { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Card } from "@components/Card";
import { HomeHeader } from "@components/HomeHeader";
import { Search } from "@components/Search";
import { Sell } from "@components/Sell";
import { VStack, FlatList } from "native-base";

import { api } from "@services/api";
import { ProductDTO } from "@dtos/ProductDTO";
import { Loading } from "@components/Loading";



export function Home(){
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<ProductDTO []>([]);
    
    async function fetchProducts(){
        try {
            setIsLoading(true);

            const response = await api.get('/products');


            setProducts(response.data);

            console.log(response)
        } catch (error) {
            
        }finally{
            setIsLoading(false);
        }
    }

    useFocusEffect(useCallback(()=> {
        fetchProducts();
    },[]));
    
    return(
        <VStack flex={1} mt={6}  p={6} bg={"gray.600"}>
            <HomeHeader/>
            <Sell/>
            <Search/>
            {isLoading ? <Loading/> : 
            <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({item})=> (products &&
                <Card key={item.id} product={item} />
            )}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{gap: 10}}
            flex={1}
            mt={7}
        />
            }
                
        </VStack>
    );
}