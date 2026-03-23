import { redirect } from "next/navigation";

/** Canonical route is `/`; keep old path as redirect. */
export default function DnaAvoidancePage() {
  redirect("/");
}
