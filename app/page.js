"use client";
import styles from "./page.module.css";
import LoginForm from "./login";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const accessToken = cookie.get("admin_access_token");
  if (accessToken) {
    router.push("/dashboard");
  }
  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
  );
}
