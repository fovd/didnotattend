import { redirect } from "next/navigation";

/** Reception desk hidden for demo; main app is DNA avoidance at `/`. */
export default function ReceptionPage() {
  redirect("/");
}
