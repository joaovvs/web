import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDTO } from '@dtos/UserDTO';
import { USER_STORAGE} from '@storage/storageConfig';
import { UserData } from "src/@types/userData";

export async function storageUserSave(user: UserData){
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet(){
    const storage = await AsyncStorage.getItem(USER_STORAGE);

    const user: UserData = storage ? JSON.parse(storage): {};

    return user;
}

export async function storageUserRemove(){
    await AsyncStorage.removeItem(USER_STORAGE);
}