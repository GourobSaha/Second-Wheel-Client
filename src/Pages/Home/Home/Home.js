
import Carousel from '../Carousel/Carousel';
import Categories from '../Categories/Categories';
import Gallery from '../Gallery/Gallery';
import Testimonials from '../Testimonials/Testimonials';


const Home = () => {


    return (
        <div className='container mx-auto'>
            <Carousel></Carousel>
            <Categories></Categories>
            <Gallery></Gallery>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;