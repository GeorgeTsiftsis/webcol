import Link from "next/link";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();
  return (
    <ul className="text-2xl flex  font-bold ">
      <li className={router.pathname == "/" ? "active  underline" : ""}>
        <Link a href="/">
          Characters/
        </Link>
      </li>
      <li className={router.pathname == "/Video" ? "active underline" : ""}>
        <Link href="/Video"> Videos </Link>
      </li>
    </ul>
  );
}

export default Navbar;
