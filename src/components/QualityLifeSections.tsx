import { CheckCircle } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const TealDivider = () => (
  <div className="my-5">
    <hr className="w-[60px] border-0 h-[1px]" style={{ backgroundColor: "#00706B" }} />
  </div>
);

const CheckItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2.5 text-sm" style={{ color: "#555" }}>
    <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#00706B" }} />
    <span className="leading-relaxed">{text}</span>
  </li>
);

const sections = [
  {
    heading: "Our Commitment to Total Quality Management",
    subheading: "Seamless, consistent, excellence-driven care — every single day",
    body: "At Chamarel Healthcare, we believe in Total Quality Management across every aspect of our service. From the moment a referral is received to the daily rhythms of life in our home, every interaction is held to the highest standard. We conduct regular spot checks on our staff, liaise closely with other care homes, NHS teams and wider stakeholders, and continually review our practices to ensure nothing is ever left to chance. Person-centred care is not a phrase we use lightly — it is the foundation of every decision we make.",
    bullets: [
      "Regular staff spot checks and quality audits",
      "Close liaison with care homes, ICBs, NHS and social work teams",
      "Seamless handovers and consistent support across all shifts",
      "Person-centred care embedded in every care plan and daily interaction",
    ],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600",
  },
  {
    heading: "Our Team — Trained, Committed, Exceptional",
    subheading: "We invest in our people because great care starts with great staff",
    body: "Every member of the Chamarel Healthcare team undergoes regular training and refresher courses — both online and delivered in-house by specialist practitioners. Our training covers safeguarding, Positive Behaviour Support (PBS), trauma-informed practice, first aid, medication management and more. Staff also participate in activities alongside the people they support, building genuine relationships that go far beyond professional duty.",
    bullets: [
      "Online and in-house training programmes",
      "Regular refresher courses and CPD",
      "PBS and trauma-informed practice at the core",
      "Staff spot checks and performance reviews",
      "Staff participate in activities, outings and celebrations alongside residents",
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600",
  },
  {
    heading: "Independence — Built Every Day",
    subheading: "We don't just talk about independence. We actively build it.",
    body: "At Chamarel Healthcare, promoting independence is not an aspiration — it is a daily practice. Every person we support is encouraged and enabled to make real choices about their own life, environment and future.",
    bullets: [
      "Residents choose their own belongings — colours of blankets, pillows, cushions and room décor",
      'Residents are consulted on changes to the home: "What would you like to see different?"',
      "Financial independence supported through real-world shopping and budgeting experiences",
      "Residents involved in the upkeep and personalisation of the care home environment",
      "Three of our residents have formed their own relationships — we actively support them with dedicated outings and a gradual, dignified pathway to greater independence",
    ],
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600",
  },
  {
    heading: "More Than Care — A Place to Belong",
    subheading: "Every person is seen, celebrated and valued here",
    body: "Chamarel Healthcare is not just a place to receive support — it is a home. A community. A place where milestones are celebrated, relationships are respected, and every individual is genuinely known. We celebrate birthdays for residents and staff alike, with cakes baked together as a community. We honour faith and culture. We support love and friendship. And we never stop asking: how can we make life here even better?",
    bullets: [],
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=600",
  },
];

const weeklyActivities = [
  { emoji: "☕", text: "Weekly local café visits" },
  { emoji: "🛒", text: "Sunday market visits" },
  { emoji: "🍞", text: "Regular baking classes" },
  { emoji: "🎭", text: "Cinema trips, park visits and theatre outings" },
  { emoji: "🙏", text: "Church visits and faith-based activities" },
];

const specialEvents = [
  { emoji: "☀️", text: "Summer BBQ and summer themed party" },
  { emoji: "🐣", text: "Easter bonnet party" },
  { emoji: "💛", text: "Valentine's Day party" },
  { emoji: "🎂", text: "Birthdays celebrated for residents and staff" },
  { emoji: "🍰", text: "Residents help bake birthday cakes together" },
  { emoji: "✈️", text: "Supported holidays and day visits" },
];

const QualityLifeSections = () => (
  <>
    {/* Sections 1, 2, 4, 5 — alternating layout */}
    {sections.map((section, i) => {
      const reversed = i % 2 !== 0;
      return (
        <section
          key={i}
          className="py-16 md:py-20"
          style={i % 2 !== 0 ? { backgroundColor: "#F9F7F4" } : undefined}
        >
          <div className="container-narrow">
            <div className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center`}>
              {/* Image */}
              <FadeIn delay={0.1} className={reversed ? "md:order-2" : ""}>
                <div className="flex justify-center">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden bg-accent/20">
                    <img src={section.image} alt={section.heading} className="w-full h-full object-cover" />
                  </div>
                </div>
              </FadeIn>

              {/* Text */}
              <FadeIn delay={0.2} className={reversed ? "md:order-1" : ""}>
                <div>
                  <h3 className="text-2xl md:text-3xl font-medium mb-2">{section.heading}</h3>
                  <p className="font-medium text-sm mb-5" style={{ color: "#00706B" }}>{section.subheading}</p>
                  <p className="leading-relaxed mb-4 text-sm" style={{ color: "#555" }}>{section.body}</p>

                  {section.bullets.length > 0 && (
                    <>
                      <TealDivider />
                      <ul className="space-y-2.5 mb-5">
                        {section.bullets.map((b, bi) => (
                          <CheckItem key={bi} text={b} />
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      );
    })}

    {/* Section 3 — Activities & Community Life (special two-column layout) */}
    <section className="py-16 md:py-20">
      <div className="container-narrow">
        <FadeIn>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-medium mb-2">Life at Chamarel — Every Day Full of Meaning</h3>
            <p className="font-medium text-sm mb-4" style={{ color: "#00706B" }}>
              A rich calendar of activities, outings and celebrations throughout the year
            </p>
            <p className="leading-relaxed text-sm max-w-3xl mx-auto" style={{ color: "#555" }}>
              We believe that life should be full — not just supported. At Chamarel Healthcare, we run a rich and varied programme of activities, outings and seasonal celebrations that give the people we support things to look forward to every single week.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn delay={0.1}>
            <div className="bg-card rounded-2xl p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <h4 className="font-semibold text-sm mb-4" style={{ color: "#00706B" }}>Weekly & Regular</h4>
              <ul className="space-y-3">
                {weeklyActivities.map((a, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm" style={{ color: "#555" }}>
                    <span className="text-lg">{a.emoji}</span>
                    <span className="leading-relaxed">{a.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="bg-card rounded-2xl p-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <h4 className="font-semibold text-sm mb-4" style={{ color: "#00706B" }}>Special Events & Celebrations</h4>
              <ul className="space-y-3">
                {specialEvents.map((a, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm" style={{ color: "#555" }}>
                    <span className="text-lg">{a.emoji}</span>
                    <span className="leading-relaxed">{a.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* CTA Banner */}
    <section className="py-16" style={{ backgroundColor: "#00706B" }}>
      <div className="container-narrow text-center">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-medium text-white mb-3">
            Want to know more about life at Chamarel?
          </h2>
          <p className="text-white/85 mb-8">
            Get in touch with our team — we'd love to show you around.
          </p>
          <a
            href="/#get-in-touch"
            className="inline-block px-8 py-4 bg-white rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg"
            style={{ color: "#00706B" }}
          >
            Contact Us
          </a>
        </FadeIn>
      </div>
    </section>
  </>
);

export default QualityLifeSections;
