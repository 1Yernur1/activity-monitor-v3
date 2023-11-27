"use client";
import { signIn } from "next-auth/react";
import { SignInForm } from "./components/SignInForm";
import { FormEventHandler, Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./loading";

export default function Page() {
  const router = useRouter();
  const [isFailedSubmit, setIsFailedSubmit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsDisabled(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
      .then((res) => {
        if (res?.ok) router.push("/");
      })
      .catch((err) => setIsFailedSubmit(true))
      .finally(() => setIsDisabled(false));
  };
  return (
    <Suspense fallback={<Loading />}>
      <div className="h-screen grid place-items-center">
        <SignInForm {...{ handleSubmit, isFailedSubmit, isDisabled }} />
      </div>
    </Suspense>
  );
}
