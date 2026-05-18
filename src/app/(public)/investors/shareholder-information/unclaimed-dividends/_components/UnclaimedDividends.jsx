import styles from "@/app/common.module.css";
import Image from "next/image";
import Link from "next/link";
import HTMLRender from "@/components/ui/HTMLRender";
import { OutlineButtonLink } from "@/components/ui/Button";

const ARCHIVE_LINK =
  "/investors/shareholder-information/unclaimed-dividends-archive";

function formatDescription(description = "") {
  const trimmedDescription = String(description || "").trim();

  if (!trimmedDescription) {
    return "";
  }

  return /<[^>]+>/.test(trimmedDescription)
    ? trimmedDescription
    : `<p>${trimmedDescription}</p>`;
}

export default function UnclaimedDividends({ items = [] }) {
  if (!items.length) {
    return null;
  }

  return (
    <section>
      <div className={styles.containerLg}>
        <div className="space-y-10">
          {items?.map((item) => {
            const descriptionHtml = formatDescription(item?.description);

            return (
              <div
                key={item?.id || item?.title || item?.createdAt}
                className={`${styles.sectionContent} ${styles.customUlListing} grid gap-10 md:grid-cols-2`}
              >
                <div>
                  <h2>
                    {item?.title}
                    {item?.sub_title ? <span> {item.sub_title}</span> : null}
                  </h2>

                  <div>
                    {item?.link1 && item?.link1_label ? (
                      <OutlineButtonLink
                        goto={item.link1}
                        title={item.link1_label}
                        className="my-5 !w-auto"
                      />
                    ) : null}

                    {item?.link2 && item?.link2_label ? (
                      <OutlineButtonLink
                        goto={item.link2}
                        title={item.link2_label}
                        className="!w-auto"
                      />
                    ) : null}
                  </div>
                </div>

                <div>
                  <Link
                    href={ARCHIVE_LINK}
                    className="btn-outline-text py-3 text-primaryBlue hover:underline flex items-center !gap-3"
                  >
                    <Image
                      src="/images/icons/pdf.png"
                      fill
                      alt="pdf"
                      className="object-contain !relative !w-[30px] !h-[30px]"
                    />
                    <span>View Archive</span>
                  </Link>

                  {descriptionHtml ? (
                    <HTMLRender htmlString={descriptionHtml} />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
