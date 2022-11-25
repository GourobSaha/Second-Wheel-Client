import DashboardLayout from "../../Layout/DashboardLayout";
import Blogs from "../../Pages/Blogs/Blogs";
import Cars from "../../Pages/Cars/Cars";
// import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Login from "../../Pages/Login/Login";
import MyOrders from "../../Pages/SellerOption/MyOrders";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

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
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/categories/:id',
                element: <PrivateRoute><Cars></Cars></PrivateRoute>,
                loader: ({ params }) =>
                    fetch(`http://localhost:5000/categories/${params.id}`)
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
                children: [
                    {
                        path: '/dashboard',
                        element: <MyOrders></MyOrders>
                    }
                ]
            },
        ]
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
])

export default router;