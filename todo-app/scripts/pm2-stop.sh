#!/bin/bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

name='todo-app'

(
  set -x
  pm2 stop "${name}"
)