#!/bin/sh
set -xe
: "${API_URL?Precisa de uma variavel de ambiente API_URL}"

sed -i "s,API_URL_REPLACE_ME,$API_URL,g" /usr/share/nginx/html/static/js/main*.js

exec "$@"
