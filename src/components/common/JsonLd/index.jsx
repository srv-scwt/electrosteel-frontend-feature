// Renders schema.org structured data as a JSON-LD script tag.
// `<` is escaped so a value containing "</script>" cannot break out of the tag.
const JsonLd = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    }}
  />
);

export default JsonLd;
