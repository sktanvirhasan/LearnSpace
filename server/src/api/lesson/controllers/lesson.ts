import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::lesson.lesson', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    const userRole = user?.role?.name;

    if (userRole === 'Admin' || userRole === 'Content-Manager') {
      return super.create(ctx);
    }

    if (userRole === 'Instructor') {
      const courseDocumentId = ctx.request.body?.data?.course;

      if (!courseDocumentId) {
        return ctx.badRequest('Course ID is required.');
      }

      const currentUser = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { id: user.id }
      });

      const course = await strapi.documents('api::course.course').findOne({
        documentId: courseDocumentId,
        populate: ['instructor'],
      });

      if (!course || course.instructor?.documentId !== currentUser.documentId) {
        return ctx.forbidden('You can only add lessons to your own courses.');
      }

      return super.create(ctx);
    }

    return ctx.forbidden();
  },

  async update(ctx) {
    const user = ctx.state.user;
    const userRole = user?.role?.name;

    if (userRole === 'Admin' || userRole === 'Content-Manager') {
      return super.update(ctx);
    }

    if (userRole === 'Instructor') {
      const newCourseDocumentId = ctx.request.body?.data?.course;

      if (newCourseDocumentId) {
        const currentUser = await strapi.db.query('plugin::users-permissions.user').findOne({
          where: { id: user.id }
        });

        const newCourse = await strapi.documents('api::course.course').findOne({
          documentId: newCourseDocumentId,
          populate: ['instructor'],
        });

        if (!newCourse || newCourse.instructor?.documentId !== currentUser.documentId) {
          return ctx.forbidden('You cannot move this lesson to a course you do not own.');
        }
      }

      return super.update(ctx);
    }

    return ctx.forbidden();
  },
}));