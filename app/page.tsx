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

const communityIntro = {
  en: {
    eyebrow: "Community Leadership",
    titlePrefix: "Led with",
    titleAccent: "Warmth",
    titleSuffix: "and Care",
    desc: "Chit-Chat Canada is a bilingual community in Vancouver where students, newcomers, and locals can meet, practice languages, and build real connections through relaxed, welcoming events.",
  },
  ja: {
    eyebrow: "コミュニティ運営",
    titlePrefix: "温かさと",
    titleAccent: "安心感",
    titleSuffix: "を大切に",
    desc: "Chit-Chat Canadaは、バンクーバーで学生・留学生・ローカルの方々が出会い、言語を練習し、自然なつながりを作れるバイリンガルコミュニティです。",
  },
};

const hironaProfile = {
  name: "Hirona",
  image: "/hirona.jpg",
  instagramUrl: "https://www.instagram.com/usaxusa/", // Replace with Hirona's official Instagram URL
  en: {
    role: "Co-Manager",
    tagline: "Community Management & Event Operations",
    badges: ["Former System Engineer", "Business Management Co-op Student", "Community Organizer"],
    paragraphs: [
      "Hirona serves as the Co-Manager of Chit-Chat Canada and plays an important role in supporting our community, events, and day-to-day operations.",
      "Before coming to Canada, she worked in Japan as a system engineer. With a desire to broaden her perspective and gain international experience, she decided to study abroad and is currently enrolled in a Co-op program, majoring in Business Management.",
      "Hirona enjoys meeting new people and connecting with individuals from different cultural backgrounds. Her friendly personality and interest in community building naturally led her to become involved with Chit-Chat as an organizer.",
      "Through her experience supporting events, she became interested in contributing more deeply to the management side of the community. As Co-Manager, she helps create a welcoming environment where students, newcomers, and locals can feel comfortable joining, speaking, and making new connections.",
      "With her background in technology, business, and cross-cultural communication, Hirona is excited to help Chit-Chat Canada grow into an even more engaging, inclusive, and lively community.",
    ],
  },
  ja: {
    role: "Co-Manager",
    tagline: "コミュニティ運営・イベントマネジメント",
    badges: ["元システムエンジニア", "Business Management専攻", "Community Organizer"],
    paragraphs: [
      "Chit-Chat CanadaでCo-Managerを務めております、Hironaです。",
      "日本ではシステムエンジニアとして働いていましたが、より広い視野を身につけ、海外での経験を積みたいと思い、留学を決意しました。現在はCo-opプログラムでビジネスマネジメントを専攻しています。",
      "人と話すことが好きで、さまざまな国や文化的背景を持つ方々と交流したいという思いから、Chit-Chatのオーガナイザーとして活動を始めました。",
      "イベントをサポートする中で、参加者が安心して交流できる雰囲気づくりや、コミュニティ運営の大切さに興味を持つようになりました。現在はCo-Managerとして、イベント運営、参加者とのコミュニケーション、コミュニティづくり、そしてChit-Chat Canadaのさらなる成長をサポートしています。",
      "テクノロジー、ビジネス、そして異文化交流の経験を活かしながら、Chit-Chat Canadaをより温かく、楽しく、活気のあるコミュニティにしていけるよう頑張ります。よろしくお願いします。",
    ],
  },
};

const founderSupport = {
  en: {
    title: "Founded by Hiroki Takaya",
    role: "Founder & Owner",
    desc: "Chit-Chat Canada was founded by Hiroki Takaya with the goal of creating a welcoming space where people in Vancouver can connect through language, culture, and shared experiences.",
    note: "Hiroki continues to support the community behind the scenes while Hirona helps lead the community-facing management and event operations.",
  },
  ja: {
    title: "Founded by Hiroki Takaya",
    role: "Founder & Owner",
    desc: "Chit-Chat Canadaは、バンクーバーで人々が言語・文化・経験を通じて自然につながれる場所を作りたいという思いから、Hiroki Takayaによって立ち上げられました。",
    note: "HirokiはFounder / Ownerとしてコミュニティを支えながら、HironaがCo-Managerとして参加者に近い立場で運営・イベント管理をサポートしています。",
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
  About: { en: "Team", ja: "チーム" },
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
          {lang === "en" ? (<>Connect, Learn,{" "}<span style={{ background: "linear-gradient(135deg, #FF8C00, #FF5500, #FF8C00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200% 200%", animation: "gradientShift 4s ease infinite" }}>Grow Together</span></>) : (<>繋がり、学び,{" "}<span style={{ background: "linear-gradient(135deg, #FF8C00, #FF5500, #FF8C00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200% 200%", animation: "gradientShift 4s ease infinite" }}>共に成長する</span></>)}
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
  const intro = communityIntro[lang];
  const h = hironaProfile[lang];
  const founder = founderSupport[lang];

  return (
    <section id="About" style={{ background: "#0D0806", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,140,0,0.2), transparent)" }} />
      <div style={{ position: "absolute", top: 120, right: -120, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,140,0,0.08), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: "#FF8C00", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              {intro.eyebrow}
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 700, color: "#fff", margin: "16px 0 18px", lineHeight: 1.15 }}>
              {intro.titlePrefix}{" "}<span style={{ color: "#FF8C00" }}>{intro.titleAccent}</span>{" "}{intro.titleSuffix}
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.58)", lineHeight: 1.8, maxWidth: 720, margin: "0 auto" }}>
              {intro.desc}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "minmax(320px, 0.92fr) minmax(0, 1.08fr)", gap: 36, alignItems: "stretch" }}>
            <div className="hirona-card" style={{ background: "linear-gradient(145deg, rgba(255,140,0,0.13), rgba(255,255,255,0.025))", border: "1px solid rgba(255,140,0,0.22)", borderRadius: 28, padding: 28, position: "relative", overflow: "hidden", boxShadow: "0 18px 60px rgba(0,0,0,0.22)" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 25% 15%, rgba(255,255,255,0.08), transparent 42%)", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ width: "100%", aspectRatio: "4 / 5", borderRadius: 24, overflow: "hidden", border: "2px solid rgba(255,140,0,0.32)", boxShadow: "0 12px 36px rgba(255,140,0,0.18)", marginBottom: 24, background: "rgba(255,255,255,0.04)" }}>
                  <img src={hironaProfile.image} alt="Hirona, Co-Manager of Chit-Chat Canada" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                </div>

                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,140,0,0.16)", border: "1px solid rgba(255,140,0,0.28)", color: "#FF8C00", fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, padding: "8px 14px", borderRadius: 999, marginBottom: 14 }}>
                  ✨ {h.role}
                </span>

                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 5vw, 50px)", fontWeight: 800, color: "#fff", margin: "0 0 8px", lineHeight: 1 }}>
                  {hironaProfile.name}
                </h3>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.68)", fontWeight: 500, margin: "0 0 22px" }}>
                  {h.tagline}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                  {h.badges.map((badge) => (
                    <span key={badge} style={{ background: "rgba(0,0,0,0.22)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 999, color: "rgba(255,255,255,0.78)", fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600, padding: "8px 12px" }}>
                      {badge}
                    </span>
                  ))}
                </div>

                <a href={hironaProfile.instagramUrl} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px 16px", textDecoration: "none", fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.72)", transition: "all 0.2s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,140,0,0.35)"; e.currentTarget.style.color = "#FF8C00"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.72)"; }}
                >📸 Instagram</a>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, padding: "38px 34px", position: "relative", overflow: "hidden", flex: 1 }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "linear-gradient(180deg, #FF8C00, #FF5500)", borderRadius: "4px 0 0 4px" }} />
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, color: "#FF8C00", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  {lang === "en" ? "Meet Our Co-Manager" : "Co-Manager紹介"}
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 20 }}>
                  {h.paragraphs.map((p, i) => (
                    <p key={`${lang}-hirona-${i}`} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.72)", lineHeight: 1.85, margin: 0 }}>{p}</p>
                  ))}
                </div>
              </div>

              <div style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.055)", borderRadius: 20, padding: "26px 28px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(255,140,0,0.1)", border: "1px solid rgba(255,140,0,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>
                    🍁
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>{founder.title}</h4>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#FF8C00", fontWeight: 600, margin: "0 0 12px" }}>{founder.role}</p>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.52)", lineHeight: 1.75, margin: "0 0 10px" }}>{founder.desc}</p>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.42)", lineHeight: 1.75, margin: 0 }}>{founder.note}</p>
                  </div>
                </div>
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
      <style>{`@media (max-width: 860px) { .team-grid { grid-template-columns: 1fr !important; gap: 28px !important; } .hirona-card { max-width: 520px !important; margin: 0 auto !important; } }`}</style>
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