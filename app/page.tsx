"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

const SECTIONS = ["Home", "About", "Events", "Gallery", "Join"] as const;
type Section = (typeof SECTIONS)[number];

interface EventItem {
  title: string;
  date: string;
  time: string;
  location: string;
  tag: "Language" | "Tech" | "Culture" | "Career";
  emoji: string;
}

interface StatItem {
  label: string;
  value: string;
  icon: string;
}

interface GalleryItem {
  bg: string;
  label: string;
  icon: string;
}

interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

const events: EventItem[] = [
  {
    title: "Weekly English & Japanese Exchange",
    date: "Every Saturday",
    time: "2:00 PM - 4:00 PM",
    location: "Vancouver Public Library",
    tag: "Language",
    emoji: "🗣️",
  },
  {
    title: "Coding & Tech Meetup",
    date: "Every 2nd Wednesday",
    time: "6:30 PM - 8:30 PM",
    location: "Downtown Co-working Space",
    tag: "Tech",
    emoji: "💻",
  },
  {
    title: "Cultural Exchange Night",
    date: "Monthly - Last Friday",
    time: "7:00 PM - 9:00 PM",
    location: "Gastown Café",
    tag: "Culture",
    emoji: "🌏",
  },
  {
    title: "Career & Learning Q&A",
    date: "Bi-weekly Sunday",
    time: "1:00 PM - 3:00 PM",
    location: "Online (Zoom)",
    tag: "Career",
    emoji: "📈",
  },
];

const stats: StatItem[] = [
  { label: "Members", value: "4,700+", icon: "👥" },
  { label: "Events Held", value: "200+", icon: "🎉" },
  { label: "Countries", value: "30+", icon: "🌍" },
  { label: "Weekly Meetups", value: "3+", icon: "📅" },
];

const galleryImages: GalleryItem[] = [
  { bg: "linear-gradient(135deg, #FF8C00, #FF6B00)", label: "Language Exchange Night", icon: "🗣️" },
  { bg: "linear-gradient(135deg, #FF6B00, #E85D00)", label: "Coding Workshop", icon: "💻" },
  { bg: "linear-gradient(135deg, #FFa040, #FF7020)", label: "Cultural Festival", icon: "🎌" },
  { bg: "linear-gradient(135deg, #FF9530, #FF6B00)", label: "Group Hiking Trip", icon: "🏔️" },
  { bg: "linear-gradient(135deg, #E85D00, #CC5000)", label: "Career Panel", icon: "💼" },
  { bg: "linear-gradient(135deg, #FF7020, #FF8C00)", label: "Holiday Party", icon: "🎊" },
];

const features: FeatureItem[] = [
  {
    icon: "🍁",
    title: "English & Japanese Practice",
    desc: "Improve your language skills through real conversations with native speakers in a relaxed, welcoming environment.",
  },
  {
    icon: "💻",
    title: "Coding & Tech Sessions",
    desc: "Connect with fellow developers, share knowledge, and work on projects together in our tech meetups.",
  },
  {
    icon: "🎓",
    title: "Free for Students",
    desc: "Students enjoy free admission to all events. We believe in accessible community building for everyone.",
  },
  {
    icon: "🌏",
    title: "Cultural Exchange",
    desc: "Experience diverse perspectives from 30+ countries. Build genuine friendships across cultures.",
  },
];

function useInView(threshold: number = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

function AnimatedSection({ children, delay = 0, className = "" }: AnimatedSectionProps) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

interface NavbarProps {
  active: Section;
  onNav: (section: Section) => void;
}

function Navbar({ active, onNav }: NavbarProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(20,12,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,140,0,0.15)" : "none",
        transition: "all 0.4s ease",
        padding: "0 24px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => onNav("Home")}>
          <div style={{
            width: 42, height: 42, borderRadius: "50%",
            background: "linear-gradient(135deg, #FF8C00, #FF5500)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, fontWeight: 800, color: "#fff",
            boxShadow: "0 2px 12px rgba(255,140,0,0.4)",
          }}>🍁</div>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 20, color: "#fff", letterSpacing: "-0.02em" }}>
            Chit-Chat <span style={{ color: "#FF8C00" }}>Canada</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }} className="desktop-nav">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => onNav(s)}
              style={{
                background: active === s ? "rgba(255,140,0,0.15)" : "transparent",
                border: active === s ? "1px solid rgba(255,140,0,0.3)" : "1px solid transparent",
                color: active === s ? "#FF8C00" : "rgba(255,255,255,0.7)",
                padding: "8px 18px",
                borderRadius: 24,
                cursor: "pointer",
                fontFamily: "'Outfit', sans-serif",
                fontSize: 15,
                fontWeight: 500,
                transition: "all 0.3s ease",
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none", background: "none", border: "none", color: "#FF8C00",
            fontSize: 28, cursor: "pointer", padding: 4,
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: "rgba(20,12,8,0.97)", backdropFilter: "blur(20px)",
          padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 8,
        }} className="mobile-menu">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => { onNav(s); setMenuOpen(false); }}
              style={{
                background: active === s ? "rgba(255,140,0,0.15)" : "transparent",
                border: "none", color: active === s ? "#FF8C00" : "rgba(255,255,255,0.8)",
                padding: "12px 16px", borderRadius: 12, cursor: "pointer", textAlign: "left",
                fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 500,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function HeroSection(() {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  return (
    <section
      id="Home"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
      }}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "#0D0806",
      }}
    >
      {/* Animated gradient orbs */}
      <div style={{
        position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute",
          width: "60vmax", height: "60vmax", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,140,0,0.12) 0%, transparent 70%)",
          top: `${30 + mousePos.y * 10}%`, left: `${20 + mousePos.x * 15}%`,
          transform: "translate(-50%, -50%)",
          transition: "top 0.8s ease, left 0.8s ease",
          animation: "float1 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute",
          width: "45vmax", height: "45vmax", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,85,0,0.08) 0%, transparent 70%)",
          top: `${60 + mousePos.y * 8}%`, right: `${10 + mousePos.x * 10}%`,
          transform: "translate(50%, -50%)",
          transition: "top 0.8s ease, right 0.8s ease",
          animation: "float2 10s ease-in-out infinite",
        }} />
        {/* Grid pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: `linear-gradient(rgba(255,140,0,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,140,0,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div style={{
        position: "relative", zIndex: 2, textAlign: "center",
        padding: "120px 24px 80px", maxWidth: 900, margin: "0 auto",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(255,140,0,0.1)", border: "1px solid rgba(255,140,0,0.2)",
          borderRadius: 32, padding: "8px 20px", marginBottom: 32,
          animation: "fadeInDown 0.8s ease forwards",
        }}>
          <span style={{ fontSize: 14 }}>🇨🇦</span>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
            Vancouver's Community Meetup
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(42px, 7vw, 84px)",
          fontWeight: 800,
          color: "#fff",
          lineHeight: 1.05,
          margin: "0 0 24px",
          animation: "fadeInUp 0.8s ease 0.2s both",
        }}>
          Connect, Learn,{" "}
          <span style={{
            background: "linear-gradient(135deg, #FF8C00, #FF5500, #FF8C00)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% 200%",
            animation: "gradientShift 4s ease infinite",
          }}>
            Grow Together
          </span>
        </h1>

        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "clamp(16px, 2.2vw, 20px)",
          color: "rgba(255,255,255,0.6)",
          maxWidth: 600,
          margin: "0 auto 48px",
          lineHeight: 1.7,
          animation: "fadeInUp 0.8s ease 0.4s both",
        }}>
          A bilingual community in Vancouver for English & Japanese practice, coding, and cultural exchange.
          <br />
          <span style={{ color: "rgba(255,255,255,0.4)" }}>学生無料 · Free for Students</span>
        </p>

        <div style={{
          display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
          animation: "fadeInUp 0.8s ease 0.6s both",
        }}>
          <a
            href="https://www.meetup.com/an-effective-language-practice-english-japanese/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "linear-gradient(135deg, #FF8C00, #E06000)",
              color: "#fff", fontFamily: "'Outfit', sans-serif",
              fontWeight: 600, fontSize: 16, padding: "16px 36px",
              borderRadius: 40, textDecoration: "none",
              boxShadow: "0 4px 24px rgba(255,140,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,140,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(255,140,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
          >
            Join Our Meetup ↗
          </a>
          <a
            href="https://www.instagram.com/chit_chat_canada/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "rgba(255,140,0,0.08)",
              border: "1px solid rgba(255,140,0,0.25)",
              color: "#FF8C00", fontFamily: "'Outfit', sans-serif",
              fontWeight: 600, fontSize: 16, padding: "16px 36px",
              borderRadius: 40, textDecoration: "none",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,140,0,0.15)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,140,0,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            📸 Instagram
          </a>
        </div>

        {/* Stats row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 16,
          marginTop: 72,
          animation: "fadeInUp 0.8s ease 0.8s both",
        }}>
          {stats.map((s) => (
            <div key={s.label} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16, padding: "24px 16px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#FF8C00" }}>{s.value}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        animation: "bounce 2s ease infinite",
      }}>
        <div style={{ width: 24, height: 40, borderRadius: 12, border: "2px solid rgba(255,140,0,0.3)", display: "flex", justifyContent: "center", paddingTop: 8 }}>
          <div style={{ width: 3, height: 8, borderRadius: 2, background: "#FF8C00", animation: "scrollDot 2s ease infinite" }} />
        </div>
      </div>
    </section>
  );
}

function AboutSection(() {
  const [lang, setLang] = useState<"en" | "ja">("en");

  const story = {
    en: {
      p1: `Hiroki is a dedicated Brazilian Jiu-Jitsu instructor based in Vancouver, Canada. He leads both on and off the mats — as a BJJ instructor, software developer, ESL coach for Japanese students, and meetup community organizer.`,
      p2: `Having traveled to 4 English-speaking countries to train at international BJJ camps, Hiroki is a truly passionate educator at heart. In Japan, he used his English teaching credential (Middle & High School, grades 7–12) to provide compassionate support for students who felt estranged and outcast from Japanese society.`,
      p3: `Following his dream of educating from the human spirit, Hiroki came to Vancouver, where he tackled a Post-Degree programming and design program at a local public college. But as a student, his days were consumed by studying — no time to earn money, savings shrinking day by day. He felt isolated.`,
      p4: `That experience sparked a realization: studying hard was absolutely essential — but it wasn't enough on its own. He also needed community. A place to practice languages, share cultures, and support one another — without it costing a thing. That's exactly why Chit-Chat Canada is free for students.`,
      p5: `Today, Hiroki instructs Brazilian Jiu-Jitsu in Vancouver, guiding students of all levels while building software and running community meetups. Whether he's teaching a technique on the mats or organizing a language exchange event, his driving philosophy remains the same: growth through genuine human connection.`,
    },
    ja: {
      p1: `Hirokiはバンクーバーでブラジリアン柔術の指導者として活躍しています。カナダ・バンクーバーを拠点に、柔術指導者、ソフトウェアエンジニア、日本人向けESLコーチ、そしてMeetupコミュニティの主催者として、マットの上でも外でもリーダーシップを発揮しています。`,
      p2: `4つの英語圏の国を巡り、国際的なBJJトレーニングキャンプに参加してきたHirokiは、根っからの教育者です。日本では中学・高校（7〜12年生）の英語教員免許を活かし、日本社会で疎外感を感じていた生徒たちに寄り添い、心のこもったサポートを提供してきました。`,
      p3: `「人間の精神から教育する」という夢を追い、Hirokiはバンクーバーへ。地元の公立カレッジでプログラミングとデザインのPost-Degreeプログラムに挑みました。しかし学生時代は勉強に追われる毎日 — お金を稼ぐ時間もなく、貯金は減る一方。孤独を感じる日々でした。`,
      p4: `その経験から気づいたこと — 勉強に全力を注ぐのは当然のこと。でもそれだけでは足りなかった。同時に「居場所」も必要だったということ。言語を練習し、文化を共有し、支え合える場所。しかもお金がかからない場所。だからChit-Chat Canadaは学生無料なんです。`,
      p5: `現在、Hirokiはバンクーバーでブラジリアン柔術の指導者として、あらゆるレベルの生徒を導きながら、ソフトウェア開発とコミュニティMeetupの運営にも力を注いでいます。マットの上でテクニックを教える時も、言語交流イベントを主催する時も、根底にある信念は変わりません — 「人との繋がりを通じて成長する」こと。`,
    },
  };

  const s = story[lang];

  return (
    <section id="About" style={{ background: "#0D0806", padding: "100px 24px", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(255,140,0,0.2), transparent)",
      }} />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section Header */}
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600,
              color: "#FF8C00", letterSpacing: "0.15em", textTransform: "uppercase",
            }}>
              {lang === "en" ? "Our Story" : "私たちのストーリー"}
            </span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 700, color: "#fff", margin: "16px 0 0", lineHeight: 1.15,
            }}>
              {lang === "en" ? (
                <>How It All <span style={{ color: "#FF8C00" }}>Started</span></>
              ) : (
                <>すべての<span style={{ color: "#FF8C00" }}>始まり</span></>
              )}
            </h2>

            {/* Language Toggle */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 0,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 32, padding: 4, marginTop: 28,
            }}>
              {(["en", "ja"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "10px 24px", borderRadius: 28,
                    border: "none", cursor: "pointer",
                    background: lang === l
                      ? "linear-gradient(135deg, rgba(255,140,0,0.2), rgba(255,85,0,0.15))"
                      : "transparent",
                    boxShadow: lang === l ? "0 2px 12px rgba(255,140,0,0.15)" : "none",
                    transition: "all 0.3s ease",
                    fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600,
                    color: lang === l ? "#FF8C00" : "rgba(255,255,255,0.4)",
                  }}
                >
                  <span style={{ fontSize: 16 }}>{l === "en" ? "🇬🇧" : "🇯🇵"}</span>
                  {l === "en" ? "English" : "日本語"}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Founder Card */}
        <AnimatedSection delay={0.15}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 340px) 1fr",
            gap: 48,
            alignItems: "start",
          }} className="founder-grid">
            {/* Profile Side */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
              <div style={{
                width: 200, height: 200, borderRadius: "50%",
                boxShadow: "0 8px 40px rgba(255,140,0,0.25)",
                position: "relative",
                overflow: "hidden",
                border: "3px solid rgba(255,140,0,0.3)",
              }}>
                <img
                  src="/hiroki.jpg"
                  alt="Hiroki Takaya"
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                  }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.08), transparent 60%)",
                }} />
              </div>

              <div style={{ textAlign: "center" }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700,
                  color: "#fff", margin: "0 0 4px",
                }}>Hiroki Takaya</h3>
                <p style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 14,
                  color: "#FF8C00", fontWeight: 500, margin: "0 0 16px",
                }}>Founder & Owner</p>
              </div>

              {/* Role Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {[
                  { en: "🥋 BJJ Instructor", ja: "柔術指導者" },
                  { en: "💻 Software Engineer", ja: "ソフトウェアエンジニア" },
                  { en: "📚 Licensed English Teacher", ja: "英語教員免許保持" },
                  { en: "🌏 ESL Coach", ja: "ESLコーチ" },
                  { en: "🍁 Community Organizer", ja: "コミュニティ主催者" },
                ].map((role) => (
                  <div key={role.en} style={{
                    background: "rgba(255,140,0,0.08)",
                    border: "1px solid rgba(255,140,0,0.15)",
                    borderRadius: 12, padding: "8px 16px",
                    textAlign: "center",
                  }}>
                    <div style={{
                      fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600,
                      color: "rgba(255,255,255,0.85)",
                    }}>{lang === "en" ? role.en : role.en}</div>
                    <div style={{
                      fontFamily: "'Outfit', sans-serif", fontSize: 11,
                      color: "rgba(255,255,255,0.35)", marginTop: 2,
                    }}>{role.ja}</div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                {[
                  { label: "Instagram", url: "https://www.instagram.com/japaneseflash", icon: "📸" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10, padding: "8px 14px",
                      textDecoration: "none",
                      fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 500,
                      color: "rgba(255,255,255,0.5)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,140,0,0.3)"; e.currentTarget.style.color = "#FF8C00"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                  >
                    <span>{link.icon}</span> {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Story Side */}
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20, padding: "40px 36px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, width: 4, height: "100%",
                background: lang === "en"
                  ? "linear-gradient(180deg, #FF8C00, #FF5500)"
                  : "linear-gradient(180deg, #FF5500, #CC4400)",
                borderRadius: "4px 0 0 4px",
                transition: "background 0.3s ease",
              }} />

              <div style={{
                display: "flex", flexDirection: "column", gap: 18,
                transition: "opacity 0.3s ease",
              }}>
                {[s.p1, s.p2, s.p3, s.p4, s.p5].map((paragraph, i) => (
                  <p key={`${lang}-${i}`} style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: 16,
                    color: "rgba(255,255,255,0.7)", lineHeight: 1.85, margin: 0,
                  }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Features Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
          marginTop: 72,
        }}>
          {features.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 0.12}>
              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 20,
                  padding: "36px 28px",
                  transition: "all 0.4s ease",
                  cursor: "default",
                  height: "100%",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(255,140,0,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,140,0,0.2)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: "rgba(255,140,0,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28, marginBottom: 20,
                }}>{f.icon}</div>
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 600,
                  color: "#fff", margin: "0 0 12px",
                }}>{f.title}</h3>
                <p style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 15,
                  color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0,
                }}>{f.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .founder-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}

function EventsSection(() {
  const tagColors: Record<EventItem["tag"], { bg: string; text: string }> = {
    Language: { bg: "rgba(255,140,0,0.12)", text: "#FF8C00" },
    Tech: { bg: "rgba(0,180,255,0.12)", text: "#00B4FF" },
    Culture: { bg: "rgba(255,60,120,0.12)", text: "#FF3C78" },
    Career: { bg: "rgba(0,220,130,0.12)", text: "#00DC82" },
  };

  return (
    <section id="Events" style={{ background: "#0A0604", padding: "100px 24px", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600,
              color: "#FF8C00", letterSpacing: "0.15em", textTransform: "uppercase",
            }}>
              Upcoming Events · イベント
            </span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 700, color: "#fff", margin: "16px 0 0", lineHeight: 1.15,
            }}>
              Join Our Next <span style={{ color: "#FF8C00" }}>Meetup</span>
            </h2>
          </div>
        </AnimatedSection>

        <div style={{ display: "grid", gap: 16 }}>
          {events.map((ev, i) => (
            <AnimatedSection key={ev.title} delay={i * 0.1}>
              <div
                style={{
                  display: "flex", alignItems: "center", gap: 20,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16, padding: "24px 28px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  flexWrap: "wrap",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(255,140,0,0.25)";
                  e.currentTarget.style.background = "rgba(255,140,0,0.03)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: "rgba(255,140,0,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, flexShrink: 0,
                }}>{ev.emoji}</div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <h3 style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 600,
                    color: "#fff", margin: "0 0 6px",
                  }}>{ev.title}</h3>
                  <p style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: 14,
                    color: "rgba(255,255,255,0.4)", margin: 0,
                  }}>
                    {ev.date} · {ev.time} · {ev.location}
                  </p>
                </div>
                <span style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600,
                  padding: "6px 14px", borderRadius: 20,
                  background: tagColors[ev.tag]?.bg,
                  color: tagColors[ev.tag]?.text,
                }}>
                  {ev.tag}
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection(() {
  return (
    <section id="Gallery" style={{ background: "#0D0806", padding: "100px 24px", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600,
              color: "#FF8C00", letterSpacing: "0.15em", textTransform: "uppercase",
            }}>
              Our Community
            </span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 700, color: "#fff", margin: "16px 0 0", lineHeight: 1.15,
            }}>
              Moments We <span style={{ color: "#FF8C00" }}>Share</span>
            </h2>
          </div>
        </AnimatedSection>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}>
          {galleryImages.map((img, i) => (
            <AnimatedSection key={img.label} delay={i * 0.08}>
              <div
                style={{
                  background: img.bg,
                  borderRadius: 16,
                  aspectRatio: "4/3",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.4s ease",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                <div style={{
                  position: "absolute", inset: 0, opacity: 0.1,
                  backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 60%)`,
                }} />
                <span style={{ fontSize: 48, marginBottom: 12, position: "relative" }}>{img.icon}</span>
                <span style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 600,
                  color: "rgba(255,255,255,0.9)", position: "relative",
                }}>{img.label}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinSection(() {
  return (
    <section id="Join" style={{ background: "#0A0604", padding: "100px 24px", position: "relative" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <AnimatedSection>
          <div style={{
            background: "linear-gradient(135deg, rgba(255,140,0,0.08), rgba(255,85,0,0.04))",
            border: "1px solid rgba(255,140,0,0.15)",
            borderRadius: 28,
            padding: "64px 40px",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -60, right: -60,
              width: 200, height: 200, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,140,0,0.1), transparent 70%)",
            }} />
            <div style={{
              position: "absolute", bottom: -40, left: -40,
              width: 160, height: 160, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,85,0,0.08), transparent 70%)",
            }} />

            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 4.5vw, 44px)",
              fontWeight: 700, color: "#fff",
              margin: "0 0 16px", lineHeight: 1.2,
              position: "relative",
            }}>
              Ready to <span style={{ color: "#FF8C00" }}>Join</span>?
            </h2>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 17, color: "rgba(255,255,255,0.55)",
              margin: "0 0 36px", lineHeight: 1.7,
              position: "relative",
            }}>
              Come meet our community at the next event. Everyone is welcome — no matter your language level, background, or experience.
              <br />
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 15 }}>
                次のイベントでお会いしましょう！
              </span>
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
              <a
                href="https://www.meetup.com/an-effective-language-practice-english-japanese/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "linear-gradient(135deg, #FF8C00, #E06000)",
                  color: "#fff", fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600, fontSize: 16, padding: "16px 32px",
                  borderRadius: 40, textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(255,140,0,0.3)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                Meetup ↗
              </a>
              <a
                href="https://www.instagram.com/chit_chat_canada/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(255,140,0,0.08)",
                  border: "1px solid rgba(255,140,0,0.25)",
                  color: "#FF8C00", fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600, fontSize: 16, padding: "16px 32px",
                  borderRadius: 40, textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,140,0,0.15)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,140,0,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Instagram
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Footer(() {
  return (
    <footer style={{
      background: "#080504",
      borderTop: "1px solid rgba(255,255,255,0.04)",
      padding: "40px 24px",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18 }}>🍁</span>
          <span style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 15,
            color: "rgba(255,255,255,0.5)",
          }}>
            Chit-Chat Canada · Vancouver
          </span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Meetup", "Instagram"].map(link => (
            <a key={link} href={link === "Meetup" ? "https://www.meetup.com/an-effective-language-practice-english-japanese/" : "https://www.instagram.com/chit_chat_canada/"}
              target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 500,
                color: "rgba(255,255,255,0.35)", textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#FF8C00"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function ChitChatCanada(() {
  const [activeSection, setActiveSection] = useState<Section>("Home");

  const handleNav = (section: Section): void => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveSection(section);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: "#0D0806", minHeight: "100vh", color: "#fff" }}>
      <Navbar active={activeSection} onNav={handleNav} />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <GallerySection />
      <JoinSection />
      <Footer />
    </div>
  );
}　　　　　　　　　　　　　