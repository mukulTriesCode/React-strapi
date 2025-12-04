export const PAGES_QUERY = `query PagesQuery {
  pages {
    Title
    slug
    Description
    ThumbnailImage {
      alternativeText
      url
    }
  }
}`;
