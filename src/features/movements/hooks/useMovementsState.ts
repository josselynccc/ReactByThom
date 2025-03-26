import { useState } from "react";
import { movementsData } from "../data/movementsData";

export const useMovementsState = (initialCount: number) => {
    const [movements] = useState(movementsData);
    const [visibleCount, setVisibleCount] = useState(initialCount);

    const showMore = () => setVisibleCount(movements.length);
    const showLess = () => setVisibleCount(initialCount);

    return { movements: movements.slice(0, visibleCount), showMore, showLess, isExpanded: visibleCount === movements.length };
};