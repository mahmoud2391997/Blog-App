"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { useState, useEffect } from "react";
import axios from "axios";

function SingleBlog() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogContent />
    </Suspense>
  );
}

function BlogContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const category = searchParams.get("category");
  const [data, setData] = useState({});
  const [isTruncated, setIsTruncated] = useState(true);

  console.log(id);
  console.log(category);

  useEffect(() => {
    if (category) {
      axios
        .get(
          `https://newsapi.org/v2/everything?q=${category}&apiKey=d84d60794beb40f0b45129ff86ae475b`
        )
        .then((response) => {
          setData(response.data.articles[id]);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }, [category, id]);

  return (
    <div className="flex justify-center items-center mb-36">
      <div className="w-[80%] bg-gray-50 flex flex-col items-center">
        <div className="w-full h-[400px]">
          <img
            className="h-full w-full"
            src={data.urlToImage}
            alt="Blog Image"
          />
        </div>

        <div className="flex justify-center flex-col items-center mt-7 font-bold font-sans">
          <p className="text-4xl w-[60%] text-center">{data.title}</p>
          <p className="font-sans font-light mt-7 text-lg">
            {data.author} • {data.publishedAt}
          </p>
          <p className="font-sans font-semibold text-lg mt-7 text-center">
            {data.description}
          </p>
          <p className="text-blue-500 cursor-pointer underline mt-7">
            {data.url}
          </p>
          <p
            className={`font-sans font-medium mt-7 w-[60%] text-center ${
              isTruncated && "line-clamp-3"
            }`}
          >
            Commodo labore ut nisi laborum amet eu qui magna ullamco ut labore.
            Aliquip consectetur labore consectetur dolor exercitation est minim
            quis. Magna non irure qui ex est laborum nulla excepteur qui. Anim
            Lorem dolore cupidatat pariatur ex tempor. Duis ea excepteur
            proident ex commodo irure est. Nisi commodo qui pariatur enim sint
            laborum consequat enim in officia. Officia fugiat incididunt commodo
            et mollit aliqua non aute. Enim dolor eiusmod aliqua amet ipsum in
            enim eiusmod. Quis exercitation sit velit duis. Est Lorem labore
            consectetur minim sit eu eiusmod mollit velit. Consectetur voluptate
            ex amet id eiusmod laborum irure. Aliquip ad qui id exercitation
            irure amet commodo nisi quis. Occaecat minim incididunt eiusmod
            nostrud veniam quis culpa. Nisi ipsum et consequat id deserunt
            excepteur. Cillum non pariatur culpa ut occaecat laboris eu. Ullamco
            ad Lorem et elit laboris eu qui irure nulla qui culpa et. Cupidatat
            sunt ipsum proident aute exercitation do tempor aliqua cupidatat
            quis non exercitation. Adipisicing do minim dolore nulla mollit.
            Adipisicing incididunt irure ipsum et in esse ipsum elit tempor.
            Aliquip mollit sunt qui irure. Irure ullamco Lorem excepteur dolor
            qui ea ad quis. Enim fugiat cillum enim ad occaecat sint qui elit
            labore mollit sunt laborum fugiat consequat. Voluptate labore sunt
            duis eu deserunt. Occaecat do ut ut labore cillum enim dolore ad
            enim enim id. Aliquip do veniam ad excepteur ad cillum qui deserunt
            nostrud sunt aliqua duis sunt occaecat. Laborum incididunt commodo
            ullamco proident quis.
          </p>
          <button
            onClick={() => setIsTruncated(!isTruncated)}
            className="text-blue-500 cursor-pointer underline"
          >
            {isTruncated ? "Read More" : "Show Less"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;
