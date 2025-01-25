import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define route matchers
const isStudentRoute = createRouteMatcher(["/user/(.*)"]);
const isTeacherRoute = createRouteMatcher(["/teacher/(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    const { sessionClaims } = await auth();

    // Retrieve user role from metadata
    const userRole =
        (sessionClaims?.metadata as { userType: "student" | "teacher" })?.userType || "student";

    console.log("Session Claims Metadata:", sessionClaims?.metadata);
    console.log("User Role:", userRole);

    // Handle student routes
    if (isStudentRoute(req)) {
        if (userRole !== "student") {
            const url = new URL("/teacher/courses", req.url);
            return NextResponse.redirect(url);
        }
    }

    // Handle teacher routes
    if (isTeacherRoute(req)) {
        if (userRole !== "teacher") {
            const url = new URL("/user/courses", req.url);
            return NextResponse.redirect(url);
        }
    }

    // Default allow request
    return NextResponse.next();
});

export const config = {
    matcher: [
        // Exclude Next.js internals and static files from middleware
        "/((?!_next|[^?]\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};