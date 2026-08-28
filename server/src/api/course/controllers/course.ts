import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::course.course', ({ strapi }) => ({
  
  async create(ctx) {
    const user = ctx.state.user;

    if (user?.role?.name === 'Instructor') {
      const currentUser = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { id: user.id }
      });

      if (!ctx.request.body.data) {
        ctx.request.body.data = {};
      }
      
      ctx.request.body.data.instructor = currentUser.documentId;
    }

    return super.create(ctx);
  },

  async update(ctx) {
    const user = ctx.state.user;
    const userRole = user?.role?.name;

    if (userRole === 'Admin' || userRole === 'Content-Manager') {
      return super.update(ctx);
    }

    if (userRole === 'Instructor') {
      const currentUser = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { id: user.id }
      });

      if (
        ctx.request.body?.data?.instructor &&
        ctx.request.body.data.instructor !== currentUser.documentId
      ) {
        return ctx.forbidden('You cannot change the ownership of this course.');
      }
    }

    return super.update(ctx);
  },
}));