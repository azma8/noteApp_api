#!/bin/bash

# cek apakah migrasi udah pernah dijalanin
if [ ! -f /api/.migrated ]; then
  echo "Menjalankan migrate..."
  npm run migrate && touch /api/.migrated
else
  echo "Migrate udah pernah dijalankan, skip..."
fi

# jalankan API
npm run api
