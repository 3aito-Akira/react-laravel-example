import React from "react";
import { useTasks } from "../../../queries/TaskQuery";
import TaskInput from "./TaskInput";

const TaskList: React.VFC = () => {

    const {data:tasks,status} = useTasks();

    if(status === 'loading'){
        return <div className="loader" />
    }
    else if(status === 'error'){
        return <div className="align-center" >データが取得されませんでした</div>
    }
    else if(!tasks || tasks.length <= 0){
        return <div className="align-center" >登録されたTodoはありません</div>
    }

    return(
        <>
            <div className="inner">
                <ul className="task-list">
                    { tasks.map(task => (
                        <li key={task.id}>
                            <label className="checkbox-label">
                                <input type="checkbox" className="checkbox-input"/>
                            </label>
                            <div><span>{task.title}</span></div>
                            <button className="btn is-delete">削除</button>
                        </li>
                    ))}
                    <li>
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox-input"/>
                        </label>
                        <div><span>新しいTODO</span></div>
                        <button className="btn is-delete">削除</button>
                    </li>
                    <li>
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox-input"/>
                        </label>
                        <form><input type="text" className="input" defaultValue="編集中のTODO"/></form>
                        <button className="btn">更新</button>
                    </li>
                    <li className="done">
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox-input"/>
                        </label>
                        <div><span>実行したTODO</span></div>
                        <button className="btn is-delete">削除</button>
                    </li>
                    <li>
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox-input"/>
                        </label>
                        <div><span>ゴミ捨て</span></div>
                        <button className="btn is-delete">削除</button>
                    </li>
                    <li>
                        <label className="checkbox-label">
                            <input type="checkbox" className="checkbox-input"/>
                        </label>
                        <div><span>掃除</span></div>
                        <button className="btn is-delete">削除</button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default TaskList