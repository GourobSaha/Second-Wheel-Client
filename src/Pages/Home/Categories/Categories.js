import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Category from './Category';

const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/categories')
            .then(data => {
                const categoriesData = data.data;
                // console.log(categoriesData);
                setCategories(categoriesData);
            })
    }, [])

    return (
        <div className='my-5'>
            <h1 className='text-4xl text-slate-600 font-bold text-center my-5'>Categories</h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    categories.map(category => <Category
                        key={category._id}
                        category={category}
                    ></Category>)
                }
            </div>
        </div>
    );
};

export default Categories;