#!/bin/bash

# Benchmark lint time for each example project
# Usage: ./scripts/benchmark.sh

set -e

EXAMPLES_DIR="examples"
RESULTS=()

echo "kata lint benchmarks"
echo "===================="
echo ""

for example in "$EXAMPLES_DIR"/*/; do
  name=$(basename "$example")

  # Skip if no eslint.config.js
  if [ ! -f "$example/eslint.config.js" ]; then
    # Check monorepo packages
    if [ "$name" = "monorepo" ]; then
      for package in "$example"packages/*/; do
        pkg_name="$name/$(basename "$package")"
        if [ ! -f "$package/eslint.config.js" ]; then
          continue
        fi

        if [ ! -d "$package/node_modules" ]; then
          echo "Installing dependencies for $pkg_name..."
          (cd "$package" && npm install --silent 2>/dev/null)
        fi

        echo -n "$pkg_name: "
        start=$(date +%s%N)
        (cd "$package" && npx eslint src/ --ignore-pattern '**/*invalid*' --quiet 2>/dev/null) || true
        end=$(date +%s%N)

        elapsed=$(( (end - start) / 1000000 ))
        echo "${elapsed}ms"
        RESULTS+=("$pkg_name: ${elapsed}ms")
      done
    fi
    continue
  fi

  # Install dependencies if needed
  if [ ! -d "$example/node_modules" ]; then
    echo "Installing dependencies for $name..."
    (cd "$example" && npm install --silent 2>/dev/null)
  fi

  # Run lint and measure time
  echo -n "$name: "

  start=$(date +%s%N)
  (cd "$example" && npx eslint src/ --ignore-pattern '**/*invalid*' --quiet 2>/dev/null) || true
  end=$(date +%s%N)

  elapsed=$(( (end - start) / 1000000 ))
  echo "${elapsed}ms"

  RESULTS+=("$name: ${elapsed}ms")
done

echo ""
echo "Summary"
echo "-------"
for result in "${RESULTS[@]}"; do
  echo "  $result"
done
