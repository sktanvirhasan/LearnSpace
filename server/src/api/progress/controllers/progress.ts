import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::progress.progress', ({ strapi }) => ({

async create(ctx) {
  const user = ctx.state.user;

  if (!user) {
    return ctx.unauthorized();
  }

  if (user.role.name !== 'Student') {
    return ctx.forbidden('Only students can update their own progress.');
  }

  if (!ctx.request.body.data) {
    ctx.request.body.data = {};
  }

  const lessonDocumentId = ctx.request.body.data.lesson;

  if (!lessonDocumentId) {
    return ctx.badRequest('Lesson ID is required.');
  }

  const lesson = await strapi.documents('api::lesson.lesson').findOne({
    documentId: lessonDocumentId,
    populate: ['course'],
  });

  if (!lesson || !lesson.course) {
    return ctx.badRequest('Lesson not found.');
  }

  const enrollment = await strapi.documents('api::enrollment.enrollment').findFirst({
    filters: {
      student: { documentId: user.documentId },
      course: { documentId: lesson.course.documentId },
    },
  });

  if (!enrollment) {
    return ctx.forbidden('You must be enrolled in this course to track progress.');
  }

  const existing = await strapi.documents('api::progress.progress').findFirst({
    filters: {
      student: { documentId: user.documentId },
      lesson: { documentId: lessonDocumentId },
    },
  });

  if (existing) {
    const updated = await strapi.documents('api::progress.progress').update({
      documentId: existing.documentId,
      data: { completed: ctx.request.body.data.completed ?? true } as any,
    });
    return { data: updated };
  }

  ctx.request.body.data.student = user.documentId;
  ctx.request.body.data.completed = ctx.request.body.data.completed ?? true;

  return super.create(ctx);
},

  async find(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized();
    }

    const userRole = user.role.name;

    if (userRole === 'Admin' || userRole === 'Content-Manager') {
      return super.find(ctx);
    }

    if (userRole === 'Student') {
      ctx.query = {
        ...ctx.query,
        filters: {
          ...(ctx.query.filters as object || {}),
          student: { documentId: user.documentId },
        },
      };
      return super.find(ctx);
    }

    if (userRole === 'Instructor') {
      const myCourses = await strapi.documents('api::course.course').findMany({
        filters: { instructor: { documentId: user.documentId } },
      });

      const myCourseDocIds = myCourses.map((c) => c.documentId);

      ctx.query = {
        ...ctx.query,
        filters: {
          ...(ctx.query.filters as object || {}),
          lesson: {
            course: {
              documentId: { $in: myCourseDocIds },
            },
          },
        },
      };
      return super.find(ctx);
    }

    return ctx.forbidden();
  },
}));