# استخدم Node.js الرسمي
FROM node:20

# حدد مكان العمل داخل الكونتينر
WORKDIR /app

# نسخ الـ package.json والـ lock file
COPY package*.json ./

# نزّل الـ dependencies
RUN npm install

# نسخ باقي ملفات المشروع
COPY . .

# فتح البورت بتاع السيرفر
EXPOSE 5001

# تشغيل السيرفر
CMD ["node", "start.js"]
