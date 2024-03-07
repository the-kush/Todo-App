import { useState } from "react";

export function CreateTodo() {
    // react-query
    const {title, setTitle} = useState([]);
    const {desc, setDesc} = useState([]);
    return <div>
        <input style={{
            margin: 10,
            padding: 10
        }} id="title" type="text" placeholder="title" onChange={function(e){
            const value = e.target.value;
            setTitle(value);
        }}></input> <br></br>

        <input style={{
            margin: 15,
            padding: 20
        }} id="desc" type="text" placeholder="description" onChange={function(e){
            const value = e.target.value;
            setDesc(value);
        }}></input><br></br>

        <button onClick={() => {
            fetch("https://localhost:3000/todos", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    description: desc
                }), 
                headers: {
                    "content-type": "application/json"
                }
            })
            .then(async function(res) {
                await res.json();
                alert("Todo added")
            })
        }}>Add todo</button>
    </div>
}