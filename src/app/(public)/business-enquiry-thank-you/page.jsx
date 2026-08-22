import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { ENQUIRY_COOKIES } from "@/utils/enquirySubmission";
import commonStyles from "@/app/common.module.css";
import styles from "./thank-you.module.css";

// Confirmation pages should not compete with real content in search results.
export const metadata = {
  title: "Thank You | Electrosteel Castings Limited",
  robots: { index: false, follow: true },
};

const nextSteps = [
  "Your details have been logged with the relevant team.",
  "A team member reviews your request and routes it to the right desk.",
  "You will hear back from us at the contact details you shared.",
];

export default async function ThankYouPage() {
  // Reachable only right after a successful submit - a direct URL hit has no
  // cookie and falls through to the 404 page.
  const cookieStore = await cookies();

  if (!cookieStore.has(ENQUIRY_COOKIES.business)) {
    notFound();
  }

  return (
    <main className={styles.pageShell}>
      <section className={`${commonStyles.containerLg} ${styles.pageFrame}`}>
        <div className={styles.card}>
          <div className={styles.badge}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 12.5l5 5L20 6.5"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span className={styles.kicker}>Submission Received</span>

          <h1 className={styles.title}>
            Thank you <span>for your interest.</span>
          </h1>

          <p className={styles.description}>
            We will get in touch with you.
          </p>

          <div className={styles.actionRow}>
            <Link href="/" className={styles.primaryAction}>
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
