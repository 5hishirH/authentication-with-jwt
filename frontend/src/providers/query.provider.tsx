import {
  QueryClient,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

interface IQueryClientProps {
  children: ReactNode;
}

const QueryClientProvider = ({ children }: IQueryClientProps) => {
  return <Provider client={queryClient}>{children}</Provider>;
};

export default QueryClientProvider;
