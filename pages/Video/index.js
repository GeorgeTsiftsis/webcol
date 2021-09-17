
const YOUTUBE_PLAYLIST_ITEMS_API =
  "https://www.googleapis.com/youtube/v3/playlistItems";

export async function getServerSideProps() {
  const res = await fetch(
    `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=PLQl8zBB7bPvL6GycjAtAibVp6FsLWvMcY&maxResults=15&key=${process.env.YOUTUBE_API_KEY}`
  );
  //   https://www.youtube.com/watch?v=TgqiSBxvdws&list=PLwgRxxvjwZFLYJ8PXvHj5QYMV5HvleeKA&ab_channel=AdultSwim
  // playlistId=PLH9V8MrKrhqjRYrMosaHQPFMXhMDPMtMb&?
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

function Youtube({ data }) {
//   const [postNum, setPostNum] = useState(6);
//   function handleClick(e) {
//     e.preventDefault();
//     setPostNum((prevPostNum) => prevPostNum + 2);
//   }

  // console.log(data);
  return (
    <div className="container mx-auto  ">
      <ul className="flex items-center justify-center flex-wrap max-w-screen-2lg">
        {data.items.map((item) => {
              //   .slice(0, postNum)
            // console.log(item);
            const { id, snippet = {} } = item;
            const { title, thumbnails = {}, resourceId } = snippet;
            const { medium = {} } = thumbnails;
            return (
              <li
                className="m-4 w-80 flex-shrink-0  text-left  border-4  border-black  rounded-3xl	transition duration-500 ease-in-out "
                key={id}
              >
                <div>
                  <img
                    className="rounded-t-3xl w-80"
                    height={medium.height}
                    src={medium.url}
                    alt=""
                  />
                  <h3 className=" p-2 h-20 text-sm font-bold   text-left ">
                    {title}
                  </h3>
                  <a
                    href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-gray-600 text-white flex flex-col  mx-auto my-4  rounded-md px-6 py-1">
                      See The video
                    </button>
                  </a>
                </div>
              </li>
            );
          })}
      </ul>
      <p className="flex items-center justify-center">
        {/* <button
          className="transition duration-500 ease-in-out bg-blue-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110  mt-8 p-4 rounded-md"
          onClick={handleClick}
        >
          Load More
        </button> */}
      </p>
    </div>
  );
}

export default Youtube;
