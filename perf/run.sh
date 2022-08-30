set -e

find perf/*/*.ts -print0 | xargs -t0 -n 1 -P 2 -I {} yarn ts-node {}

echo creating charts
yarn ts-node perf/bootstrap