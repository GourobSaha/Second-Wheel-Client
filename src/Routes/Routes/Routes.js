import DashboardLayout from "../../Layout/DashboardLayout";
import Blogs from "../../Pages/Blogs/Blogs";
import Cars from "../../Pages/Cars/Cars";
// import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Login from "../../Pages/Login/Login";
import MyOrders from "../../Pages/BuyerOption/MyOrders";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AllBuyers from "../../Pages/AdminOption/AllBuyers";
import AllSellers from "../../Pages/AdminOption/AllSellers";
import AdminRoute from "../AdminRoute/AdminRoute";
import SellerRoute from "../SellerRoute/SellerRoute";
import AddProduct from "../../Pages/SellerOption/AddProduct";
import MyProducts from "../../Pages/SellerOption/MyProducts";
import BuyerRoute from "../BuyerRoute/BuyerRoute";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import Payment from "../../Pages/BuyerOption/Payment/Payment";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../Layout/Main");
const { default: Home } = require("../../Pages/Home/Home/Home");

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
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
                errorElement: <DisplayError></DisplayError>,
                children: [
                    {
                        path: '/dashboard',
                        element: <Dashboard></Dashboard>
                    },
                    {
                        path: '/dashboard/myorder',
                        element: <BuyerRoute><MyOrders></MyOrders></BuyerRoute>
                    },
                    {
                        path: '/dashboard/payment/:id',
                        element: <BuyerRoute><Payment></Payment></BuyerRoute>,
                        loader: ({ params }) =>
                            fetch(`http://localhost:5000/booking/${params.id}`)
                    },
                    {
                        path: '/dashboard/allbuyers',
                        element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
                    },
                    {
                        path: '/dashboard/allseller',
                        element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
                    },
                    {
                        path: '/dashboard/addproduct',
                        element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
                    },
                    {
                        path: '/dashboard/myproducts',
                        element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
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