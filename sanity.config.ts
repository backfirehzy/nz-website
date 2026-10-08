import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'placeholder';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

export default defineConfig({
  name: 'default',
  title: 'NZ Architecture Studio',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('project'),
            S.documentTypeListItem('news'),
            S.documentTypeListItem('teamMember'),
            S.documentTypeListItem('service'),
            // 站点设置为单例：直接打开固定文档，不提供新建入口
            S.listItem()
              .title('Site Settings / 站点设置')
              .child(
                S.document().schemaType('siteSettings').documentId('siteSettings'),
              ),
            S.documentTypeListItem('contactSubmission'),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
