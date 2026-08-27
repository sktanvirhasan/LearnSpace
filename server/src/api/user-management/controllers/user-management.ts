export default {
  async findUsers(ctx: any) {
    const user = ctx.state.user;
    
    if (!user || user.role?.name !== 'Admin') {
      return ctx.forbidden('Only admins can view users.');
    }

    const users = await strapi.db.query('plugin::users-permissions.user').findMany({
      populate: ['role'],
    });
    
    return users;
  },

  async updateRole(ctx: any) {
    const user = ctx.state.user;

    if (!user || user.role?.name !== 'Admin') {
      return ctx.forbidden('Only admins can update roles.');
    }

    const { id } = ctx.params;
    
    const { roleId } = ctx.request.body;

    if (!roleId) {
      return ctx.badRequest('Role ID is required.');
    }

    const updatedUser = await strapi.db.query('plugin::users-permissions.user').update({
      where: { id },
      data: {
        role: roleId,
      },
      populate: ['role'],
    });

    return updatedUser;
  },
};