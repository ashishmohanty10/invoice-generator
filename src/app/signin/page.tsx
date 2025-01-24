import { SignInForm } from "@/components/auth/signin-form";
import SignInGithub from "@/components/auth/signin-github";
import SignInGoogle from "@/components/auth/signin-google";

export default function SigninPage() {
  return (
    <div className="flex items-center justify-center w-full h-screen flex-col space-y-5">
      <SignInForm />
      <SignInGoogle />
      <SignInGithub />
    </div>
  );
}
