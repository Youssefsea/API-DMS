# نستخدم nginx لتقديم الملفات
FROM nginx:alpine

# مسار ملفات nginx الافتراضي
WORKDIR /usr/share/nginx/html

# نسخ ملفات الـ frontend (HTML, CSS, JS)
COPY . .

# فتح البورت
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
