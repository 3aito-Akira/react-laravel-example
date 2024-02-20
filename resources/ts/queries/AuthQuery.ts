import {useQuery, useMutation, useQueryClient} from "react-query";
import * as api from "../api/AuthAPI";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/AuthContext";

const useUser = () => {
    return useQuery('user', () => api.getUser());
}

const useLogin = () => {
    const { setIsAuth } = useAuth();

    const queryClient = useQueryClient();

    return useMutation(api.login,{
        onSuccess: (user) => {
            console.log(user)
            if(user){
                setIsAuth(true);
            }
        },
        onError: () => {toast.error('login失敗');console.log('login error');}

    });
}

const useLogout = () => {
    const queryClient = useQueryClient();

    const { setIsAuth } = useAuth();

    return useMutation(api.logout,{
        onSuccess: (user) => {
            console.log(user)
            if(user){
                setIsAuth(false);
            }
        },
        onError: () => {toast.error('logout失敗');}

    });
}

export {
    useUser,useLogin,useLogout
}