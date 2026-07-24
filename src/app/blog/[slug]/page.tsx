import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";
import { blogPosts, getPost } from "@/lib/blog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="py-16 lg:py-24">
      <Container className="max-w-3xl">
        <Reveal>
          <p className="label text-mauve">{post.category}</p>
          <h1 className="mt-3 text-[36px] leading-[1.15] lg:text-[48px]">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-ink-soft">
            {new Date(post.date + "T12:00:00").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <PhotoPlaceholder
            label={post.imageLabel}
            alt={post.imageLabel.replace("Photo: ", "")}
            ratio="16/9"
            tone="sage"
          />
        </Reveal>

        <Reveal delay={150} className="mt-10">
          <div className="flex flex-col gap-6">
            {post.body.map((paragraph, i) => (
              <p
                key={i}
                className={`leading-relaxed ${
                  i === 0
                    ? "text-[19px] font-medium text-charcoal"
                    : "text-lg text-ink-soft"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <div className="rounded-[16px] bg-gradient-to-r from-clay/10 to-sage/10 p-8 text-center">
            <p className="font-display text-[22px]">
              Ready to stop reading and start resetting?
            </p>
            <div className="mt-5">
              <CTAButton href={post.relatedServiceHref}>
                {post.relatedServiceLabel}
              </CTAButton>
            </div>
          </div>
        </Reveal>

        {related.length > 0 && (
          <Reveal className="mt-16">
            <p className="label text-charcoal/60">Keep reading</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="t-hover shadow-soft rounded-[16px] bg-white/60 p-6 hover:-translate-y-1"
                >
                  <p className="label text-mauve">{p.category}</p>
                  <p className="mt-2 font-display text-[18px] leading-snug">
                    {p.title}
                  </p>
                </Link>
              ))}
            </div>
          </Reveal>
        )}
      </Container>
    </article>
  );
}
