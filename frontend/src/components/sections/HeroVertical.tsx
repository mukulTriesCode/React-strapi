import type { RFCType, ImageType } from "../../types";
import Image from "../ui/Image";

const HeroVertical: RFCType<{
  Title: string;
  HeroImage: ImageType;
  Description: string;
}> = ({ Title, HeroImage, Description }) => {
  return (
    <section className="container">
      <div className="hero-vertical wrapper-block">
        <div className="hero-vertical-content">
          {Title && <h2>{Title}</h2>}
          {Description && <p>{Description}</p>}
        </div>
        {HeroImage?.url && (
          <div className="hero-vertical-image">
            <Image src={HeroImage} hasMargin rounded aspectRatio="16/5" />
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroVertical;
