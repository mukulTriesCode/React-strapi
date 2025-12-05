import type { RFCType, PagesResponse } from "../types";
import { PAGES_QUERY } from "../graphql/query/PagesQuery";
import PageCard from "../components/ui/PageCard";
import Loading from "../components/layout/Loading";
import { useQuery } from "../graphql/hooks/useQuery";

const Home: RFCType = () => {
  const { data, loading, error } = useQuery<PagesResponse>(PAGES_QUERY, {
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

  const pages = data?.pages;

  return (
    <section className="container">
      <div className="wrapper-block page-grid">
        {pages?.map((page, index) => {
          const { Title, Description, ThumbnailImage, slug } = page;
          return (
            <PageCard
              key={index}
              Title={Title}
              Thumbnail={ThumbnailImage}
              Description={Description}
              slug={slug}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Home;
