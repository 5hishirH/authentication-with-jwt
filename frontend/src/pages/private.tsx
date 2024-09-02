import { useAppSelector } from "@/store";

const Private = () => {
  const { userData } = useAppSelector((state) => state.auth);

  return (
    <main>
      <h2 className="mt-6 text-2xl font-medium">Private</h2>

      <section className="mt-4">
        <h3 className="text-lg font-medium">Current user info</h3>
        <h4 className="mb-1 italic">
          These info are from redux. fetched at the time of login or at time of
          starting the page if already logged in, using an axios instance
        </h4>
        <p>Full name : {userData?.fullName}</p>
        <p>Email : {userData?.email}</p>
      </section>
    </main>
  );
};

export default Private;
