import SignUpForm from "@/components/forms/sign-up.form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const SignUp = () => {
  return (
    <main className="h-[calc(100vh-4rem)] w-full flex justify-center items-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>

        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default SignUp;
