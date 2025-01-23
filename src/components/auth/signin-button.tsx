import { signIn } from "@/auth";
import { Button } from "../ui/button";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit" className="w-[400px]">
        Signin with Google
      </Button>
    </form>
  );
}
