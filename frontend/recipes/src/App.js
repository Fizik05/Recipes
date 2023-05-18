import axios from "axios";
import React from "react";
import CreateRecipe from "./components/Create_recipe/Create_recipe";

class App extends React.Component{
    state = { details: [], };

    componentDidMount() {
        let data;
        const URL = "http://127.0.0.1:8000/api/v2/recipes/";

        axios.get(URL)
        .then(res => {
            data = res.data;
            this.setState({
                details: data
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="App">
                <h1>
                    Let's start!
                </h1>
                {this.state.details.map((output, id) => (
                    <div key={id}>
                          {id + 1} recipe:<br></br>
                          {output.title}<br></br>
                          {output.ingredients}<br></br><br></br>
                    </div>
                ))}
                <a href="http://127.0.0.1:8000/api/v2/recipes/">Go to our API-site</a>
                <br></br>
                <div>
                    <button
                        onClick={() => (<div><CreateRecipe /></div>)}
                    >
                        Go to page for create recipe
                    </button>
                </div>
                <a href="http://192.168.91.113:3000/create-recipe/">Go to page for create recipe</a>
            </div>
        );
    }
}

export default App;
