"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

function BlogComponent() {
  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
  const [activeButton, setActiveButton] = useState(null);
  const [data, setData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleButtonClick = (index) => {
    setActiveButton(index);
    setCurrentCategory(categories[index]);
  };

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${currentCategory}&apiKey=d84d60794beb40f0b45129ff86ae475b`
      )
      .then(({ data }) => {
        setData(data.articles);
      });
  }, [currentCategory]);
  return (
    <div className="w-full flex flex-row justify-between items-start">
      <div className=" w-[70%] mx-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 xl:flex flex-col justify-between items-center mt-2 ">
        {data.map((oneArticle, index) => {
          return (
            <>
              <Link
                className=" xl:h-52 flex xl:flex-row justify-between items-center my-8  flex-col w-full h-full"
                href={`/pages/?category=${currentCategory}&id=${index}`}
                key={index}
              >
                <div className="xl:w-[30%] w-full h-52">
                  <img className="w-full h-full" src={oneArticle.urlToImage} />
                </div>
                <div className=" xl:w-[65%] w-full h-full flex flex-col justify-between items-start">
                  <p className=" uppercase font-sans text-gray-500">
                    {oneArticle.source.name}
                  </p>
                  <p className="font-sans font-bold text-3xl">
                    {oneArticle.title}
                  </p>
                  <p className="sans text-gray-400">
                    {oneArticle.author}. {oneArticle.publishedAt}
                  </p>
                  <p className="font-sans font-semibold line-clamp-2">
                    {oneArticle.content}
                  </p>
                </div>
              </Link>
            </>
          );
        })}
      </div>
      <div className=" h-screen  fixed right-[5%]  w-[10%] my-10">
        <div className="text-lg font-sans font-bold h-[10%]">Categories</div>
        <div className="h-[60%] flex flex-col justify-between items-start">
          {categories.map((category, index) => {
            return (
              <p
                onClick={() => handleButtonClick(index)}
                className={` hover:text-blue-500 ${
                  activeButton === index ? "text-blue-500" : "black"
                } cursor-pointer`}
                key={index}
              >
                {category}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BlogComponent;
