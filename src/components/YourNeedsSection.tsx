import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import gardeningPairImg from "@/assets/photos/gardening-pair.png";

const needs = [
  {
    title: "Autism Support",
    subtitle: "Structured, sensory-aware support that celebrates every individual",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    bg: "bg-accent/20",
    cta: "Find Out More",
    path: "#contact",
    body: "At Chamarel Healthcare, we understand that every autistic person experiences the world differently. Our specialist autism support is built around each individual's unique communication style, sensory preferences, and personal strengths — never a one-size-fits-all approach.",
    bullets: [
      "Structured daily routines that create predictability, safety, and confidence",
      "Sensory-aware environments designed to reduce overwhelm and promote calm",
      "Communication support including AAC, visual schedules, and social stories",
      "Positive Behaviour Support (PBS) strategies co-produced with the individual and their family",
      "Community integration support — helping people access education, employment, and social opportunities",
      "Staff trained in autism-specific approaches, including low arousal techniques and trauma-informed practice",
    ],
    closing: "Our goal is to help every autistic person we support to live a life full of meaning, connection, and joy — on their own terms.",
  },
  {
    title: "Learning Disabilities Support",
    subtitle: "Empowering adults to live with confidence, independence, and purpose",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=400",
    bg: "bg-amber-100",
    cta: "Find Out More",
    path: "#contact",
    body: "We provide specialist, values-led support for adults with mild, moderate, and profound learning disabilities. Our approach is rooted in Positive Behaviour Support (PBS) and person-centred planning — ensuring every individual is at the heart of decisions about their own life.",
    bullets: [
      "Fully co-produced care plans developed with the individual, their family, and professional network",
      "Independence training covering daily living skills, cooking, budgeting, and self-advocacy",
      "Access to college, volunteering, and supported employment pathways",
      "Therapeutic activities including art therapy, hydrotherapy, music, and sensory integration",
      "Community inclusion — supported outings, social groups, and meaningful activities",
      "Technology-enabled support to enhance communication, safety, and independence",
    ],
    closing: "We look beyond labels. We see strengths, potential, and the right of every person to live the life they choose.",
  },
  {
    title: "Mental Health Support",
    subtitle: "Compassionate, trauma-informed care focused on recovery and belonging",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
    bg: "bg-purple-100",
    cta: "Find Out More",
    path: "#contact",
    body: `Our mental health support services are designed for adults with complex mental health needs who require more than clinical intervention — they need consistency, compassion, and a team that truly understands their journey.

We embed trauma-informed practice and Positive Behaviour Support (PBS) into every care plan, creating psychologically safe environments where people feel heard, respected, and empowered to recover.`,
    bullets: [
      "Individualised support plans co-produced with the person, their family, and their clinical team",
      "Therapeutic activities including art therapy, mindfulness, hydrotherapy, and sensory integration",
      "Crisis prevention planning and proactive de-escalation using PBS strategies",
      "Community integration and social engagement to reduce isolation and build a sense of belonging",
      "Access to education, college, and supported employment for those on a recovery pathway",
      "CQC-regulated services delivered by emotionally intelligent, highly trained support workers",
    ],
    closing: "We believe mental health care should be relational, inclusive, and future-focused — helping each person move from surviving to truly thriving.",
  },
];

interface Props {
  /** Show only the compact homepage version */
  homepage?: boolean;
}

const YourNeedsSection = ({ homepage = false }: Props) => (
  <>
    {needs.map((need, i) => {
      const reversed = i % 2 !== 0;
      const bgColor = i % 2 === 0 ? "bg-background" : "";

      return (
        <section
          key={need.path}
          className={`py-16 md:py-20 ${bgColor}`}
          style={i % 2 !== 0 ? { backgroundColor: "#F9F7F4" } : undefined}
        >
          <div className="container-narrow">
            <div className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${reversed ? "md:direction-rtl" : ""}`}>
              {/* Image */}
              <FadeIn delay={0.1} className={reversed ? "md:order-2" : ""}>
                <div className="flex justify-center">
                  <div className={`${need.bg} w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden`}>
                    <img src={need.image} alt={need.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </FadeIn>

              {/* Text */}
              <FadeIn delay={0.2} className={reversed ? "md:order-1" : ""}>
                <div className="md:direction-ltr">
                  <h3 className="text-2xl md:text-3xl font-medium mb-2">{need.title}</h3>
                  <p className="text-accent font-medium text-sm mb-5">{need.subtitle}</p>

                  {need.body.split("\n\n").map((para, pi) => (
                    <p key={pi} className="text-foreground/80 leading-relaxed mb-4 text-sm">{para}</p>
                  ))}

                  {!homepage && (
                    <>
                      <p className="text-foreground/80 leading-relaxed mb-2 text-sm font-medium">We provide:</p>
                      <ul className="space-y-2 mb-5">
                        {need.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-2 text-sm text-foreground/80">
                            <span className="text-accent mt-1 flex-shrink-0">•</span>
                            <span className="leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-foreground/80 leading-relaxed mb-6 text-sm italic">{need.closing}</p>
                    </>
                  )}

                  <a
                    href={need.path}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:-translate-y-0.5 transition-all duration-250 hover:shadow-lg"
                  >
                    {need.cta} <ArrowRight size={16} />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      );
    })}
  </>
);

export default YourNeedsSection;
