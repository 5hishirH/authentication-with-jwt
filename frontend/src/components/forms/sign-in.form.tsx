import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { privateAxios } from "@/lib/axios";
import { useToast } from "../ui/use-toast";

import { useAppDispatch, useAppSelector } from "@/store";
import { updateAuth, updateLoading } from "@/features/auth/authSlice";
import { useLogout } from "@/hooks/useLogout";
import { ToastAction } from "../ui/toast";

interface IRegisterFormElements extends HTMLFormElement {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

const SignInForm = () => {
  const { loading, userData: user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const logout = useLogout();

  const navigate = useNavigate();
  const { toast } = useToast();

  const { isPending, mutate } = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      privateAxios.post("/user/login", data),
    onSuccess: ({ data }) => {
      console.log(data);
      privateAxios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.accessToken}`;

      dispatch(
        updateAuth({
          loading: "loggedIn",
          userData: data.loggedInUser,
        })
      );
      navigate("/private");
    },
    onError: (error: any) => {
      console.log(error);
      dispatch(updateLoading("failed"));
      toast({
        variant: "destructive",
        title: error.response.statusText,
        description: error.response.data.message,
      });
    },
  });

  const handleSubmit = (event: FormEvent<IRegisterFormElements>) => {
    event.preventDefault();
    if (loading === "loggedIn") return;

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
          {loading === "loggedIn" ? (
            <Button
              type="button"
              onClick={() =>
                toast({
                  variant: "destructive",
                  title: "Already logged in to an account",
                  description:
                    "Please, sign out first to sign into an another account",
                  action: (
                    <ToastAction
                      type="button"
                      onClick={logout}
                      altText="Logout"
                    >
                      Logout
                    </ToastAction>
                  ),
                })
              }
              className="w-full"
            >
              {`Aleady signed as ${user?.fullName}`}
            </Button>
          ) : isPending ? (
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
