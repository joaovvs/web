import { Card } from "@components/Card";
import { HomeHeader } from "@components/HomeHeader";
import { Search } from "@components/Search";
import { Sell } from "@components/Sell";
import { VStack, Text, View, FlatList } from "native-base";
import { useState } from "react";

export function Home(){
    const [products, setProducts] = useState([{id: 1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9}])
    return(
        <VStack flex={1} mt={6}  p={6} bg={"gray.600"}>
            <HomeHeader/>
            <Sell/>
            <Search/>

                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={(item)=> (
                        <Card/>
                    )}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{gap: 10}}
                    flex={1}
                    mt={7}
                />
        </VStack>
    );
}