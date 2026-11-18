import { useContext , useEffect} from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getinfo } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const hadleLogin = async ({ identifier, password }) => {
    setLoading(true);
    try{
        const data = await login({ identifier, password });
        setUser(data.user);

    }catch(err){
         console.log(err)
    }finally{

        setLoading(false);
    }
  };
  const hadleRegister = async ({ email, username, password }) => {
    setLoading(true);
    try{
        const data = await register({ email, username, password });
        setUser(data.user);

    }catch(err){
        console.log(err)
    }finally{

        setLoading(false);
    }
  };
  const hadleLogout = async () => {
    setLoading(true);
    try{

        const data = await logout();
        setUser(null);
    }catch(err){

    }finally{

        setLoading(false);
    }
  };
   
   useEffect(() => {
     const getnSetUser = async () => {
         const data = await getinfo()
         setUser(data.user)
         setLoading(false)
        }
        getnSetUser()
   }, [])
   
  return { user, loading, hadleLogin, hadleRegister, hadleLogout };
};
