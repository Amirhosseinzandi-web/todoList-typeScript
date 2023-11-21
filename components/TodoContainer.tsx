import Image from "next/image";
import TodoItems from "./TodoItems";


const TodoContainer: React.FC = () => {
    return (
        <section className="container-todo flex">

            <div className="circle-yellow"></div>
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
                            <p>left</p>
                        </div>
                        <div className="w-[70%]">
                            <p>Today tasks</p>
                            <ul>
                                <li>1</li>
                                <li>1</li>
                                <li>1</li>
                                <li>1</li>
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