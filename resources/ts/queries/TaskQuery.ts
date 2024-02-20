import {useQuery, useMutation, useQueryClient} from "react-query";
import * as api from "../api/TaskAPI";
import { toast } from "react-toastify";

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
        onSuccess: () => {queryClient.invalidateQueries('tasks'); toast.error('登録成功');},
        onError: () => {toast.error('登録失敗');}

    });
}


export {
    useTasks,useUpdateDoneTask,useCreateTask
}