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

  const recordId = policyContext.params.id;

  if (!recordId) {
    return false;
  }

  let course;

  if (config.type === 'course') {
    course = await strapi.db.query('api::course.course').findOne({
      where: { id: recordId },
      populate: ['instructor'],
    });
  } else if (config.type === 'lesson') {
    const lesson = await strapi.db.query('api::lesson.lesson').findOne({
      where: { id: recordId },
      populate: { course: { populate: ['instructor'] } },
    });

    course = lesson?.course;
  }

  if (!course || !course.instructor) {
    return false;
  }
  return course.instructor.id === user.id;
};