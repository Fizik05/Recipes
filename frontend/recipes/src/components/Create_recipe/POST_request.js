import axios from "axios";
import React from "react";


function POSTRequest(props) {
    let newCategories = [];
    let newInstructions = [];

    for (let ind = 0; ind < props.categories.length; ++ind) {
        newCategories.push(
            {
                "name": props.categories[ind],
                "slug": props.categories[ind].toLowerCase()
            }
        )
    }

    for (let ind = 0; ind < props.instructions.length; ++ind) {
        newInstructions.push(
            {
                "number_of_step": ind + 1,
                "text": props.instructions[ind]
            }
        )
    }

    const body = {
        "title": props.title,
        "category": newCategories,
        "ingredients": props.ingredients,
        "time": props.time,
        "instructions": newInstructions
    };

    function sendRequest() {
        axios.post(
            "http://127.0.0.1:8000/api/v2/recipes/",
            body
        ).then(
            response => {
                if (response.status === 201) alert("Recipe have been create!");
                props.again()
            }
        ).catch(
            error => alert(error)
        )
        console.log("HoH")
    }

    return (
        <div>
            <button
                defaultChecked={false}
                onClick={sendRequest}
            >
                Send recipe
            </button>
        </div>
    );
}

export default POSTRequest;
