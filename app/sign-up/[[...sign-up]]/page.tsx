import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="fixed inset-0 h-screen flex justify-center items-center bg-black z-1000 scrollbar-hide overflow-hidden">
      <SignUp
        // routing="path"
        // path="/sign-up"
        // forceRedirectUrl="/subscribe"
        // signInUrl="/subscribe"
        signInFallbackRedirectUrl="/subscribe"
      />
    </div>
  );
}
// px-4 py-8 sm:py-12 lg:py-16 mx-w-7xl mx-auto flex justify-center align-center
