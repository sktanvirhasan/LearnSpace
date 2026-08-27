export default {
  routes: [
    {
      method: 'GET',
      path: '/user-management/users',
      handler: 'user-management.findUsers',
      config: {
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/user-management/users/:id/role',
      handler: 'user-management.updateRole',
      config: {
        policies: [],
      },
    },
  ],
};