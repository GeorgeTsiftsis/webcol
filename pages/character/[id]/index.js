import Head from "next/head";
import Link from "next/link";
import Image from 'next/image'


const defaultEndpoint = "https://rickandmortyapi.com/api/character/";

export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await fetch(`${defaultEndpoint}/${id}`);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default function Character({ data }) {
  // console.log(data);
  const { name, image, gender, location, origin, species, status } = data;

  return (
    <div className=" font-serif flex flex-col items-center justify-center py-2">
      <Head>
        <title>{name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Image
          width="300"
          height="300"
          className="rounded-lg mx-auto"
          src={image}
          alt={name}
        />
        <ul className="pl-2">
          <li>
            <strong>Name:</strong> {name}
          </li>
          <li>
            <strong>Status:</strong> {status}
          </li>
          <li>
            <strong>Gender:</strong> {gender}
          </li>
          <li>
            <strong>Species:</strong> {species}
          </li>
          <li>
            <strong>Location:</strong> {location?.name}
          </li>
          <li>
            <strong>Originally From</strong> {origin?.name}
          </li>
        </ul>
      </div>

      <p>
        <Link href="/">
          <a className="bg-gray-600 text-white flex flex-col  mx-auto my-4  rounded-md px-6 py-1">
            Back to All Characters
          </a>
        </Link>
      </p>
    </div>
  );
}
