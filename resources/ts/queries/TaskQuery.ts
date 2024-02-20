import {useQuery, useMutation, useQueryClient} from "react-query";
import * as api from "../api/TaskAPI";
import { toast } from "react-toastify";
import {AxiosError} from "axios";

const useTasks = () => {
    return useQuery('tasks', () => api.getTasks());
}

const useUpdateDoneTask = () => {
    const queryClient = useQueryClient();

    return useMutation(api.updateDoneTask,{
        onSuccess: () => {queryClient.invalidateQueries('tasks');},
        onError: () => {toast.error('更新失敗');}

    });
}

const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation(api.createTask,{
        onSuccess: () => {
            queryClient.invalidateQueries('tasks'); 
            toast.error('登録成功');
        },
        onError: (error: AxiosError) => {
            console.log(error.response?.data); 
            if(error.response?.data.errors){
                Object.values(error.response?.data.errors).map(
                    (messages:any) => {
                        messages.map((message:string)=>{console.log(message)})
                    } 
                );

            }
            toast.error('登録失敗');
        }

    });
}

const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation(api.updateTask,{
        onSuccess: () => {
            queryClient.invalidateQueries('tasks'); 
            toast.error('更新成功');
        },
        onError: (error: AxiosError) => {
            console.log(error.response?.data); 
            if(error.response?.data.errors){
                Object.values(error.response?.data.errors).map(
                    (messages:any) => {
                        messages.map((message:string)=>{console.log(message)})
                    } 
                );

            }
            toast.error('更新失敗');
        }

    });
}

const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation(api.deleteTask,{
        onSuccess: () => {
            queryClient.invalidateQueries('tasks'); 
            toast.error('削除成功');
        },
        onError: () => {
            toast.error('更新失敗');
        }

    });
}



export {
    useTasks,useUpdateDoneTask,useCreateTask,useUpdateTask,useDeleteTask
}