import { API_URL } from "./config";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const login = async (data:{email:string, userId:string})=>{
   
    const res = await fetch(`${API_URL}/auth/login`,{
        method:'POST',
        headers:{
            'Content-type': 'Application/json'
        },
        body: JSON.stringify(data),
        
    });
    
    if (res.status !== 200){
        throw new Error("Error during login process");
    }
}

export const authenticate = async (data:{
    email:string,
    emailToken:string,
    userId:string
    }) => {
        console.log(data.userId)
    const res = await fetch(`${API_URL}/auth/authenticate`,{
        method:'POST',
        headers:{
            'Content-type': 'Application/json',
        },
        body: JSON.stringify(data),

    });
    if (res.status !== 200){
        throw new Error("Error during login process");
    }
    return res.json();

}