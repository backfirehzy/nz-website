import { groq } from 'next-sanity';

// 单语言发布策略：某语言标题为空时，该语言站点不显示此篇。
export const NEWS_LIST_QUERY = groq`
  *[_type == "news" && defined(title[$locale])] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    cover,
    publishedAt
  }
`;

export const NEWS_DETAIL_QUERY = groq`
  *[_type == "news" && slug.current == $slug && defined(title[$locale])][0] {
    _id, title, body, cover, publishedAt
  }
`;

export const PROJECT_LIST_QUERY = groq`
  *[_type == "project" && ($type == "" || projectType == $type)] | order(year desc) {
    _id,
    title,
    "slug": slug.current,
    cover,
    projectType,
    location,
    year
  }
`;

export const PROJECT_DETAIL_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id, title, description, cover, gallery, videoUrl,
    projectType, location, year, area
  }
`;

export const PROJECT_SLUGS_QUERY = groq`
  *[_type == "project" && defined(slug.current)]{ "slug": slug.current }
`;

export const NEWS_SLUGS_QUERY = groq`
  *[_type == "news" && defined(slug.current)]{ "slug": slug.current }
`;

// 站点设置是单例文档（固定 documentId = "siteSettings"）
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] { siteTitle, footerText, contactEmail }
`;

export const TEAM_QUERY = groq`
  *[_type == "teamMember"] | order(order asc, _createdAt asc) {
    _id, name, role, photo, bio
  }
`;

export const SERVICES_QUERY = groq`
  *[_type == "service"] | order(order asc, _createdAt asc) {
    _id, name, description, image
  }
`;
