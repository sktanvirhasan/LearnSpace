import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::lesson.lesson', ({ strapi }) => ({
  
  async create(ctx) {
    const user = ctx.state.user;
    const userRole = user?.role?.name;

    if (userRole === 'Admin' || userRole === 'Content-Manager') {
      return super.create(ctx);
    }

    if (userRole === 'Instructor') {
      const courseId = ctx.request.body?.data?.course;

      if (!courseId) {
        return ctx.badRequest('Course ID is required.');
      }

      const course = await strapi.db.query('api::course.course').findOne({
        where: { id: courseId },
        populate: ['instructor'],
      });

      if (!course || course.instructor?.id !== user.id) {
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
      const newCourseId = ctx.request.body?.data?.course;

      if (newCourseId) {
        const newCourse = await strapi.db.query('api::course.course').findOne({
          where: { id: newCourseId },
          populate: ['instructor'],
        });

        if (!newCourse || newCourse.instructor?.id !== user.id) {
          return ctx.forbidden('You cannot move this lesson to a course you do not own.');
        }
      }

      return super.update(ctx);
    }

    return ctx.forbidden();
  },
}));