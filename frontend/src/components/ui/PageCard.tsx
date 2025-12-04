import { Link } from "react-router-dom";
import type { PageCardType } from "../../types";
import Image from "./Image";

const PageCard: PageCardType = ({ Title, Thumbnail, Description, slug }) => {
  return (
    <Link to={`/${slug}`} className="page-card-link">
      <div className="page-card">
        <Image width="100%" aspectRatio="16/10" src={Thumbnail} />
        <div className="page-card-content">
          <h3>{Title}</h3>
          <p className="page-card-desc line-clamp-4">{Description}</p>
        </div>
      </div>
    </Link>
  );
};

export default PageCard;
