// Cấu hình Tailwind CSS CDN
window.tailwind = window.tailwind || {};
window.tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        }
    }
};

// Danh sách khóa học dữ liệu nằm bên trong code hệ thống
const COURSES_PER_PAGE = 6;
let currentPage = 1;
let currentFiltered = [];

const coursesData = [
    {
        id: 1,
        title: "Toán Đại Số Tuyến Tính Nâng Cao",
        category: "tự-nhiên",
        lessons: 24,
        duration: "12 giờ học",
        rating: 4.9,
        students: 1250,
        image: "./course_math.png",
        teacher: "ThS. Nguyễn Văn Thắng",
        level: "Nâng cao",
        description: "Khóa học cung cấp kiến thức nền tảng vững chắc về đại số tuyến tính, định thức, ma trận và không gian vectơ, thiết kế riêng cho học sinh chuyên toán và ôn thi HSG."
    },
    {
        id: 2,
        title: "Vật Lý Quang Học & Thực Hành",
        category: "tự-nhiên",
        lessons: 18,
        duration: "9 giờ học",
        rating: 4.8,
        students: 980,
        image: "./course_science.png",
        teacher: "Cô Lê Thị Hoài",
        level: "Cơ bản",
        description: "Khám phá các hiện tượng khúc xạ, phản xạ ánh sáng qua mô phỏng 3D trực quan và các bài tập ứng dụng thực hành thực tế."
    },
    {
        id: 3,
        title: "Phân Tích Tác Phẩm Văn Học Hiện Đại",
        category: "xã-hội",
        lessons: 15,
        duration: "8 giờ học",
        rating: 4.7,
        students: 850,
        image: "./course_literature.png",
        teacher: "ThS. Trần Thị Kim Anh",
        level: "Trung bình",
        description: "Rèn luyện tư duy bình luận văn học, đi sâu vào cấu trúc cốt truyện và hình tượng nhân vật trong các tác phẩm văn học hiện đại Việt Nam."
    },
    {
        id: 4,
        title: "Làm Việc Nhóm & Tư Duy Phản Biện",
        category: "kỹ-năng",
        lessons: 12,
        duration: "6 giờ học",
        rating: 4.9,
        students: 2100,
        image: "./course_skills.png",
        teacher: "TS. Lê Hoàng Nam",
        level: "Mọi cấp độ",
        description: "Học cách hợp tác hiệu quả, giải quyết xung đột nhóm và rèn luyện kỹ năng phân tích phản biện trước mọi vấn đề học thuật và đời sống."
    },
    {
        id: 5,
        title: "Hóa Học Vô Cơ và Ứng Dụng Đời Sống",
        category: "tự-nhiên",
        lessons: 20,
        duration: "10 giờ học",
        rating: 4.6,
        students: 640,
        image: "./course_science.png",
        teacher: "Thầy Phạm Minh Đức",
        level: "Trung bình",
        description: "Tìm hiểu mối liên kết hóa học, phản ứng vô cơ và ứng dụng thực tiễn của hóa học trong đời sống thường ngày thông qua các bài thí nghiệm học tập sống động."
    },
    {
        id: 6,
        title: "Lịch Sử Việt Nam Cận Hiện Đại",
        category: "xã-hội",
        lessons: 16,
        duration: "8 giờ học",
        rating: 4.8,
        students: 730,
        image: "./course_literature.png",
        teacher: "GS. Nguyễn Khắc Hải",
        level: "Nâng cao",
        description: "Hệ thống hóa toàn bộ kiến thức lịch sử cận hiện đại nước nhà, phân tích bối cảnh lịch sử và rút ra bài học kinh nghiệm sâu sắc để vận dụng vào bài viết luận."
    },
    {
        id: 7,
        title: "Sinh Học Phân Tử & Công Nghệ Gen",
        category: "tự-nhiên",
        lessons: 22,
        duration: "11 giờ học",
        rating: 4.8,
        students: 520,
        image: "./course_science.png",
        teacher: "TS. Lê Bích Ngọc",
        level: "Nâng cao",
        description: "Khám phá cơ chế tái bản DNA, phiên mã, dịch mã và các ứng dụng công nghệ sinh học hiện đại như CRISPR, GMO trong y học và nông nghiệp."
    },
    {
        id: 8,
        title: "Toán Hình Học Không Gian",
        category: "tự-nhiên",
        lessons: 19,
        duration: "10 giờ học",
        rating: 4.7,
        students: 810,
        image: "./course_math.png",
        teacher: "ThS. Đặng Quốc Bảo",
        level: "Trung bình",
        description: "Nắm vững các khái niệm hình học không gian: mặt phẳng, đường thẳng, góc khối, thể tích và diện tích qua các bài toán trực quan sinh động dành cho THPT."
    },
    {
        id: 9,
        title: "Địa Lý Kinh Tế Việt Nam",
        category: "xã-hội",
        lessons: 14,
        duration: "7 giờ học",
        rating: 4.5,
        students: 670,
        image: "./course_literature.png",
        teacher: "Cô Phạm Thị Lan",
        level: "Cơ bản",
        description: "Tìm hiểu cấu trúc kinh tế vùng miền, các vùng kinh tế trọng điểm và chiến lược phát triển bền vững của Việt Nam trong bối cảnh hội nhập toàn cầu."
    },
    {
        id: 10,
        title: "Vật Lý Cơ Học & Nhiệt Học",
        category: "tự-nhiên",
        lessons: 21,
        duration: "11 giờ học",
        rating: 4.6,
        students: 920,
        image: "./course_science.png",
        teacher: "Thầy Ngô Văn Tùng",
        level: "Trung bình",
        description: "Hệ thống hóa kiến thức cơ học Newton, động học, nhiệt động lực học qua bài giảng sinh động và bài tập ứng dụng thực tế dành cho học sinh THPT."
    },
    {
        id: 11,
        title: "Kỹ Năng Thuyết Trình Chuyên Nghiệp",
        category: "kỹ-năng",
        lessons: 10,
        duration: "5 giờ học",
        rating: 4.9,
        students: 1830,
        image: "./course_skills.png",
        teacher: "Chuyên gia Hoàng Văn Hùng",
        level: "Mọi cấp độ",
        description: "Rèn luyện kỹ năng nói trước đám đông, thiết kế slide chuyên nghiệp, quản lý thời gian thuyết trình và xử lý câu hỏi phản biện hiệu quả."
    },
    {
        id: 12,
        title: "Tiếng Anh Giao Tiếp Học Thuật",
        category: "kỹ-năng",
        lessons: 30,
        duration: "15 giờ học",
        rating: 4.8,
        students: 2450,
        image: "./course_skills.png",
        teacher: "MSc. Trương Thị Mai",
        level: "Trung bình",
        description: "Phát triển vốn từ vựng học thuật, cấu trúc câu văn viết và kỹ năng trao đổi bằng tiếng Anh trong môi trường học thuật quốc tế."
    },
    {
        id: 13,
        title: "Giáo Dục Công Dân & Pháp Luật",
        category: "xã-hội",
        lessons: 12,
        duration: "6 giờ học",
        rating: 4.5,
        students: 560,
        image: "./course_literature.png",
        teacher: "ThS. Võ Xuân Phúc",
        level: "Cơ bản",
        description: "Trang bị kiến thức pháp lý cơ bản, quyền và nghĩa vụ công dân, các vấn đề đạo đức xã hội theo chương trình THPT 2025 mới nhất."
    },
    {
        id: 14,
        title: "Hóa Học Hữu Cơ & Polyme",
        category: "tự-nhiên",
        lessons: 23,
        duration: "12 giờ học",
        rating: 4.7,
        students: 710,
        image: "./course_science.png",
        teacher: "TS. Nguyễn Thị Bảo Châu",
        level: "Nâng cao",
        description: "Nghiên cứu cấu trúc phân tử hữu cơ, phản ứng thế, cộng, tách và ứng dụng polyme trong công nghiệp, y tế — phục vụ ôn thi Đại học chuyên sâu."
    },
    {
        id: 15,
        title: "Văn Học Dân Gian Việt Nam",
        category: "xã-hội",
        lessons: 13,
        duration: "7 giờ học",
        rating: 4.6,
        students: 480,
        image: "./course_literature.png",
        teacher: "GVC. Bùi Thị Hoa",
        level: "Cơ bản",
        description: "Khám phá kho tàng truyện cổ tích, ca dao, tục ngữ, thần thoại Việt Nam — phân tích giá trị văn hóa và ý nghĩa lịch sử của văn học dân gian."
    },
    {
        id: 16,
        title: "Tin Học Ứng Dụng & Lập Trình Cơ Bản",
        category: "tự-nhiên",
        lessons: 28,
        duration: "14 giờ học",
        rating: 4.8,
        students: 1560,
        image: "./course_math.png",
        teacher: "Thầy Lý Minh Triết",
        level: "Cơ bản",
        description: "Giới thiệu lập trình Python, logic thuật toán và ứng dụng tin học văn phòng thực hành — phù hợp cho học sinh THCS và THPT bắt đầu học lập trình."
    },
    {
        id: 17,
        title: "Kỹ Năng Quản Lý Thời Gian",
        category: "kỹ-năng",
        lessons: 8,
        duration: "4 giờ học",
        rating: 4.7,
        students: 3100,
        image: "./course_skills.png",
        teacher: "Coach Trần Anh Tú",
        level: "Mọi cấp độ",
        description: "Áp dụng phương pháp Pomodoro, ma trận Eisenhower và GTD để lập kế hoạch học tập hiệu quả, giảm trì hoãn và tối ưu hóa năng suất cá nhân."
    },
    {
        id: 18,
        title: "Lịch Sử Thế Giới Cận Đại",
        category: "xã-hội",
        lessons: 18,
        duration: "9 giờ học",
        rating: 4.6,
        students: 620,
        image: "./course_literature.png",
        teacher: "GS.TS. Cao Trọng Nghĩa",
        level: "Nâng cao",
        description: "Phân tích các cuộc cách mạng tư sản, chiến tranh thế giới, phong trào giải phóng dân tộc và tác động đến trật tự thế giới hiện đại."
    },
    {
        id: 19,
        title: "Toán Xác Suất & Thống Kê",
        category: "tự-nhiên",
        lessons: 17,
        duration: "9 giờ học",
        rating: 4.7,
        students: 890,
        image: "./course_math.png",
        teacher: "ThS. Phan Thị Thu Hà",
        level: "Trung bình",
        description: "Nắm vững lý thuyết xác suất, các quy luật phân phối, hồi quy và ứng dụng thống kê vào phân tích dữ liệu — nền tảng cho Toán đại học và khoa học dữ liệu."
    },
    {
        id: 20,
        title: "Kỹ Năng Viết Sáng Tạo & Nghị Luận",
        category: "kỹ-năng",
        lessons: 14,
        duration: "7 giờ học",
        rating: 4.8,
        students: 1240,
        image: "./course_skills.png",
        teacher: "Nhà văn Nguyễn Duy Phong",
        level: "Trung bình",
        description: "Phát triển tư duy lập luận chặt chẽ, cách viết đoạn văn thuyết phục, bài nghị luận xã hội và nghị luận văn học đạt điểm cao trong các kỳ thi."
    },
    {
        id: 21,
        title: "Địa Lý Tự Nhiên & Khí Hậu Học",
        category: "xã-hội",
        lessons: 15,
        duration: "8 giờ học",
        rating: 4.5,
        students: 540,
        image: "./course_literature.png",
        teacher: "TS. Đinh Văn Bình",
        level: "Cơ bản",
        description: "Nghiên cứu hệ thống địa hình, thuỷ văn, khí hậu Việt Nam và thế giới, biến đổi khí hậu và các giải pháp phát triển bền vững cho tương lai."
    },
    {
        id: 22,
        title: "Sinh Học Tế Bào & Di Truyền",
        category: "tự-nhiên",
        lessons: 20,
        duration: "10 giờ học",
        rating: 4.8,
        students: 730,
        image: "./course_science.png",
        teacher: "Cô Trần Thị Thu Trang",
        level: "Trung bình",
        description: "Đi sâu vào cấu trúc tế bào nhân thực, các quy luật di truyền Mendel, đột biến gen và nhiễm sắc thể — kiến thức nền tảng cho thi THPT Quốc gia môn Sinh."
    },
    {
        id: 23,
        title: "Kỹ Năng Lãnh Đạo & Xây Dựng Đội Nhóm",
        category: "kỹ-năng",
        lessons: 11,
        duration: "6 giờ học",
        rating: 4.9,
        students: 980,
        image: "./course_skills.png",
        teacher: "TS. Lê Minh Quân",
        level: "Mọi cấp độ",
        description: "Trang bị tư duy lãnh đạo, kỹ năng phân công công việc, giải quyết xung đột nhóm và tạo động lực cho đội ngũ — dành cho học sinh có định hướng leadership."
    },
    {
        id: 24,
        title: "Toán Giải Tích & Vi Phân",
        category: "tự-nhiên",
        lessons: 26,
        duration: "13 giờ học",
        rating: 4.9,
        students: 1480,
        image: "./course_math.png",
        teacher: "PGS.TS. Hoàng Minh Sơn",
        level: "Nâng cao",
        description: "Nghiên cứu chuyên sâu giới hạn hàm số, đạo hàm, tích phân xác định và ứng dụng — thiết kế cho học sinh chuyên toán và sinh viên đại học năm nhất."
    }
];

// Hàm hiển thị danh sách khóa học động (có phân trang)
function renderCourses(filteredCourses, page = 1) {
    currentFiltered = filteredCourses;
    currentPage = page;

    const grid = document.getElementById("courses-grid");

    // Animate out
    grid.style.opacity = '0';
    grid.style.transform = 'translateY(12px)';

    setTimeout(() => {
        grid.innerHTML = '';

        if (filteredCourses.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-12 text-slate-400">
                    Không tìm thấy khóa học nào phù hợp.
                </div>
            `;
            grid.style.opacity = '1';
            grid.style.transform = 'translateY(0)';
            renderPagination(0, page);
            return;
        }

        const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
        const startIdx = (page - 1) * COURSES_PER_PAGE;
        const pageItems = filteredCourses.slice(startIdx, startIdx + COURSES_PER_PAGE);

        pageItems.forEach((course) => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg shadow-slate-100/50 hover:shadow-2xl hover:shadow-brand-500/5 hover:border-brand-200 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group";

        card.innerHTML = `
            <div>
                <!-- Bìa khóa học -->
                <div class="relative overflow-hidden aspect-video bg-slate-100">
                    <img src="${course.image}" alt="${course.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span class="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-800 shadow-sm">${course.level}</span>
                </div>
                
                <!-- Chi tiết sơ bộ -->
                <div class="p-6">
                    <div class="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                        <span class="uppercase">${course.category === 'tự-nhiên' ? 'Tự nhiên' : course.category === 'xã-hội' ? 'Xã hội' : 'Kỹ năng'}</span>
                        <div class="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span class="text-slate-600">${course.rating}</span>
                        </div>
                    </div>
                    
                    <h3 class="text-lg font-bold text-slate-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">${course.title}</h3>
                    <p class="text-xs text-slate-500 mt-2">Giảng viên: <span class="font-medium text-slate-700">${course.teacher}</span></p>
                    
                    <div class="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400">
                        <span class="flex items-center gap-1">
                            📚 ${course.lessons} bài giảng
                        </span>
                        <span class="flex items-center gap-1">
                            ⏱️ ${course.duration}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Nút Khám phá từ trong ra -->
            <div class="px-6 pb-6">
                <button onclick="openCourseDetails(${course.id})" class="w-full py-2.5 rounded-xl font-bold text-xs text-brand-600 bg-brand-50 hover:bg-brand-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                    <span>Khám phá khóa học</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </button>
            </div>
        `;
            grid.appendChild(card);
        });

        // Animate in
        requestAnimationFrame(() => {
            grid.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            grid.style.opacity = '1';
            grid.style.transform = 'translateY(0)';
        });

        renderPagination(filteredCourses.length, page);
    }, 180);
}

// Hàm render phân trang
function renderPagination(totalItems, activePage) {
    const container = document.getElementById('courses-pagination');
    if (!container) return;

    const totalPages = Math.ceil(totalItems / COURSES_PER_PAGE);
    container.innerHTML = '';

    if (totalPages <= 1) return;

    // Prev button
    const prev = document.createElement('button');
    prev.className = `pagination-btn flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm transition-all duration-300 ${
        activePage === 1
            ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
            : 'bg-white border border-slate-200 text-slate-500 hover:bg-brand-600 hover:text-white hover:border-brand-600 shadow-sm'
    }`;
    prev.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>`;
    prev.disabled = activePage === 1;
    prev.onclick = () => { if (activePage > 1) renderCourses(currentFiltered, activePage - 1); };
    container.appendChild(prev);

    // Page numbers (show max 5 around current)
    let startPage = Math.max(1, activePage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);

    if (startPage > 1) {
        appendPageBtn(container, 1, activePage);
        if (startPage > 2) {
            const dots = document.createElement('span');
            dots.className = 'flex items-center justify-center w-10 h-10 text-slate-400 text-sm font-bold';
            dots.textContent = '...';
            container.appendChild(dots);
        }
    }

    for (let p = startPage; p <= endPage; p++) {
        appendPageBtn(container, p, activePage);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement('span');
            dots.className = 'flex items-center justify-center w-10 h-10 text-slate-400 text-sm font-bold';
            dots.textContent = '...';
            container.appendChild(dots);
        }
        appendPageBtn(container, totalPages, activePage);
    }

    // Next button
    const next = document.createElement('button');
    next.className = `pagination-btn flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm transition-all duration-300 ${
        activePage === totalPages
            ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
            : 'bg-white border border-slate-200 text-slate-500 hover:bg-brand-600 hover:text-white hover:border-brand-600 shadow-sm'
    }`;
    next.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>`;
    next.disabled = activePage === totalPages;
    next.onclick = () => { if (activePage < totalPages) renderCourses(currentFiltered, activePage + 1); };
    container.appendChild(next);

    // Info text
    const info = document.getElementById('courses-page-info');
    if (info) {
        const startIdx = (activePage - 1) * COURSES_PER_PAGE + 1;
        const endIdx = Math.min(activePage * COURSES_PER_PAGE, totalItems);
        info.textContent = `Hiển thị ${startIdx}–${endIdx} trong tổng số ${totalItems} khóa học`;
    }
}

function appendPageBtn(container, pageNum, activePage) {
    const btn = document.createElement('button');
    const isActive = pageNum === activePage;
    btn.className = `pagination-btn flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm transition-all duration-300 ${
        isActive
            ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
            : 'bg-white border border-slate-200 text-slate-600 hover:bg-brand-600 hover:text-white hover:border-brand-600 shadow-sm'
    }`;
    btn.textContent = pageNum;
    btn.onclick = () => renderCourses(currentFiltered, pageNum);
    container.appendChild(btn);
}

// Hàm lọc khóa học
function filterCourses(category) {
    // Cập nhật trạng thái active tab
    document.querySelectorAll(".filter-tab").forEach((tab) => {
        tab.className = "filter-tab px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 bg-white text-slate-600 hover:bg-slate-50 border border-slate-200";
    });

    const activeBtn = document.getElementById(`btn-${category}`);
    if (activeBtn) {
        activeBtn.className = "filter-tab px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 bg-brand-600 text-white shadow-md shadow-brand-500/20";
    }

    // Lọc dữ liệu và reset về trang 1
    if (category === "all") {
        renderCourses(coursesData, 1);
    } else {
        const filtered = coursesData.filter(c => c.category === category);
        renderCourses(filtered, 1);
    }
}

// Hàm gọi động thông tin chi tiết khóa học từ bên trong
function openCourseDetails(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;

    const modal = document.getElementById("course-modal");
    const container = document.getElementById("modal-container");

    // Tạo cấu trúc chi tiết bên trong modal động
    container.innerHTML = `
        <!-- Hình ảnh bìa -->
        <div class="relative overflow-hidden aspect-video bg-slate-900">
            <img src="${course.image}" alt="${course.title}" class="w-full h-full object-cover" />
            <button onclick="closeCourseDetails()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-900/60 text-white hover:bg-slate-950 flex items-center justify-center backdrop-blur-sm transition-colors">
                ✕
            </button>
            <span class="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-brand-600 text-white">${course.level}</span>
        </div>
        
        <!-- Thông tin chi tiết gọi từ trong -->
        <div class="p-6 space-y-4">
            <div>
                <span class="text-[10px] font-bold tracking-wider text-brand-600 bg-brand-50 border border-brand-100/50 px-2.5 py-1 rounded-md uppercase">
                    ${course.category === 'tự-nhiên' ? 'Khoa học Tự nhiên' : course.category === 'xã-hội' ? 'Khoa học Xã hội' : 'Kỹ năng mềm'}
                </span>
                <h3 class="text-xl font-extrabold text-slate-900 mt-2.5 leading-snug">${course.title}</h3>
            </div>

            <p class="text-slate-600 text-sm leading-relaxed">${course.description}</p>
            
            <div class="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                <div>
                    <span class="text-slate-400 block mb-0.5">Giảng viên chuyên môn</span>
                    <span class="font-bold text-slate-800 text-sm">${course.teacher}</span>
                </div>
                <div>
                    <span class="text-slate-400 block mb-0.5">Học sinh đăng ký</span>
                    <span class="font-bold text-slate-800 text-sm">${course.students.toLocaleString('vi-VN')} học sinh</span>
                </div>
            </div>

            <div class="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span>📚 Tổng số: <b>${course.lessons} bài học</b></span>
                <span>⏱️ Thời lượng: <b>${course.duration}</b></span>
            </div>

            <div class="pt-2 flex gap-3">
                <button onclick="closeCourseDetails()" class="w-1/2 py-3 rounded-xl font-bold text-sm text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all text-center">
                    Đóng lại
                </button>
                <a href="#" class="w-1/2 py-3 rounded-xl font-bold text-sm text-white bg-brand-600 hover:bg-brand-700 transition-all text-center shadow-md shadow-brand-500/20">
                    Đăng ký tham gia
                </a>
            </div>
        </div>
    `;

    // Hiển thị modal bằng việc bật opacity và click pointer events
    modal.classList.remove("opacity-0", "pointer-events-none");
    container.classList.remove("scale-95");
    container.classList.add("scale-100");
}

// Đóng modal chi tiết
function closeCourseDetails() {
    const modal = document.getElementById("course-modal");
    const container = document.getElementById("modal-container");

    modal.classList.add("opacity-0", "pointer-events-none");
    container.classList.remove("scale-100");
    container.classList.add("scale-95");
}

// Đóng modal khi click ra ngoài vùng container
document.getElementById("course-modal").addEventListener("click", (e) => {
    if (e.target.id === "course-modal") {
        closeCourseDetails();
    }
});

// Hàm chạy số đếm từ 0 lên giá trị tương ứng trong 2 giây
function animateStats() {
    const stats = document.querySelectorAll(".stat-count");
    const duration = 2000; // 2 giây (2000ms)

    stats.forEach((stat) => {
        const target = parseFloat(stat.getAttribute("data-target"));
        const suffix = stat.getAttribute("data-suffix") || "";
        const decimals = parseInt(stat.getAttribute("data-decimal") || "0");
        const startTime = performance.now();

        function updateNumber(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Hiệu ứng giảm tốc mượt mà (easeOutCubic)
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeProgress * target;

            // Định dạng số hiển thị theo tiếng Anh (dùng dấu phẩy phân cách hàng nghìn)
            let formattedVal = "";
            if (decimals > 0) {
                formattedVal = currentVal.toFixed(decimals);
            } else {
                formattedVal = Math.floor(currentVal).toLocaleString('en-US');
            }

            stat.textContent = formattedVal + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                // Trả về giá trị chính xác cuối cùng
                if (decimals > 0) {
                    stat.textContent = target.toFixed(decimals) + suffix;
                } else {
                    stat.textContent = target.toLocaleString('en-US') + suffix;
                }
            }
        }

        requestAnimationFrame(updateNumber);
    });
}

// Sử dụng IntersectionObserver để theo dõi cuộn màn hình đến phần thống kê
const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target); // Chỉ chạy 1 lần duy nhất khi cuộn đến
        }
    });
}, {
    threshold: 0.15 // Kích hoạt khi thấy 15% của phần thống kê
});

// Tự động khởi chạy lần đầu khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
    renderCourses(coursesData, 1);
    
    // Đăng ký IntersectionObserver cho stats-section
    const statsSection = document.getElementById("stats-section");
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});
