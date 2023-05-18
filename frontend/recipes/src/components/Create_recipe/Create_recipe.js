import React, {useState} from "react";
import POSTRequest from "./POST_request";


function CreateRecipe() {
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState("");
    const [time, setTime] = useState(0);
    const [instructions, setInstructions] = useState([]);
    const [elDelete, setElDelete] = useState(-1);
    const [state, setState] = useState(false);

    let instructionsRef = React.createRef();

    function again() {
        setTitle("");
        setCategories([]);
        setIngredients("");
        setTime(0);
        setInstructions([]);
        setState(false);
        console.log("Now, u can create a new recipe!")
    }

    function titleChange(el) {
        setTitle(el.target.value)
    }

    function categoriesChange(el) {
        let index = categories.indexOf(el.target.value);
        if (index === -1) {
            let newCategories = [...categories, el.target.value];
            setCategories(newCategories);
        }
        else {
            let arr1 = categories.slice(0, index);
            let arr2 = categories.slice(index + 1, categories.length);
            setCategories(arr1.concat(arr2));
        }
        
    }

    function ingredientsChange(el) {
        setIngredients(el.target.value);
    }

    function timeChange(el) {
        setTime(el.target.value);
    }

    function addInstruction() {
        let currentInsstruction = instructionsRef.current.value;
        let newInstructions = [...instructions, currentInsstruction];
        setInstructions(newInstructions);
        instructionsRef.current.value = "";
    }

    function elDeleteChange(el) {
        setElDelete(el.target.value);
    }

    function deleteInstruction() {
        let arr1 = instructions.slice(0, elDelete);
        let arr2 = instructions.slice(Number(elDelete) + 1, instructions.length);
        let newInstructions = arr1.concat(arr2);
        setInstructions(newInstructions);
    }

    function stateChange() {
        setState(!state);
    }

    function test() {
        console.log(instructions);
    }

    return (
        <div>
            <h2>Input data in theese fields</h2>
            <hr />
            <div>
                Title: {}
                <input
                    type="text"
                    name="title"
                    autoComplete="off"
                    value={title}
                    onChange={titleChange}
                />
                {} - {title}
                <br></br>
                <button
                    onClick={test}
                >
                    Test
                </button>
            </div>
            <div>
                Category: {}
                <p>
                    <label>
                        <input
                            type="checkbox"
                            name="breakfast"
                            value="Breakfast"
                            onChange={categoriesChange}
                            defaultChecked={false}
                        />
                        Breakfast
                    </label>
                    <br></br>
                    <label>
                        <input
                            type="checkbox"
                            name="lunch"
                            value="Lunch"
                            onChange={categoriesChange}
                            checked={false}
                            defaultChecked={false}
                        />
                        Lunch
                    </label>
                    <br></br>
                    <label>
                        <input
                            type="checkbox"
                            name="dinner"
                            value="Dinner"
                            onChange={categoriesChange}
                            defaultChecked={false}
                        />
                        Dinner
                    </label>
                </p>
                Selcted categories: {
                    categories.map((category, index) => (
                        <div key={index}>
                            {category}
                        </div>
                ))}
            </div>
            <div>
                Ingredients:
                <br></br>
                <textarea
                    value={ingredients}
                    onChange={ingredientsChange}
                />
                {} - {ingredients}
            </div>
            <div>
                Time:
                <br></br>
                <input
                    name="time"
                    type="number"
                    value={time}
                    onChange={timeChange}
                />
                {} - {time} minutes
            </div>
            <div>
                Instructions:
                <br></br>
                <div>
                    <textarea
                        ref={instructionsRef}
                    />
                </div>
                <div>
                    <button
                        onClick={addInstruction}
                    >
                        Add instruction
                    </button>
                </div>
                <div>
                    <ul>
                        {instructions.map((instruction, index) => (
                            <li
                                key={(index).toString()}
                            >
                                {index}) {instruction}
                            </li>
                        ))}
                    </ul>
                    <div>
                    <button
                        onClick={deleteInstruction}
                    >
                        Delete
                    </button>
                        <input type="number" value={elDelete} onChange={elDeleteChange}></input>
                        element
                    </div>
                </div>
            </div>
            <div>
                <input
                    type="checkbox"
                    defaultChecked={false}
                    onChange={stateChange}
                />
                Даю согласие на обработку персональных данных
            </div>
            <div>
                {state ?
                    (<POSTRequest
                        title={title}
                        categories={categories}
                        ingredients={ingredients}
                        time={time}
                        instructions={instructions}
                        again={again}
                    />) :
                    (<div>Здесь повится кнопка, когда дадите согласие;)</div>)
                }
            </div>
            <div>
                <a href="http://192.168.91.113:3000/">Look all recipes</a>
            </div>
        </div>
    )
}

export default CreateRecipe;
