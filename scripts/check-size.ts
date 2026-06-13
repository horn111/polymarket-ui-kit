const budgetKb = 80;
const packages = [
  "@polymarket-ui-kit/core",
  "@polymarket-ui-kit/react",
  "@polymarket-ui-kit/registry",
  "@polymarket-ui-kit/cli"
];

console.log("Bundle budget targets:");
for (const packageName of packages) {
  console.log(`- ${packageName}: <= ${budgetKb}kb min+gzip target for first stable`);
}

