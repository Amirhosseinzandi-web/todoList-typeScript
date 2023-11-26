"use client"


import { useState, useEffect } from "react"
import Image from "next/image";
import TodoItems from "./TodoItems";
import { useDataStore } from "./Store/Store";


const TodoContainer: React.FC = () => {
    const { DataList } = useDataStore(state => state)


    useEffect(() => {
        for (let i = 3; i < DataList.length; i++) {
            (document.querySelector(`#minimize-task>li:nth-of-type(${i+1})`) as HTMLElement).style.display = "none"
        }
    }, [DataList])


    return (
        <section className="container-todo flex">
            <div className="circle-pink"></div>
            <div className="left-side">
                <div className="info-container">
                    <div className="info flex">
                        <div>
                            <figure>
                                <Image priority={true} src={"/1.jpg"} width={48} height={48} alt="amirzandi" />
                            </figure>
                        </div>

                        <div className="flex flex-col ml-2">
                            <p>Do-it</p>
                            <p>Amir zandi</p>
                        </div>
                    </div>
                </div>
                <div className="task-details">
                    <div className="task-details-top flex">
                        <div className="w-[30%]">
                            <i className="bi bi-calendar"></i>
                        </div>
                        <div className="w-[70%]">
                            <p>Today tasks</p>
                            <ul id="minimize-task" className="mt-2">
                                {
                                    DataList?.map(el => (
                                        <li key={el.id} className="flex items-center mb-2">
                                            <span className="mr-3" style={{background:el.backGround}}></span>
                                            <p>{el.text}</p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="right-side">
                <div className="circle-blue"></div>
                <div className="circle-yellow"></div>
                <TodoItems />
            </div>
        </section>
    );
}

export default TodoContainer;