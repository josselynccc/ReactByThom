import './movementsStyles.css'

interface MovementsItemProps{
    description: string;
    amount: number;
    date:string;
    currency:string;
    balance:string;
}

const MovementsItem = ({description,currency,amount,date,balance}:MovementsItemProps) =>{
    return(
        <>
            <div  className='Item'>
                <div>
                    <p>{description}</p>
                    <p>{date}</p>
                </div>
                <div>
                    <p className={balance.trim().toLowerCase() === "positivo" ? "positivo" : "negativo"}>{currency}{amount}</p>
                </div>
            </div>
        </>
    )
}

export default MovementsItem;