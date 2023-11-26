import { create } from "zustand";
import { DataListArrayType, DataListType, StoreType } from "./Store.types";


const initialState: DataListArrayType = {
    DataList: [],
    DataListClone: []
}


export const useDataStore = create<StoreType>((set) => ({
    ...initialState,
    generateItems: (newRecord) => set((state) => ({
        ...state,
        DataList: [...state.DataList, newRecord]
    })),
    toggleCompleted: (id) => {
        set((state) => {
            const findInd = state.DataList.find(item => item.id === id)
            if (findInd) {
                findInd.completed = !findInd.completed
            }

            return { ...state }
        })
    },
    removeTodo: (id) => {
        set((state) => {
            const filteredDataList = state.DataList.filter(item => item.id !== id);
            const filteredDataListClone = state.DataListClone.filter(item => item.id !== id)
            return {
                ...state, 
                DataList: filteredDataList ,
                DataListClone : filteredDataListClone
            }
        })
    }
}))