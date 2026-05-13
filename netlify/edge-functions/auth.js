export default async (request, context) => {
  const url = new URL(request.url);

  // Always allow the login page and its form handler
  if (url.pathname === '/login' || url.pathname === '/login/') {
    return context.next();
  }

  // Allow static assets needed by the login page
  if (url.pathname.startsWith('/_astro/') || url.pathname.startsWith('/fonts/')) {
    return context.next();
  }

  const cookie = request.headers.get('cookie') || '';
  const authed = cookie.split(';').some(c => c.trim() === 'reef-auth=archipelago');

  if (!authed) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', url.pathname);
    return Response.redirect(loginUrl.toString(), 302);
  }

  return context.next();
};

export const config = { path: '/*' };
