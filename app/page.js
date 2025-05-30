import styles from "./page.module.css";
import LoginForm from "./login";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import ClientRedirect from "./utility/client-redirect";

export default function Home() {
  // const cookieStore = Cookies();
  // const accessToken = cookieStore.get("ptl_access_token");
  const accessToken = "HHHH";
  if (accessToken) {
    redirect("/dashboard");
  }
  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
  );
}
