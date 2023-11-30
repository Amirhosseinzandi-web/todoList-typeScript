"use client"


import { useEffect } from "react"
import Image from "next/image";
import TodoItems from "./TodoItems";
import { useDataStore } from "./Store/Store";


const TodoContainer: React.FC = () => {
    const { DataList, DataListClone, completedTodo, allTodo, unCompleted } = useDataStore(state => state)


    useEffect(() => {
        const listItems = document.querySelectorAll("#minimize-task>li")!

        listItems.forEach((el, ind) => {
            if (ind > 2) {
                (el as HTMLElement).style.display = "none"
            }
        });

        // const visibleItems = document.querySelectorAll("#minimize-task >li[style*='display: none']");

        // listItems.forEach((item , ind)=>{
        //     if(visibleItems.length<3 && ind ===2){
        //         (item as HTMLElement).style.display = "flex"
        //     }
        // })      

        // or

        const visibleItems = [...listItems].filter(el => (el as HTMLElement).style.display !== "none")

        if (visibleItems.length < 3 && listItems.length > visibleItems.length) {
            (listItems[visibleItems.length] as HTMLElement).style.display = "flex"
        }

    }, [DataListClone]);



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
                    <div className="task-details-items flex">
                        <div className="w-[30%]">
                            <i className="bi bi-calendar"></i>
                        </div>
                        <div className="w-[70%]">
                            <p>Today tasks</p>
                            <ul id="minimize-task" className="mt-2">
                                {
                                    DataListClone?.map(el => (
                                        <li key={el.id} className="flex items-center mb-2">
                                            <span className="mr-3" style={{ background: el.backGround }}></span>
                                            <p>{el.text}</p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="filter-tab flex">
                    <div className="w-[30%]"><i className="bi bi-filter-right"></i></div>
                    <div className="w-[70%]">
                        <p>Filterd</p>
                        <ul className="mt-7">
                            <li onClick={() => allTodo()}>All</li>
                            <li onClick={() => completedTodo()}>completed</li>
                            <li onClick={() => unCompleted()}>uncompleted</li>
                        </ul>
                    </div>
                </div>
                <div className="scheduled-tasks mt-10 flex">
                    <div className="w-[30%] flex justify-center items-center"><i className="bi bi-window-stack"></i></div>
                    <div className="w-[70%]"><p>Scheduled tasks</p></div>
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