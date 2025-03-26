import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import AccountInfo from "../features/account/components/accountInfo"
import MovementList from "../features/movements/components/movementsList"


export const Home: React.FC = () => {
  return (
    <>
        <Header />
            <main className='main'>
            <div className="movementPage">
                <h1 className="TextP">Mi Banco Digital</h1>
                    <AccountInfo></AccountInfo>
                <MovementList></MovementList>
            </div>
            </main>
        <Footer />
    </>
      
  )
}