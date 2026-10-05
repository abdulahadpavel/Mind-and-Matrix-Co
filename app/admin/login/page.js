import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }) {
  if (await getCurrentAdmin()) redirect("/admin");
  const { next } = await searchParams;
  return <LoginForm next={typeof next === "string" ? next : ""} />;
}
