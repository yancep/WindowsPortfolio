import { NextRequest, NextResponse } from 'next/server';
import { APP_ADMIN_ROUTES, APP_ROUTES } from '@/src/core/routes/routes';
import { SessionModel } from '@/src/features/users/domain/entities/Session';

export async function middleware(request: NextRequest) {
  let access;
  let userId;
  let role;

  const session = request.cookies.get('session')?.value;

  if (session) {
    const sessionData: SessionModel = JSON.parse(session!);
    access = sessionData.access;
    userId = sessionData.userId;
    role = sessionData.role;
  }

  if (!access || !userId) {
    if (
      request.nextUrl.pathname === APP_ROUTES.HOME ||
      request.nextUrl.pathname.includes(APP_ROUTES.ADMIN) ||
      request.nextUrl.pathname.includes(APP_ROUTES.CLIENT)
    ) {
      return NextResponse.redirect(new URL(APP_ROUTES.LOGIN, request.url));
    }
    return NextResponse.next();
  } else {
    if (request.nextUrl.pathname === APP_ROUTES.LOGIN) {
      if (role === 'ADMIN') {
        return NextResponse.redirect(
          new URL(APP_ADMIN_ROUTES.DASHBOARD, request.url),
        );
      } else {
        return NextResponse.redirect(new URL(APP_ROUTES.CLIENT, request.url));
      }
    }

    if (request.nextUrl.pathname === APP_ROUTES.ADMIN) {
      if (role === 'ADMIN') {
        return NextResponse.redirect(
          new URL(APP_ADMIN_ROUTES.DASHBOARD, request.url),
        );
      } else {
        return NextResponse.redirect(new URL(APP_ROUTES.HOME, request.url));
      }
    } else if (request.nextUrl.pathname === APP_ROUTES.HOME) {
      if (role === 'ADMIN') {
        return NextResponse.redirect(
          new URL(APP_ADMIN_ROUTES.DASHBOARD, request.url),
        );
      } else {
        return NextResponse.redirect(new URL(APP_ROUTES.CLIENT, request.url));
      }
    } else {
      if (request.nextUrl.pathname.includes(APP_ADMIN_ROUTES.DASHBOARD)) {
        if (role === 'ADMIN') {
          return NextResponse.next();
        } else {
          return NextResponse.redirect(new URL(APP_ROUTES.CLIENT, request.url));
        }
      } else if (request.nextUrl.pathname.includes(APP_ROUTES.CLIENT)) {
        if (userId) {
          return NextResponse.next();
        }
      }
    }
    return NextResponse.next();
  }
}
