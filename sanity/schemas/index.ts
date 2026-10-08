import { contactSubmission } from './contactSubmission';
import { localeBlock, localeString, localeText } from './locale';
import { news } from './news';
import { project } from './project';
import { service } from './service';
import { siteSettings } from './siteSettings';
import { teamMember } from './teamMember';
import { videoEmbed } from './videoEmbed';

export const schemaTypes = [
  localeString,
  localeText,
  localeBlock,
  videoEmbed,
  project,
  news,
  teamMember,
  service,
  siteSettings,
  contactSubmission,
];
