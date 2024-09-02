import SignInForm from "@/components/forms/sign-in.form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const SignIn = () => {
  return (
    <main className="h-[calc(100vh-4rem)] w-full flex justify-center items-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Welcome back</CardDescription>
        </CardHeader>

        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default SignIn;
