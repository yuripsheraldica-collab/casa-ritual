"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { LiquidMacroCanvas } from "@/components/canvas/LiquidMacroCanvas";

gsap.registerPlugin(ScrollTrigger);

const ingredients = [
  {
    name: "Óleos frios",
    note: "Nutrição profunda sem peso",
  },
  {
    name: "Ceramidas vegetais",
    note: "Barreira e brilho disciplinado",
  },
  {
    name: "Antioxidantes",
    note: "Proteção do dia a dia urbano",
  },
  {
    name: "Bioativos lentos",
    note: "Performance com calma",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  }),
};

const storyImage = {
  hidden: { opacity: 0, scale: 1.05 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Sections() {
  const ingredientRoot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ingredientRoot.current;
    if (!root) return;

    const cards = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-ingredient]"));
    gsap.set(cards, { opacity: 0, y: 36, filter: "blur(6px)" });

    const triggers = ScrollTrigger.batch(cards, {
      start: "top 82%",
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.05,
          stagger: 0.12,
          ease: "power3.out",
        });
      },
    }) as ScrollTrigger[];

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative z-10">
      <section className="relative flex min-h-[100svh] flex-col justify-end px-6 pb-16 pt-28 md:px-12 md:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />
        <div className="relative max-w-3xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-[var(--muted)]">
            Tratamento capilar
          </p>
          <h1 className="font-serif-display text-5xl leading-[0.95] tracking-tight text-[var(--fg)] md:text-7xl">
            Casa Ritual
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
            Um lugar onde o cabelo volta a ser tratado com tempo: fórmulas conscientes, texturas
            lentas e um ritual que cabe na sua rotina — sem pressa, sem excesso.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--fg)]">
              Versão estrutural
            </span>
            <span className="text-xs text-[var(--muted)]">Placeholder 3D + copy de exemplo</span>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[var(--accent)]">
              Scroll 01 — Ingredientes
            </p>
            <h2 className="mt-4 font-serif-display text-4xl text-[var(--fg)] md:text-5xl">
              O que entra na fórmula
            </h2>
            <p className="mt-4 text-[var(--muted)]">
              Apresentação cinematográfica: no lugar final, cada ativo pode ganhar nota técnica,
              origem e certificações.
            </p>
          </div>

          <div ref={ingredientRoot} className="grid gap-5 md:grid-cols-2">
            {ingredients.map((ing, idx) => (
              <div
                key={ing.name}
                data-ingredient
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--glass)] p-8 backdrop-blur-md"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -left-24 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-[var(--accent)]/10 to-transparent" />
                </div>
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                  {String(idx + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-serif-display text-2xl text-[var(--fg)]">{ing.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{ing.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[var(--accent)]">
              Scroll 02 — Macro líquido
            </p>
            <h2 className="mt-4 font-serif-display text-4xl text-[var(--fg)] md:text-5xl">
              Texturas em escala íntima
            </h2>
            <p className="mt-4 text-[var(--muted)]">
              Shader WebGL com ruído procedural (substituível por filmagem macro real do produto).
              A ideia é vender sensação: densidade, camadas, reflexo.
            </p>
          </div>
          <LiquidMacroCanvas />
        </div>
      </section>

      <section className="relative px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[var(--accent)]">
              Scroll 03 — História
            </p>
            <h2 className="mt-4 font-serif-display text-4xl text-[var(--fg)] md:text-5xl">
              Manifesto em silêncio
            </h2>
            <p className="mt-6 text-[var(--muted)]">
              A Casa Ritual nasce de uma premissa simples: o cabelo responde melhor quando o cuidado
              deixa de ser performance e vira presença. Menos promessas altas, mais consistência,
              aroma contido e resultado acumulado.
            </p>
            <p className="mt-4 text-[var(--muted)]">
              Esta coluna pode receber timeline, founders, sourcing, ou vídeo embutido do manifesto.
            </p>
          </div>

          <motion.div
            className="relative overflow-hidden rounded-2xl border border-white/10 lg:col-span-7"
            variants={storyImage}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1600&q=80"
                alt="Atmosfera de cuidado e textura — imagem de exemplo, não é o produto"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/10 to-black/40" />
            </div>
            <p className="absolute bottom-4 left-4 right-4 text-xs text-white/70">
              Foto de ambiente (Unsplash) — substitua por campanha, making-of ou still do filme da
              marca.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 py-28 md:px-12 md:py-36">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[var(--accent)]">
            Scroll 04 — Close do produto
          </p>
          <h2 className="mt-4 font-serif-display text-4xl text-[var(--fg)] md:text-6xl">
            O frasco placeholder vira protagonista
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[var(--muted)]">
            No scroll, a câmera aproxima e o objeto ganha escala — aqui você conecta com GLB real,
            rótulo em UV e materiais calibrados. Por enquanto, é um vidro genérico com etiqueta
            mínima.
          </p>

          <div className="mx-auto mt-14 grid max-w-3xl gap-6 md:grid-cols-3">
            {["Cheiro contido", "Absorção progressiva", "Brilho saudável"].map((t, i) => (
              <motion.div
                key={t}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-6 text-sm text-[var(--fg)]"
              >
                {t}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-32 md:px-12 md:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[var(--muted)]">
            Final — CTA
          </p>
          <h2 className="mt-5 font-serif-display text-4xl text-[var(--fg)] md:text-5xl">
            Entre na lista
          </h2>
          <p className="mt-4 text-sm text-[var(--muted)]">
            Ultra clean: depois você liga isso a e-mail marketing ou pré-venda.
          </p>
          <form
            className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row sm:items-stretch"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="seu@email.com"
              className="h-12 flex-1 rounded-full border border-white/15 bg-black/30 px-5 text-sm text-[var(--fg)] outline-none ring-0 placeholder:text-white/35 focus:border-[var(--accent)]/60"
            />
            <button
              type="submit"
              className="h-12 rounded-full bg-[var(--fg)] px-8 text-sm font-medium text-black transition hover:bg-white"
            >
              Avise-me
            </button>
          </form>
          <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-white/35">
            Casa Ritual — demo estrutural · 2026
          </p>
        </div>
      </section>
    </div>
  );
}
