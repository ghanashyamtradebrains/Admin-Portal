import styles from "./page.module.css";
import LoginForm from "./login";
import cookie from "js-cookie";
import { redirect } from "next/navigation";

export default function Home() {
  const accessToken = cookie.get("ptl_access_token");
  if (accessToken) {
    redirect("/dashboard");
  }
  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
  );
}
