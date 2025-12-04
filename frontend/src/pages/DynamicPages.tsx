import { useParams } from "react-router-dom";
import type { RFCType, PagesResponse } from "../types";
import { PAGE_QUERY } from "../query/PageQuery";
import Image from "../components/ui/Image";
import NotFound from "./NotFound";
import Loading from "../components/layout/Loading";
import { renderComponent } from "../helpers/renderComponent";
import { useQuery } from "../hooks/useQuery";
import React, { useMemo } from "react";

const DynamicPages: RFCType = () => {
  const params = useParams();
  const slug = params?.slug;

  const variables = useMemo(() => ({ slug }), [slug]);
  const { data, loading, error } = useQuery<PagesResponse>(PAGE_QUERY, {
    variables,
    cache: true,
    revalidateOnMount: true,
    cacheTTL: 1000 * 60 * 5,
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <>Error</>;
  }

  const pageData = data?.pages[0];

  if (!pageData) {
    return <NotFound />;
  }

  const { Description, Title, ThumbnailImage, Sections } = pageData;

  return (
    <>
      <section className="container">
        <div className="wrapper-block">
          <h1>{Title}</h1>
          <Image
            src={ThumbnailImage}
            rounded
            aspectRatio="16/6"
            priority
            hasMargin
          />
          <p style={{ fontSize: "24px" }}>{Description}</p>
        </div>
      </section>
      {Sections?.map((section, index) => (
        <React.Fragment key={section.Title + index}>
          {renderComponent(section)}
        </React.Fragment>
      ))}
    </>
  );
};

export default DynamicPages;
