"use client"
import { useState, useEffect, useRef , memo} from "react"
import { useDataStore } from "./Store/Store"
import { DataListType } from "./Store/Store.types"


const TodoItems: React.FC = () => {
    const { generateItems, DataList, toggleCompleted , removeTodo} = useDataStore(state => state)
    const [inputVal, setInputVal] = useState("" as string)
    const [colorIndex, setColorIndex] = useState(0 as number)
    const [bgColor, setBgColor] = useState("" as string)
    const [update, setUpdate] = useState(false)


    const inp = useRef<HTMLInputElement>(null);

    const GenerateDataHandler = () => {
        setColorIndex(colorIndex + 1)
        const date = new Date();
        

        const data: DataListType = {
            id: crypto.randomUUID(),
            text: inputVal,
            completed: false,
            backGround: bgColor,
            time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        }

        if (inputVal === "" || inputVal === null) {
            alert("please fill it")
        } else {
            generateItems(data)
        }

        setInputVal("")
        inp?.current?.focus()

    }

    useEffect(() => {
        switch (colorIndex) {
            case 0: setBgColor("#FD99AF"); break;
            case 1: setBgColor("#3FD4F4"); break;
            case 2: setBgColor("#FAC608"); break;
        }

        if (colorIndex > 2) {
            setColorIndex(0)
        }

    }, [colorIndex])


    const CheckTickHandler = (e: React.MouseEvent, id: string) => {

        const parentElement = (e.target as HTMLElement).parentElement!

        // const findInd = DataList.find(item => item.id === id)
        // if (findInd) {
        //     findInd.completed = !findInd.completed
        //     setUpdate(!update)
        // }
        toggleCompleted(id)

        if (parentElement.querySelector(".sample-check-tick")?.classList.contains("hide-check-tick")) {
            parentElement.querySelector(".sample-check-tick")?.classList.remove("hide-check-tick");
            parentElement.querySelector(".icon-tick")?.classList.add("hide-check-tick")
        } else {
            parentElement.querySelector(".sample-check-tick")?.classList.add("hide-check-tick");
            parentElement.querySelector(".icon-tick")?.classList.remove("hide-check-tick")
        }
    }


    return (
        <section className="todo-items-container">

            <div className="todo-items-container-top">
                <p>Today main focus</p>
                <p>Design team meeting</p>
            </div>

            <div className="todo-items-container-bottom">
                <div className="my-16">

                    <input value={inputVal} maxLength={25} onChange={(e) => setInputVal(e.target.value)} autoFocus ref={inp} type="text" placeholder="What is your next task?" />

                    <div className="bullet-items flex items-center">
                        <span className="pink-bullet ml-3"></span>
                        <span className="blue-bullet mx-2"></span>
                        <span className="yellow-bullet"></span>
                    </div>

                    <div className="click-items flex items-center">
                        <i className="bi bi-clock inline-flex mr-3"></i>
                        <i onClick={GenerateDataHandler} className="bi bi-calendar inline-flex"></i>
                    </div>

                </div>

                <div className="generated-items-container">
                    <div className="flex justify-center p-3 h-full">
                        <ul className="w-full" id="list">
                            {
                                DataList?.map((el: DataListType) => (
                                    <li key={el.id} className="flex items-center">
                                        <span className="ml-3" style={{ background: el.backGround }}></span>
                                        <p>{el.text}</p>
                                        <p className="generated-items-time">{el.time}</p>
                                        <div onClick={(e) => CheckTickHandler(e, el.id)} className="sample-check-tick"></div>
                                        <i onClick={(e) => CheckTickHandler(e, el.id)} className="bi bi-check-circle icon-tick hide-check-tick"></i>
                                        <i onClick={()=>removeTodo(el.id)} className="remove-todo">*</i>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

            </div>

        </section>
    );
}

export default memo(TodoItems);