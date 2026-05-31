#!/bin/bash
set -e

# Wait for MySQL
echo "Waiting for MySQL..."
until bash -c "echo > /dev/tcp/${DB_HOST:-mysql}/${DB_PORT:-3306}" 2>/dev/null; do
    sleep 2
done
echo "MySQL ready."

# Install Composer deps if vendor is missing
if [ ! -f "vendor/autoload.php" ]; then
    composer install --no-interaction --prefer-dist --optimize-autoloader
fi

php artisan migrate --force
php artisan storage:link --quiet 2>/dev/null || true

exec "$@"
