// Plain JS mirror of GTIN check used in src/lib/audit.ts

function isValidGtin(raw) {
  if (!raw) return false;
  const digits = raw.replace(/\D/g, "");
  if (![8, 12, 13, 14].includes(digits.length)) return false;
  const nums = digits.split("").map(Number);
  const check = nums.pop();
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    const fromRight = nums.length - 1 - i;
    sum += nums[fromRight] * (i % 2 === 0 ? 3 : 1);
  }
  return (10 - (sum % 10)) % 10 === check;
}

const cases = [
  ["036000291452", true],
  ["123456789011", false], // valid payload would need check digit 2
  ["", false],
];

let failed = 0;
for (const [input, expected] of cases) {
  const got = isValidGtin(input);
  if (got !== expected) {
    console.error("FAIL", input, "expected", expected, "got", got);
    failed++;
  } else {
    console.log("OK", input, got);
  }
}
process.exit(failed ? 1 : 0);
