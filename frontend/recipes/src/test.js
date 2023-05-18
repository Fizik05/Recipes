import axios from "axios";
import React from "react";

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
                        <h2>{id} recipe:</h2>
                        <h3>{output.title}</h3>
                        <h3>{output.ingredients}</h3>
                    </div>
                ))}
            </div>
        );
    }
}

export default App;
