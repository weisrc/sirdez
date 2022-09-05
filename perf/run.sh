set -e

find perf/*/*.ts -print0 | xargs -t0 -n 1 -P $(nproc) -I {} yarn ts-node {}

echo creating charts
yarn ts-node perf/bootstrap