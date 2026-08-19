// Yup's built-in .email() is deliberately permissive — it accepts "a@b",
// "test@test" and "john@example" with no TLD at all. Require a real domain
// with a 2+ letter TLD instead. Shared so every enquiry form validates the
// same way.
export const EMAIL_PATTERN =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;

export const EMAIL_MESSAGE =
    "Enter a valid email address, for example name@company.com";
