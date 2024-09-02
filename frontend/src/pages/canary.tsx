import { privateAxios } from "@/lib/axios";
// import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Canary = () => {
  // const { data: userData } = useQuery({
  //   queryKey: ["canary"],
  //   queryFn: async () =>
  //     await privateAxios.get("/user/current-user").then(({ data }) => data),
  // });

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    privateAxios.get("/user/current-user").then(({ data }) => {
      setUser(data);
    });
  }, []);
  return (
    <main>
      <h2>Canary</h2>
      <p>{`email: ${user?.email}`}</p>
    </main>
  );
};

export default Canary;
