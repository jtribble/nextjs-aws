#!/bin/bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

name='todo-app'

pid="$(pm2 pid "${name}")"

if [[ -z "${pid}" ]]; then
  (
    set -x
    pm2 start --name "${name}" npm -- start
    pm2 save
  )
else
  (
    set -x
    pm2 ls
  )
fi