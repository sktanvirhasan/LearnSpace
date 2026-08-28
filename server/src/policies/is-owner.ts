import type { Core } from '@strapi/strapi';

export default async (policyContext: any, config: any, { strapi }: { strapi: Core.Strapi }) => {
  const user = policyContext.state.user;

  if (!user) {
    return false;
  }

  const userRole = user.role.name;

  if (userRole === 'Admin' || userRole === 'Content-Manager') {
    return true;
  }

  if (userRole !== 'Instructor') {
    return false;
  }

  const recordDocumentId = policyContext.params.id;

  if (!recordDocumentId) {
    return false;
  }

  let course;

  if (config.type === 'course') {
    course = await strapi.documents('api::course.course').findOne({
      documentId: recordDocumentId,
      populate: ['instructor'],
    });
  } else if (config.type === 'lesson') {
    const lesson = await strapi.documents('api::lesson.lesson').findOne({
      documentId: recordDocumentId,
      populate: { course: { populate: ['instructor'] } },
    });

    course = lesson?.course;
  }

  if (!course || !course.instructor) {
    return false;
  }

  const currentUser = await strapi.db.query('plugin::users-permissions.user').findOne({
    where: { id: user.id }
  });

  return course.instructor.documentId === currentUser.documentId;
};