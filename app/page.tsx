"use client";

import { useState, useEffect, useRef, createContext, useContext, type ReactNode } from "react";

// ─── Language Context ──────────────────────────────────────────
type Lang = "en" | "ja";
const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});
function useLang() {
  return useContext(LangContext);
}

// ─── Types ─────────────────────────────────────────────────────
const SECTIONS = ["Home", "About", "Events", "Gallery", "Join"] as const;
type Section = (typeof SECTIONS)[number];

interface BiText { en: string; ja: string }

interface StatItem { label: BiText; value: string; icon: string }
interface GalleryItem { bg: string; label: BiText; icon: string }
interface FeatureItem { icon: string; title: BiText; desc: BiText }

// ─── i18n Data ─────────────────────────────────────────────────

const stats: StatItem[] = [
  { label: { en: "Members", ja: "メンバー" }, value: "4,700+", icon: "👥" },
  { label: { en: "Events Held", ja: "開催イベント数" }, value: "200+", icon: "🎉" },
  { label: { en: "Countries", ja: "参加国数" }, value: "30+", icon: "🌍" },
  { label: { en: "Weekly Meetups", ja: "週間Meetup数" }, value: "3+", icon: "📅" },
];

const galleryImages: GalleryItem[] = [
  { bg: "linear-gradient(135deg, #FF8C00, #FF6B00)", label: { en: "Language Exchange Night", ja: "言語交換ナイト" }, icon: "🗣️" },
  { bg: "linear-gradient(135deg, #FF6B00, #E85D00)", label: { en: "Coding Workshop", ja: "コーディング ワークショップ" }, icon: "💻" },
  { bg: "linear-gradient(135deg, #FFa040, #FF7020)", label: { en: "Cultural Festival", ja: "文化祭" }, icon: "🎌" },
  { bg: "linear-gradient(135deg, #FF9530, #FF6B00)", label: { en: "Group Hiking Trip", ja: "グループハイキング" }, icon: "🏔️" },
  { bg: "linear-gradient(135deg, #E85D00, #CC5000)", label: { en: "Career Panel", ja: "キャリアパネル" }, icon: "💼" },
  { bg: "linear-gradient(135deg, #FF7020, #FF8C00)", label: { en: "Holiday Party", ja: "ホリデーパーティー" }, icon: "🎊" },
];

const features: FeatureItem[] = [
  { icon: "🍁", title: { en: "English & Japanese Practice", ja: "英語・日本語の練習" }, desc: { en: "Improve your language skills through real conversations with native speakers in a relaxed, welcoming environment.", ja: "リラックスした雰囲気の中で、ネイティブスピーカーとの実践的な会話を通じて語学力を向上させましょう。" } },
  { icon: "💻", title: { en: "Coding & Tech Sessions", ja: "コーディング＆テックセッション" }, desc: { en: "Connect with fellow developers, share knowledge, and work on projects together in our tech meetups.", ja: "テックMeetupで仲間のエンジニアと繋がり、知識を共有し、一緒にプロジェクトに取り組みましょう。" } },
  { icon: "🎓", title: { en: "Free for Students", ja: "学生無料" }, desc: { en: "Students enjoy free admission to all events. We believe in accessible community building for everyone.", ja: "学生はすべてのイベントに無料で参加できます。誰もがアクセスできるコミュニティづくりを目指しています。" } },
  { icon: "🌏", title: { en: "Cultural Exchange", ja: "異文化交流" }, desc: { en: "Experience diverse perspectives from 30+ countries. Build genuine friendships across cultures.", ja: "30カ国以上の多様な視点に触れ、文化を超えた本物の友情を築きましょう。" } },
];

const founderStory = {
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

// ─── Hooks ─────────────────────────────────────────────────────
function useInView(threshold: number = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
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
  return [ref, visible] as const;
}

function AnimatedSection({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

// ─── Language Toggle ───────────────────────────────────────────
function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 32, padding: 3 }}>
      {(["en", "ja"] as const).map((l) => (
        <button key={l} onClick={() => setLang(l)} style={{
          display: "flex", alignItems: "center", gap: 4, padding: "7px 14px", borderRadius: 28, border: "none", cursor: "pointer",
          background: lang === l ? "linear-gradient(135deg, rgba(255,140,0,0.2), rgba(255,85,0,0.15))" : "transparent",
          boxShadow: lang === l ? "0 2px 12px rgba(255,140,0,0.15)" : "none",
          transition: "all 0.3s ease", fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600,
          color: lang === l ? "#FF8C00" : "rgba(255,255,255,0.4)",
        }}>
          <span style={{ fontSize: 14 }}>{l === "en" ? "🇬🇧" : "🇯🇵"}</span>
          {l === "en" ? "EN" : "JP"}
        </button>
      ))}
    </div>
  );
}

// ─── Nav Labels ────────────────────────────────────────────────
const navLabels: Record<Section, BiText> = {
  Home: { en: "Home", ja: "ホーム" },
  About: { en: "About", ja: "私たちについて" },
  Events: { en: "Events", ja: "イベント" },
  Gallery: { en: "Gallery", ja: "ギャラリー" },
  Join: { en: "Join", ja: "参加する" },
};

// ─── Navbar ────────────────────────────────────────────────────
function Navbar({ active, onNav }: { active: Section; onNav: (s: Section) => void }) {
  const { lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(20,12,8,0.92)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,140,0,0.15)" : "none", transition: "all 0.4s ease", padding: "0 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => onNav("Home")}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg, #FF8C00, #FF5500)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#fff", boxShadow: "0 2px 12px rgba(255,140,0,0.4)" }}>🍁</div>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 20, color: "#fff", letterSpacing: "-0.02em" }}>
            Chit-Chat <span style={{ color: "#FF8C00" }}>Canada</span>
          </span>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }} className="desktop-nav">
          {SECTIONS.map((s) => (
            <button key={s} onClick={() => onNav(s)} style={{
              background: active === s ? "rgba(255,140,0,0.15)" : "transparent",
              border: active === s ? "1px solid rgba(255,140,0,0.3)" : "1px solid transparent",
              color: active === s ? "#FF8C00" : "rgba(255,255,255,0.7)",
              padding: "8px 18px", borderRadius: 24, cursor: "pointer",
              fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 500, transition: "all 0.3s ease",
            }}>
              {navLabels[s][lang]}
            </button>
          ))}
          <div style={{ marginLeft: 8 }}><LangToggle /></div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <LangToggle />
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", color: "#FF8C00", fontSize: 28, cursor: "pointer", padding: 4 }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{ background: "rgba(20,12,8,0.97)", backdropFilter: "blur(20px)", padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 8 }} className="mobile-menu">
          {SECTIONS.map((s) => (
            <button key={s} onClick={() => { onNav(s); setMenuOpen(false); }} style={{
              background: active === s ? "rgba(255,140,0,0.15)" : "transparent",
              border: "none", color: active === s ? "#FF8C00" : "rgba(255,255,255,0.8)",
              padding: "12px 16px", borderRadius: 12, cursor: "pointer", textAlign: "left",
              fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 500,
            }}>
              {navLabels[s][lang]}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────
function HeroSection() {
  const { lang } = useLang();
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  return (
    <section id="Home" onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height }); }}
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "#0D0806" }}>

      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: "60vmax", height: "60vmax", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,140,0,0.12) 0%, transparent 70%)", top: `${30 + mousePos.y * 10}%`, left: `${20 + mousePos.x * 15}%`, transform: "translate(-50%, -50%)", transition: "top 0.8s ease, left 0.8s ease", animation: "float1 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: "45vmax", height: "45vmax", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,85,0,0.08) 0%, transparent 70%)", top: `${60 + mousePos.y * 8}%`, right: `${10 + mousePos.x * 10}%`, transform: "translate(50%, -50%)", transition: "top 0.8s ease, right 0.8s ease", animation: "float2 10s ease-in-out infinite" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(rgba(255,140,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,1) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      </div>

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "120px 24px 80px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,140,0,0.1)", border: "1px solid rgba(255,140,0,0.2)", borderRadius: 32, padding: "8px 20px", marginBottom: 32, animation: "fadeInDown 0.8s ease forwards" }}>
          <span style={{ fontSize: 14 }}>🇨🇦</span>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
            {lang === "en" ? "Vancouver's Community Meetup" : "バンクーバーのコミュニティMeetup"}
          </span>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(42px, 7vw, 84px)", fontWeight: 800, color: "#fff", lineHeight: 1.05, margin: "0 0 24px", animation: "fadeInUp 0.8s ease 0.2s both" }}>
          {lang === "en" ? (<>Connect, Learn,{" "}<span style={{ background: "linear-gradient(135deg, #FF8C00, #FF5500, #FF8C00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200% 200%", animation: "gradientShift 4s ease infinite" }}>Grow Together</span></>) : (<>繋がり、学び、{" "}<span style={{ background: "linear-gradient(135deg, #FF8C00, #FF5500, #FF8C00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200% 200%", animation: "gradientShift 4s ease infinite" }}>共に成長する</span></>)}
        </h1>

        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(16px, 2.2vw, 20px)", color: "rgba(255,255,255,0.6)", maxWidth: 600, margin: "0 auto 48px", lineHeight: 1.7, animation: "fadeInUp 0.8s ease 0.4s both" }}>
          {lang === "en" ? "A bilingual community in Vancouver for English & Japanese practice, coding, and cultural exchange." : "バンクーバーの英語・日本語練習、コーディング、異文化交流のためのバイリンガルコミュニティ。"}
          <br />
          <span style={{ color: "rgba(255,255,255,0.4)" }}>{lang === "en" ? "学生無料 · Free for Students" : "Free for Students · 学生無料"}</span>
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animation: "fadeInUp 0.8s ease 0.6s both" }}>
          <a href="https://www.meetup.com/an-effective-language-practice-english-japanese/" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "linear-gradient(135deg, #FF8C00, #E06000)", color: "#fff", fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 16, padding: "16px 36px", borderRadius: 40, textDecoration: "none", boxShadow: "0 4px 24px rgba(255,140,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)", transition: "all 0.3s ease", cursor: "pointer" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,140,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(255,140,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
          >
            {lang === "en" ? "Join Our Meetup ↗" : "Meetupに参加する ↗"}
          </a>
          <a href="https://www.instagram.com/chit_chat_canada/" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,140,0,0.08)", border: "1px solid rgba(255,140,0,0.25)", color: "#FF8C00", fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 16, padding: "16px 36px", borderRadius: 40, textDecoration: "none", transition: "all 0.3s ease", cursor: "pointer" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,140,0,0.15)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,140,0,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            📸 Instagram
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginTop: 72, animation: "fadeInUp 0.8s ease 0.8s both" }}>
          {stats.map((s) => (
            <div key={s.label.en} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "24px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#FF8C00" }}>{s.value}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{s.label[lang]}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "bounce 2s ease infinite" }}>
        <div style={{ width: 24, height: 40, borderRadius: 12, border: "2px solid rgba(255,140,0,0.3)", display: "flex", justifyContent: "center", paddingTop: 8 }}>
          <div style={{ width: 3, height: 8, borderRadius: 2, background: "#FF8C00", animation: "scrollDot 2s ease infinite" }} />
        </div>
      </div>
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────
function AboutSection() {
  const { lang } = useLang();
  const s = founderStory[lang];

  return (
    <section id="About" style={{ background: "#0D0806", padding: "100px 24px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,140,0,0.2), transparent)" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: "#FF8C00", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              {lang === "en" ? "Our Story" : "私たちのストーリー"}
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "#fff", margin: "16px 0 0", lineHeight: 1.15 }}>
              {lang === "en" ? (<>How It All <span style={{ color: "#FF8C00" }}>Started</span></>) : (<>すべての<span style={{ color: "#FF8C00" }}>始まり</span></>)}
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 340px) 1fr", gap: 48, alignItems: "start" }} className="founder-grid">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
              <div style={{ width: 200, height: 200, borderRadius: "50%", boxShadow: "0 8px 40px rgba(255,140,0,0.25)", position: "relative", overflow: "hidden", border: "3px solid rgba(255,140,0,0.3)" }}>
                <img src="/hiroki.jpg" alt="Hiroki Takaya" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>Hiroki Takaya</h3>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#FF8C00", fontWeight: 500, margin: "0 0 16px" }}>
                  {lang === "en" ? "Founder & Owner" : "創設者 & オーナー"}
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {[
                  { en: "🥋 BJJ Instructor", ja: "🥋 柔術指導者" },
                  { en: "💻 Software Engineer", ja: "💻 ソフトウェアエンジニア" },
                  { en: "📚 Licensed English Teacher", ja: "📚 英語教員免許保持" },
                  { en: "🌏 ESL Coach", ja: "🌏 ESLコーチ" },
                  { en: "🍁 Community Organizer", ja: "🍁 コミュニティ主催者" },
                ].map((role) => (
                  <div key={role.en} style={{ background: "rgba(255,140,0,0.08)", border: "1px solid rgba(255,140,0,0.15)", borderRadius: 12, padding: "8px 16px", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{lang === "en" ? role.en : role.ja}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <a href="https://www.instagram.com/japaneseflash" target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "8px 14px", textDecoration: "none", fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.5)", transition: "all 0.2s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,140,0,0.3)"; e.currentTarget.style.color = "#FF8C00"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                >📸 Instagram</a>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "40px 36px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "linear-gradient(180deg, #FF8C00, #FF5500)", borderRadius: "4px 0 0 4px" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[s.p1, s.p2, s.p3, s.p4, s.p5].map((p, i) => (
                  <p key={`${lang}-${i}`} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.85, margin: 0 }}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginTop: 72 }}>
          {features.map((f, i) => (
            <AnimatedSection key={f.title.en} delay={i * 0.12}>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "36px 28px", transition: "all 0.4s ease", cursor: "default", height: "100%" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,140,0,0.05)"; e.currentTarget.style.borderColor = "rgba(255,140,0,0.2)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(255,140,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 20 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 600, color: "#fff", margin: "0 0 12px" }}>{f.title[lang]}</h3>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{f.desc[lang]}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .founder-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>
    </section>
  );
}

// ─── Events ────────────────────────────────────────────────────
interface MeetupEvent {
  title: string;
  start: string;
  end: string;
  location: string;
  url: string;
  description: string;
}

function formatEventDate(dateStr: string, lang: Lang): string {
  try {
    const date = new Date(dateStr);
    if (lang === "ja") {
      return date.toLocaleDateString("ja-JP", { month: "long", day: "numeric", weekday: "short" });
    }
    return date.toLocaleDateString("en-CA", { month: "short", day: "numeric", weekday: "short" });
  } catch {
    return dateStr;
  }
}

function formatEventTime(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit", hour12: true });
  } catch {
    return "";
  }
}

function EventsSection() {
  const { lang } = useLang();
  const [events, setEvents] = useState<MeetupEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => { setEvents(data.events || []); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <section id="Events" style={{ background: "#0A0604", padding: "100px 24px", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: "#FF8C00", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              {lang === "en" ? "Upcoming Events" : "今後のイベント"}
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "#fff", margin: "16px 0 0", lineHeight: 1.15 }}>
              {lang === "en" ? (<>Join Our Next <span style={{ color: "#FF8C00" }}>Meetup</span></>) : (<>次の<span style={{ color: "#FF8C00" }}>Meetup</span>に参加しよう</>)}
            </h2>
          </div>
        </AnimatedSection>

        {loading ? (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <div style={{ display: "inline-block", width: 40, height: 40, border: "3px solid rgba(255,140,0,0.15)", borderTopColor: "#FF8C00", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : error || events.length === 0 ? (
          <AnimatedSection>
            <div style={{ textAlign: "center", padding: "48px 24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20 }}>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.5)", margin: "0 0 24px" }}>
                {lang === "en" ? "Check out our latest events on Meetup!" : "最新のイベントはMeetupでチェック！"}
              </p>
              <a href="https://www.meetup.com/an-effective-language-practice-english-japanese/" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg, #FF8C00, #E06000)", color: "#fff", fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 16, padding: "14px 32px", borderRadius: 40, textDecoration: "none", boxShadow: "0 4px 20px rgba(255,140,0,0.3)", transition: "all 0.3s ease" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                {lang === "en" ? "View on Meetup ↗" : "Meetupで見る ↗"}
              </a>
            </div>
          </AnimatedSection>
        ) : (
          <div style={{ display: "grid", gap: 16 }}>
            {events.map((ev, i) => (
              <AnimatedSection key={`${ev.title}-${ev.start}`} delay={i * 0.1}>
                <a href={ev.url || "https://www.meetup.com/an-effective-language-practice-english-japanese/"} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "24px 28px", transition: "all 0.3s ease", cursor: "pointer", flexWrap: "wrap", textDecoration: "none" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,140,0,0.25)"; e.currentTarget.style.background = "rgba(255,140,0,0.03)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                >
                  <div style={{ width: 56, minHeight: 56, borderRadius: 14, background: "rgba(255,140,0,0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: "8px 4px" }}>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 700, color: "#FF8C00", textTransform: "uppercase" }}>
                      {new Date(ev.start).toLocaleDateString("en", { month: "short" })}
                    </span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1 }}>
                      {new Date(ev.start).getDate()}
                    </span>
                  </div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 600, color: "#fff", margin: "0 0 6px" }}>{ev.title}</h3>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", margin: 0 }}>
                      {formatEventDate(ev.start, lang)} · {formatEventTime(ev.start)}
                      {ev.location ? ` · ${ev.location}` : ""}
                    </p>
                  </div>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: "#FF8C00", flexShrink: 0 }}>
                    ↗
                  </span>
                </a>
              </AnimatedSection>
            ))}

            <AnimatedSection delay={events.length * 0.1}>
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <a href="https://www.meetup.com/an-effective-language-practice-english-japanese/" target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600, color: "#FF8C00", textDecoration: "none", transition: "opacity 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  {lang === "en" ? "View all events on Meetup ↗" : "すべてのイベントをMeetupで見る ↗"}
                </a>
              </div>
            </AnimatedSection>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Gallery ───────────────────────────────────────────────────
function GallerySection() {
  const { lang } = useLang();
  return (
    <section id="Gallery" style={{ background: "#0D0806", padding: "100px 24px", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: "#FF8C00", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              {lang === "en" ? "Our Community" : "私たちのコミュニティ"}
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "#fff", margin: "16px 0 0", lineHeight: 1.15 }}>
              {lang === "en" ? (<>Moments We <span style={{ color: "#FF8C00" }}>Share</span></>) : (<>私たちが<span style={{ color: "#FF8C00" }}>共有</span>する瞬間</>)}
            </h2>
          </div>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {galleryImages.map((img, i) => (
            <AnimatedSection key={img.label.en} delay={i * 0.08}>
              <div style={{ background: img.bg, borderRadius: 16, aspectRatio: "4/3", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "all 0.4s ease", cursor: "pointer", position: "relative", overflow: "hidden" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 60%)` }} />
                <span style={{ fontSize: 48, marginBottom: 12, position: "relative" }}>{img.icon}</span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.9)", position: "relative" }}>{img.label[lang]}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Join ──────────────────────────────────────────────────────
function JoinSection() {
  const { lang } = useLang();
  return (
    <section id="Join" style={{ background: "#0A0604", padding: "100px 24px", position: "relative" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <AnimatedSection>
          <div style={{ background: "linear-gradient(135deg, rgba(255,140,0,0.08), rgba(255,85,0,0.04))", border: "1px solid rgba(255,140,0,0.15)", borderRadius: 28, padding: "64px 40px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,140,0,0.1), transparent 70%)" }} />
            <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,85,0,0.08), transparent 70%)" }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4.5vw, 44px)", fontWeight: 700, color: "#fff", margin: "0 0 16px", lineHeight: 1.2, position: "relative" }}>
              {lang === "en" ? (<>Ready to <span style={{ color: "#FF8C00" }}>Join</span>?</>) : (<><span style={{ color: "#FF8C00" }}>参加</span>しませんか？</>)}
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.55)", margin: "0 0 36px", lineHeight: 1.7, position: "relative" }}>
              {lang === "en" ? "Come meet our community at the next event. Everyone is welcome — no matter your language level, background, or experience." : "次のイベントで私たちのコミュニティに会いに来てください。語学レベル、経歴、経験に関係なく、誰でも大歓迎です。"}
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
              <a href="https://www.meetup.com/an-effective-language-practice-english-japanese/" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg, #FF8C00, #E06000)", color: "#fff", fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 16, padding: "16px 32px", borderRadius: 40, textDecoration: "none", boxShadow: "0 4px 20px rgba(255,140,0,0.3)", transition: "all 0.3s ease" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >Meetup ↗</a>
              <a href="https://www.instagram.com/chit_chat_canada/" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,140,0,0.08)", border: "1px solid rgba(255,140,0,0.25)", color: "#FF8C00", fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 16, padding: "16px 32px", borderRadius: 40, textDecoration: "none", transition: "all 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,140,0,0.15)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,140,0,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >Instagram</a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#080504", borderTop: "1px solid rgba(255,255,255,0.04)", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18 }}>🍁</span>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 15, color: "rgba(255,255,255,0.5)" }}>Chit-Chat Canada · Vancouver</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Meetup", "Instagram"].map(link => (
            <a key={link} href={link === "Meetup" ? "https://www.meetup.com/an-effective-language-practice-english-japanese/" : "https://www.instagram.com/chit_chat_canada/"} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#FF8C00"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
            >{link}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── App Root ──────────────────────────────────────────────────
export default function ChitChatCanada() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeSection, setActiveSection] = useState<Section>("Home");

  const handleNav = (section: Section): void => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveSection(section);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id as Section); });
    }, { threshold: 0.3 });
    SECTIONS.forEach((s) => { const el = document.getElementById(s); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div style={{ background: "#0D0806", minHeight: "100vh", color: "#fff" }}>
        <Navbar active={activeSection} onNav={handleNav} />
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <GallerySection />
        <JoinSection />
        <Footer />
      </div>
    </LangContext.Provider>
  );
}