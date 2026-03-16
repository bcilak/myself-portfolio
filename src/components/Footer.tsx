import { Link } from "@/i18n/routing";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 dark:border-white/5 bg-white dark:bg-[#080b11]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-2">
              <span className="gradient-text">Barış</span>
              <span className="text-slate-600 dark:text-slate-400">Çilak</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed">
              Backend Developer & Automation Engineer. Building intelligent
              systems with Python, AI, and modern backend technologies.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-slate-700 dark:text-slate-300 font-semibold mb-3 text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/projects", label: "Projects" },
                { href: "/blog", label: "Blog" },
                { href: "/case-studies", label: "Case Studies" },
                { href: "/tech-stack", label: "Tech Stack" },
                { href: "/resume", label: "Resume" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-500 dark:text-slate-500 hover:text-cyan-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-slate-700 dark:text-slate-300 font-semibold mb-3 text-sm uppercase tracking-wider">
              Connect
            </h4>
            <ul className="space-y-2">
              {[
                {
                  href: "https://github.com/bariscilak",
                  label: "GitHub",
                  icon: "🐙",
                },
                {
                  href: "https://linkedin.com/in/bariscilak",
                  label: "LinkedIn",
                  icon: "💼",
                },
                {
                  href: "mailto:bariscilak@email.com",
                  label: "Email",
                  icon: "✉️",
                },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-2 text-slate-500 dark:text-slate-500 hover:text-cyan-400 text-sm transition-colors"
                  >
                    <span>{link.icon}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-black/5 dark:border-white/5 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-600 text-sm">
            © {year} Barış Çilak. All rights reserved.
          </p>
          <p className="text-slate-700 text-xs">
            Built with Next.js · TailwindCSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
