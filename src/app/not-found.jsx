import Link from "next/link";
import commonStyles from "@/app/common.module.css";
import styles from "./not-found.module.css";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/newsroom/blog", label: "Newsroom" },
  { href: "/about/global-presence", label: "Global Presence" },
];

export default function NotFound() {
  return (
    <main className={styles.pageShell}>
      <section className={`${commonStyles.containerLg} ${styles.pageFrame}`}>
        <div className={styles.grid}>
          <div className={styles.copyCard}>
            <p className={styles.kicker}>404 / Page Not Found</p>
            <h1 className={styles.title}>
              THIS PAGE IS
              <span> OFF THE GRID.</span>
            </h1>
            <p className={styles.description}>
              The page you requested may have moved, expired, or never made it
              into production. Use the links below to get back to an active
              section of the site.
            </p>

            <div className={styles.actionRow}>
              <Link href="/" className={styles.primaryAction}>
                Return Home
              </Link>
              <Link href="/newsroom/blog" className={styles.secondaryAction}>
                Open Newsroom
              </Link>
            </div>

            <div className={styles.quickLinkWrap}>
              <span className={styles.quickLinkLabel}>Quick Routes</span>
              <div className={styles.quickLinks}>
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={styles.quickLink}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.visualCard}>
            <div className={styles.visualGlow} />
            <div className={styles.visualPanel}>
              <p className={styles.visualLabel}>Routing Status</p>
              <div className={styles.visualNumber}>404</div>
              <p className={styles.visualText}>
                Destination unavailable. The request completed, but no matching
                page was found.
              </p>

              <div className={styles.statusGrid}>
                <div className={styles.statusItem}>
                  <span className={styles.statusName}>State</span>
                  <strong>Missing</strong>
                </div>
                <div className={styles.statusItem}>
                  <span className={styles.statusName}>Action</span>
                  <strong>Redirect</strong>
                </div>
                <div className={styles.statusItem}>
                  <span className={styles.statusName}>Fallback</span>
                  <strong>Home</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
