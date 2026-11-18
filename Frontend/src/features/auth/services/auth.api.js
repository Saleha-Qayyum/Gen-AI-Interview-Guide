import axios from 'axios'

const api = axios.create({
     baseURL: 'http://localhost:3000/api',
     withCredentials:true
})

export async function register({username,email,password}) {
    try{
        const response= await api.post('/auth/register',
             {username,email,password})
            return response.data
        }catch(err){
         console.log(err)
          }
    }
    export async function login({identifier,password}) {
    
        const response= await api.post('/auth/login',
             {identifier,password})
               return response.data
       
    }
 export async function logout() {
    try{
        const response= await api.get('/auth/logout')
               return response.data
        }catch(err){
         console.log(err)
          }
    }
export async function getinfo() {
    const response = await api.get('/auth/get-info')
    return response.data
}