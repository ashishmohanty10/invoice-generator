import SignIn from "@/components/auth/signin-button";
import { SignInForm } from "@/components/auth/signin-form";

export default function SigninPage() {
  return (
    <div className="flex items-center justify-center w-full h-screen flex-col space-y-5">
      <SignInForm />
      <SignIn />
    </div>
  );
}
