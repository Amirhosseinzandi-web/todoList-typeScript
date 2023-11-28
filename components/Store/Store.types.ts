export type DataListType = {
    id: string
    text: string
    completed: boolean ,
    backGround : string ,
    time : string
}

export type DataListArrayType = {
    DataList : DataListType[],
    DataListClone : DataListType[]
}

export type StoreType = {
    DataList : DataListType[] ,
    DataListClone : DataListType[] ,
    generateItems : (state:DataListType) => void
    toggleCompleted : (id:string) => void 
    removeTodo : (id:string) => void 
    completedTodo : () => void
    allTodo : () => void 
    unCompleted: () => void
}