import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import Reveal from "@/components/Reveal";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog, Organizing, Cleaning & Moving Tips",
  description:
    "Practical, judgment-free advice on home organizing, cleaning, and moving from the Elevated Home Resets team in Virginia.",
};

const tones = ["clay", "sage", "mauve"] as const;

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from inside real homes"
        lede="Practical, judgment-free advice on organizing, cleaning, and moving, from a team that's seen it all and loved every reset."
      />
      <section className="pb-16 lg:pb-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 100} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="card-img-zoom t-hover shadow-soft flex h-full flex-col overflow-hidden rounded-[16px] bg-white/60 hover:-translate-y-1"
                >
                  <PhotoPlaceholder
                    label={post.imageLabel}
                    alt={post.imageLabel.replace("Photo: ", "")}
                    ratio="3/2"
                    tone={tones[i % 3]}
                    rounded="rounded-none"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="label text-mauve">{post.category}</p>
                    <h2 className="mt-2 text-[20px] leading-snug">
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft">
                      {post.excerpt}
                    </p>
                    <p className="mt-4 text-sm text-ink-soft">
                      {new Date(post.date + "T12:00:00").toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
