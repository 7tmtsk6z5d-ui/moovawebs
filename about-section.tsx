const POINTS = [
  {
    title: "Susu segar",
    body: "Dipakai dingin, tanpa pengawet. Murni yang jujur, rasa yang berani.",
  },
  {
    title: "Dua ukuran",
    body: "250 ml buat sip cepat. 350 ml kalau lagi haus — cuma plus seribu.",
  },
  {
    title: "CS bisa request",
    body: "Vanilla, tarik, kurang manis, extra coklat. Tulis di Lainnya, kami bikinin.",
  },
];

export function AboutSection() {
  return (
    <section id="tentang" className="bg-ink px-5 py-16 text-foam md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-berry">
          About
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          Fresh milk, bottled daily. Playful on purpose.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-foam/75">
          Moova adalah susu botolan untuk yang mau yang dingin, creamy, dan gampang dipesan.
          Empat rasa tetap — plus opsi Lainnya kalau kamu punya request sendiri ke CS.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {POINTS.map((point) => (
            <article
              key={point.title}
              className="rounded-[1.4rem] border border-foam/10 bg-foam/5 p-6"
            >
              <h3 className="font-display text-2xl font-semibold">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foam/70">{point.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
