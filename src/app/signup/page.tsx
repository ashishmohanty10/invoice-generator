import SignInGithub from "@/components/auth/signin-github";
import SignInGoogle from "@/components/auth/signin-google";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center w-full h-screen flex-col space-y-5">
      <SignupForm />
      <SignInGoogle />
      <SignInGithub />
    </div>
  );
}
