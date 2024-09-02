import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { privateAxios } from "@/lib/axios";
import { useToast } from "../ui/use-toast";

import { useAppDispatch } from "@/store";
import { updateAuth, updateLoading } from "@/features/auth/authSlice";

interface IRegisterFormElements extends HTMLFormElement {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

const SignInForm = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { toast } = useToast();

  const { isPending, mutate } = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      privateAxios.post("/user/login", data),
    onSuccess: ({ data }) => {
      console.log(data);
      dispatch(
        updateAuth({
          loading: "succeeded",
          userData: data.loggedInUser,
          accessToken: data.accessToken,
        })
      );
      navigate("/private");
    },
    onError: (error: any) => {
      console.log(error);
      toast({
        variant: "destructive",
        title: error.response.statusText,
        description: error.response.data.message,
      });
    },
  });

  const handleSubmit = (event: FormEvent<IRegisterFormElements>) => {
    event.preventDefault();
    dispatch(updateLoading("pending"));
    const { email, password } = event.currentTarget;
    mutate({
      email: email.value,
      password: password.value,
    });
  };

  return (
    <main>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            placeholder="Enter your password"
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
              Sign In
            </Button>
          )}
        </div>
      </form>
    </main>
  );
};

export default SignInForm;
