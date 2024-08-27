import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { axios } from "@/lib/axios";

interface IRegisterFormElements extends HTMLFormElement {
  fullName: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
}

const SignUpForm = () => {
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: (data: { fullName: string; email: string; password: string }) =>
      axios.post("/user/register", data),
    onSuccess: () => {
      navigate("/sign-in");
    },
    onError: (error: any) => {
      if (error.status === 409) {
        console.log("User with the email already exists");
      }
    },
  });

  const handleSubmit = (event: FormEvent<IRegisterFormElements>) => {
    event.preventDefault();
    const { fullName, email, password } = event.currentTarget;
    mutate({
      fullName: fullName.value,
      email: email.value,
      password: password.value,
    });
  };

  return (
    <main>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <h3 className="text-sm font-medium mb-1">Full Name</h3>
          <Input name="fullName" type="text" required placeholder="Your name" />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-1">Email</h3>
          <Input
            name="email"
            type="email"
            required
            placeholder="eg. linkon@gmail.com"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-1">Password</h3>
          <Input
            name="password"
            type="text"
            required
            placeholder="Enter a strong password"
          />
        </div>

        <div className="mt-2">
          {isPending ? (
            <Button type="button" disabled className="w-full">
              <Loader2 className="animate-spin mr-2" size={16} />
              Processing...
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          )}
        </div>
      </form>
    </main>
  );
};

export default SignUpForm;
