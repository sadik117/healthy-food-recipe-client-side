import React from 'react';
import Slider from './layouts/Slider';
import TopRecipes from './layouts/TopRecipes';
import StatsSection from './utilities/StatsSection';
import Blog from './layouts/Blog';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    
    return (
        <div>
         <Helmet>
            <title>Home</title>
         </Helmet>

            <Slider></Slider>
            <TopRecipes></TopRecipes>
            <Blog></Blog>
            <StatsSection></StatsSection>
        </div>
    );
};

export default Home;