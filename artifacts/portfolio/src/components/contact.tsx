import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Github, Linkedin, Send, Download, CheckCircle } from "lucide-react";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Form data:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8" aria-label="Contact section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Get in Touch
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-4" data-testid="heading-contact">
            Let's build something
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
            Whether it's an internship, a freelance project, or just a conversation about AI —
            I'm always open to the right opportunity.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="font-bold text-lg mb-4">Contact info</h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "rahmanadnan412@gmail.com", href: "mailto:rahmanadnan412@gmail.com" },
                  { icon: MapPin, label: "Location", value: "Bihar, India", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-3" data-testid={`contact-info-${label.toLowerCase()}`}>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{label}</div>
                      {href ? (
                        <a href={href} className="text-sm font-medium hover:text-primary transition-colors">{value}</a>
                      ) : (
                        <div className="text-sm font-medium">{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-widest mb-3">Socials</h3>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: "https://github.com/FaizulRahman786", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com/in/faizul-rahman-87974b397", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:rahmanadnan412@gmail.com", label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    aria-label={label}
                    data-testid={`link-contact-${label.toLowerCase()}`}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.a
              href="/resume.pdf"
              download
              className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all group"
              whileHover={{ y: -3 }}
              data-testid="button-download-resume-contact"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Download className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold">Download Resume</div>
                <div className="text-xs text-muted-foreground">PDF · Updated 2026</div>
              </div>
            </motion.a>

            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-semibold text-green-400">Available for work</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Open to freelance projects and full-time opportunities in Full Stack &amp; AI/ML development.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[400px] rounded-2xl border border-green-500/30 bg-green-500/10 flex flex-col items-center justify-center gap-4 p-8 text-center"
                data-testid="form-success-message"
              >
                <CheckCircle className="w-12 h-12 text-green-400" />
                <h3 className="text-xl font-bold">Message sent!</h3>
                <p className="text-muted-foreground text-sm">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 p-6 rounded-2xl border border-border bg-card"
                data-testid="form-contact"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                      Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="name"
                      {...register("name")}
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                      data-testid="input-contact-name"
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive mt-1" role="alert">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                      data-testid="input-contact-email"
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1" role="alert">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1.5">
                    Subject <span className="text-primary">*</span>
                  </label>
                  <input
                    id="subject"
                    {...register("subject")}
                    placeholder="What's this about?"
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    data-testid="input-contact-subject"
                  />
                  {errors.subject && (
                    <p className="text-xs text-destructive mt-1" role="alert">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register("message")}
                    placeholder="Tell me about the opportunity or project..."
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
                    data-testid="input-contact-message"
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive mt-1" role="alert">{errors.message.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid="button-submit-contact"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
