import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::lesson.lesson', {
  config: {
    update: {
      policies: [
        { name: 'global::is-owner', config: { type: 'lesson' } },
      ],
    },
    delete: {
      policies: [
        { name: 'global::is-owner', config: { type: 'lesson' } },
      ],
    },
  },
});