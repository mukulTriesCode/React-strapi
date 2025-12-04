import { Link } from "react-router-dom";
import type { RFCType } from "../types";

const NotFound: RFCType = () => (
  <div className="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <Link to="/">
      <button>Go back home</button>
    </Link>
  </div>
);

export default NotFound;
