import { getUser } from '../service/authentication'
import { Link } from "react-router-dom";

export default function Home() {
  // getUser().then((user) => {
  //     console.log(user._delegate)
  // })
  return (
    <>
      <ul>
        <li>
          <Link to={"caption"} > Caption </Link>

        </li>
        <li>
          <Link to={"payment"} > Upgrade To Pro </Link>
        </li>
        <li>
          <Link to={"ebook"} > Ebook </Link>
        </li>
      </ul>
    </>
  )
}

