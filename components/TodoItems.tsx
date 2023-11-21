"use client"
import { useState, useEffect } from "react"
import { DataType } from "./TodoItems.types"


const TodoItems: React.FC = () => {
    const [inputVal, setInputVal] = useState("" as string)
    const [generateItems, setGenerateItems] = useState([] as DataType[])
    const [flag, setFlag] = useState(0 as number)
    const [bgColor, setBgColor] = useState("" as string)

    const GenerateDataHandler = () => {
        setFlag(flag + 1)
        
        const data: DataType = {
            id: crypto.randomUUID(),
            text: inputVal,
            completed: false ,
            backGround : bgColor
        }
        setGenerateItems((prev:DataType[])=>[...prev , data])
    }

    useEffect(() => {
        switch (flag) {
            case 0: setBgColor("#FD99AF"); break;
            case 1: setBgColor("#3FD4F4"); break;
            case 2: setBgColor("#FAC608"); break;
        }

        if (flag > 2) {
            setFlag(0)
        }

    }, [flag])

    return (
        <section className="todo-items-container">

            <div className="todo-items-container-top">
                <p>Today main focus</p>
                <p>Design team meeting</p>
            </div>

            <div className="todo-items-container-bottom">
                <div className="my-16">

                    <input value={inputVal} onChange={(e) => setInputVal(e.target.value)} type="text" placeholder="What is your next task?" />

                    <div className="bullet-items flex justify-center items-center">
                        <span className="pink-bullet"></span>
                        <span className="blue-bullet mx-2"></span>
                        <span className="yellow-bullet"></span>
                    </div>

                    <div className="click-items flex items-center">
                        <i className="bi bi-clock inline-flex mr-3"></i>
                        <i onClick={GenerateDataHandler} className="bi bi-calendar inline-flex"></i>
                    </div>

                </div>

                <div className="generated-items-container">
                    <ul id="list">
                        {
                            generateItems.map((el:DataType)=>(
                                <li>hi</li>
                            ))
                        }
                    </ul>
                </div>

            </div>

        </section>
    );
}

export default TodoItems;