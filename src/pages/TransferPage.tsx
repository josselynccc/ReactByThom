import { Header } from "../components/Header"
import AccountInfo from "../features/account/components/accountInfo"
import TransferForm from "../features/transfer/components/TransferForm"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../features/transfer/components/TransferForm.css'
import { store } from "../features/transfer/store/store";
import { Provider } from "react-redux";

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            retry:2,
            staleTime: 1000 * 60 * 5, // 5 minutos de caché
        }
    }
});

const TransferPage =()=>{
    
    return(
        <>
        <Header></Header>
        <div className="TransferPage">
            <div className="subTitle">
                <h2>Transferencia Bancaria</h2>
            </div>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <AccountInfo />
                    <TransferForm></TransferForm>
                </QueryClientProvider>
            </Provider>
            
            
        </div>
        </>

    )
}
export default TransferPage