import React from 'react';
import useTitle from '../../Hooks/useTitle';
import blogImg from '../../Images/blogs/2021-09-28_Angular-React-Vue_table_en.png'

const Blogs = () => {
    useTitle('Blogs')
    return (
        <div className='container mx-auto'>
            <h2 className='text-4xl text-slate-600 font-bold text-center my-5'>Blogs</h2>
            <div className='grid md:grid-cols-2 gap-4'>
                <div className="shadow-xl p-5 rounded-xl my-5">
                    <h3 className='text-xl font-semibold text-slate-700 mb-2'>What are the different ways to manage a state in a React application?</h3>
                    <p>Managing state in your React apps isn't as simple as using useState or useReducer. Not only are there are a lot of different kinds of state, but there often dozens of ways of managing each kind. The Four Kinds of React State to Manage.When we talk about state in our applications, it's important to be clear about what types of state actually matter.</p>
                    <ul>
                        <li><span className='font-bold'>Local (UI) state</span> - Local state is data we manage in one or another component.</li>
                        <li><span className='font-bold'>Global (UI) state </span> - Global state is data we manage across multiple components.</li>
                        <li><span className='font-bold'>Server state</span> - Data that comes from an external server that must be integrated with our UI state.</li>
                        <li><span className='font-bold'>URL state</span> - Data that exists on our URLs, including the pathname and query parameters.</li>
                    </ul>
                </div>
                <div className="shadow-xl p-5 rounded-xl my-5">
                    <h3 className='text-xl font-semibold text-slate-700 mb-2'>How does prototypical inheritance work?</h3>
                    <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype.</p>
                </div>
                <div className="shadow-xl p-5 rounded-xl my-5">
                    <h3 className='text-xl font-semibold text-slate-700'>What is a unit test? Why should we write unit tests?</h3>
                    <p>A unit test is a way of testing a unit - the smallest piece of code that can be logically isolated in a system. In most programming languages, that is a function, a subroutine, a method or property. The isolated part of the definition is important. They enable you to catch bugs early in the development process. Automated unit tests help a great deal with regression testing. They detect code smells in your codebase. For example, if you're having a hard time writing unit tests for a piece of code, it might be a sign that your function is too complex.</p>
                </div>
                <div className="shadow-xl p-5 rounded-xl my-5">
                    <h3 className='text-xl font-semibold text-slate-700 mb-2'>React vs. Angular vs. Vue?</h3>
                    <img src={blogImg} alt="blog" className='w-full md:w-2/3 mx-auto' />
                </div>
            </div>
        </div>
    );
};

export default Blogs;