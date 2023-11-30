"use client"
import { useState, useEffect, useRef, memo } from "react"
import { useDataStore } from "./Store/Store"
import { DataListType } from "./Store/Store.types"
import swal from "sweetalert"


const TodoItems: React.FC = () => {
    const { generateItems, DataList, DataListClone, toggleCompleted, removeTodo } = useDataStore(state => state)
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

    const removeHandler = (id: string) => {
        swal({
            title: "Are you sure you want to delete?",
            icon: "warning",
            buttons: ["No", "Yes"]
        }).then(res => {
            console.log(res);

            if (res) {
                removeTodo(id);
                swal({
                    title: "Removed successfully",
                    icon: "success"
                })
            }
        })

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
                                        <p className={el.completed ? ("completed") : ("")}>{el.text}</p>
                                        <p className="generated-items-time">{el.time}</p>
                                        <div onClick={(e) => toggleCompleted(el.id)} className={`${el.completed ? "hide-sample-check-tick" : "sample-check-tick"}`}></div>
                                        <i onClick={(e) => toggleCompleted(el.id)} className={`icon-tick ${el.completed ? "bi bi-check-circle" : ""}`}></i>
                                        <i onClick={(e) => removeHandler(el.id)} className="bi bi-x-lg remove-todo"></i>
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