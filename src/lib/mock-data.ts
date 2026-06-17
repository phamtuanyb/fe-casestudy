// ⚠️ MOCK DATA cho F1 (dựng UI). F2 sẽ thay bằng lib/api.ts gọi Backend thật.
// Dữ liệu được giữ đúng shape API Contract (mục 4) để F3 chỉ cần đổi nguồn.
import type {
  CaseStudy,
  Industry,
  Product,
  StatItem,
  Testimonial,
  VideoReview,
} from './types';

const P: Record<string, Product> = {
  zalo: { id: 'p-zalo', name: 'MKT Zalo', slug: 'mkt-zalo', color: '#1E88E5' },
  uid: { id: 'p-uid', name: 'MKT UID', slug: 'mkt-uid', color: '#1565C0' },
  care: { id: 'p-care', name: 'MKT Care', slug: 'mkt-care', color: '#1976D2' },
  post: { id: 'p-post', name: 'MKT Post', slug: 'mkt-post', color: '#42A5F5' },
  traffic: { id: 'p-traffic', name: 'MKT Traffic', slug: 'mkt-traffic', color: '#0D47A1' },
  viral: { id: 'p-viral', name: 'MKT Viral', slug: 'mkt-viral', color: '#FF8C00' },
  maps: { id: 'p-maps', name: 'MKT Maps', slug: 'mkt-maps', color: '#2ECC71' },
  group: { id: 'p-group', name: 'MKT Group', slug: 'mkt-group', color: '#FF4081' },
};

const I: Record<string, Industry> = {
  banle: { id: 'i-banle', name: 'Bán lẻ', slug: 'ban-le' },
  thoitrang: { id: 'i-thoitrang', name: 'Thời trang', slug: 'thoi-trang' },
  noithat: { id: 'i-noithat', name: 'Nội thất', slug: 'noi-that' },
  mypham: { id: 'i-mypham', name: 'Mỹ phẩm', slug: 'my-pham' },
  giaoduc: { id: 'i-giaoduc', name: 'Giáo dục', slug: 'giao-duc' },
  fnb: { id: 'i-fnb', name: 'F&B', slug: 'f-and-b' },
  bds: { id: 'i-bds', name: 'BĐS', slug: 'bds' },
  giadung: { id: 'i-giadung', name: 'Gia dụng', slug: 'gia-dung' },
};

// Cover gradients — đúng thứ tự xoay vòng trong thiết kế.
const COVERS = [
  'linear-gradient(135deg,#0A2E63 0%,#1565C0 100%)',
  'linear-gradient(135deg,#1565C0 0%,#1E88E5 100%)',
  'linear-gradient(135deg,#0D47A1 0%,#42A5F5 100%)',
  'linear-gradient(150deg,#0A2E63 0%,#1976D2 100%)',
];
const cover = (i: number) => COVERS[i % COVERS.length];

export const products: Product[] = Object.values(P);
export const industries: Industry[] = Object.values(I);

export const caseStudies: CaseStudy[] = [
  {
    id: 'c-shop-anna',
    slug: 'shop-anna',
    title: 'Tăng x3 đơn hàng mỗi ngày chỉ sau 2 tháng dùng MKT Zalo',
    quote:
      'Trước đây mình nhắn tin tay cả ngày không xuể. Giờ phần mềm tự kết bạn, tự chăm sóc — sáng nào mở máy cũng có đơn.',
    problem:
      'Chị Lan vận hành một shop mẹ và bé với hàng nghìn khách trên Zalo. Mỗi ngày chị mất gần như toàn bộ thời gian để kết bạn, nhắn tin và gửi chương trình khuyến mãi thủ công — vừa chậm, vừa bỏ sót khách, lại không thể mở rộng tệp khách hàng.',
    solution:
      'Với MKT Zalo, chị thiết lập kịch bản tự động kết bạn theo nhóm khách mục tiêu, gửi tin nhắn chăm sóc và nuôi tài khoản theo lịch. Phần mềm chạy nền cả ngày, chị chỉ cần kiểm tra đơn và chốt sale.',
    result:
      'Sau 2 tháng, lượng đơn mỗi ngày tăng gấp ba, thời gian chăm sóc khách giảm 70%, và tệp bạn bè Zalo tăng thêm hơn 12.000 người — tất cả mà không cần thuê thêm nhân sự.',
    customerName: 'Nguyễn Thị Lan',
    customerRole: 'Chủ shop Mẹ & Bé Anna',
    coverColor: cover(0),
    metrics: [
      { value: 'x3', label: 'Đơn hàng mỗi ngày' },
      { value: '-70%', label: 'Thời gian chăm sóc' },
      { value: '12.000+', label: 'Bạn bè Zalo mới' },
    ],
    industry: I.banle,
    products: [P.zalo],
    featured: true,
    published: true,
    order: 1,
  },
  {
    id: 'c-luxe',
    slug: 'luxe',
    title: 'Quét 50.000 UID khách tiềm năng, giảm 60% chi phí quảng cáo',
    quote:
      'Có data đúng tệp, mỗi đồng quảng cáo đều đáng giá. Chi phí trên mỗi đơn của shop giảm hẳn một nửa.',
    problem:
      'Shop thời trang LUXE đốt ngân sách quảng cáo lớn nhưng tệp khách quá rộng, tỷ lệ chuyển đổi thấp và chi phí trên mỗi đơn ngày một tăng.',
    solution:
      'MKT UID giúp đội marketing quét chính xác UID của những người đã tương tác với các fanpage thời trang cùng phân khúc, lọc theo độ tuổi và hành vi, sau đó đưa vào tệp quảng cáo target.',
    result:
      'Chỉ trong một chiến dịch, shop thu về 50.000 UID chất lượng, chi phí quảng cáo giảm 60% và tỷ lệ chuyển đổi tăng gấp 2,5 lần so với chạy quảng cáo rộng như trước.',
    customerName: 'Trần Minh Quân',
    customerRole: 'Founder Thời Trang LUXE',
    coverColor: cover(1),
    metrics: [
      { value: '50.000', label: 'UID khách tiềm năng' },
      { value: '-60%', label: 'Chi phí quảng cáo' },
      { value: 'x2.5', label: 'Tỷ lệ chuyển đổi' },
    ],
    industry: I.thoitrang,
    products: [P.uid],
    featured: true,
    published: true,
    order: 2,
  },
  {
    id: 'c-hoanggia',
    slug: 'hoanggia',
    title: 'Nuôi 30 nick Facebook tự động, phủ sóng toàn thành phố',
    quote:
      'Một mình tôi không thể trực 30 tài khoản. MKT Care làm điều đó cả ngày lẫn đêm, đều như vắt chanh.',
    problem:
      'Anh Hoàng cần phủ sản phẩm nội thất trên nhiều khu vực nhưng việc duy trì hàng chục tài khoản Facebook "sống" để đăng bài là bất khả thi khi làm thủ công, và nick rất dễ bị khoá.',
    solution:
      'MKT Care tự động hoá việc nuôi nick: tương tác, like, đăng bài và kết bạn theo hành vi người dùng thật, giúp tài khoản an toàn và uy tín hơn theo thời gian.',
    result:
      'Anh duy trì ổn định 30 tài khoản, lượng tiếp cận tăng gấp 5 lần và không có tài khoản nào bị khoá trong suốt quá trình triển khai.',
    customerName: 'Lê Văn Hoàng',
    customerRole: 'Chủ xưởng Nội Thất Hoàng Gia',
    coverColor: cover(2),
    metrics: [
      { value: '30', label: 'Tài khoản nuôi tự động' },
      { value: 'x5', label: 'Lượng tiếp cận' },
      { value: '0', label: 'Nick bị khoá' },
    ],
    industry: I.noithat,
    products: [P.care],
    featured: true,
    published: true,
    order: 3,
  },
  {
    id: 'c-huongsen',
    slug: 'huongsen',
    title: 'Đăng 200 bài mỗi ngày lên đa nhóm, doanh số +120%',
    quote:
      'Nội dung của tôi giờ xuất hiện ở khắp các hội nhóm mục tiêu. Đơn về liên tục, không còn cảnh ngồi đăng tay từng bài.',
    problem:
      'Chị Hương có sản phẩm tốt nhưng độ phủ thấp. Đăng bài thủ công lên từng nhóm vừa tốn thời gian vừa không thể duy trì tần suất đủ để tạo nhận diện.',
    solution:
      'MKT Post cho phép chị soạn nội dung một lần rồi tự động đăng hàng loạt lên hàng trăm nhóm mục tiêu theo lịch, kèm xoay nội dung để tránh trùng lặp.',
    result:
      'Thương hiệu phủ sóng hơn 350 nhóm, đăng tới 200 bài mỗi ngày và doanh số tăng 120% chỉ sau một quý.',
    customerName: 'Phạm Thu Hương',
    customerRole: 'Chủ thương hiệu Mỹ Phẩm Hương Sen',
    coverColor: cover(3),
    metrics: [
      { value: '+120%', label: 'Doanh số' },
      { value: '200', label: 'Bài đăng mỗi ngày' },
      { value: '350+', label: 'Nhóm phủ sóng' },
    ],
    industry: I.mypham,
    products: [P.post],
    featured: false,
    published: true,
    order: 4,
  },
  {
    id: 'c-etalk',
    slug: 'etalk',
    title: 'Kéo hơn 1.000 lượt traffic mỗi ngày về fanpage khoá học',
    quote:
      'Fanpage trước đây vắng tanh. Giờ tương tác tăng vọt, học viên đăng ký tư vấn mỗi ngày.',
    problem:
      'Học viện E-Talk có fanpage nhưng lượng truy cập tự nhiên thấp, ít tương tác nên các bài tuyển sinh khó tiếp cận học viên tiềm năng.',
    solution:
      'MKT Traffic tự động đưa tài khoản vào nhóm, tăng tương tác và điều hướng lưu lượng về fanpage và bài viết tuyển sinh một cách đều đặn.',
    result:
      'Fanpage nhận hơn 1.000 lượt traffic mỗi ngày, tương tác tăng 260% và số lượt đăng ký tư vấn khoá học tăng gấp 4 lần.',
    customerName: 'Đỗ Quốc Anh',
    customerRole: 'Giám đốc Học Viện Anh Ngữ E-Talk',
    coverColor: cover(4),
    metrics: [
      { value: '1.000+', label: 'Lượt traffic mỗi ngày' },
      { value: 'x4', label: 'Lượt đăng ký tư vấn' },
      { value: '+260%', label: 'Tương tác fanpage' },
    ],
    industry: I.giaoduc,
    products: [P.traffic],
    featured: false,
    published: true,
    order: 5,
  },
  {
    id: 'c-quananngon',
    slug: 'quananngon',
    title: 'Bài seeding chạm 2 triệu reach, kín bàn mỗi cuối tuần',
    quote:
      'Một bài viral đúng cách kéo khách kín quán cả cuối tuần. Chi phí gần như bằng không.',
    problem:
      'Quán ăn của chị Mai phụ thuộc vào khách quen, các dịp cuối tuần lại không ổn định và ngân sách marketing rất hạn chế.',
    solution:
      'MKT Viral hỗ trợ tạo và seeding nội dung hấp dẫn vào đúng các nhóm ăn uống địa phương, đẩy lượt tương tác và chia sẻ tự nhiên.',
    result:
      'Một chiến dịch seeding chạm 2 triệu lượt tiếp cận, hơn 5.000 lượt chia sẻ và lượng khách cuối tuần tăng 85% — gần như không tốn chi phí quảng cáo.',
    customerName: 'Vũ Thị Mai',
    customerRole: 'Chủ chuỗi Quán Ăn Ngon',
    coverColor: cover(5),
    metrics: [
      { value: '2 triệu', label: 'Lượt tiếp cận' },
      { value: '+85%', label: 'Lượng khách' },
      { value: '5.000+', label: 'Lượt chia sẻ' },
    ],
    industry: I.fnb,
    products: [P.viral],
    featured: false,
    published: true,
    order: 6,
  },
  {
    id: 'c-datvang',
    slug: 'datvang',
    title: 'Quét 8.000 data doanh nghiệp từ Google Maps chỉ trong một đêm',
    quote:
      'Đội sale của tôi có ngay danh sách khách B2B chất lượng, không phải đi tìm thủ công nữa.',
    problem:
      'Đội sale BĐS cần danh sách doanh nghiệp theo khu vực để chào dịch vụ cho thuê văn phòng, nhưng việc tìm thông tin thủ công trên Google Maps quá chậm.',
    solution:
      'MKT Maps quét tự động tên, địa chỉ, số điện thoại và lĩnh vực của doanh nghiệp theo khu vực và từ khoá mục tiêu, xuất ra danh sách sạch để đội sale dùng ngay.',
    result:
      'Chỉ trong một đêm chạy, đội thu về 8.000 data doanh nghiệp, giúp số lịch hẹn của sale tăng gấp 3 lần ngay tháng đầu.',
    customerName: 'Hoàng Đức Thắng',
    customerRole: 'Trưởng phòng KD, BĐS Đất Vàng',
    coverColor: cover(6),
    metrics: [
      { value: '8.000', label: 'Data doanh nghiệp' },
      { value: '1 đêm', label: 'Thời gian quét' },
      { value: 'x3', label: 'Lịch hẹn sale' },
    ],
    industry: I.bds,
    products: [P.maps],
    featured: false,
    published: true,
    order: 7,
  },
  {
    id: 'c-minhphat',
    slug: 'minhphat',
    title: 'Quản lý 120 nhóm Facebook, đơn sỉ tăng gấp đôi',
    quote:
      'Tất cả nhóm bán sỉ của tôi được đăng bài và quản lý từ một nơi. Đơn sỉ tăng gấp đôi trong 3 tháng.',
    problem:
      'Anh Phát bán sỉ gia dụng qua hàng trăm nhóm Facebook nhưng việc đăng bài, theo dõi và trả lời ở từng nhóm riêng lẻ khiến anh quá tải.',
    solution:
      'MKT Group gom toàn bộ nhóm về một bảng điều khiển, cho phép đăng bài hàng loạt theo lịch, lọc nhóm hiệu quả và quản lý tương tác tập trung.',
    result:
      'Anh quản lý gọn 120 nhóm, giảm 80% công sức vận hành và lượng đơn sỉ tăng gấp đôi chỉ sau 3 tháng.',
    customerName: 'Bùi Văn Phát',
    customerRole: 'Chủ Gia Dụng Minh Phát',
    coverColor: cover(7),
    metrics: [
      { value: '120', label: 'Nhóm quản lý' },
      { value: 'x2', label: 'Đơn sỉ' },
      { value: '-80%', label: 'Công sức vận hành' },
    ],
    industry: I.giadung,
    products: [P.group],
    featured: false,
    published: true,
    order: 8,
  },
];

export const videoReviews: VideoReview[] = [
  {
    id: 'v1',
    slug: 'review-mkt-zalo-thoi-trang',
    title: 'Chủ shop thời trang đánh giá thật sau 6 tháng dùng MKT',
    youtubeId: 'ScMzIvxBSi4',
    category: 'danh-gia',
    categoryLabel: 'Đánh giá',
    durationLabel: '4:12',
    thumbnailColor: cover(0),
    products: [P.zalo],
    featured: true,
    published: true,
    order: 1,
  },
  {
    id: 'v2',
    slug: 'huong-dan-quet-uid',
    title: 'Hướng dẫn quét 10.000 UID khách tiềm năng trong 5 phút',
    youtubeId: 'ScMzIvxBSi4',
    category: 'huong-dan',
    categoryLabel: 'Hướng dẫn',
    durationLabel: '8:30',
    thumbnailColor: cover(1),
    products: [P.uid],
    featured: true,
    published: true,
    order: 2,
  },
  {
    id: 'v3',
    slug: 'phong-van-nuoi-nick-noi-that',
    title: 'Phỏng vấn anh Tuấn — nuôi 30 nick bán nội thất',
    youtubeId: 'ScMzIvxBSi4',
    category: 'phong-van',
    categoryLabel: 'Phỏng vấn',
    durationLabel: '6:45',
    thumbnailColor: cover(2),
    products: [P.care],
    featured: true,
    published: true,
    order: 3,
  },
  {
    id: 'v4',
    slug: 'case-study-my-pham-120',
    title: 'Câu chuyện shop mỹ phẩm tăng 120% doanh số',
    youtubeId: 'ScMzIvxBSi4',
    category: 'case-study',
    categoryLabel: 'Case study',
    durationLabel: '5:20',
    thumbnailColor: cover(3),
    products: [P.post],
    featured: false,
    published: true,
    order: 4,
  },
  {
    id: 'v5',
    slug: 'huong-dan-keo-traffic-fanpage',
    title: 'Cách kéo 1.000 traffic mỗi ngày về fanpage khoá học',
    youtubeId: 'ScMzIvxBSi4',
    category: 'huong-dan',
    categoryLabel: 'Hướng dẫn',
    durationLabel: '7:08',
    thumbnailColor: cover(4),
    products: [P.traffic],
    featured: false,
    published: true,
    order: 5,
  },
  {
    id: 'v6',
    slug: 'review-seeding-viral',
    title: 'Review tính năng seeding viral mới nhất của MKT',
    youtubeId: 'ScMzIvxBSi4',
    category: 'danh-gia',
    categoryLabel: 'Đánh giá',
    durationLabel: '3:55',
    thumbnailColor: cover(5),
    products: [P.viral],
    featured: false,
    published: true,
    order: 6,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    rating: 5,
    content:
      'Phần mềm dễ dùng bất ngờ, cài xong là chạy được luôn. Đội hỗ trợ trả lời cực nhanh, có gì cũng được hướng dẫn tận tình.',
    customerName: 'Ngô Thanh Tùng',
    customerRole: 'Chủ shop điện tử',
    published: true,
    order: 1,
  },
  {
    id: 't2',
    rating: 5,
    content:
      'Quét data 1 click, tiết kiệm cho tôi gần 8 tiếng mỗi ngày. Tính ra rẻ hơn thuê một nhân viên mà hiệu quả gấp mấy lần.',
    customerName: 'Lý Hồng Nhung',
    customerRole: 'Mỹ phẩm handmade',
    published: true,
    order: 2,
  },
  {
    id: 't3',
    rating: 5,
    content:
      'Doanh số quý vừa rồi tăng 76% so với cùng kỳ. Tôi không nghĩ marketing automation lại tạo khác biệt lớn đến vậy cho một shop nhỏ.',
    customerName: 'Trương Đình Khoa',
    customerRole: 'Founder cửa hàng thể thao',
    published: true,
    order: 3,
  },
  {
    id: 't4',
    rating: 5,
    content:
      'Nuôi nick an toàn, đăng bài đều mỗi ngày mà không lo bị khoá. Dùng nửa năm rồi vẫn ổn định.',
    customerName: 'Đặng Mỹ Linh',
    customerRole: 'Kinh doanh thời trang',
    published: true,
    order: 4,
  },
  {
    id: 't5',
    rating: 5,
    content:
      'Bảo hành trọn đời và cập nhật miễn phí là điểm tôi thích nhất. Mua một lần dùng mãi, yên tâm tuyệt đối.',
    customerName: 'Phan Quốc Bảo',
    customerRole: 'Chủ chuỗi F&B',
    published: true,
    order: 5,
  },
  {
    id: 't6',
    rating: 5,
    content:
      'Từ một người mù công nghệ, tôi vẫn tự chạy được mọi thứ nhờ giao diện tiếng Việt rõ ràng và video hướng dẫn chi tiết.',
    customerName: 'Hồ Thị Hạnh',
    customerRole: 'Tiểu thương online',
    published: true,
    order: 6,
  },
];

export const statItems: StatItem[] = [
  { id: 's1', value: 100000, suffix: '+', label: 'Người dùng tin dùng', order: 1 },
  { id: 's2', value: 76, prefix: '+', suffix: '%', label: 'Tăng doanh số trung bình', order: 2 },
  { id: 's3', value: 8, suffix: 'h', label: 'Tiết kiệm mỗi ngày', order: 3 },
  { id: 's4', value: 16, suffix: '+', label: 'Công cụ automation', order: 4 },
];
