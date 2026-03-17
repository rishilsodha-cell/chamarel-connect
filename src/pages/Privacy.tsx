import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";

const Privacy = () => (
  <Layout>
    <section className="section-padding">
      <div className="container-narrow max-w-3xl prose-sm">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-12">Privacy Policy</h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="space-y-8 text-foreground/80 leading-relaxed">
            <div>
              <h2 className="text-xl font-medium text-foreground mb-3">Introduction</h2>
              <p>Chamarel Healthcare is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.</p>
            </div>
            <div>
              <h2 className="text-xl font-medium text-foreground mb-3">Information We Collect</h2>
              <p>We may collect personal information that you voluntarily provide when you contact us, submit a referral, or apply for a position. This may include your name, email address, phone number, and any information included in your message.</p>
            </div>
            <div>
              <h2 className="text-xl font-medium text-foreground mb-3">How We Use Your Information</h2>
              <p>We use the information we collect to respond to your enquiries, process referrals, manage employment applications, and improve our services. We do not sell or share your personal information with third parties for marketing purposes.</p>
            </div>
            <div>
              <h2 className="text-xl font-medium text-foreground mb-3">Data Security</h2>
              <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction.</p>
            </div>
            <div>
              <h2 className="text-xl font-medium text-foreground mb-3">Your Rights</h2>
              <p>Under the UK GDPR, you have the right to access, rectify, or erase your personal data. You may also object to processing or request data portability. To exercise these rights, please contact us at enquiry@chamarelhealthcare.com.</p>
            </div>
            <div>
              <h2 className="text-xl font-medium text-foreground mb-3">Contact</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:enquiry@chamarelhealthcare.com" className="text-primary underline">enquiry@chamarelhealthcare.com</a>.</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  </Layout>
);

export default Privacy;
