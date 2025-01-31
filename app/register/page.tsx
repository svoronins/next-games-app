"use client";
import { Suspense } from "react";
import RegisterForm from "../../components/RegisterForm";
import { useSearchParams } from "next/navigation";
import { UserCreated } from "../../components/UserCreated";

export default function RegisterPage() {
  const params = useSearchParams();
  const isUserCreated = params.get("status") === "success";
  return (
    <Suspense>{isUserCreated ? <UserCreated /> : <RegisterForm />}</Suspense>
  );
}
