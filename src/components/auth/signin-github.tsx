import { signIn } from "@/auth";
import { GithubIcon } from "../icons/github-icon";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

export default function SignInGithub() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
        redirect("/dashboard");
      }}
    >
      <Button type="submit" className="w-[400px]">
        <GithubIcon />
        Signin with Google
      </Button>
    </form>
  );
}
