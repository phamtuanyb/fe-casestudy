# CLAUDE.md — Frontend Showcase (Next.js) — Bám thiết kế có sẵn + Kết nối BE

> Đây là **repo FRONTEND** của hệ MKT Showcase. **Thiết kế giao diện ĐÃ CÓ SẴN do chủ dự án cung cấp** — nhiệm vụ của bạn là **dựng đúng theo thiết kế đó** và **kết nối mượt mà, ổn định với Backend qua API**. KHÔNG tự sáng tạo lại giao diện.
>
> Đi cặp với repo BACKEND (`CLAUDE-backend.md`) và **API Contract** (`API-Contract.md`). Đọc cả 3 trước khi code.

---

## CÁCH DÙNG (cho Phạm Tuân)
1. Tạo thư mục frontend (vd `mkt-casestudy-web/`), đặt file này tên `CLAUDE.md` ở gốc.
2. **Bỏ bộ thiết kế của anh vào thư mục `/design`** trong repo (Figma export, file ảnh/PDF, hoặc code HTML/React đã có) — đây là nguồn chân lý giao diện.
3. Backend cần chạy tới B2 để có API. Mở VS Code → Claude Code → gõ:
   > "Đọc CLAUDE.md, API-Contract.md và toàn bộ thư mục /design. Bắt đầu **F0**. Xong **DỪNG**, báo cáo + cách kiểm tra, chờ duyệt."
4. Duyệt xong gõ tiếp "Làm F1", "F2"...

## 1. NHIỆM VỤ
- **Dựng lại y hệt giao diện đã thiết kế** trong `/design` (layout, spacing, màu, font, component, hiệu ứng).
- **Kết nối với Backend** lấy nội dung (case study, video, testimonial, stat, logo) và gửi lead.
- **Đảm bảo kết nối mượt & chống lỗi** (mục 8) — đây là ưu tiên số 1.
- Giữ **SEO + tốc độ** bằng render server-side.

## 2. NGUỒN THIẾT KẾ (Source of truth) — ĐÃ CÓ FILE THẬT
**File thiết kế:** `/design/MKT_Showcase_dc.html` = nguồn chân lý DUY NHẤT về giao diện. Bám sát tuyệt đối.

### 2.1 Định dạng & cách port
- File là **mockup design-to-code**: dùng wrapper `<x-dc>`, `<helmet>`, vòng lặp `<sc-for list="{{ ... }}">`, điều kiện `<sc-if>`, binding `{{ ... }}`, thuộc tính `style-hover`, và `support.js`.
- **Nhiệm vụ:** PORT sang Next.js + React, **giữ nguyên 100% giao diện** (token, gradient, shadow, spacing `clamp(...)`, bố cục, hiệu ứng), nhưng:
  - `<sc-for>` → `.map()` trong React; `<sc-if>` → render có điều kiện.
  - `{{ binding }}` → props/biến thật lấy từ API.
  - `style-hover="..."` → CSS `:hover` (hoặc class) tương đương.
  - Bỏ `<x-dc>/<helmet>/support.js` (đó là khung của công cụ thiết kế, không dùng ở Next.js).
  - Inline `style` lớn → tách thành CSS module/Tailwind nhưng **giữ đúng giá trị**.
- **KHÔNG** đổi màu/layout/font/thêm-bớt section ngoài thiết kế. Thiếu trạng thái (loading/error) thì dựng theo đúng style file này và ghi chú.

### 2.2 Font & Design tokens (LẤY ĐÚNG TỪ FILE)
- **Font: `Be Vietnam Pro`** (Google Fonts, weights 400–900) — KHÔNG dùng Inter.
- Copy nguyên khối `:root` token trong file vào global CSS:
```
--orange:#FF8C00; --orange-600:#F57C00; --gold:#FFD700; --green:#2ECC71; --green-600:#27AE60; --pink:#FF4081;
--navy-900:#0A2E63; --navy-800:#0D47A1; --blue-700:#1565C0; --blue-600:#1976D2; --blue-500:#1E88E5; --blue-400:#42A5F5; --blue-300:#64B5F6; --blue-100:#BBDEFB; --blue-50:#E8F2FE;
--white:#fff; --ink:#11253F; --ink-soft:#41556E; --ink-faint:#7B8AA0; --line:#E2E9F2; --surface:#F4F8FD; --surface-2:#EAF2FB;
--grad-hero / --grad-hero-deep / --grad-product / --grad-cta / --grad-gold  (giữ nguyên giá trị trong file)
--sh-sm / --sh-md / --sh-lg / --sh-cta / --sh-gold ; --r-md:16px; --r-lg:22px; --r-pill:999px;
```

### 2.3 Các trang trong file (đã có sẵn)
1. **Trang chủ** — hero + counters (`statCards`) + Featured cases ("Kết quả thật, không phải lời hứa") + Video ("Nghe khách hàng kể...") + Testimonials ("Khách hàng nói gì về MKT?") + CTA + form lead (`#mkt-lead`).
2. **Danh sách câu chuyện** — hero "Câu chuyện khách hàng MKT" + filter (chip sản phẩm `productChips` + dropdown ngành `industryMenu`) + grid `filteredCases` + empty state (`hasResults`).
3. **Chi tiết case** — hero `detailCase.title` + big metrics + 3 khối **Vấn đề / Giải pháp / Kết quả** + share (copy/Zalo/FB) + "Câu chuyện liên quan".
4. **Video** — "Xem MKT hoạt động thực tế" + grid video.
- Điều hướng: file dùng `goList / goVideo / goDetail` (state). Khi port: map sang route Next.js `/cau-chuyen`, `/cau-chuyen/[slug]`, `/video`, `/`.

### 2.4 MAP DATA: binding của thiết kế ↔ field API (xem API-Contract)
| Binding trong thiết kế | Lấy từ API |
|---|---|
| `statCards[]: {idx, display, label}` | `StatItems` → `display` = `value`+`suffix` |
| `c.title, c.quote, c.industry` | CaseStudy `title, quote, industry.name` |
| `c.product` (đơn) | CaseStudy `products[0].name` (sản phẩm chính) |
| `c.bigValue` | CaseStudy `metrics[0].value` (số nổi bật) |
| `c.metrics[]: {value,label}` | CaseStudy `metrics` (các số còn lại) |
| `c.author: {initials,name,role}` | `customerName`(→initials), `customerRole` |
| `c.coverBg` | CaseStudy `coverColor` (cho phép màu HOẶC gradient CSS) |
| `detailCase.body.problem/solution/result` | CaseStudy `problem / solution / result` (richText) |
| `detailCase.bigMetrics[]` | CaseStudy `metrics` |
| `v.title, v.cat, v.dur, v.coverBg` | VideoReview `title, category, durationLabel, thumbnailColor` |
| `v.product` (đơn) | VideoReview `products[0].name` |
| `t.name, t.role, t.quote, t.stars, t.initials` | Testimonial `customerName, customerRole, content, rating` |

> **Lưu ý đồng bộ:** API Contract & Backend đã được cập nhật để case study có 3 trường `problem / solution / result` và `coverColor` nhận cả gradient — khớp đúng thiết kế. Nếu thấy lệch, theo API-Contract.md.

### 2.5 Khác
- Có **floating CTA** (mobile) + **hamburger menu** + hiệu ứng `mktRise` (reveal) + counters đếm động — giữ nguyên hành vi.
- `DesignBrief-MKT-Showcase.md` chỉ còn là tham khảo phụ — **khi mâu thuẫn, file `/design` thắng.**

## 3. STACK (CHỐT — KHÔNG ĐỔI)
- **Next.js 14+** App Router, **TypeScript**. CSS: giữ **CSS variables `:root` của thiết kế** làm nền; dùng Tailwind hoặc CSS Module tùy tiện, miễn **giá trị khớp file thiết kế**. Font **Be Vietnam Pro**.
- Lấy data từ Backend qua **REST theo API Contract**.
- **Render:** trang công khai dùng **SSG/ISR** (fetch ở Server Component) → SEO + nhanh. KHÔNG fetch nội dung công khai ở client.
- Video **embed YouTube**, ảnh `next/image`.
- Kiểm tra cú pháp Next.js mới nhất từ docs trước khi cài.

## 4. QUY TẮC BẮT BUỘC (GUARDRAILS)
1. **Bám `/design` tuyệt đối** — không tự sáng tạo giao diện (xem mục 2).
2. **🇻🇳 Mọi text hiển thị = tiếng Việt CÓ DẤU.** Ngoại lệ: tên thương hiệu MKT, domain.
3. **TOKEN GỌI API CHỈ Ở SERVER-SIDE.** `API_SERVICE_TOKEN` **không** đặt prefix `NEXT_PUBLIC_`, không lộ ra browser. Fetch nội dung trong Server Component / route handler.
4. **Lead đi qua proxy nội bộ** `/api/lead` của FE (validate + rate-limit + đính `sourceSlug`/UTM) rồi mới gọi BE — không cho browser gọi thẳng BE.
5. **Không hardcode nội dung thật** — mọi nội dung lấy từ API; chỉ dùng mock khi dựng UI ở F1.
6. Làm theo F0→F6, **xong mỗi F thì DỪNG** báo cáo. Tự build/lint trước khi báo.
7. Responsive đúng các breakpoint trong thiết kế.

## 5. KIẾN TRÚC KẾT NỐI
```
Browser ──> Next.js (SSR/SSG/ISR, Server Components)
                │  fetch nội dung (server-side, kèm API_SERVICE_TOKEN)
                ▼
            Backend Payload API  (REST /api/*)
Browser ──submit form──> Next.js /api/lead (proxy: validate + rate-limit + sourceSlug/UTM)
                │
                ▼  POST /api/leads (kèm token)
            Backend Payload API
Backend ──webhook publish──> Next.js /api/revalidate (revalidate path/tag)
```

## 6. CẤU TRÚC THƯ MỤC (mục tiêu)
```
/design/                              # THIẾT KẾ CÓ SẴN (nguồn chân lý) — không sửa
src/
├── app/
│   ├── page.tsx                      # Trang chủ
│   ├── cau-chuyen/page.tsx           # Danh sách + filter
│   ├── cau-chuyen/[slug]/page.tsx    # Chi tiết (generateMetadata cho OG)
│   ├── video/page.tsx
│   ├── api/lead/route.ts             # proxy lead -> BE
│   ├── api/revalidate/route.ts       # nhận webhook từ BE
│   ├── sitemap.ts
│   └── layout.tsx
├── lib/
│   ├── api.ts                        # API client server-side (typed, gắn token, retry/timeout)
│   ├── types.ts                      # types khớp API Contract
│   └── tracking.ts                   # GA4 events
└── components/                       # dựng theo /design, gắn data
```

## 7. LỘ TRÌNH BUILD (DỪNG sau mỗi F)

### F0 — Khởi tạo + nạp hệ thiết kế
- Khởi tạo Next.js + TS; `.env` + `.env.example`.
- Mở `/design/MKT_Showcase_dc.html`: copy nguyên khối token `:root` vào global CSS; load font **Be Vietnam Pro** (weights 400–900). Xác nhận đã nắm cấu trúc 4 trang (mục 2.3).
- **Nghiệm thu:** `npm run dev` chạy; trang trống đã đúng font Be Vietnam Pro + token màu/nền của thiết kế; báo cáo đã đọc được những trang/section nào.
- **DỪNG.**

### F1 — Port giao diện từ file thiết kế (mock data)
- PORT `MKT_Showcase_dc.html` sang React theo mục 2.1: dựng đủ **4 trang** (Trang chủ, Danh sách, Chi tiết, Video) + các component (Nav + hamburger, Hero, counters, CaseCard, VideoCard, Filter chip + dropdown ngành, Modal video, Testimonial, LeadForm `#mkt-lead`, Floating CTA, Footer). Dùng **mock data đúng shape mục 2.4**.
- Giữ nguyên token/gradient/shadow/clamp/hiệu ứng `mktRise`/hover. Map điều hướng `goList/goVideo/goDetail` → route Next.js.
- **Nghiệm thu:** 4 trang hiển thị **giống hệt** file thiết kế trên desktop + mobile; nêu rõ điểm lệch (nếu có).
- **DỪNG.**

### F2 — Tầng kết nối API (foundation)
- `lib/api.ts`: client fetch **server-side** gắn `API_SERVICE_TOKEN`, base URL từ env; **timeout + retry (1-2 lần) + xử lý lỗi**; helper query theo API Contract. `lib/types.ts` khớp schema. Cấu hình ISR `revalidate` + `next/image remotePatterns` cho domain ảnh BE.
- **Nghiệm thu:** Lấy danh sách case từ BE in đúng; giả lỗi/ngắt BE → fallback không vỡ trang; token KHÔNG có trong bundle client.
- **DỪNG.**

### F3 — Gắn data Case Study (UI ↔ API)
- Thay mock bằng data thật: `/cau-chuyen` SSG/ISR lấy case `published`; **filter client-side** theo product+industry, đồng bộ URL query; empty state theo thiết kế.
- `/cau-chuyen/[slug]`: render metrics/body/khách; nút share copy/Zalo/FB; `generateMetadata` Open Graph; case liên quan.
- **Nghiệm thu:** Lọc không reload; deep link mở đúng; share đúng; OG đẹp; source HTML có nội dung render sẵn (không rỗng).
- **DỪNG.**

### F4 — Gắn data Video + Trang chủ
- `/video`: grid + lọc + modal embed YouTube lazy (đóng nút/ESC/nền) — data thật.
- Trang chủ: stat strip đếm động, logo wall, case/video featured, wall of love — tất cả từ API.
- **Nghiệm thu:** đổi nội dung CMS → FE đổi đúng; mở video đúng; iframe chỉ load khi mở.
- **DỪNG.**

### F5 — Lead capture (proxy)
- Form theo thiết kế; route `/api/lead` proxy: validate, rate-limit, honeypot, đính `sourceSlug`+UTM, gọi `POST {BE}/api/leads` kèm token; toast thành công/lỗi theo style thiết kế.
- **Nghiệm thu:** Submit từ trang case → lead BE có `sourceSlug` đúng; token không lộ; spam bị chặn; lỗi mạng có thông báo thân thiện.
- **DỪNG.**

### F6 — Hardening kết nối + SEO + Tracking + QA
- `/api/revalidate` nhận webhook BE (check secret) → revalidate path/tag; `sitemap.ts`, robots, meta/OG, schema.org; GA4 events (`filter_used, case_view, case_share_click, video_play, cta_click, lead_submit`); tối ưu ảnh; QA responsive; rà tiếng Việt có dấu.
- **Rà soát kết nối cuối (mục 8).**
- **Nghiệm thu:** Lighthouse mobile Performance ≥ 85, SEO ≥ 95; publish BE → FE cập nhật; toàn bộ checklist mục 8 đạt.
- **DỪNG. → Bàn giao FE.**

## 8. ✅ CHECKLIST "KẾT NỐI BE MƯỢT MÀ" (ưu tiên số 1)
- [ ] **Đúng API Contract** — endpoint, query, header, shape khớp tuyệt đối.
- [ ] **Token chỉ server-side**, không lộ trong bundle/Network tab trình duyệt.
- [ ] **Timeout + retry** khi gọi BE; không treo trang vô hạn.
- [ ] **Xử lý lỗi nhẹ nhàng** — BE lỗi/500/timeout → trang vẫn render, có fallback/thông báo, không màn hình trắng.
- [ ] **Loading & empty state** theo thiết kế (skeleton khi cần).
- [ ] **ISR/cache hợp lý** — không gọi BE mỗi request; revalidate theo webhook.
- [ ] **CORS bắt tay đúng** — origin FE nằm trong `CORS_ORIGINS` của BE.
- [ ] **Ảnh BE hiển thị** — `remotePatterns` đúng domain.
- [ ] **Lead chạy 2 đầu** — proxy FE → BE tạo record kèm `sourceSlug`/UTM + email về.
- [ ] **Revalidate 2 chiều** — publish BE → FE cập nhật trong ít giây.
- [ ] **Type-safe** — types FE khớp shape API, không `any` ở ranh giới dữ liệu.

## 9. BIẾN MÔI TRƯỜNG (`.env`)
```
NEXT_PUBLIC_SITE_URL=https://casestudy.mktsoftware.vn
API_BASE_URL=https://api.casestudy.mktsoftware.vn   # CHỈ server-side
API_SERVICE_TOKEN=                                  # API key user service (KHÔNG NEXT_PUBLIC)
REVALIDATE_SECRET=                                  # khớp với BE
NEXT_PUBLIC_GA_ID=
```

## 10. LỆNH
```bash
npm run dev
npm run build
npm run lint
```
