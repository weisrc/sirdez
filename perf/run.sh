set -e

yarn ts-node perf/main/general
yarn ts-node perf/main/matrix
yarn ts-node perf/main/messages
yarn ts-node perf/main/users

echo creating charts
yarn ts-node perf/charts