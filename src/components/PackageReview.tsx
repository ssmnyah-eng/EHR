import Container from "./Container";
import Reveal from "./Reveal";

// Placeholder slot for a real, long-form customer review. Do not fill this
// with invented testimonial copy, swap in an actual client quote (with
// their permission) once one exists for this package.
export default function PackageReview({ packageName }: { packageName: string }) {
  return (
    <section className="bg-white/60 py-16 lg:py-24">
      <Container className="max-w-3xl">
        <Reveal>
          <p className="label text-center text-mauve">In Their Words</p>
          <div className="shadow-soft mt-6 rounded-[24px] bg-gradient-to-br from-mauve/10 via-white to-sage/8 p-10 text-center lg:p-14">
            <div aria-hidden className="text-2xl tracking-widest text-clay">
              ★★★★★
            </div>
            <p className="mt-6 font-display text-[22px] italic leading-relaxed text-charcoal/60 lg:text-[26px]">
              &ldquo;[Customer review placeholder, add a real {packageName}{" "}
              client quote here once one is collected]&rdquo;
            </p>
            <p className="mt-6 text-sm text-ink-soft">
              [Customer name, city] · [Google review link once available]
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
