export const PAGE_QUERY = `
  query PageQuery($slug: String!) {
    pages(filters: { slug: { eq: $slug } }) {
      Title
      slug
      Description
      ThumbnailImage {
        alternativeText
        url
      }
      Sections {
        ... on ComponentHeroHeroSection {
          __typename
          Title
          Description
          HeroImage: Image {
            url
          }
        }
        ... on ComponentHeroHeroVertical {
          __typename
          Title
          Description
          HeroImage: Image {
            url
          }
        }
      }
    }
  }
`;
