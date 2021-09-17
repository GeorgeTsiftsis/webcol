import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Navbar from "../Components/Navbar/navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;