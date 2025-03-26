import { useMovementsState } from "../hooks/useMovementsState";
import MovementsItem from "./movementsItem";
import Button from "../../../components/Button";

const MovementList = () =>{

    const { movements, showMore, showLess, isExpanded } = useMovementsState(3);
    return(
        <>
            <div className="List">
                <p>Movimientos</p>
                <div>{movements.map((movement, index) =>(
                    <MovementsItem key ={index} {...movement}/> 
                ))}</div>

                <Button onClick={isExpanded ? showLess : showMore}
                text ={isExpanded ? "Mostrar menos" : "Ver todos los movimientos"}
                />
            </div>
        </>
    );
}

export default MovementList;