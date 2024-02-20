import React from "react";
import Router from "./router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {QueryClient, QueryClientProvider} from "react-query";
import { AuthProvider } from "./hooks/AuthContext";

const App: React.VFC = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries:{
                retry:false
            },
            mutations:{
                retry:false
            }
        }
    });

    return(
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <Router />
            </QueryClientProvider>
        </AuthProvider>
    )
}

export default App