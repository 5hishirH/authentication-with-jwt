import { useAppSelector } from "@/store";

const Private = () => {
  const { userData } = useAppSelector((state) => state.auth);

  return (
    <main>
      <h2>Private</h2>
      <p>fullName: {userData?.fullName}</p>
    </main>
  );
};

export default Private;
