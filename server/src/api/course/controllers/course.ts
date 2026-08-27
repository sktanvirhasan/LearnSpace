import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::course.course', ({ strapi }) => ({
  
  async create(ctx) {
    const user = ctx.state.user;
    const userRole = user?.role?.name;

    if (userRole === 'Instructor') {
      if (!ctx.request.body.data) {
        ctx.request.body.data = {};
      }
      ctx.request.body.data.instructor = user.id;
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
      if (
        ctx.request.body?.data?.instructor &&
        ctx.request.body.data.instructor !== user.id
      ) {
        return ctx.forbidden('You cannot change the ownership of this course.');
      }
    }

    return super.update(ctx);
  },
}));