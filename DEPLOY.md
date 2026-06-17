# Deploy — MKT Showcase Web (Frontend)

> 📖 **Hướng dẫn deploy ĐẦY ĐỦ cả hệ thống** (VPS, Postgres, Nginx, SSL, kết nối BE↔FE)
> nằm ở repo Backend: `be-casestudy/DEPLOY.md`. File này chỉ tóm tắt phần **riêng của FE**.

FE là website Next.js, đọc nội dung từ Backend (Payload) qua API key — chạy cổng **3001**.

---

## 1. Biến môi trường (`.env`)

```env
NEXT_PUBLIC_SITE_URL=https://casestudy.mktsoftware.vn
API_BASE_URL=https://api.casestudy.mktsoftware.vn      # URL Backend (chỉ server-side)
API_SERVICE_TOKEN=<API key user "service" của Backend>
REVALIDATE_SECRET=<bí mật — PHẢI khớp REVALIDATE_SECRET bên BE>
NEXT_PUBLIC_GA_ID=                                       # tùy chọn
```

> ⚠️ `API_SERVICE_TOKEN` và `REVALIDATE_SECRET` phải khớp với Backend — xem **Phần E (bảng đối chiếu)** trong `be-casestudy/DEPLOY.md`. Token là **server-side**, KHÔNG đặt `NEXT_PUBLIC_`.

---

## 2. Build & chạy

```bash
npm ci
npm run build
npm run start            # next start -p 3001
# hoặc với PM2:
pm2 start "npm run start" --name mkt-fe && pm2 save
```

---

## 3. Lưu ý riêng FE

- **Ảnh từ Backend**: `next.config.mjs` tự thêm host của `API_BASE_URL` vào `images.remotePatterns`. Đảm bảo `API_BASE_URL` đúng domain BE (HTTPS) thì ảnh upload (avatar/cover) mới hiển thị.
- **Route nội bộ FE**:
  - `POST /api/lead` — proxy nhận form, gắn nguồn/UTM rồi gọi BE `POST /api/leads`.
  - `POST /api/revalidate` — nhận webhook từ BE khi publish nội dung (kiểm tra `REVALIDATE_SECRET`).
- **Nginx / SSL**: cấu hình reverse proxy `casestudy.mktsoftware.vn → 127.0.0.1:3001` — xem **Phần F** trong master guide.

---

## 4. Redeploy

```bash
cd /var/www/mkt/fe && git pull
npm ci && npm run build
pm2 restart mkt-fe
```

---

## 5. Checklist FE

- [ ] Trang chủ / `/cau-chuyen` / `/video` hiển thị nội dung từ BE.
- [ ] Ảnh avatar/cover hiển thị qua HTTPS.
- [ ] Submit form tư vấn → BE tạo lead (kiểm tra trong admin BE).
- [ ] Publish case ở admin BE → nội dung mới lên web sau ~vài giây (revalidate chạy).
