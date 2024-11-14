import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';

const Home = () => {
  const [dish, setDish] = useState(null);
  const [category, setCategory] = useState(null);

  const getCountries = async () => {
    const response1 = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian`
    );
    const response2 = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef`
    );
    const data1 = await response1.json();
    setDish(data1.meals);
    let data2 = await response2.json();
    setCategory(data2.meals);
  };

  useEffect(() => {
    getCountries();
  }, []);

  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const settings2 = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <div className=''>
        <h2 className='mt-4 font-bold md:text-2xl text-center '>Popular Dishes</h2>
        <Slider {...settings1}>
          {dish && dish.map((meel) =>
            <div key={meel.idMeal} className='flex justify-center items-center'>
              <Link to={`/meel/${meel.idMeal}`} className='flex flex-col items-center'>
                <img 
                  src={meel.strMealThumb} 
                  alt={meel.strMeal} 
                  className="object-cover h-full w-3/5  rounded-lg border border-black" 
                  style={{ objectPosition: 'center' }} 
                />
              </Link>
            </div>
          )}
        </Slider>
      </div>

      <div className='mt-16'>
        <h2 className='mt-4 font-bold md:text-2xl text-center'>Popular Beef's</h2>
        <Slider {...settings2}>
          {category && category.map((item) =>
            <div key={item.idMeal} className='flex justify-center items-center border-black'>
              <img 
                src={item.strMealThumb} 
                alt={item.strMeal} 
                className='object-cover h-full w-3/5 rounded-lg border border-black ' 
                style={{ objectPosition: 'center' }} 
              />
            </div>
          )}
        </Slider>
      </div>
    </>
  );
};

export default Home;
