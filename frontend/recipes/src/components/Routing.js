import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "../App";
import CreateRecipe from "./Create_recipe/Create_recipe";


function Routing() {
    const router = createBrowserRouter([
        {
        path: "/",
        element: <App />,
        },
        {
        path: "/create-recipe",
        element: <CreateRecipe />
        }
    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default Routing;
