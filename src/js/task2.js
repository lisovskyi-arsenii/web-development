const PHONE_FORMATS = {
  parenthesized: /^\(\d{3}\)-\d{3}-\d{4}$/, // (720)-981-1014
  threeThreeFour: /^\d{3}-\d{3}-\d{4}$/, // 636-857-3801
  eightDigits: /^\d{8}$/, // 36513745
};

const PHONE_PATTERNS = new Map([
  ["Germany", /^\d{4}-\d{7}$/],
  ["Ireland", PHONE_FORMATS.threeThreeFour],
  ["Canada", PHONE_FORMATS.threeThreeFour],
  ["United States", PHONE_FORMATS.parenthesized],
  ["Turkey", PHONE_FORMATS.parenthesized],
  ["New Zealand", PHONE_FORMATS.parenthesized],
  ["Netherlands", PHONE_FORMATS.parenthesized],
  ["Australia", /^\d{2}-\d{4}-\d{4}$/],
  ["Finland", /^\d{2}-\d{3}-\d{3}$/],
  ["Switzerland", /^\d{3} \d{3} \d{2} \d{2}$/],
  ["Spain", /^\d{3}-\d{3}-\d{3}$/],
  ["Norway", PHONE_FORMATS.eightDigits],
  ["Denmark", PHONE_FORMATS.eightDigits],
  ["Iran", /^\d{3}-\d{8}$/],
  ["France", /^(\d{2}-){4}\d{2}$/],
]);

const GENERIC_PHONE = /^\+?[\d\s\-()]{6,20}$/;

function isUpperCase(str) {
  if (str.length > 0 && str.charAt(0) === str.charAt(0).toUpperCase()) {
    return true;
  }
  return false;
}

function assertString(value, fieldName) {
  if (typeof value !== "string") {
    throw new Error(`User's ${fieldName} is not 'string' type`);
  }
}

function assertStringWithUpperCase(value, fieldName) {
  assertString(value, fieldName);

  if (value.length > 0) {
    if (!isUpperCase(value)) {
      throw new Error(`User's ${fieldName} is not starting with uppercase`);
    }
  }
}

function assertNumber(value, fieldName) {
  if (typeof value !== "number") {
    throw new Error(`User's ${fieldName} is not a number`);
  }
}

function assertPhoneNumber(phone, country) {
  assertString(phone, "phone");

  const pattern = PHONE_PATTERNS.get(country) ?? GENERIC_PHONE;

  if (!pattern.test(phone)) {
    throw new Error(
      `User's phone "${phone}" does not match the phone format of ${country}`,
    );
  }
}

function assertEmail(email) {
  assertString(email, "email");

  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!pattern.test(email)) {
    throw new Error(`User's email "${email}" is not a valid email`);
  }
}

export function validateUser(user) {
  assertStringWithUpperCase(user.full_name, "full name");
  assertStringWithUpperCase(user.gender, "gender");
  assertStringWithUpperCase(user.note, "note");
  assertStringWithUpperCase(user.state, "state");
  assertStringWithUpperCase(user.city, "city");
  assertStringWithUpperCase(user.country, "country");

  assertNumber(user.age, "age");
  assertPhoneNumber(user.phone, user.country);
  assertEmail(user.email);
}
