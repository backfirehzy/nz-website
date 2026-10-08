import { contactSubmission } from './contactSubmission';
import { localeBlock, localeString, localeText } from './locale';
import { news } from './news';
import { project } from './project';
import { siteSettings } from './siteSettings';

export const schemaTypes = [
  localeString,
  localeText,
  localeBlock,
  project,
  news,
  siteSettings,
  contactSubmission,
];
