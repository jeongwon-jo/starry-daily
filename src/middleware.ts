// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

export async function middleware(request: NextRequest) {
	const response = await updateSession(request);

	const supabase = createServerClient(supabaseUrl, supabaseKey, {
		cookies: {
			getAll: () => request.cookies.getAll(),
			setAll: () => {},
		},
	});

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const pathname = request.nextUrl.pathname;

	const isPublicRoot = pathname === "/";
	const isAuthPage =
		pathname.startsWith("/login") || pathname.startsWith("/signup");
	const isLoginPage = pathname.startsWith("/login");
	const isSignupRoot = pathname === "/signup";

	if (
		pathname.startsWith("/images") ||
		pathname.startsWith("/fonts") ||
		pathname.startsWith("/favicon") ||
		pathname.match(/\.(png|jpg|jpeg|svg|webp|gif)$/)
	) {
		return response;
	}

	if (pathname.startsWith("/api")) {
		return response;
	}

	if (pathname.startsWith("/auth/callback")) {
    return NextResponse.next();
  }

	if (!user && !isAuthPage && !isPublicRoot) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (user && (isLoginPage || isSignupRoot)) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return response;
}

export const config = {
	 matcher: [
    "/((?!api|_next|favicon.ico|images|fonts).*)",
  ],
};
