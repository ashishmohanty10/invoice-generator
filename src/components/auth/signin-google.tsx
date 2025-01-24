import { signIn } from "@/auth";
import { Button } from "../ui/button";
import { GoogleIcon } from "../icons/google-icon";

export default function SignInGoogle() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit" className="w-[400px]">
        <GoogleIcon />
        Signin with Google
      </Button>
    </form>
  );
}
