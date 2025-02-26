#!/usr/bin/env bash
# Use this script to wait for MySQL to be available before starting your service

set -e

host="$1"
port="$2"
shift 2
cmd="$@"

until nc -z "$host" "$port"; do
  >&2 echo "MySQL is unavailable - waiting..."
  sleep 3
done

>&2 echo "MySQL is up - executing command"
exec $cmd
