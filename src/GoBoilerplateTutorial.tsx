import React from "react";
import { Audio } from "@remotion/media";
import { loadFont as loadSans } from "@remotion/google-fonts/Inter";
import { loadFont as loadMonoFont } from "@remotion/google-fonts/JetBrainsMono";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Font di-bundle dari Google Fonts agar render konsisten di macOS maupun Linux/CI.
const { fontFamily: SANS } = loadSans("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
const { fontFamily: MONO_FAMILY } = loadMonoFont("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

const C = {
  bg: "#091116",
  paper: "#f7f5ed",
  mint: "#baff75",
  cyan: "#7cdae4",
  muted: "#9ba9aa",
  border: "#293b3d",
};
const FONT = `${SANS}, 'Avenir Next', 'Helvetica Neue', Arial, sans-serif`;
const MONO = `${MONO_FAMILY}, 'SFMono-Regular', Menlo, Consolas, monospace`;

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

const TutScene: React.FC<
  React.PropsWithChildren<{
    number: string;
    category: string;
    duration: number;
  }>
> = ({ children, number, category, duration }) => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [duration - 14, duration - 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const zoom = interpolate(frame, [0, duration], [1, 1.035], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        color: C.paper,
        fontFamily: FONT,
        opacity: fadeIn * fadeOut,
        transform: `scale(${zoom})`,
      }}
    >
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
            style={{
              width: 16,
              height: 16,
              background: C.mint,
              borderRadius: 5,
            }}
          />
          <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>
            GO-boilerplate
          </span>
        </div>
        <span style={{ color: C.muted, fontSize: 24, letterSpacing: 3 }}>
          {number}
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
};

// Jendela terminal dengan chrome (titik warna + judul path) yang dipakai
// semua scene berbasis terminal di tutorial ini.
const TerminalWindow: React.FC<React.PropsWithChildren> = ({ children }) => (
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
      {children}
    </div>
  </div>
);

const TerminalLine: React.FC<{
  text: string;
  start: number;
  color?: string;
  fontSize?: number;
}> = ({ text, start, color = C.paper, fontSize = 28 }) => {
  const frame = useCurrentFrame();
  const count = Math.max(
    0,
    Math.min(text.length, Math.floor((frame - start) * 0.7)),
  );
  return (
    <div
      style={{
        color,
        minHeight: 44,
        fontSize,
        lineHeight: 1.55,
        whiteSpace: "pre",
      }}
    >
      {text.slice(0, count)}
      {frame >= start && count < text.length ? (
        <span style={{ opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0 }}>
          ▌
        </span>
      ) : null}
    </div>
  );
};

// Kartu langkah kecil dengan munculnya tanda centang sebagai penanda siap.
const CheckRow: React.FC<{
  title: string;
  description: string;
  badge: string;
  checkAt: number;
}> = ({ title, description, badge, checkAt }) => {
  const frame = useCurrentFrame();
  const checked = frame >= checkAt;
  return (
    <div
      style={{
        height: 170,
        marginBottom: 25,
        padding: "30px 34px",
        border: `1px solid ${checked ? "#729d55" : C.border}`,
        borderRadius: 24,
        background: checked ? "#192b22" : "#101c20",
        display: "flex",
        gap: 30,
        alignItems: "center",
      }}
    >
      <div
        style={{
          color: C.mint,
          fontFamily: MONO,
          fontSize: 30,
          fontWeight: 700,
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          padding: "12px 18px",
          background: "#060d12",
          minWidth: 130,
          textAlign: "center",
        }}
      >
        {badge}
      </div>
      <div>
        <div style={{ fontSize: 50, fontWeight: 700 }}>{title}</div>
        <div style={{ color: C.muted, fontSize: 30, marginTop: 6 }}>
          {description}
        </div>
      </div>
      <span
        style={{
          marginLeft: "auto",
          color: C.mint,
          fontSize: 44,
          opacity: checked ? 1 : 0,
          scale: checked ? "1" : "0.3",
        }}
      >
        ✓
      </span>
    </div>
  );
};

const Intro: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  // Garis koneksi App → PostgreSQL tumbuh, lalu titik connection berdenyut.
  const link = interpolate(frame, [55, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = frame > 85 ? 1 + Math.sin(frame / 6) * 0.12 : 0;
  return (
    <TutScene
      number="TUTORIAL"
      category="DARI NOL SAMPAI DATABASE"
      duration={5 * fps}
    >
      <Rise style={{ position: "absolute", left: 90, top: 360 }}>
        <div
          style={{
            fontSize: 108,
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: -5,
          }}
        >
          Clone.
          <br />
          Setup.
          <br />
          <span style={{ color: C.mint }}>Terhubung.</span>
        </div>
      </Rise>
      <Rise
        delay={22}
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 890,
          display: "flex",
          alignItems: "center",
          gap: 26,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 150,
            borderRadius: 24,
            border: `1px solid ${C.border}`,
            background: "#101c20",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: MONO,
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          App :8080
        </div>
        <div
          style={{
            width: 150,
            height: 8,
            borderRadius: 4,
            background: C.border,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${link * 100}%`,
              background: C.mint,
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            height: 150,
            borderRadius: 24,
            border: `1px solid ${C.border}`,
            background: "#101c20",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: MONO,
            fontSize: 30,
            fontWeight: 700,
            color: C.cyan,
          }}
        >
          PostgreSQL
        </div>
      </Rise>
      <div
        style={{
          position: "absolute",
          top: 1042,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: C.mint,
            opacity: pulse > 0 ? 1 : 0,
            scale: `${pulse}`,
          }}
        />
      </div>
      <Rise
        delay={95}
        style={{
          position: "absolute",
          left: 90,
          top: 1250,
          fontSize: 44,
          lineHeight: 1.4,
          color: C.muted,
        }}
      >
        Install boilerplate
        <br />
        <span style={{ color: C.paper }}>sampai connect database.</span>
      </Rise>
    </TutScene>
  );
};

const Prasyarat: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <TutScene number="PERSIAPAN" category="SEBELUM MULAI" duration={7 * fps}>
      <Rise style={{ position: "absolute", top: 354, left: 90 }}>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: -4,
          }}
        >
          Cek dulu
          <br />
          <span style={{ color: C.mint }}>bekalmu.</span>
        </div>
      </Rise>
      <div style={{ position: "absolute", left: 90, right: 90, top: 750 }}>
        {[
          ["git", "Git", "Untuk clone repositori"],
          ["go", "Go 1.26+", "Toolchain unduh otomatis"],
          ["dkr", "Docker", "Menjalankan seluruh stack"],
        ].map(([badge, title, description], i) => (
          <Rise key={title} delay={20 + i * 20}>
            <CheckRow
              badge={badge}
              title={title}
              description={description}
              checkAt={45 + i * 20}
            />
          </Rise>
        ))}
      </div>
      <Rise
        delay={110}
        style={{
          position: "absolute",
          left: 90,
          top: 1420,
          fontSize: 40,
          color: C.muted,
        }}
      >
        Semua siap? Mulai.
      </Rise>
    </TutScene>
  );
};

const Clone: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <TutScene
      number="STEP 1 / 5"
      category="CLONE REPOSITORI"
      duration={7 * fps}
    >
      <Rise style={{ position: "absolute", top: 354, left: 90 }}>
        <div
          style={{
            fontSize: 100,
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: -5,
          }}
        >
          Ambil
          <br />
          <span style={{ color: C.mint }}>source-nya.</span>
        </div>
      </Rise>
      <Rise
        delay={14}
        style={{ position: "absolute", left: 90, right: 90, top: 700 }}
      >
        <TerminalWindow>
          <TerminalLine start={18} text="$ git clone \" color={C.mint} />
          <TerminalLine
            start={40}
            text="  https://github.com/Nzrkodi/GO-boilerplate.git"
          />
          <TerminalLine
            start={112}
            text="→ Cloning into 'GO-boilerplate'..."
            color={C.muted}
          />
          <TerminalLine start={172} text="$ cd GO-boilerplate" color={C.mint} />
        </TerminalWindow>
      </Rise>
      <Rise
        delay={200}
        style={{
          position: "absolute",
          left: 90,
          top: 1180,
          fontSize: 42,
          color: C.muted,
        }}
      >
        Satu repo. Siap disetup.
      </Rise>
    </TutScene>
  );
};

const EnvSetup: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  // Tanda ✓ per baris .env muncul berurutan setelah perintah cp selesai.
  const lineDone = (i: number) =>
    interpolate(frame, [85 + i * 12, 97 + i * 12], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  return (
    <TutScene
      number="STEP 2 / 5"
      category="KONFIGURASI .ENV"
      duration={8 * fps}
    >
      <Rise style={{ position: "absolute", top: 354, left: 90 }}>
        <div
          style={{
            fontSize: 100,
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: -5,
          }}
        >
          Salin.
          <br />
          <span style={{ color: C.mint }}>Lalu isi.</span>
        </div>
      </Rise>
      <Rise
        delay={12}
        style={{ position: "absolute", left: 90, right: 90, top: 660 }}
      >
        <TerminalWindow>
          <TerminalLine
            start={18}
            text="$ cp .env.example .env"
            color={C.mint}
          />
        </TerminalWindow>
      </Rise>
      <Rise
        delay={70}
        style={{ position: "absolute", left: 90, right: 90, top: 880 }}
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
              height: 70,
              borderBottom: `1px solid ${C.border}`,
              background: "#152127",
              display: "flex",
              alignItems: "center",
              padding: "0 26px",
              fontFamily: MONO,
              color: C.muted,
              fontSize: 23,
            }}
          >
            .env
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 27,
              lineHeight: 1.85,
              padding: "30px 30px 38px",
            }}
          >
            {[
              ["POSTGRES_DB_HOST", "localhost"],
              ["POSTGRES_DB_PORT", "5432"],
              ["POSTGRES_DB_USER", "postgres"],
              ["POSTGRES_DB_PASSWORD", "••••••••"],
              ["POSTGRES_DB_NAME", "golang"],
            ].map(([key, value], i) => (
              <div key={key}>
                <span style={{ color: C.cyan }}>{key}</span>
                <span style={{ color: C.muted }}>=</span>
                <span>{value}</span>
                <span
                  style={{
                    opacity: lineDone(i),
                    color: C.mint,
                    marginLeft: 14,
                    fontSize: 24,
                  }}
                >
                  ✓
                </span>
              </div>
            ))}
          </div>
        </div>
      </Rise>
      <Rise
        delay={150}
        style={{
          position: "absolute",
          left: 90,
          top: 1520,
          fontSize: 40,
          color: C.muted,
        }}
      >
        Jangan lupa ganti <span style={{ color: C.mint }}>API_KEY</span>.
      </Rise>
    </TutScene>
  );
};

const DockerUp: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <TutScene number="STEP 3 / 5" category="JALANKAN STACK" duration={8 * fps}>
      <Rise style={{ position: "absolute", top: 354, left: 90 }}>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: -4,
          }}
        >
          Satu command.
          <br />
          <span style={{ color: C.mint }}>Stack penuh.</span>
        </div>
      </Rise>
      <Rise
        delay={14}
        style={{ position: "absolute", left: 90, right: 90, top: 700 }}
      >
        <TerminalWindow>
          <TerminalLine
            start={18}
            text="$ docker compose up -d --build"
            color={C.mint}
          />
          <div style={{ height: 24 }} />
          <TerminalLine
            start={75}
            text="→ Container postgres  Healthy"
            color={C.muted}
          />
          <TerminalLine
            start={92}
            text="→ Container redis     Healthy"
            color={C.muted}
          />
          <TerminalLine
            start={110}
            text="→ Container app       Running"
            color={C.muted}
          />
        </TerminalWindow>
      </Rise>
      <Rise
        delay={150}
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 1230,
        }}
      >
        <div
          style={{
            border: `1px solid #729d55`,
            borderRadius: 24,
            padding: "28px 32px",
            background: "#192b22",
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <span style={{ color: C.mint, fontSize: 44 }}>▲</span>
          <div>
            <div style={{ fontSize: 38, fontWeight: 700 }}>App berjalan</div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 30,
                color: C.mint,
                marginTop: 6,
              }}
            >
              http://localhost:8080
            </div>
          </div>
        </div>
      </Rise>
    </TutScene>
  );
};

const MigrateSeed: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <TutScene
      number="STEP 4 / 5"
      category="MIGRATION & SEED"
      duration={11 * fps}
    >
      <Rise style={{ position: "absolute", top: 354, left: 90 }}>
        <div
          style={{
            fontSize: 94,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: -4,
          }}
        >
          Siapkan
          <br />
          <span style={{ color: C.mint }}>database-nya.</span>
        </div>
      </Rise>
      <Rise
        delay={12}
        style={{ position: "absolute", left: 90, right: 90, top: 690 }}
      >
        <TerminalWindow>
          <TerminalLine
            start={18}
            text="$ docker compose exec app \"
            color={C.mint}
          />
          <TerminalLine
            start={60}
            text="    /app/migrate -path /app/migrations up"
          />
          <TerminalLine start={125} text="→ 3/3 applied" color={C.muted} />
          <div style={{ height: 22 }} />
          <TerminalLine
            start={150}
            text="$ docker compose exec app \"
            color={C.mint}
          />
          <TerminalLine
            start={195}
            text="    /app/migrate -seeds /app/seeds seed"
          />
          <TerminalLine
            start={260}
            text="→ 000001_dev_users applied"
            color={C.muted}
          />
        </TerminalWindow>
      </Rise>
      <Rise
        delay={300}
        style={{
          position: "absolute",
          left: 90,
          top: 1420,
          fontSize: 40,
          color: C.muted,
        }}
      >
        Runner bawaan. <span style={{ color: C.paper }}>Tanpa tools lain.</span>
      </Rise>
    </TutScene>
  );
};

const Verify: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const pop = (delay: number) => {
    const s = spring({
      frame: frame - delay,
      fps,
      config: { damping: 12, stiffness: 160 },
    });
    return interpolate(s, [0, 1], [0.4, 1]);
  };
  return (
    <TutScene number="STEP 5 / 5" category="CEK KONEKSI" duration={8 * fps}>
      <Rise style={{ position: "absolute", top: 354, left: 90 }}>
        <div
          style={{
            fontSize: 100,
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: -5,
          }}
        >
          Bukti
          <br />
          <span style={{ color: C.mint }}>tersambung.</span>
        </div>
      </Rise>
      <div style={{ position: "absolute", left: 90, right: 90, top: 700 }}>
        <Rise delay={12}>
          <div
            style={{
              border: `1px solid ${C.border}`,
              borderRadius: 26,
              background: "#060d12",
              padding: "32px 34px",
              fontFamily: MONO,
            }}
          >
            <div style={{ fontSize: 32, color: C.mint }}>GET /ping</div>
            <div style={{ height: 18 }} />
            <div
              style={{
                fontSize: 30,
                opacity: interpolate(frame, [45, 60], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                scale: `${pop(45)}`,
              }}
            >
              {"{ "}
              <span style={{ color: C.cyan }}>"message"</span>
              <span style={{ color: C.muted }}>: </span>
              <span style={{ color: C.mint }}>"PONG"</span>
              {" }"}
            </div>
          </div>
        </Rise>
        <div style={{ height: 26 }} />
        <Rise delay={80}>
          <div
            style={{
              border: `1px solid #729d55`,
              borderRadius: 26,
              background: "#192b22",
              padding: "32px 34px",
              fontFamily: MONO,
            }}
          >
            <div style={{ fontSize: 32, color: C.mint }}>GET /health</div>
            <div style={{ height: 18 }} />
            <div
              style={{
                fontSize: 30,
                lineHeight: 1.7,
                opacity: interpolate(frame, [110, 125], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div>
                <span style={{ color: C.cyan }}>postgres</span>
                <span style={{ color: C.muted }}>: </span>
                <span
                  style={{
                    background: C.mint,
                    color: C.bg,
                    borderRadius: 10,
                    padding: "4px 14px",
                    fontWeight: 700,
                    display: "inline-block",
                    scale: `${pop(110)}`,
                  }}
                >
                  UP
                </span>
              </div>
              <div>
                <span style={{ color: C.cyan }}>redis</span>
                <span style={{ color: C.muted }}>: </span>
                <span
                  style={{
                    background: C.mint,
                    color: C.bg,
                    borderRadius: 10,
                    padding: "4px 14px",
                    fontWeight: 700,
                    display: "inline-block",
                    scale: `${pop(125)}`,
                  }}
                >
                  UP
                </span>
              </div>
            </div>
          </div>
        </Rise>
      </div>
    </TutScene>
  );
};

const Outro: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const done = (d: number) =>
    interpolate(frame, [d, d + 12], [0.25, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  return (
    <TutScene number="SELESAI" category="SIAP DIKEMBANGKAN" duration={5 * fps}>
      <Rise style={{ position: "absolute", left: 90, top: 350 }}>
        <div
          style={{
            fontSize: 112,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -5,
          }}
        >
          Database
          <br />
          <span style={{ color: C.mint }}>tersambung.</span>
        </div>
      </Rise>
      <div style={{ position: "absolute", left: 90, right: 90, top: 760 }}>
        {[
          "Clone repositori",
          "Konfigurasi .env",
          "Stack via Docker",
          "Migration & seed",
          "Koneksi terverifikasi",
        ].map((item, i) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              padding: "22px 0",
              borderBottom: `1px solid ${C.border}`,
              opacity: done(15 + i * 8),
            }}
          >
            <span style={{ color: C.mint, fontSize: 36 }}>✓</span>
            <span style={{ fontSize: 38 }}>{item}</span>
          </div>
        ))}
      </div>
      <Rise
        delay={70}
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 1330,
        }}
      >
        <div
          style={{
            background: C.mint,
            color: C.bg,
            borderRadius: 24,
            padding: "28px 32px",
            fontFamily: MONO,
            fontSize: 31,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          github.com/Nzrkodi/GO-boilerplate
        </div>
        <div
          style={{
            color: C.muted,
            fontSize: 36,
            marginTop: 30,
            textAlign: "center",
          }}
        >
          Detail lengkap ada di README.
        </div>
      </Rise>
    </TutScene>
  );
};

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

export const GoBoilerplateTutorial: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill data-go-tutorial style={{ background: C.bg }}>
      <style>
        {"[data-go-tutorial], [data-go-tutorial] * { box-sizing: border-box; }"}
      </style>
      {/* Narasi diletakkan di dalam Sequence agar otomatis terpotong
          di akhir scene jika durasinya melebihi window scene. */}
      <Sequence durationInFrames={5 * fps} name="01-Intro">
        <Intro />
        <Audio
          name="Narasi-01"
          from={0.3 * fps}
          src={staticFile("tutorial/01.wav")}
        />
      </Sequence>
      <Sequence from={5 * fps} durationInFrames={7 * fps} name="02-Prasyarat">
        <Prasyarat />
        <Audio
          name="Narasi-02"
          from={0.3 * fps}
          src={staticFile("tutorial/02.wav")}
        />
      </Sequence>
      <Sequence
        from={12 * fps}
        durationInFrames={7 * fps}
        name="03-Step1-Clone"
      >
        <Clone />
        <Audio
          name="Narasi-03"
          from={0.3 * fps}
          src={staticFile("tutorial/03.wav")}
        />
      </Sequence>
      <Sequence from={19 * fps} durationInFrames={8 * fps} name="04-Step2-Env">
        <EnvSetup />
        <Audio
          name="Narasi-04"
          from={0.3 * fps}
          src={staticFile("tutorial/04.wav")}
        />
      </Sequence>
      <Sequence
        from={27 * fps}
        durationInFrames={8 * fps}
        name="05-Step3-Docker"
      >
        <DockerUp />
        <Audio
          name="Narasi-05"
          from={0.3 * fps}
          src={staticFile("tutorial/05.wav")}
        />
      </Sequence>
      <Sequence
        from={35 * fps}
        durationInFrames={11 * fps}
        name="06-Step4-Migrate"
      >
        <MigrateSeed />
        <Audio
          name="Narasi-06"
          from={0.3 * fps}
          src={staticFile("tutorial/06.wav")}
        />
      </Sequence>
      <Sequence
        from={46 * fps}
        durationInFrames={8 * fps}
        name="07-Step5-Verify"
      >
        <Verify />
        <Audio
          name="Narasi-07"
          from={0.3 * fps}
          src={staticFile("tutorial/07.wav")}
        />
      </Sequence>
      <Sequence from={54 * fps} durationInFrames={5 * fps} name="08-Outro">
        <Outro />
        <Audio
          name="Narasi-08"
          from={0.3 * fps}
          src={staticFile("tutorial/08.wav")}
        />
      </Sequence>
      {/* Musik ambient serial yang sama dengan video promo: diputar dua kali
          berurutan menutup durasi tutorial yang lebih panjang. */}
      <Audio
        name="Original ambient soundtrack (bagian 1)"
        src={staticFile("go-promo/music.wav")}
        volume={0.6}
      />
      <Audio
        name="Original ambient soundtrack (bagian 2)"
        from={45 * fps}
        src={staticFile("go-promo/music.wav")}
        volume={(f) =>
          interpolate(f, [56 * fps, 58.9 * fps], [0.6, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      <Progress />
    </AbsoluteFill>
  );
};
