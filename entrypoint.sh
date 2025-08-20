#!/bin/sh

# Đợi database sẵn sàng
until nc -z postgres 5432; do
	echo "Waiting for postgres..."
	sleep 2
done

# Chạy migrate
#pnpm prisma:migrate

# Khởi động app
node dist/main.js