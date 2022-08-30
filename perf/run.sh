set -e

find perf/*/*.ts -exec yarn ts-node {} \;

echo creating charts
yarn ts-node --esm perf/bootstrap