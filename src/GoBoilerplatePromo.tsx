import React from "react";
import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const C = {
  bg: "#091116",
  paper: "#f7f5ed",
  mint: "#baff75",
  cyan: "#7cdae4",
  muted: "#9ba9aa",
  border: "#293b3d",
};
const FONT = "'Avenir Next', 'Helvetica Neue', Arial, sans-serif";
const MONO = "'SFMono-Regular', Menlo, Consolas, monospace";

const Rise: React.FC<
  React.PropsWithChildren<{ delay?: number; style?: React.CSSProperties }>
> = ({ children, delay = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        opacity: interpolate(frame, [delay, delay + 14], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: `0 ${interpolate(spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 100 } }), [0, 1], [65, 0])}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Backdrop: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: C.bg }}>
      <AbsoluteFill
        style={{
          opacity: 0.23,
          backgroundImage:
            "linear-gradient(#3d5e561c 1px, transparent 1px), linear-gradient(90deg, #3d5e561c 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          top: -450,
          right: -500,
          borderRadius: "50%",
          background: "radial-gradient(circle, #3d654a60, transparent 70%)",
          translate: `${Math.sin(frame / 100) * 60}px ${Math.cos(frame / 150) * 40}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          bottom: -520,
          left: -450,
          borderRadius: "50%",
          background: "radial-gradient(circle, #20546840, transparent 70%)",
        }}
      />
    </AbsoluteFill>
  );
};

const Scene: React.FC<
  React.PropsWithChildren<{ number: string; category: string }>
> = ({ children, number, category }) => (
  <AbsoluteFill style={{ color: C.paper, fontFamily: FONT }}>
    <Backdrop />
    <div
      style={{
        position: "absolute",
        top: 130,
        left: 90,
        right: 90,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 17 }}>
        <div
          style={{ width: 16, height: 16, background: C.mint, borderRadius: 5 }}
        />
        <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>
          GO-boilerplate
        </span>
      </div>
      <span style={{ color: C.muted, fontSize: 24, letterSpacing: 3 }}>
        {number} / 05
      </span>
    </div>
    <div
      style={{
        position: "absolute",
        left: 90,
        top: 246,
        color: C.mint,
        fontSize: 25,
        fontWeight: 700,
        letterSpacing: 5,
      }}
    >
      {category}
    </div>
    {children}
    <div
      style={{
        position: "absolute",
        left: 90,
        right: 90,
        bottom: 150,
        borderTop: `1px solid ${C.border}`,
        paddingTop: 28,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: C.muted,
        fontSize: 25,
      }}
    >
      <span>BUILT WITH GO.</span>
      <span>github.com/Nzrkodi</span>
    </div>
  </AbsoluteFill>
);

const Hook: React.FC = () => (
  <Scene number="01" category="MULAI PROYEK BARU?">
    <Rise style={{ position: "absolute", left: 90, top: 360 }}>
      <div
        style={{
          fontSize: 116,
          fontWeight: 800,
          lineHeight: 1.07,
          letterSpacing: -6,
        }}
      >
        Setup lagi.
        <br />
        <span style={{ color: C.mint }}>Dari nol lagi?</span>
      </div>
    </Rise>
    <div style={{ position: "absolute", top: 800, left: 90, right: 90 }}>
      {["Struktur proyek", "Koneksi database", "Migration & logging"].map(
        (item, i) => (
          <Rise key={item} delay={18 + i * 10} style={{ marginBottom: 23 }}>
            <div
              style={{
                height: 117,
                display: "flex",
                alignItems: "center",
                gap: 28,
                border: `1px solid ${C.border}`,
                borderRadius: 23,
                background: "#142024",
                padding: "0 32px",
              }}
            >
              <span style={{ fontSize: 44, color: C.muted }}>↻</span>
              <span style={{ fontSize: 43, fontWeight: 500 }}>{item}</span>
            </div>
          </Rise>
        ),
      )}
    </div>
    <Rise
      delay={65}
      style={{
        position: "absolute",
        left: 90,
        top: 1320,
        fontSize: 48,
        lineHeight: 1.4,
        color: C.muted,
      }}
    >
      Mulai dari fondasi
      <br />
      <span style={{ color: C.paper }}>yang sudah tertata.</span>
    </Rise>
  </Scene>
);

const Architecture: React.FC = () => (
  <Scene number="02" category="KENALAN DENGAN">
    <Rise style={{ position: "absolute", top: 354, left: 90, right: 70 }}>
      <div
        style={{
          fontSize: 91,
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: -4,
        }}
      >
        Backend Go.
        <br />
        <span style={{ color: C.mint }}>Fondasi jelas.</span>
      </div>
      <div style={{ marginTop: 38, color: C.muted, fontSize: 43 }}>
        Fiber · PostgreSQL · Redis
      </div>
    </Rise>
    <div style={{ position: "absolute", left: 90, right: 90, top: 815 }}>
      {[
        ["01", "Handler", "Terima HTTP request"],
        ["02", "Service", "Tempat logika aplikasi"],
        ["03", "Repository", "Akses data ke database"],
      ].map(([index, title, description], i) => (
        <Rise key={title} delay={25 + i * 18}>
          <div
            style={{
              height: 170,
              marginBottom: 25,
              padding: "30px 34px",
              border: `1px solid ${i === 1 ? "#729d55" : C.border}`,
              borderRadius: 24,
              background: i === 1 ? "#192b22" : "#101c20",
              display: "flex",
              gap: 30,
              alignItems: "center",
            }}
          >
            <span style={{ color: C.mint, fontFamily: MONO, fontSize: 32 }}>
              {index}
            </span>
            <div>
              <div style={{ fontSize: 53, fontWeight: 700 }}>{title}</div>
              <div style={{ color: C.muted, fontSize: 31, marginTop: 6 }}>
                {description}
              </div>
            </div>
            <span style={{ marginLeft: "auto", color: C.mint, fontSize: 40 }}>
              ↓
            </span>
          </div>
        </Rise>
      ))}
    </div>
    <Rise
      delay={90}
      style={{
        position: "absolute",
        top: 1470,
        left: 90,
        fontSize: 43,
        color: C.muted,
      }}
    >
      Baca. Pahami. Kembangkan.
    </Rise>
  </Scene>
);

const TerminalLine: React.FC<{
  text: string;
  start: number;
  color?: string;
}> = ({ text, start, color = C.paper }) => {
  const frame = useCurrentFrame();
  const count = Math.max(
    0,
    Math.min(text.length, Math.floor((frame - start) * 0.7)),
  );
  return (
    <div
      style={{
        color,
        minHeight: 48,
        fontSize: 31,
        lineHeight: 1.55,
        whiteSpace: "pre",
      }}
    >
      {text.slice(0, count)}
      {frame >= start && count < text.length ? "▌" : ""}
    </div>
  );
};

const Migrations: React.FC = () => (
  <Scene number="03" category="WORKFLOW YANG FAMILIER">
    <Rise style={{ position: "absolute", top: 354, left: 90 }}>
      <div
        style={{
          fontSize: 108,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: -5,
        }}
      >
        Satu command.
        <br />
        <span style={{ color: C.mint }}>Satu file.</span>
      </div>
    </Rise>
    <Rise
      delay={14}
      style={{ position: "absolute", left: 90, right: 90, top: 720 }}
    >
      <div
        style={{
          borderRadius: 28,
          border: `1px solid ${C.border}`,
          background: "#060d12",
          overflow: "hidden",
          boxShadow: "0 25px 90px #0005",
        }}
      >
        <div
          style={{
            height: 77,
            borderBottom: `1px solid ${C.border}`,
            background: "#152127",
            display: "flex",
            alignItems: "center",
            padding: "0 26px",
            gap: 12,
          }}
        >
          {["#ff7b72", "#e9c46a", "#baff75"].map((color) => (
            <span
              key={color}
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: color,
              }}
            />
          ))}
          <span
            style={{
              marginLeft: 18,
              color: C.muted,
              fontFamily: MONO,
              fontSize: 23,
            }}
          >
            ~/GO-boilerplate
          </span>
        </div>
        <div style={{ fontFamily: MONO, padding: "35px 30px 43px" }}>
          <TerminalLine
            start={24}
            text="$ make migration NAME=add_phone"
            color={C.mint}
          />
          <TerminalLine
            start={80}
            text="→ 000004_add_phone.sql"
            color={C.muted}
          />
          <div style={{ height: 30 }} />
          <TerminalLine start={110} text="-- migrate:up" color={C.cyan} />
          <TerminalLine start={130} text="ALTER TABLE users" />
          <TerminalLine start={151} text="ADD COLUMN phone VARCHAR(20);" />
          <div style={{ height: 22 }} />
          <TerminalLine start={180} text="-- migrate:down" color={C.cyan} />
          <TerminalLine start={200} text="ALTER TABLE users" />
          <TerminalLine start={220} text="DROP COLUMN phone;" />
        </div>
      </div>
    </Rise>
    <Rise
      delay={245}
      style={{
        position: "absolute",
        left: 90,
        top: 1465,
        fontSize: 42,
        fontWeight: 600,
        color: C.mint,
      }}
    >
      Buat → jalankan → rollback.
    </Rise>
  </Scene>
);

const Features: React.FC = () => (
  <Scene number="04" category="LEBIH DARI STRUKTUR FOLDER">
    <Rise style={{ position: "absolute", top: 350, left: 90 }}>
      <div
        style={{
          fontSize: 104,
          fontWeight: 800,
          lineHeight: 1.07,
          letterSpacing: -5,
        }}
      >
        Fondasinya
        <br />
        <span style={{ color: C.mint }}>sudah ada.</span>
      </div>
    </Rise>
    <div
      style={{
        position: "absolute",
        left: 90,
        right: 90,
        top: 730,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 24,
      }}
    >
      {[
        ["DB", "Fresh & seed", "Workflow database"],
        ["ID", "Logging", "Request ID bawaan"],
        [">_", "Docker", "Local & production"],
        ["✓", "Test & CI", "Pemeriksaan kode"],
      ].map(([icon, title, description], i) => (
        <Rise key={title} delay={15 + i * 16}>
          <div
            style={{
              height: 255,
              borderRadius: 26,
              border: `1px solid ${C.border}`,
              padding: 30,
              background: i === 0 ? "#1a2a20" : "#121e22",
            }}
          >
            <div
              style={{
                color: C.mint,
                fontFamily: MONO,
                fontSize: 43,
                fontWeight: 700,
                marginBottom: 32,
              }}
            >
              {icon}
            </div>
            <div
              style={{ fontSize: 41, fontWeight: 700, whiteSpace: "nowrap" }}
            >
              {title}
            </div>
            <div style={{ fontSize: 26, color: C.muted, marginTop: 10 }}>
              {description}
            </div>
          </div>
        </Rise>
      ))}
    </div>
    <Rise
      delay={100}
      style={{
        position: "absolute",
        left: 90,
        top: 1370,
        fontSize: 47,
        lineHeight: 1.4,
        color: C.muted,
      }}
    >
      Sesuaikan fondasinya.
      <br />
      <span style={{ color: C.paper }}>Fokus ke fitur proyekmu.</span>
    </Rise>
  </Scene>
);

const GithubMark: React.FC = () => (
  <svg width="62" height="62" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.16a10.76 10.76 0 0 1 5.6 0c2.13-1.46 3.08-1.16 3.08-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.32-2.64 5.28-5.15 5.56.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
  </svg>
);

const Clone: React.FC = () => (
  <Scene number="05" category="MULAI DARI SINI">
    <Rise style={{ position: "absolute", left: 90, top: 350 }}>
      <div
        style={{
          fontSize: 112,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: -5,
        }}
      >
        Clone.
        <br />
        Pelajari.
        <br />
        <span style={{ color: C.mint }}>Bangun.</span>
      </div>
    </Rise>
    <Rise
      delay={16}
      style={{ position: "absolute", left: 90, right: 90, top: 815 }}
    >
      <div
        style={{
          border: `1px solid ${C.border}`,
          borderRadius: 28,
          padding: 38,
          background: "#142022",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            color: C.mint,
            marginBottom: 35,
          }}
        >
          <GithubMark />
          <span style={{ fontSize: 39, fontWeight: 700 }}>
            Lihat source code di GitHub
          </span>
        </div>
        <div style={{ fontSize: 39, color: C.muted }}>github.com/Nzrkodi/</div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            letterSpacing: -2,
            marginTop: 10,
          }}
        >
          GO-boilerplate
        </div>
      </div>
    </Rise>
    <Rise
      delay={40}
      style={{ position: "absolute", left: 90, right: 90, top: 1210 }}
    >
      <div
        style={{
          background: C.mint,
          color: C.bg,
          borderRadius: 24,
          padding: "29px 30px",
          fontFamily: MONO,
          fontSize: 29,
          lineHeight: 1.65,
          fontWeight: 600,
        }}
      >
        git clone {"\\"}
        <br />
        https://github.com/Nzrkodi/GO-boilerplate.git
      </div>
      <div style={{ color: C.muted, fontSize: 38, marginTop: 35 }}>
        Ikuti README. Mulai proyekmu.
      </div>
    </Rise>
  </Scene>
);

const Progress: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        height: 8,
        background: C.mint,
        width: `${(frame / (durationInFrames - 1)) * 100}%`,
      }}
    />
  );
};

export const GoBoilerplatePromo: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill data-go-promo style={{ background: C.bg }}>
      <style>
        {"[data-go-promo], [data-go-promo] * { box-sizing: border-box; }"}
      </style>
      {/* Narasi diletakkan di dalam Sequence agar otomatis terpotong
          di akhir scene jika durasinya melebihi window scene. */}
      <Sequence durationInFrames={6 * fps} name="01-Hook">
        <Hook />
        <Audio
          name="Narasi-01"
          from={0.4 * fps}
          src={staticFile("go-promo/01-male.wav")}
        />
      </Sequence>
      <Sequence
        from={6 * fps}
        durationInFrames={9 * fps}
        name="02-Architecture"
      >
        <Architecture />
        <Audio
          name="Narasi-02"
          from={0.3 * fps}
          src={staticFile("go-promo/02-male.wav")}
        />
      </Sequence>
      <Sequence from={15 * fps} durationInFrames={10 * fps} name="03-Migration">
        <Migrations />
        <Audio
          name="Narasi-03"
          from={0.3 * fps}
          src={staticFile("go-promo/03-male.wav")}
        />
      </Sequence>
      <Sequence from={25 * fps} durationInFrames={9 * fps} name="04-Features">
        <Features />
        <Audio
          name="Narasi-04"
          from={0.3 * fps}
          src={staticFile("go-promo/04-male.wav")}
        />
      </Sequence>
      <Sequence
        from={34 * fps}
        durationInFrames={11 * fps}
        name="05-GitHub-CTA"
      >
        <Clone />
        <Audio
          name="Narasi-05"
          from={0.3 * fps}
          src={staticFile("go-promo/05-male.wav")}
        />
      </Sequence>
      <Audio
        name="Original ambient soundtrack"
        src={staticFile("go-promo/music.wav")}
        volume={0.6}
      />
      <Progress />
    </AbsoluteFill>
  );
};
