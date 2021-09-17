import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const defaultEndpoint = "https://rickandmortyapi.com/api/character/";
export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  // console.log(data);
  const { info, results: defaultResults = [] } = data;

  const [results, updateResults] = useState(defaultResults);

  const [page, updatePage] = useState({
    ...info,
    current: defaultEndpoint,
  });
  const { current } = page;

  useEffect(() => {
    if (current === defaultEndpoint) return;

    async function request() {
      const res = await fetch(current);
      const nextData = await res.json();

      updatePage({
        current,
        ...nextData.info,
      });

      if (!nextData.info?.prev) {
        updateResults(nextData.results);
        return;
      }

      updateResults((prev) => {
        return [...prev, ...nextData.results];
      });
    }
    request();
  }, [current]);

  function handleLoadMore() {
    updatePage((prev) => {
      return {
        ...prev,
        current: page?.next,
      };
    });
  }

  function handleOnSubmitSearch(e) {
    e.preventDefault();

    const { currentTarget = {} } = e;
    const fields = Array.from(currentTarget?.elements);
    const fieldQuery = fields.find((field) => field.name === "query");

    const value = fieldQuery.value || "";
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`;

    updatePage({
      current: endpoint,
    });
  }
  const router = useRouter();

  return (
    <div className="font-serif flex flex-col items-center justify-center min-h-screen mb-8 ">
      <Head>
        <title>Rick and Morty Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-600 p-8 w-full flex flex-col items-center">
        <h1 className=" text-4xl text-center text-white font-normal">
          Rick and Morty Wicki
        </h1>

        <form
          className="flex flex-row justify-center w-64 "
          onSubmit={handleOnSubmitSearch}
        >
          <input
            className="border-4 mx-3 bg-white-100 p-1 rounded-md"
            name="query"
            type="search"
          />
          <button className="bg-black-800 text-white">Search</button>
        </form>
      </div>

      <ul className="flex  ">
        <li>Alive</li>
        <span className="bg-blue-400 red-text  self-center h-6 w-6 border-4 rounded-full"></span>
        <li> Dead</li>
        <span className="bg-red-400 red-text  self-center h-6 w-6 border-4 rounded-full"></span>

        <li> Unknown</li>
        <span className="bg-green-400 red-text  self-center h-6 w-6 border-4 rounded-full"></span>
      </ul>

      <ul className="flex items-center justify-center flex-wrap max-w-screen-2lg  ">
        {results.map((result) => {
          const { id, name, image, status } = result;

          return (
            <li
              key={id}
              className="m-4   flex-shrink-0  text-left no-underline border-4  border-black  rounded-3xl	transition duration-500 ease-in-out "
            >
              <a className="">
                <img
                  className="rounded-t-3xl"
                  width="280"
                  src={image}
                  alt={`'${name}`}
                />
                <div className="flex items-center justify-center  ">
                  <h1 className="text-2xl text-center   text-xl pt-2">
                    {name}
                  </h1>
                  {status == "Alive" ? (
                    <span className="bg-blue-400 mt-2 ml-1 self-center h-6 w-6 border-4 rounded-full	"></span>
                  ) : (
                    ""
                  )}
                  {status == "unknown" ? (
                    <span className="bg-red-400 mt-2 ml-1  self-center h-6 w-6 border-4 rounded-full "></span>
                  ) : (
                    ""
                  )}
                  {status == "Dead" ? (
                    <span className="bg-green-400 mt-2 ml-1  self-center h-6 w-6 border-4 rounded-full"></span>
                  ) : (
                    ""
                  )}
                </div>
               
              </a>
              <Link href="/character/[id]" as={`/character/${id}`}>
                <button className="bg-gray-600 text-white flex flex-col  mx-auto my-4  rounded-md px-6 py-1">
                  Read More
                </button>
              </Link>
            </li>
          );
        })}
      </ul>
      <p>
        <button
          className="transition duration-500 ease-in-out bg-blue-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110  mt-8 p-4 rounded-md"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      </p>
    </div>
  );
}
