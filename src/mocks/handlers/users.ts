import { http, HttpResponse } from 'msw';

import { usersResponse } from '../responses/users';

export const userHandlers = [
  http.get('/users', async req => {
    const allUsers = usersResponse._embedded.users;
    const url = new URL(req.request.url);

    const limit = Number(url.searchParams.get('limit'));
    const search = url.searchParams.get('search')?.toLowerCase();

    let filteredUsers = allUsers;

    if (search) {
      filteredUsers = filteredUsers.filter(
        user => user.name.given.toLowerCase().includes(search),
      );
    }

    if (limit) {
      filteredUsers = filteredUsers.slice(0, limit);
    }

    const response = {
      ...usersResponse,
      _embedded: {
        users: filteredUsers,
      },
      count: allUsers.length,
      size: filteredUsers.length,
    };

    if (filteredUsers.length > 0) {
      return HttpResponse.json({
        body: { ...response },
        status: 200,
        statusText: 'Found user list',
      });
    }

    return HttpResponse.json(null, {
      status: 400,
      statusText: 'Unable to find user list.',
    });
  }),

  http.get<{ id: string }>('user/:id', ({ params }) => {
    const { id } = params;
    const user = usersResponse._embedded.users.find(u => u.id === id);

    if (user) {
      return HttpResponse.json(
        { user },
        {
          status: 200,
          statusText: 'User found',
        },
      );
    }

    return HttpResponse.json(null, {
      status: 400,
      statusText: 'User not found',
    });
  }),
];
