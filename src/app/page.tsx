"use client";

import { useEffect, useRef, useState } from "react";
import Cursor from "@/components/Cursor";
import ProjectCard from "@/components/ProjectCard";
import { projects, skills } from "@/data/projects";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category.split(" / ")[0]))),
  ];
  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <Cursor />

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .hero-section { padding: 0 20px !important; }
          .hero-h1 { font-size: clamp(40px, 12vw, 80px) !important; }
          .hero-stats {
            position: static !important;
            justify-content: flex-start !important;
            gap: 24px !important;
            margin-top: 40px !important;
          }
          .hero-scroll-indicator { display: none !important; }
          .section-pad { padding: 60px 20px !important; }
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .skills-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-inner {
            flex-direction: column !important;
            gap: 8px !important;
            text-align: center !important;
          }
          .contact-email-btn {
            font-size: 14px !important;
            padding: 14px 24px !important;
          }
          .section-header-row {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .nav-inner { padding: 18px 20px !important; }
        }

        @media (max-width: 480px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-h1 { font-size: clamp(34px, 11vw, 60px) !important; }
          .hero-stats { gap: 20px !important; }
        }

        .mobile-menu {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99;
          background: rgba(8,8,8,0.97);
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 32px;
        }
        .mobile-menu.open { display: flex; }

        .hamburger-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          z-index: 101;
        }
        .hamburger-btn span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--text-primary);
          transition: all 0.25s ease;
        }
        .hamburger-btn.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .hamburger-btn.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger-btn.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }
      `}</style>

      {/* ── MOBILE MENU OVERLAY ─────────────────── */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {["Work", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 20,
              color: "var(--text-primary)",
              textDecoration: "none",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {item}
          </a>
        ))}
        <a
          href="mailto:hello@kay.dev"
          onClick={() => setMenuOpen(false)}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            background: "var(--accent)",
            color: "#000",
            padding: "12px 28px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: 600,
            letterSpacing: "0.03em",
            marginTop: 8,
          }}
        >
          Hire me
        </a>
      </div>

      {/* ── NAV ─────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <div
          className="nav-inner"
          style={{
            padding: "18px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--accent)",
                boxShadow: "0 0 12px var(--accent)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 16,
                letterSpacing: "-0.03em",
              }}
            >
              April26
            </span>
          </div>

          {/* Desktop links */}
          <div
            className="nav-links"
            style={{ display: "flex", gap: "32px", alignItems: "center" }}
          >
            {["Work", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color =
                    "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color =
                    "var(--text-secondary)")
                }
              >
                {item}
              </a>
            ))}
            <a
              href="mailto:hello@kay.dev"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                background: "var(--accent)",
                color: "#000",
                padding: "8px 16px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: 600,
                letterSpacing: "0.03em",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.opacity = "0.85")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.opacity = "1")
              }
            >
              Hire me
            </a>
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger-btn nav-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <main style={{ minHeight: "100vh" }}>
        {/* ── HERO ────────────────────────────────── */}
        <section
          ref={heroRef}
          id="hero"
          className="hero-section"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 40px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src="/portVideo.mp4" type="video/mp4" />
          </video>

          <div
            style={{
              position: "absolute",
              top: "20%",
              right: "-10%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(232,255,71,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.80)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          <div style={{ maxWidth: "100%", position: "relative", zIndex: 2 }}>
            <p
              className="animate-fade-up delay-1"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 24,
              }}
            >
              ✦ Available for work · 2026
            </p>

            <h1
              className="animate-fade-up delay-2 hero-h1"
              style={{
                fontSize: "clamp(52px, 8vw, 110px)",
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                marginBottom: 32,
              }}
            >
              Creative
              <br />
              <span style={{ color: "var(--accent)" }}>Developer</span>
              <br />& Designer
            </h1>

            <p
              className="animate-fade-up delay-3"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 15,
                color: "var(--text-secondary)",
                maxWidth: 480,
                lineHeight: 1.7,
                marginBottom: 48,
              }}
            >
              I craft high-quality digital experiences, from pixel-perfect
              interfaces to production-grade web applications. Based in Lagos,
              shipping globally.
            </p>

            <div
              className="animate-fade-up delay-4"
              style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
            >
              <a
                href="#work"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 28px",
                  background: "var(--accent)",
                  color: "#000",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: "-0.01em",
                  transition: "transform 0.2s, opacity 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.transform = "scale(1)")
                }
              >
                View Work ↓
              </a>
              <a
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 28px",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 14,
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.target as HTMLElement;
                  el.style.borderColor = "var(--accent)";
                  el.style.background = "var(--accent-dim)";
                }}
                onMouseLeave={(e) => {
                  const el = e.target as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.background = "transparent";
                }}
              >
                Get in Touch
              </a>
            </div>

            {/* Stats — inside content flow on mobile */}
            <div
              className="animate-fade-in delay-5 hero-stats"
              style={{
                position: "absolute",
                bottom: -160,
                right: 40,
                display: "flex",
                gap: 40,
                zIndex: 2,
              }}
            >
              {[
                { value: "6+", label: "Years Exp." },
                { value: "30+", label: "Projects" },
                { value: "20+", label: "Clients" },
              ].map((stat) => (
                <div key={stat.label} className="text-right">
                  <div
                    style={{
                      color: "var(--accent)",
                    }}
                    className={`text-xl lg:text-2xl 2xl:text-3xl font-extrabold tracking-tighter`}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--text-muted)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="animate-fade-in delay-5 hero-scroll-indicator"
            style={{
              position: "absolute",
              bottom: 40,
              left: 40,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 1,
                height: 60,
                background:
                  "linear-gradient(to bottom, var(--border), transparent)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                writingMode: "vertical-rl",
              }}
            >
              Scroll to explore
            </span>
          </div>
        </section>

        {/* ── MARQUEE ─────────────────────────────── */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            padding: "14px 0",
            overflow: "hidden",
            background: "var(--surface)",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "max-content",
              animation: "marquee 20s linear infinite",
            }}
          >
            {[...skills, ...skills].map((skill, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: i % 4 === 0 ? "var(--accent)" : "var(--text-muted)",
                  marginRight: 48,
                  whiteSpace: "nowrap",
                }}
              >
                {i % 3 === 0 ? "✦ " : "· "}
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* ── PROJECTS ────────────────────────────── */}
        <section
          id="work"
          className="section-pad"
          style={{ padding: "100px 40px" }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div
              className="section-header-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 48,
                flexWrap: "wrap",
                gap: 24,
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: 10,
                  }}
                >
                  Selected work
                </p>
                <h2
                  style={{
                    fontSize: "clamp(36px, 4vw, 56px)",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  Projects
                </h2>
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.06em",
                      padding: "7px 14px",
                      borderRadius: 6,
                      border: "1px solid",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      background:
                        activeFilter === cat ? "var(--accent)" : "transparent",
                      color:
                        activeFilter === cat ? "#000" : "var(--text-secondary)",
                      borderColor:
                        activeFilter === cat
                          ? "var(--accent)"
                          : "var(--border)",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--text-muted)",
                marginBottom: 28,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>⬡</span> Hover a card to preview details & links
            </p>

            <div
              className="projects-grid"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(320px, 100%), 1fr))",
                gap: 20,
              }}
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ───────────────────────────────── */}
        <section
          id="about"
          className="section-pad"
          style={{
            padding: "100px 40px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            className="about-grid"
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: 10,
                }}
              >
                About
              </p>
              <h2
                style={{
                  fontSize: "clamp(36px, 4vw, 52px)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: 24,
                }}
              >
                Building the
                <br />
                <span style={{ color: "var(--accent)" }}>web that</span>
                <br />
                moves people
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  marginBottom: 16,
                }}
              >
                I&apos;m Kayode, a frontend-focused developer with a
                designer&apos;s eye. I obsess over the details:
                micro-interactions, performance, typography, and the feeling a
                product gives people.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                }}
              >
                Currently open to freelance projects and full-time roles.
                Let&apos;s build something remarkable.
              </p>
            </div>

            <div
              className="skills-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {[
                {
                  title: "Frontend Dev",
                  icon: "⬡",
                  desc: "React, Next.js, TypeScript",
                },
                {
                  title: "UI Design",
                  icon: "◈",
                  desc: "Figma, design systems",
                },
                { title: "Animation", icon: "◎", desc: "GSAP, Framer Motion" },
                {
                  title: "Full Stack",
                  icon: "⬬",
                  desc: "Node.js, databases, APIs",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: 20,
                    transition: "border-color 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--accent)";
                    el.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      fontSize: 22,
                      color: "var(--accent)",
                      marginBottom: 10,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      marginBottom: 4,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ─────────────────────────────── */}
        <section
          id="contact"
          className="section-pad"
          style={{
            padding: "100px 40px",
            borderTop: "1px solid var(--border)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(232,255,71,0.05) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 16,
            }}
          >
            Get in touch
          </p>
          <h2
            style={{
              fontSize: "clamp(40px, 6vw, 80px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              marginBottom: 24,
            }}
          >
            Let&apos;s work
            <br />
            together
          </h2>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--text-secondary)",
              marginBottom: 40,
            }}
          >
            Open to freelance, contracts & full-time opportunities.
          </p>
          <a
            href="mailto:onakoyakayode@gmail.com"
            className="contact-email-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 36px",
              background: "var(--accent)",
              color: "#000",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 800,
              fontSize: 16,
              letterSpacing: "-0.02em",
              transition: "transform 0.2s",
              wordBreak: "break-all",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.transform = "scale(1.04)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.transform = "scale(1)")
            }
          >
            hello@kay.dev ↗
          </a>

          <div
            style={{
              display: "flex",
              gap: 24,
              justifyContent: "center",
              marginTop: 40,
              flexWrap: "wrap",
            }}
          >
            {[
              { name: "GitHub", url: "https://github.com/onakoyakayode" },
              { name: "Twitter", url: "https://twitter.com/kayodeonakoya26" },
              {
                name: "LinkedIn",
                url: "https://linkedin.com/in/onakoyaoluwakayode/",
              },
            ].map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color =
                    "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--text-muted)")
                }
              >
                {link.name}
              </a>
            ))}
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────── */}
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            padding: "24px 40px",
          }}
        >
          <div
            className="footer-inner"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text-muted)",
              }}
            >
              © 2026 Kay. All rights reserved.
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text-muted)",
              }}
            >
              Built with Next.js & ♥
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
