import { Heading1 } from "@/components/Heading";
import Certificate from "@/components/home/Certificate";
import certificates from "@/data/certificates";
import { resolveCertificateAssets } from "@/lib/assets";
import { useTranslations } from "next-intl";

export default function CertificatesSection() {
    const t = useTranslations("certificates");

    return (
        <section id="certificates" className="container mx-auto mt-24">
            <Heading1>{t("heading")}</Heading1>
            <div className="flex flex-col gap-8">
                {certificates.map((cert) => {
                    const title = t.has(`${cert.id}.title`)
                        ? t(`${cert.id}.title`)
                        : cert.title ?? cert.id;
                    const organization = t.has(`${cert.id}.organization`)
                        ? t(`${cert.id}.organization`)
                        : cert.organization ?? "";
                    const description = t.has(`${cert.id}.description`)
                        ? t(`${cert.id}.description`)
                        : cert.description ?? "";
                    const assets = resolveCertificateAssets(cert.id);

                    return (
                        <Certificate
                            key={cert.id}
                            title={title}
                            organization={organization}
                            description={description}
                            year={cert.year}
                            assets={assets}
                        />
                    );
                })}
            </div>
        </section>
    );
}
