import { NextResponse } from 'next/server';
import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';

const Routes = {
	doctor: {
		default: '/jhopkins/appointments',
		valid: ['/jhopkins/my-patients', '/jhopkins/appointments', '/jhopkins/new-appointment'],
	},
	fda: {
		default: '/fda/assign-drugs',
		valid: ['/fda/assign-drugs', '/fda/live-results'],
	},
	bavaria: {
		default: '/bavaria/send-drugs',
		valid: ['/bavaria/send-drugs', '/bavaria/reports', '/bavaria/trial-results'],
	},
	// jhopkins: {
	// 	default: '',
	// 	valid: ['', '', ''],
	// },
};

export default withMiddlewareAuthRequired(async (req) => {
	const res = NextResponse.next();

	const session = await getSession(req, res);
	const user = session.user;
	console.log('route', req.nextUrl.pathname);
	if (user) {
		// Do what you want...
		console.log(user, 'here 1');
		let route = '/';
		let currentRoute = req.nextUrl.pathname;
		let roleRoutes = Routes[user.role];

		if (roleRoutes) {
			if (roleRoutes.valid.includes(currentRoute)) {
				return res;
			} else if (currentRoute === '/redirect') {
				route = roleRoutes.default;
			}
		}

		console.log('here 2', route, currentRoute);
		// redirect to specific route
		if (currentRoute != route) {
			console.log('test');
			return NextResponse.redirect(new URL(route, req.url));
		} else {
			return res;
		}
	}
	console.log('here 3');
	// redirect to home page if no user
	// (never should be the case though due to auth required wrapper)
	return NextResponse.redirect(new URL('/', req.url));
});

// only work on the '/' path
export const config = {
	matcher: ['/bavaria/:path*', '/fda/:path*', '/jhopkin/:path*', '/patients/:path*', '/redirect'],
	// matcher: ['/sdasasdasdasd']
};
