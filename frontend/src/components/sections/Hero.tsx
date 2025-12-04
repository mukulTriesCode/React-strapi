import type { RFCType, ImageType } from "../../types";
import Image from "../ui/Image";

const Hero: RFCType<{
  Title: string;
  HeroImage: ImageType;
  Description: string;
}> = ({ Title, HeroImage, Description }) => {
  return (
    <section className="container">
      <div className="hero wrapper-block">
        <div className="hero-content">
          <h2>{Title}</h2>
          <p>{Description}</p>
        </div>
        <div className="hero-image">
          <Image src={HeroImage} rounded />
        </div>
      </div>
    </section>
  );
};

export default Hero;
