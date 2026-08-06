// Shared Yup rule for free-text fields: rejects values containing an HTML tag
// (opening or closing), e.g. "<script>...". Defense-in-depth against payloads
// like the ones tested in the client's VAPT — the field is never reflected back
// on this frontend, but the API/CMS that eventually stores and displays it is
// out of this repo's control, so the client should still not be able to submit
// tag-shaped input in the first place.
export const noHtmlTags = {
  name: "no-html-tags",
  message: "Special characters like < and > are not allowed here",
  test: (value) => !value || !/<\/?[a-zA-Z]/.test(value),
};
