import styles from "@/app/common.module.css";
import { OutlineButtonLink } from "@/components/ui/Button";
import { getNodalOfficerResponse } from "@/services/investors/investor.api";

const CLAIM_BUTTON_LABEL =
  "Click here to visit the IEPF website and claim refund of Shares transferred to IEPF Authority";

export default async function NodalOfficerSection() {
  const nodalOfficerResponse = await getNodalOfficerResponse();
  const officers = Array.isArray(nodalOfficerResponse?.data)
    ? nodalOfficerResponse.data
    : [];

  if (!officers.length) {
    return null;
  }

  const sectionTitle =
    officers.find((officer) => officer?.title)?.title ||
    "Details of Nodal Officer";

  return (
    <section className={`${styles.containerLg} pb-0!`}>
      <div className={styles.sectionContent}>
        <h2>{sectionTitle}</h2>

        <div className="grid grid-cols-1 gap-6">
          {officers.map((officer) => {
            const officerName = officer?.name || "";

            return (
              <div
                key={officer?.id || officer?.email || officerName}
                className="shadow-xl p-6 rounded-md"
              >
                {officerName ? <h4>{officerName}</h4> : null}

                {officer?.designation ? (
                  <p>
                    <strong>{officer.designation}</strong>
                  </p>
                ) : null}

                {officer?.email ? (
                  <p>
                    <strong>Email: </strong>
                    <span>
                      <a
                        href={`mailto:${officer.email}`}
                        className="text-blue-700"
                      >
                        {officer.email}
                      </a>
                    </span>
                  </p>
                ) : null}

                {officer?.link ? (
                  <div className="flex flex-wrap">
                    <OutlineButtonLink
                      goto={officer.link}
                      title={CLAIM_BUTTON_LABEL}
                      className="pt-6"
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
