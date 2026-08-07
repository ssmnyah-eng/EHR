interface JsonLdProps {
  data: object;
}

/** Renders a single JSON-LD structured-data script tag. `<` is escaped
 *  so a `</script>` sequence inside any string value (e.g. an FAQ
 *  answer) can't prematurely close the tag. */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
