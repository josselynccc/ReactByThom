import { accountData } from "../data/accountData"
import { useBalanceStore } from "../storeBalance/useBalanceStore";
import './accountInfo.css'
const AccountInfo = () =>{

    const {balance} = useBalanceStore()

    if (typeof balance !== 'number') {
        return <div className="error">Error al cargar el balance</div>;
      }

    const formattedBalance = balance.toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2
      });
    return (
        <>
            <div className="container">
                <p className="title">Resumen de Cuenta</p>
                <div className="containerInfo">
                    <p>{accountData.accountType}</p>
                    <p>{formattedBalance}</p>
                    <p>{accountData.accountNumber}</p>
                    <p>{accountData.lastUpdated}</p>
                </div>
            </div>
        </>
    );
}

export default AccountInfo;