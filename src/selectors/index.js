import {createSelector} from 'reselect';
import {mapToArray} from '../helpers';


const filtersGetter = (state) => {
    return state.filters;
};

const boardsGetter = (state) => {
    return state.boards.entities;
};

const kudosesGetter = (state) => {
    return state.kudoses.entities;
};

const idGetter = (state, props) => {
    return props.id;
};

export const filtratedBoardsSelector = createSelector(boardsGetter, filtersGetter, (boards, filters) => {
    const {selected, dateRange: {from, to}} = filters;

    return mapToArray(boards).filter((board) => { //к нам приходит объект поэтому фильтруем по массиву наших id (Object.keys) которые принодлежат списку выбранных статей selected
        const published = Date.parse(board.date);

        const selectState = selected.some((selectedBoard) => { //присутствует ли статья в выбранных
            return selectedBoard.value === board.id;
        });

        if (!selected.length || selectState) { //не пусто ли список и константа selectState
            if (from && to) {  //выбраны ли даты
                if (published > from && upblished < to) { //помещается ли дата публикации статьи в выбранном периоде на календаре
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    });
});

export const kudosSelectorFactory = () => createSelector(kudosesGetter, idGetter, (kudoses, id) => {
    return kudoses.get(id);
});