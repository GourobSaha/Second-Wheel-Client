import Blogs from "../../Pages/Blogs/Blogs";
import Cars from "../../Pages/Cars/Cars";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../Layout/Main");
const { default: Home } = require("../../Pages/Home/Home/Home");

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/categories/:id',
                element: <Cars></Cars>,
                loader: ({ params }) =>
                    fetch(`http://localhost:5000/categories/${params.id}`)
            },
        ]
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
])

export default router;