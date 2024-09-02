import { FormEvent } from "react";
import axios from "@/lib/axios";

export interface IRegisterFormElements extends HTMLFormElement {
  fullName: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
}

const registerUser = async (
  event: FormEvent<IRegisterFormElements>
): Promise<unknown> => {
  event.preventDefault();
  const { fullName, email, password } = event.currentTarget;

  const newUser = {
    fullName: fullName.value,
    email: email.value,
    password: password.value,
  };

  return await axios.post("/user/register", newUser);
};

export { registerUser };
