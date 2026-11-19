// --- 1. LỌC TIN TỨC THEO TAB GAME (TRANG NEWS.HTML) ---
const newsTabButtons = document.querySelectorAll('#newsFilterTabs .tab-btn');
const newsCards = document.querySelectorAll('#newsContainer .news-card');

if (newsTabButtons.length > 0 && newsCards.length > 0) {
    newsTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            newsTabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedGame = button.getAttribute('data-game');
            newsCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                card.style.display = (selectedGame === 'all' || cardCategory === selectedGame) ? 'block' : 'none';
            });
        });
    });
}

// Hàm chuẩn hóa chuỗi tiếng Việt không dấu dùng chung
function normalizeText(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
}


// ==========================================================
// CƠ SỞ DỮ LIỆU WIKI CHI TIẾT (CHAMPIONS, CHARACTERS, ITEMS)
// ==========================================================
const wikiDatabase = {
    ahri: {
        id: "ahri",
        name: "Ahri",
        subtitle: "Hồ Ly Chín Đuôi",
        game: "lol",
        gameName: "League of Legends",
        type: "champion",
        typeName: "Tướng",
        role: "Pháp Sư / Sát Thủ",
        lane: "Đường Giữa (Mid Lane)",
        difficulty: "Trung Bình",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg",
        lore: "Mang trong mình mối liên kết bẩm sinh với ma thuật ngầm của Ionia, Ahri là một Vastaya mang hình dạng cáo, có thể thao túng cảm xúc của con mồi và hấp thụ linh hồn của họ. Dù là một kẻ săn mồi đầy quyến rũ và chết chóc, Ahri luôn tìm kiếm dấu vết về nguồn cội thực sự của bản thân.",
        stats: [
            { label: "Sát thương", icon: "fa-solid fa-khanda", value: 85 },
            { label: "Chống chịu", icon: "fa-solid fa-shield", value: 35 },
            { label: "Độ cơ động", icon: "fa-solid fa-bolt", value: 90 },
            { label: "Khống chế", icon: "fa-solid fa-wand-magic-sparkles", value: 75 }
        ],
        abilities: [
            { key: "P", name: "Mị Lực Vastaya", desc: "Sau khi Ahri thi triển 9 kỹ năng trúng mục tiêu, chiêu thức tiếp theo trúng kẻ địch sẽ hồi lại lượng máu lớn cho cô." },
            { key: "Q", name: "Quả Cầu Ma Thuật", desc: "Ahri phóng cầu ma thuật ra gây sát thương phép trên đường đi, và gây sát thương chuẩn khi quả cầu quay trở lại tay cô." },
            { key: "W", name: "Lửa Hồ Ly", desc: "Ahri giải phóng ba ngọn lửa ma trượng tự động tìm kiếm kẻ địch gần nhất (ưu tiên tướng) và tăng 40% tốc độ di chuyển trong 2 giây." },
            { key: "E", name: "Hôn Gió", desc: "Thổi một nụ hôn mê hoặc kẻ địch đầu tiên trúng phải, buộc nạn nhân bước vô hại về phía Ahri và nhận thêm sát thương từ mọi chiêu thức của cô." },
            { key: "R", name: "Phi Hồ", desc: "Lướt nhanh về phía trước và bắn ra ba tia chớp linh hồn. Có thể tái kích hoạt tối đa 3 lần, mỗi lần tham gia hạ gục tướng kéo dài thời gian và hồi thêm 1 lần lướt." }
        ],
        tips: "Combo chuẩn mực: Canh góc tung E (Hôn Gió) trúng đích trước -> kích hoạt W tăng tốc -> tung Q cả 2 lượt đi và về -> dùng R lướt né đòn hoặc truy đuổi kết liễu."
    },
    yasuo: {
        id: "yasuo",
        name: "Yasuo",
        subtitle: "Kẻ Bất Dung Thứ",
        game: "lol",
        gameName: "League of Legends",
        type: "champion",
        typeName: "Tướng",
        role: "Đấu Sĩ / Sát Thủ",
        lane: "Đường Giữa / Đường Trên",
        difficulty: "Rất Khó",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg",
        lore: "Một kiếm sĩ Ionia nhanh nhẹn và đầy kiêu hãnh, Yasuo từng bị vu oan cho cái chết của sư phụ. Không thể tìm được công lý, anh buộc phải rút kiếm tiêu diệt chính những người đồng hương truy đuổi mình để chứng minh sự trong sạch.",
        stats: [
            { label: "Sát thương", icon: "fa-solid fa-khanda", value: 95 },
            { label: "Chống chịu", icon: "fa-solid fa-shield", value: 45 },
            { label: "Độ cơ động", icon: "fa-solid fa-bolt", value: 85 },
            { label: "Khống chế", icon: "fa-solid fa-wand-magic-sparkles", value: 60 }
        ],
        abilities: [
            { key: "P", name: "Đạo Của Lãng Khách", desc: "Tỉ lệ chí mạng của Yasuo được nhân đôi từ mọi nguồn. Khi di chuyển, anh tích tụ luồng khí tạo lá chắn gió chặn sát thương khi bị tấn công." },
            { key: "Q", name: "Bão Kiếm", desc: "Đâm kiếm về phía trước gây sát thương vật lý. Đâm trúng 2 lần tích tụ lốc xoáy hất tung mọi kẻ địch trên đường bay." },
            { key: "W", name: "Tường Gió", desc: "Tạo ra một bức tường gió ngăn chặn toàn bộ đường đạn và kỹ năng tầm xa định hướng của đối phương trong 4 giây." },
            { key: "E", name: "Quét Kiếm", desc: "Lướt xuyên qua một kẻ địch, gây sát thương phép và tăng dần sát thương qua các lần lướt liên tiếp tiếp theo." },
            { key: "R", name: "Trăn Trối", desc: "Biến tới một kẻ địch đang bị hất tung, giữ chúng lơ lửng trên không 1 giây và chém liên hoàn, nhận thêm 50% xuyên giáp cộng thêm sau đó." }
        ],
        tips: "Tận dụng lính đường để lướt E tiếp cận đối thủ. Tích lốc Q3 -> E-Q vào lính hất tung bất ngờ -> bấm R kết liễu. Giữ Tường Gió W chặn chiêu khống chế nguy hiểm của chủ lực đối phương."
    },
    jinx: {
        id: "jinx",
        name: "Jinx",
        subtitle: "Khẩu Pháo Nổi Loạn",
        game: "lol",
        gameName: "League of Legends",
        type: "champion",
        typeName: "Tướng",
        role: "Xạ Thủ (ADC)",
        lane: "Đường Dưới (Bot Lane)",
        difficulty: "Trung Bình",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg",
        lore: "Là một tội phạm Zaun lập dị và yêu thích sự hỗn loạn, Jinx đem lại những vụ nổ kinh hoàng nhất ở bất cứ đâu cô đặt chân đến. Với kho vũ khí tự chế chết người gồm Bang Bang, Xương Cá và Lựu Đạn Ma Hỏa, Jinx biến mọi sàn đấu thành sân chơi pháo hoa.",
        stats: [
            { label: "Sát thương", icon: "fa-solid fa-khanda", value: 100 },
            { label: "Chống chịu", icon: "fa-solid fa-shield", value: 25 },
            { label: "Độ cơ động", icon: "fa-solid fa-bolt", value: 65 },
            { label: "Khống chế", icon: "fa-solid fa-wand-magic-sparkles", value: 45 }
        ],
        abilities: [
            { key: "P", name: "Hưng Phấn!", desc: "Mỗi khi Jinx tham gia hạ gục tướng địch, quái khủng hoặc phá hủy trụ, cô nhận lượng lớn tốc độ di chuyển và tốc độ đánh vượt giới hạn." },
            { key: "Q", name: "Tráo Hàng!", desc: "Chuyển đổi giữa Súng Sáu Nòng (tăng tốc độ đánh cộng dồn) và Súng Phóng Lựu (tăng tầm bắn và gây sát thương lan diện rộng tốn năng lượng)." },
            { key: "W", name: "Giật Bắn!", desc: "Bắn tia sốc điện cực mạnh làm chậm kẻ địch trúng phải và làm lộ diện mục tiêu trong bụi." },
            { key: "E", name: "Lựu Đạn Ma Hỏa!", desc: "Rải ba quả lựu đạn bẫy kẹp chân; phát nổ trói chân kẻ địch bước qua trong 1.5 giây." },
            { key: "R", name: "Tên Lửa Siêu Khủng Khiếp!", desc: "Bắn tên lửa khổng lồ bay xuyên toàn bản đồ, tăng sát thương theo cự ly bay và lượng máu đã mất của đối phương." }
        ],
        tips: "Trong giao tranh tổng, đứng phía sau đồng đội và chuyển sang Súng Phóng Lựu Q để xả sát thương lan tầm xa. Chỉ cần kích hoạt được 1 điểm hạ gục để nổ nội tại Hưng Phấn, Jinx sẽ quét sạch đội hình đối phương."
    },
    aatrox: {
        id: "aatrox",
        name: "Aatrox",
        subtitle: "Quỷ Kiếm Darkin",
        game: "lol",
        gameName: "League of Legends",
        type: "champion",
        typeName: "Tướng",
        role: "Đấu Sĩ Đường Trên",
        lane: "Đường Trên (Top Lane)",
        difficulty: "Khó",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg",
        lore: "Từng là một Thể Thăng Hoa cao quý của Shurima, Aatrox cùng đồng loại bị giam cầm vĩnh viễn trong chính vũ khí của mình sau chiến tranh Darkin. Giờ đây, hắn mang hình hài một thực thể cuồng bạo hủy diệt mọi sự sống.",
        stats: [
            { label: "Sát thương", icon: "fa-solid fa-khanda", value: 90 },
            { label: "Chống chịu", icon: "fa-solid fa-shield", value: 75 },
            { label: "Độ cơ động", icon: "fa-solid fa-bolt", value: 55 },
            { label: "Khống chế", icon: "fa-solid fa-wand-magic-sparkles", value: 70 }
        ],
        abilities: [
            { key: "P", name: "Đường Kiếm Tuyệt Diệt", desc: "Đòn đánh tiếp theo gây thêm sát thương vật lý theo máu tối đa và hồi máu cho Aatrox." },
            { key: "Q", name: "Quỷ Kiếm Darkin", desc: "Chém kiếm ba lần với ba vùng rìa ngọt khác nhau gây hất tung và sát thương nhân bội cực nặng." },
            { key: "W", name: "Xiềng Xích Địa Ngục", desc: "Đập đất tạo xích trói; kẻ địch không kịp thoát khỏi vùng giới hạn sẽ bị giật ngược vào tâm." },
            { key: "E", name: "Bộ Pháp Hắc Ám", desc: "Lướt một cự ly ngắn (kết hợp đồng thời với Q để đổi hướng chém) và nhận thêm hút máu toàn phần." },
            { key: "R", name: "Chiến Binh Tận Thế", desc: "Hóa quỷ khổng lồ, tăng lượng lớn SMCK, tăng 45% lượng hồi máu nhận vào và hoảng sợ lính." }
        ],
        tips: "Luôn kết hợp chiêu E trong lúc đang chém Q để điều chỉnh rìa ngọt trúng đối thủ. Bật R trước khi lao vào giao tranh để tối đa hóa khả năng hút máu sinh tồn."
    },
    thresh: {
        id: "thresh",
        name: "Thresh",
        subtitle: "Cai Ngục Xiềng Xích",
        game: "lol",
        gameName: "League of Legends",
        type: "champion",
        typeName: "Tướng",
        role: "Hỗ Trợ Mở Giao Tranh",
        lane: "Đường Dưới (Support)",
        difficulty: "Khó",
        image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Thresh_0.jpg",
        lore: "Một linh hồn tàn bạo xuất thân từ Quần Đảo Bóng Đêm, Thresh giam cầm linh hồn các nạn nhân trong chiếc lồng đèn ma quái của mình để hành hạ họ đến muôn đời muôn kiếp.",
        stats: [
            { label: "Sát thương", icon: "fa-solid fa-khanda", value: 45 },
            { label: "Chống chịu", icon: "fa-solid fa-shield", value: 85 },
            { label: "Độ cơ động", icon: "fa-solid fa-bolt", value: 50 },
            { label: "Khống chế", icon: "fa-solid fa-wand-magic-sparkles", value: 95 }
        ],
        abilities: [
            { key: "P", name: "Đọa Đày", desc: "Thresh thu thập linh hồn kẻ địch tử trận xung quanh để vĩnh viễn gia tăng Giáp và Sức mạnh Phép thuật." },
            { key: "Q", name: "Án Tử", desc: "Tung lưỡi hái kéo kẻ địch đầu tiên trúng phải, kích hoạt lần 2 để kéo bản thân bay thẳng tới mục tiêu." },
            { key: "W", name: "Con Đường Tăm Tối", desc: "Quăng lồng đèn tạo lá chắn; đồng đội nhấp chuột vào lồng đèn sẽ được kéo bay về cạnh Thresh." },
            { key: "E", name: "Lưỡi Hái Xoáy", desc: "Hất văng kẻ địch theo hướng vung lồng đèn (đẩy ra xa hoặc giật ngược lại) và làm chậm." },
            { key: "R", name: "Đóng Băng Tinh Thần", desc: "Dựng nhà tù gồm 5 vách tường linh hồn; kẻ địch phá vỡ vách tường sẽ gánh sát thương phép và bị làm chậm 99%." }
        ],
        tips: "Quăng W lồng đèn về phía rừng trước khi tung Q kéo trúng xạ thủ đối phương để tạo pha gank 2 người chớp nhoáng. Dùng E để ngắt các kỹ năng lướt của đối phương."
    },
    ie: {
        id: "ie",
        name: "Vô Cực Kiếm",
        subtitle: "Infinity Edge",
        game: "lol",
        gameName: "League of Legends",
        type: "equipment",
        typeName: "Trang Bị",
        role: "SMCK & Sát Thương Chí Mạng",
        lane: "Trang Bị Xạ Thủ Trấn Phái",
        difficulty: "Dễ Lên Đồ",
        image: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3031.png",
        lore: "Thanh kiếm huyền thoại được rèn từ kim loại thần thánh, tập trung toàn bộ uy lực vào những nhát chém quyết định phá tan mọi lớp giáp.",
        stats: [
            { label: "Sức mạnh công kích", icon: "fa-solid fa-khanda", value: 80 },
            { label: "Tỉ lệ chí mạng", icon: "fa-solid fa-crosshairs", value: 25 },
            { label: "Khuếch đại sát thương", icon: "fa-solid fa-burst", value: 40 },
            { label: "Giá trị vàng", icon: "fa-solid fa-coins", value: 85 }
        ],
        abilities: [
            { key: "Stat", name: "Chỉ số cơ bản", desc: "+80 Sức mạnh công kích, +25% Tỉ lệ chí mạng." },
            { key: "P", name: "Nội tại - Hoàn Mỹ", desc: "Gia tăng sát thương chí mạng thêm 40% cho mọi đòn đánh chí mạng đạt điều kiện." }
        ],
        tips: "Trang bị cốt lõi thứ 2 hoặc thứ 3 cho mọi xạ thủ và tướng chí mạng như Jinx, Yasuo, Yone, Caitlyn."
    },
    zhonya: {
        id: "zhonya",
        name: "Đồng Hồ Cát Zhonya",
        subtitle: "Zhonya's Hourglass",
        game: "lol",
        gameName: "League of Legends",
        type: "equipment",
        typeName: "Trang Bị",
        role: "SMPT & Sinh Tồn Bất Tử",
        lane: "Pháp Sư & Sát Thủ Phép",
        difficulty: "Cần Căn Thời Gian",
        image: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3157.png",
        lore: "Tạo tác cổ xưa chứa dòng cát ngưng đọng thời gian, cho phép người mang tạm thời hóa vàng bất tử thoát khỏi cái chết cận kề.",
        stats: [
            { label: "Sức mạnh phép thuật", icon: "fa-solid fa-wand-magic-sparkles", value: 120 },
            { label: "Giáp vật lý", icon: "fa-solid fa-shield", value: 50 },
            { label: "Khả năng sống sót", icon: "fa-solid fa-heart-pulse", value: 100 },
            { label: "Giá trị vàng", icon: "fa-solid fa-coins", value: 80 }
        ],
        abilities: [
            { key: "Stat", name: "Chỉ số cơ bản", desc: "+120 Sức mạnh phép thuật, +50 Giáp vật lý." },
            { key: "Active", name: "Kích hoạt - Đình Trệ (120s)", desc: "Hóa vàng bất khả xâm phạm và không thể chọn làm mục tiêu trong 2.5 giây, nhưng không thể thao tác." }
        ],
        tips: "Khắc tinh hàng đầu trước các tướng sát thủ dồn sát thương như Zed, Talon, Kayn, Syndra."
    },
    rabadon: {
        id: "rabadon",
        name: "Mũ Phù Thủy Rabadon",
        subtitle: "Rabadon's Deathcap",
        game: "lol",
        gameName: "League of Legends",
        type: "equipment",
        typeName: "Trang Bị",
        role: "Tối Thượng Pháp Sư",
        lane: "SMPT Cuối Trận",
        difficulty: "Trang Bị Đắt Giá",
        image: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/3089.png",
        lore: "Chiếc mũ phù thủy vĩ đại tích tụ ma năng nguyên thủy, biến bất kỳ phép thuật nào của chủ nhân thành thảm họa hủy diệt.",
        stats: [
            { label: "Sức mạnh phép thuật", icon: "fa-solid fa-wand-magic-sparkles", value: 140 },
            { label: "Gia tăng % AP", icon: "fa-solid fa-percent", value: 35 },
            { label: "Sức bộc phát", icon: "fa-solid fa-bolt", value: 100 },
            { label: "Giá trị vàng", icon: "fa-solid fa-coins", value: 90 }
        ],
        abilities: [
            { key: "Stat", name: "Chỉ số cơ bản", desc: "+140 Sức mạnh phép thuật." },
            { key: "P", name: "Nội tại - Thần Bí", desc: "Gia tăng tổng sức mạnh phép thuật của bản thân thêm 35%." }
        ],
        tips: "Lên ở vị trí trang bị thứ 3 hoặc thứ 4 để tối ưu hóa lượng AP nhân thêm 35% cao nhất có thể."
    },
    shieldbow: {
        id: "shieldbow",
        name: "Nỏ Tử Thủ",
        subtitle: "Immortal Shieldbow",
        game: "lol",
        gameName: "League of Legends",
        type: "equipment",
        typeName: "Trang Bị",
        role: "Bảo Hiểm Sinh Mệnh",
        lane: "Xạ Thủ & Đấu Sĩ Chí Mạng",
        difficulty: "Dễ Dùng",
        image: "https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/6673.png",
        lore: "Chiếc nỏ bảo hộ cổ xưa luôn sẵn sàng bung ra lá chắn trường lực hấp thụ sát thương chí tử cứu người nắm giữ trong gang tấc.",
        stats: [
            { label: "Sức mạnh công kích", icon: "fa-solid fa-khanda", value: 55 },
            { label: "Tỉ lệ chí mạng", icon: "fa-solid fa-crosshairs", value: 25 },
            { label: "Độ bền lá chắn", icon: "fa-solid fa-shield", value: 85 },
            { label: "Giá trị vàng", icon: "fa-solid fa-coins", value: 75 }
        ],
        abilities: [
            { key: "Stat", name: "Chỉ số cơ bản", desc: "+55 Sức mạnh công kích, +25% Tỉ lệ chí mạng." },
            { key: "P", name: "Nội tại - Bảo Hộ", desc: "Khi máu xuống dưới 30%, nhận ngay lớp lá chắn 320 - 720 trong 3 giây (90s hồi chiêu)." }
        ],
        tips: "Trang bị phòng thủ tuyệt vời giúp các xạ thủ chống lại sát thủ dồn sát thương sốc."
    },
    florentino: {
        id: "florentino",
        name: "Florentino",
        subtitle: "Tay Kiếm Hào Hoa",
        game: "lq",
        gameName: "Liên Quân Mobile",
        type: "champion",
        typeName: "Tướng",
        role: "Đấu Sĩ Đường Caesar",
        lane: "Đường Tà Thần Caesar",
        difficulty: "Cực Khó (Kỹ Năng Đỉnh Cao)",
        image: "https://lienquan.garena.vn/wp-content/uploads/2024/05/62cda115a78344fc4fa5154881c9da255c25f64ee32a71.jpg",
        lore: "Xuất thân từ tầng lớp quý tộc hào hoa của Vương Quốc Okka, Florentino là một bậc thầy kiếm thuật lãng tử với phong cách chiến đấu như một điệu vũ tao nhã nhưng vô cùng chết chóc.",
        stats: [
            { label: "Sát thương chuẩn", icon: "fa-solid fa-khanda", value: 100 },
            { label: "Chống chịu", icon: "fa-solid fa-shield", value: 65 },
            { label: "Độ cơ động", icon: "fa-solid fa-bolt", value: 80 },
            { label: "Độ khó", icon: "fa-solid fa-brain", value: 95 }
        ],
        abilities: [
            { key: "P", name: "Xuất Kích", desc: "Khi rời giao tranh, đòn đánh kế tiếp lướt tới mục tiêu và gây thêm sát thương vật lý." },
            { key: "Chiêu 1", name: "Hào Hoa", desc: "Phóng đóa hoa gây choáng và làm rơi 3 đóa hoa trên mặt đất xung quanh mục tiêu." },
            { key: "Chiêu 2", name: "Thưởng Hoa", desc: "Tung 3 nhát kiếm liên hoàn nhặt hoa hồi nội năng, tăng tốc chạy và giảm hồi chiêu." },
            { key: "Chiêu 3", name: "Tài Hoa", desc: "Thách đấu mục tiêu chỉ định, tăng 20% sát thương chuẩn và miễn nhiễm toàn bộ khống chế từ đối thủ khác." }
        ],
        tips: "Tập luyện nhặt hoa theo nhịp: Ném Chiêu 1 trúng -> Đánh thường lướt -> Chiêu 2 xoay kiếm -> Di chuyển nhặt hoa kế tiếp lặp lại."
    },
    nakroth: {
        id: "nakroth",
        name: "Nakroth",
        subtitle: "Lưỡi Đao Phán Xét",
        game: "lq",
        gameName: "Liên Quân Mobile",
        type: "champion",
        typeName: "Tướng",
        role: "Sát Thủ Đi Rừng",
        lane: "Khu Vực Rừng (Jungle)",
        difficulty: "Khó",
        image: "https://lienquan.garena.vn/wp-content/uploads/2024/05/50a88477e44151ee8ef4cfb354c22fdc5ec64ff164ffc1.jpg",
        lore: "Thẩm phán tối cao của Lực Lượng Sa Đọa, Nakroth mang đôi đao phán xét kết liễu mọi linh hồn tội lỗi với tốc độ di chuyển xé toạc không gian.",
        stats: [
            { label: "Sát thương bộc phát", icon: "fa-solid fa-khanda", value: 90 },
            { label: "Chống chịu", icon: "fa-solid fa-shield", value: 30 },
            { label: "Độ cơ động", icon: "fa-solid fa-bolt", value: 100 },
            { label: "Khống chế", icon: "fa-solid fa-wand-magic-sparkles", value: 60 }
        ],
        abilities: [
            { key: "P", name: "Thẩm Phán Oai Nghiêm", desc: "Đòn đánh thứ 4 hất tung kẻ địch; mỗi lần tung chiêu trúng tướng tăng 50% tốc đánh." },
            { key: "Chiêu 1", name: "Bồi Thẩm Đoàn", desc: "Lướt tới hất tung đối thủ, có thể kích hoạt lần 2 để lướt tiếp." },
            { key: "Chiêu 2", name: "Nguồn Cơn Rắc Rối", desc: "Lướt ngược hướng chỉ định và cường hóa đòn đánh thường kế thành đòn quét rìu diện rộng." },
            { key: "Chiêu 3", name: "Gươm Hành Quyết", desc: "Chém liên hoàn 4 nhát miễn nhiễm khống chế, nhát chém cuối hất văng mục tiêu." }
        ],
        tips: "Tận dụng 3 lượt lướt để cướp bùa rừng đối phương và thoái lui an toàn. Đẩy lẻ đường đơn ở giai đoạn cuối trận để kéo giãn đội hình đối thủ."
    },
    violet: {
        id: "violet",
        name: "Violet",
        subtitle: "Tay Súng Quả Cảm",
        game: "lq",
        gameName: "Liên Quân Mobile",
        type: "champion",
        typeName: "Tướng",
        role: "Xạ Thủ (ADC)",
        lane: "Đường Rồng / Rừng",
        difficulty: "Trung Bình",
        image: "https://lienquan.garena.vn/wp-content/uploads/2024/05/ed92932b8d6258aec8ac2cf8fbe571675d2564bb257571.jpg",
        lore: "Thành viên kiệt xuất của Hội Tam Điểm, Violet trang bị cặp súng ngắn diệt ma chuyên săn lùng những ác quỷ bóng tối rình rập nhân loại.",
        stats: [
            { label: "Sát thương chí mạng", icon: "fa-solid fa-khanda", value: 95 },
            { label: "Chống chịu", icon: "fa-solid fa-shield", value: 25 },
            { label: "Độ cơ động", icon: "fa-solid fa-bolt", value: 70 },
            { label: "Tầm bắn", icon: "fa-solid fa-crosshairs", value: 90 }
        ],
        abilities: [
            { key: "P", name: "Nạp Đạn", desc: "Đòn đánh thường trúng tướng giảm 0.5s hồi chiêu Đạn Xuyên Thấu." },
            { key: "Chiêu 1", name: "Đạn Xuyên Thấu", desc: "Lộn nhào cường hóa phát bắn tiếp theo gia tăng tầm bắn siêu xa và sát thương chí mạng cực lớn." },
            { key: "Chiêu 2", name: "Khai Hỏa", desc: "Ném lựu đạn làm chậm và làm lộ diện kẻ địch trong bụi." },
            { key: "Chiêu 3", name: "Pháo Đại", desc: "Bắn pháo cối tầm xa dọn lính và kết liễu kẻ địch thấp máu." }
        ],
        tips: "Lộn nhào Chiêu 1 theo đường chéo để giữ khoảng cách an toàn, tận dụng tầm bắn xa cấu máu đối phương trước khi giao tranh nổ ra."
    },
    tulen: {
        id: "tulen",
        name: "Tulen",
        subtitle: "Hoàng Tử Lôi Quang",
        game: "lq",
        gameName: "Liên Quân Mobile",
        type: "champion",
        typeName: "Tướng",
        role: "Pháp Sư / Sát Thủ Phép",
        lane: "Đường Giữa (Mid) / Rừng",
        difficulty: "Trung Bình - Khó",
        image: "https://lienquan.garena.vn/wp-content/uploads/2024/05/Tulen.jpg",
        lore: "Hoàng tử ngự trị sấm sét của Cung Điện Ánh Sáng, Tulen sở hữu ma thuật lôi quang thuần khiết sẵn sàng trừng phạt bất cứ kẻ dị giáo nào.",
        stats: [
            { label: "Sát thương phép", icon: "fa-solid fa-wand-magic-sparkles", value: 95 },
            { label: "Chống chịu", icon: "fa-solid fa-shield", value: 35 },
            { label: "Độ cơ động", icon: "fa-solid fa-bolt", value: 85 },
            { label: "Dọn lính", icon: "fa-solid fa-burst", value: 90 }
        ],
        abilities: [
            { key: "P", name: "Lôi Quang", desc: "Tích đủ 5 dấu ấn lôi quang sẽ triệu hồi 5 luồng sét tự động truy sát kẻ địch gần nhất." },
            { key: "Chiêu 1", name: "Lôi Quang Trảo", desc: "Bắn ra 3 tia sét hình nón gây sát thương phép bùng nổ cự ly gần." },
            { key: "Chiêu 2", name: "Lôi Động", desc: "Dịch chuyển tức thời gây sát thương tại điểm xuất phát và điểm đến, tích trữ tối đa 3 lần." },
            { key: "Chiêu 3", name: "Lôi Điểu", desc: "Tụ chim sét khổng lồ khóa mục tiêu từ xa kết liễu, nếu hạ gục tướng hồi lại 80% thời gian hồi chiêu." }
        ],
        tips: "Lướt Chiêu 2 áp sát để Chiêu 1 trúng cả 3 tia sét kích hoạt ngay nội tại giật sét, sau đó khóa Chiêu 3 Lôi Điểu để kết liễu."
    },
    raz: {
        id: "raz",
        name: "Raz",
        subtitle: "Quyền Vương",
        game: "lq",
        gameName: "Liên Quân Mobile",
        type: "champion",
        typeName: "Tướng",
        role: "Pháp Sư / Đấu Sĩ",
        lane: "Đường Giữa (Mid Lane)",
        difficulty: "Khó",
        image: "https://lienquan.garena.vn/wp-content/uploads/2024/05/c5cdd906de9c6f1e2a9f349a0c8a64ad591e6990ac0621.jpg",
        lore: "Võ sĩ quyền anh mang linh hồn ngọn lửa bất diệt, Raz nổi tiếng với những đòn đấm thép đẩy lùi kẻ thù và khả năng cấu rỉa phép cực kỳ ức chế.",
        stats: [
            { label: "Sát thương phép", icon: "fa-solid fa-wand-magic-sparkles", value: 90 },
            { label: "Chống chịu", icon: "fa-solid fa-shield", value: 50 },
            { label: "Độ cơ động", icon: "fa-solid fa-bolt", value: 80 },
            { label: "Khống chế", icon: "fa-solid fa-hand-fist", value: 90 }
        ],
        abilities: [
            { key: "P", name: "Đấm & Lách", desc: "Sau khi tung chiêu Raz lách bước theo hướng chỉ định; đòn đánh thứ 3 đẩy lùi kẻ địch." },
            { key: "Chiêu 1", name: "Cú Đấm Thăng Hoa", desc: "Lao tới tung cú đấm móc hất tung mục tiêu lên không trung." },
            { key: "Chiêu 2", name: "Cú Đấm Chân Không", desc: "Phóng luồng khí tầm xa làm chậm 80% và trừ lượng lớn giáp phép đối phương." },
            { key: "Chiêu 3", name: "Tả Xung Hữu Đột", desc: "Ủi thẳng về phía trước đẩy lùi toàn bộ kẻ địch trên đường bay." }
        ],
        tips: "Cấu rỉa Chiêu 2 liên tục từ xa. Khi đối phương sơ hở: Chiêu 2 trúng -> Lách lên -> Tốc biến Chiêu 3 đẩy ngược đối thủ về phía trụ hoặc đồng đội."
    },
    thanhkiem: {
        id: "thanhkiem",
        name: "Thánh Kiếm",
        subtitle: "Claves Sancti",
        game: "lq",
        gameName: "Liên Quân Mobile",
        type: "equipment",
        typeName: "Trang Bị",
        role: "Vật Lý Chí Mạng",
        lane: "Trang Bị Xạ Thủ & Sát Thủ",
        difficulty: "Trấn Phái",
        image: "https://lienquan.garena.vn/wp-content/uploads/2024/05/icon48a62735ee508f6a920e823fafd9b21159eebea8e613f1.png",
        lore: "Thanh kiếm thánh mang phước lành ánh sáng khuếch đại uy lực của mọi nhát chém chí mạng lên mức tối đa.",
        stats: [
            { label: "Công vật lý", icon: "fa-solid fa-khanda", value: 110 },
            { label: "Tỉ lệ chí mạng", icon: "fa-solid fa-crosshairs", value: 25 },
            { label: "Sát thương nổ", icon: "fa-solid fa-burst", value: 50 },
            { label: "Giá trị vàng", icon: "fa-solid fa-coins", value: 70 }
        ],
        abilities: [
            { key: "Stat", name: "Chỉ số cơ bản", desc: "+110 Công vật lý, +25% Tỉ lệ chí mạng." },
            { key: "P", name: "Nội tại - Thánh Trảm", desc: "Sau khi đánh chí mạng, sát thương chí mạng tăng thêm 50%." }
        ],
        tips: "Món đồ bắt buộc phải có cho các xạ thủ như Violet, Valhein, Capheny, Tel'Annas."
    },
    phuchopkiem: {
        id: "phuchopkiem",
        name: "Phức Hợp Kiếm",
        subtitle: "Omni Arms",
        game: "lq",
        gameName: "Liên Quân Mobile",
        type: "equipment",
        typeName: "Trang Bị",
        role: "Đa Năng Toàn Diện",
        lane: "Đấu Sĩ & Sát Thủ",
        difficulty: "Dễ Lên Đồ",
        image: "https://lienquan.garena.vn/wp-content/uploads/2024/05/2ed0a1b9762b0eaed6ef8c26f69fabb0583eaf5e888731.png",
        lore: "Vũ khí kết hợp giữa kiếm, rìu và búa cổ ngữ dung hợp toàn bộ sức mạnh nguyên tố cho đòn đánh thường tiếp nối.",
        stats: [
            { label: "Công vật lý", icon: "fa-solid fa-khanda", value: 70 },
            { label: "Tốc độ đánh", icon: "fa-solid fa-gauge-high", value: 15 },
            { label: "Giảm hồi chiêu", icon: "fa-solid fa-hourglass", value: 10 },
            { label: "Máu tối đa", icon: "fa-solid fa-heart", value: 40 }
        ],
        abilities: [
            { key: "Stat", name: "Chỉ số cơ bản", desc: "+70 Công vật lý, +15% Tốc đánh, +10% Giảm hồi chiêu, +400 Máu." },
            { key: "P", name: "Nội tại - Nguyên Tố", desc: "Sau khi tung chiêu, đòn đánh thường tiếp theo trong 5s gây thêm 100% sát thương vật lý." }
        ],
        tips: "Trang bị trấn phái cho các đấu sĩ chuộng đòn đánh xen kẽ chiêu như Ryoma, Omen, Richter, Kil'Groth."
    },
    giaphomeh: {
        id: "giaphomeh",
        name: "Giáp Hộ Mệnh",
        subtitle: "Ancestral Glory",
        game: "lq",
        gameName: "Liên Quân Mobile",
        type: "equipment",
        typeName: "Trang Bị",
        role: "Hồi Sinh Sống Lại",
        lane: "Mọi Vị Trí Cuối Trận",
        difficulty: "Trang Bị Sinh Tồn",
        image: "https://lienquan.garena.vn/wp-content/uploads/2024/05/icon6b6c892834f3b9840bec892627dbeedb5b87c72793cd01.png",
        lore: "Bộ giáp cổ hộ mệnh trao cho chủ nhân cơ hội thứ hai để sửa chữa sai lầm và lật ngược tình thế trong trận chiến cam go.",
        stats: [
            { label: "Giáp vật lý", icon: "fa-solid fa-shield", value: 120 },
            { label: "Cứu mạng", icon: "fa-solid fa-heart-pulse", value: 100 },
            { label: "Thời gian hồi sinh", icon: "fa-solid fa-clock", value: 2 },
            { label: "Giá trị vàng", icon: "fa-solid fa-coins", value: 75 }
        ],
        abilities: [
            { key: "Stat", name: "Chỉ số cơ bản", desc: "+120 Giáp vật lý." },
            { key: "P", name: "Nội tại - Phục Sinh", desc: "Tướng tử trận sẽ sống lại ngay tại vị trí sau 2 giây với 2000 máu (tối đa 2 lần mỗi trận)." }
        ],
        tips: "Luôn mua ở phút 15+ của trận đấu. Khi đã hết lượt hồi sinh có thể bán đổi sang Liềm Đoạt Mệnh hoặc Cầu Pha Lê."
    },
    nanhfenrir: {
        id: "nanhfenrir",
        name: "Nanh Fenrir",
        subtitle: "Fenrir's Tooth",
        game: "lq",
        gameName: "Liên Quân Mobile",
        type: "equipment",
        typeName: "Trang Bị",
        role: "SMCK Cực Đại",
        lane: "Sát Thủ & Xạ Thủ Dứt Điểm",
        difficulty: "Trang Bị Cao Cấp",
        image: "https://lienquan.garena.vn/wp-content/uploads/2024/05/7ccbeb5a9d92d6616b38fb9f8a6d697f583eb0099ad9e1.png",
        lore: "Chiếc nanh của loài sói khổng lồ Fenrir, ban cho mọi nhát chém khả năng kết liễu nghiền nát đối phương khi chúng kiệt sức.",
        stats: [
            { label: "Công vật lý", icon: "fa-solid fa-khanda", value: 200 },
            { label: "Khuếch đại sát thương", icon: "fa-solid fa-skull", value: 30 },
            { label: "Sức kết liễu", icon: "fa-solid fa-bolt", value: 95 },
            { label: "Giá trị vàng", icon: "fa-solid fa-coins", value: 95 }
        ],
        abilities: [
            { key: "Stat", name: "Chỉ số cơ bản", desc: "+200 Công vật lý (chỉ số cao nhất Liên Quân)." },
            { key: "P", name: "Nội tại - Chinh Phạt", desc: "Gây thêm 30% sát thương lên mục tiêu còn dưới 50% lượng máu tối đa." }
        ],
        tips: "Trang bị cuối cùng hoàn thiện bộ đồ giúp dồn combo một phát bốc hơi tướng chủ lực đối phương."
    },
    alok: {
        id: "alok",
        name: "Alok",
        subtitle: "DJ Quốc Dân",
        game: "ff",
        gameName: "Free Fire",
        type: "champion",
        typeName: "Nhân Vật",
        role: "Hỗ Trợ Tốc Độ & Hồi Máu",
        lane: "Đội Trưởng / Cơ Động",
        difficulty: "Dễ Dùng (Meta Quốc Dân)",
        image: "https://cdn.wildflamestudio.com/common/web_event/official2.ff.garena.all/img/20228/a0fba5fd9863437e79823aac3b1e1147.jpg",
        lore: "Một DJ huyền thoại thế giới mang âm nhạc của mình vào chiến trường sinh tồn, dùng giai điệu để khích lệ tinh thần và hồi phục sức sống cho đồng đội.",
        stats: [
            { label: "Hồi máu", icon: "fa-solid fa-heart-pulse", value: 90 },
            { label: "Tăng tốc chạy", icon: "fa-solid fa-person-running", value: 85 },
            { label: "Hỗ trợ đồng đội", icon: "fa-solid fa-users", value: 95 },
            { label: "Cơ động", icon: "fa-solid fa-bolt", value: 80 }
        ],
        abilities: [
            { key: "Active", name: "Giai Điệu Sinh Mệnh (Chủ Động)", desc: "Tạo vòng hào quang 5m tăng 15% tốc độ di chuyển và hồi 5 HP/giây trong 10 giây cho Alok và đồng đội." }
        ],
        tips: "Kích hoạt trước khi đẩy nhà hoặc khi đang bo thu hẹp để vừa hồi máu vừa chạy vào vùng an toàn cực nhanh."
    },
    chrono: {
        id: "chrono",
        name: "Chrono",
        subtitle: "Thợ Săn Thời Không",
        game: "ff",
        gameName: "Free Fire",
        type: "champion",
        typeName: "Nhân Vật",
        role: "Phòng Thủ & Lật Kèo",
        lane: "Đột Kích / Giao Tranh Mở",
        difficulty: "Trung Bình",
        image: "https://cdn.wildflamestudio.com/common/web_event/official2.ff.garena.all/20252/e223d27e51794f9f52e79f9f2c4d3e7a.jpg",
        lore: "Chiến binh đến từ tương lai với công nghệ bẻ cong trường lực thời gian, bảo vệ đồng đội trước làn mưa bom bão đạn trong tích tắc.",
        stats: [
            { label: "Chống chịu khiên", icon: "fa-solid fa-shield-halved", value: 100 },
            { label: "Bảo hộ đồng đội", icon: "fa-solid fa-shield", value: 90 },
            { label: "Lật kèo 1v4", icon: "fa-solid fa-skull", value: 85 },
            { label: "Cơ động", icon: "fa-solid fa-bolt", value: 50 }
        ],
        abilities: [
            { key: "Active", name: "Hào Quang Hộ Mệnh (Chủ Động)", desc: "Tạo ra một trường lực tĩnh ngăn chặn 800 sát thương từ bên ngoài trong 6 giây (110s hồi chiêu)." }
        ],
        tips: "Bật khiên khi đối đầu tầm gần với Shotgun hoặc khi bị ngắm tỉa ở bãi trống để có 6 giây cứu đồng đội hoặc bơm máu."
    },
    kelly: {
        id: "kelly",
        name: "Kelly",
        subtitle: "Tia Chớp Vàng",
        game: "ff",
        gameName: "Free Fire",
        type: "champion",
        typeName: "Nhân Vật",
        role: "Tốc Độ & Bộc Phát",
        lane: "Cơ Động Tầm Xa",
        difficulty: "Dễ Dùng",
        image: "https://cdn.wildflamestudio.com/common/web_event/official2.ff.garena.all/img/20228/b3473af03d4fa23fd7d8366725bde5eb.jpg",
        lore: "Nữ vận động viên điền kinh trung học với đôi chân thần tốc, Kelly luôn dẫn đầu mọi cuộc đua và áp sát đối thủ trước khi chúng kịp phản ứng.",
        stats: [
            { label: "Tốc độ chạy", icon: "fa-solid fa-person-running", value: 95 },
            { label: "Sát thương đầu", icon: "fa-solid fa-crosshairs", value: 80 },
            { label: "Độ cơ động", icon: "fa-solid fa-bolt", value: 90 },
            { label: "Dễ ghép skill", icon: "fa-solid fa-puzzle-piece", value: 100 }
        ],
        abilities: [
            { key: "Passive", name: "Vận Động Viên (Bị Động)", desc: "Tốc độ chạy nước rút tăng vĩnh viễn 6% không cần kích hoạt." },
            { key: "Awaken", name: "Phát Bắn Gia Tốc (Thức Tỉnh)", desc: "Sau khi chạy nước rút 4 giây, phát bắn đầu tiên vào đối phương gây thêm 106% sát thương." }
        ],
        tips: "Kỹ năng bị động bắt buộc phải ghép vào mọi combo nhân vật để di chuyển loot đồ và lách đạn nhanh nhất."
    },
    hayato: {
        id: "hayato",
        name: "Hayato",
        subtitle: "Samurai Huyền Thoại",
        game: "ff",
        gameName: "Free Fire",
        type: "champion",
        typeName: "Nhân Vật",
        role: "Xuyên Giáp Cận Chiến",
        lane: "Cận Chiến Shotgun / SMG",
        difficulty: "Trung Bình",
        image: "https://cdn.wildflamestudio.com/common/web_event/official2.ff.garena.all/img/20228/f29319b9e6e695dc2e1a5967efb9c42e.jpg",
        lore: "Hậu duệ dòng dõi samurai cổ xưa gánh vác sứ mệnh gia tộc, Hayato biến nỗi đau vết thương thành sức mạnh xuyên thủng mọi giáp trụ.",
        stats: [
            { label: "Xuyên giáp", icon: "fa-solid fa-burst", value: 95 },
            { label: "Sát thương cận chiến", icon: "fa-solid fa-khanda", value: 90 },
            { label: "Sinh tồn", icon: "fa-solid fa-shield", value: 70 },
            { label: "Lật kèo", icon: "fa-solid fa-bolt", value: 90 }
        ],
        abilities: [
            { key: "Passive", name: "Ảo Ảnh Kiếm (Bị Động)", desc: "Mỗi khi máu tối đa giảm 10%, độ xuyên giáp của vũ khí được tăng thêm 10%." },
            { key: "Awaken", name: "Khiên Dao (Thức Tỉnh)", desc: "Mỗi khi máu giảm, nhận thêm khả năng giảm sát thương trực diện từ phía trước." }
        ],
        tips: "Vua đấu súng tầm gần. Càng thấp máu thì đạn bắn ra càng dễ one-shot đối thủ dù chúng mặc giáp cấp 4."
    },
    dimitri: {
        id: "dimitri",
        name: "Dimitri",
        subtitle: "Chuyên Gia Âm Thanh",
        game: "ff",
        gameName: "Free Fire",
        type: "champion",
        typeName: "Nhân Vật",
        role: "Hồi Sinh & Hồi Máu",
        lane: "Đội Hình Rank Xếp Hạng",
        difficulty: "Dễ Dùng",
        image: "https://cdn.wildflamestudio.com/common/web_event/official2.ff.garena.all/img/20228/5cbdba2d326bee4f27ea240fe9d5b76a.jpg",
        lore: "Nhà sản xuất âm thanh đại tài mang công nghệ sóng hạ âm chữa lành tế bào sinh học vào đấu trường sinh tồn.",
        stats: [
            { label: "Tự cứu sinh tồn", icon: "fa-solid fa-heart-pulse", value: 100 },
            { label: "Hồi máu đội", icon: "fa-solid fa-users", value: 85 },
            { label: "Khả năng cứu viện", icon: "fa-solid fa-hand-holding-heart", value: 95 },
            { label: "Phạm vi", icon: "fa-solid fa-circle", value: 70 }
        ],
        abilities: [
            { key: "Active", name: "Nhịp Điệu Hồi Sinh (Chủ Động)", desc: "Tạo vòng 3.5m hồi 5 HP/s trong 12s; đồng đội và bản thân khi bị gục ngã trong vòng có thể tự đứng dậy." }
        ],
        tips: "Cực kỳ hiệu quả trong chế độ Tử Chiến (Clash Squad) và đấu giải; bật ngay khi chuẩn bị giao tranh tầm xa sau vật cản."
    },
    mp40: {
        id: "mp40",
        name: "MP40",
        subtitle: "Tiểu Liên Thần Tốc",
        game: "ff",
        gameName: "Free Fire",
        type: "equipment",
        typeName: "Vũ Khí",
        role: "Súng Tiểu Liên (SMG)",
        lane: "Tác Chiến Cận Chiến",
        difficulty: "Cần Kéo Tâm Chuẩn",
        image: "https://cdn.wildflamestudio.com/common/web_event/official/d9cb553d89b5MP40.png",
        lore: "Khẩu súng tiểu liên huyền thoại với tốc độ xả đạn kinh hoàng, là nỗi khiếp sợ của mọi kẻ địch trong các cuộc chạm trán nhà hẹp.",
        stats: [
            { label: "Tốc độ bắn", icon: "fa-solid fa-gauge-high", value: 83 },
            { label: "Sát thương cận chiến", icon: "fa-solid fa-khanda", value: 48 },
            { label: "Băng đạn", icon: "fa-solid fa-bars", value: 32 },
            { label: "Độ chuẩn xác", icon: "fa-solid fa-crosshairs", value: 65 }
        ],
        abilities: [
            { key: "Stat", name: "Tốc độ xả đạn vô đối", desc: "Tốc độ bắn đạt 83 điểm - cao nhất dòng súng tiểu liên Free Fire." },
            { key: "Play", name: "Kỹ thuật vuốt tâm", desc: "Ghìm tâm kéo thẳng lên đầu ở cự ly dưới 10m để đạt 100% headshot." }
        ],
        tips: "Kết hợp phụ kiện Băng đạn kép và Nòng súng cấp 3 để tối ưu hóa lượng đạn dồn trong một lần sấy."
    },
    ak47: {
        id: "ak47",
        name: "AK47",
        subtitle: "Súng Trường Tấn Công",
        game: "ff",
        gameName: "Free Fire",
        type: "equipment",
        typeName: "Vũ Khí",
        role: "Súng Trường Tấn Công (AR)",
        lane: "Giao Tranh Tầm Trung",
        difficulty: "Khó (Độ Giật Lớn)",
        image: "https://cdn.wildflamestudio.com/common/web_event/official/fa2feaa3801eAK.png",
        lore: "Biểu tượng súng trường uy lực bậc nhất với sức công phá từng phát bắn cực kỳ kinh hoàng.",
        stats: [
            { label: "Sát thương", icon: "fa-solid fa-khanda", value: 61 },
            { label: "Tầm xa", icon: "fa-solid fa-crosshairs", value: 72 },
            { label: "Tốc độ bắn", icon: "fa-solid fa-gauge-high", value: 56 },
            { label: "Độ giật", icon: "fa-solid fa-arrows-up-down", value: 80 }
        ],
        abilities: [
            { key: "Stat", name: "Sát thương đạn lớn", desc: "61 điểm sát thương cơ bản phát một, có thể hạ gục địch chỉ sau 3 viên chuẩn xác." },
            { key: "Play", name: "Nhấp nhả từng phát", desc: "Nên bắn nhấp nhả 2-3 viên (tap tap) để khống chế độ giật tâm." }
        ],
        tips: "Lắp Báng súng cấp 3 và Tay cầm cấp 3 để giảm độ rung lắc khi sấy liên tục."
    },
    m1887: {
        id: "m1887",
        name: "M1887",
        subtitle: "Shotgun 2 Nòng Tử Thần",
        game: "ff",
        gameName: "Free Fire",
        type: "equipment",
        typeName: "Vũ Khí",
        role: "Shotgun (SG)",
        lane: "Áp Sát One-Shot",
        difficulty: "Khó Căn Nhát Bắn",
        image: "https://cdn.wildflamestudio.com/common/web_event/official2.ff.garena.all/20253/c642875194de4e4e544e58513b92a4ae.png",
        lore: "Khẩu shotgun 2 viên đoạt mệnh cự ly gần; bắn chuẩn xác có thể đưa đối thủ lên bảng đếm số chỉ trong 1 phát bấm cò.",
        stats: [
            { label: "Sát thương tối đa", icon: "fa-solid fa-khanda", value: 100 },
            { label: "Xuyên giáp", icon: "fa-solid fa-burst", value: 54 },
            { label: "Tầm gần", icon: "fa-solid fa-crosshairs", value: 21 },
            { label: "Tốc độ nạp", icon: "fa-solid fa-rotate", value: 55 }
        ],
        abilities: [
            { key: "Stat", name: "Sát thương 100 điểm", desc: "Chỉ số sát thương tối đa trong toàn bộ các dòng súng Free Fire." },
            { key: "Play", name: "Bắn và đổi súng", desc: "Bắn 2 phát đạn -> lập tức đổi sang cận chiến lướt né -> thay đạn bắn tiếp." }
        ],
        tips: "Tận dụng góc cua nhà và sau tường keo để bất ngờ nhảy ra bắn headshot đối phương."
    },
    awm: {
        id: "awm",
        name: "AWM",
        subtitle: "Súng Bắn Tỉa Thính",
        game: "ff",
        gameName: "Free Fire",
        type: "equipment",
        typeName: "Vũ Khí",
        role: "Súng Bắn Tỉa (Sniper)",
        lane: "Xạ Thủ Tầm Cực Xa",
        difficulty: "Cần Căn Dự Đoán Hướng",
        image: "https://cdn.wildflamestudio.com/common/web_event/official/08584671dd2bAWM.png",
        lore: "Khẩu súng ngắm hòm thính tối thượng với sát thương một phát trúng đầu xuyên thủng mọi cấp độ mũ bảo hiểm.",
        stats: [
            { label: "Sát thương", icon: "fa-solid fa-khanda", value: 90 },
            { label: "Tầm xa", icon: "fa-solid fa-crosshairs", value: 91 },
            { label: "Headshot xuyên mũ", icon: "fa-solid fa-skull", value: 100 },
            { label: "Băng đạn", icon: "fa-solid fa-bars", value: 5 }
        ],
        abilities: [
            { key: "Stat", name: "Sát thương đầu 300+", desc: "Phát bắn trúng đầu hạ gục ngay tức thì bất kể đối phương có giáp hay mũ cấp 3." },
            { key: "Play", name: "Tích hợp sẵn Scope 8x", desc: "Không cần tìm ống ngắm, sẵn sàng bắn tỉa ở mọi cự ly trên đồi cao." }
        ],
        tips: "Kết hợp nhân vật Moco và Rafael để đánh dấu và triệt tiêu âm thanh phát bắn không để lộ vị trí trên bản đồ nhỏ."
    }
};

// ==========================================================
// HÀM MỞ & ĐÓNG CỬA SỔ SPOTLIGHT MODAL CHI TIẾT
// ==========================================================
function openWikiModal(id) {
    const item = wikiDatabase[id];
    if (!item) return;

    const overlay = document.getElementById('wikiModalOverlay');
    const heroBg = document.getElementById('wikiModalHeroBg');
    const title = document.getElementById('wikiModalTitle');
    const subtitle = document.getElementById('wikiModalSubtitle');
    const role = document.getElementById('wikiModalRole');
    const tags = document.getElementById('wikiModalTags');
    const lore = document.getElementById('wikiModalLore');
    const statBars = document.getElementById('wikiModalStatBars');
    const abilities = document.getElementById('wikiModalAbilities');
    const tips = document.getElementById('wikiModalTips');
    const abilityHeader = document.getElementById('wikiModalAbilityHeader');

    if (!overlay) return;

    if (heroBg) {
        heroBg.style.backgroundImage = `url('${item.image}')`;
        if (item.type === 'equipment') {
            heroBg.style.backgroundSize = 'contain';
            heroBg.style.backgroundRepeat = 'no-repeat';
            heroBg.style.backgroundPosition = 'right 40px center';
            heroBg.style.filter = 'drop-shadow(0 0 25px rgba(0, 240, 255, 0.45)) brightness(1)';
        } else {
            heroBg.style.backgroundSize = 'cover';
            heroBg.style.backgroundRepeat = 'no-repeat';
            heroBg.style.backgroundPosition = 'center 20%';
            heroBg.style.filter = 'brightness(0.75)';
        }
    }
    if (title) title.textContent = item.name;
    if (subtitle) subtitle.textContent = item.subtitle;
    if (role) {
        role.innerHTML = `<i class="fa-solid fa-shield"></i> ${item.role} • ${item.lane}`;
    }
    if (tags) {
        const gameBadgeClass = item.game === 'lol' ? 'lol' : (item.game === 'lq' ? 'lq' : 'ff');
        const typeBadgeClass = item.type === 'champion' ? 'champ' : (item.typeName === 'Trang Bị' ? 'item' : 'weapon');
        tags.innerHTML = `
            <span class="badge-cat ${gameBadgeClass}">${item.gameName}</span>
            <span class="badge-type ${typeBadgeClass}">${item.typeName}</span>
            <span class="badge-type" style="background: rgba(255,255,255,0.1); color:#fff; border:1px solid rgba(255,255,255,0.25);">Độ khó: ${item.difficulty}</span>
        `;
    }
    if (lore) lore.textContent = item.lore;

    if (statBars) {
        statBars.innerHTML = `
            <div class="wiki-stats-bars-grid">
                ${item.stats.map(s => `
                    <div class="stat-bar-row">
                        <span class="stat-bar-label"><i class="${s.icon}"></i> ${s.label}</span>
                        <div class="stat-bar-track">
                            <div class="stat-bar-fill" style="width: ${s.value}%;"></div>
                        </div>
                        <span class="stat-bar-val">${s.value}%</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    if (abilityHeader) {
        abilityHeader.innerHTML = item.type === 'champion'
            ? `<i class="fa-solid fa-wand-magic-sparkles"></i> Bộ Kỹ Năng Thi Đấu`
            : `<i class="fa-solid fa-crosshairs"></i> Thuộc Tính & Tính Năng Chi Tiết`;
    }

    if (abilities) {
        abilities.innerHTML = item.abilities.map(a => `
            <div class="wiki-ability-card">
                <div class="ability-key-badge">${a.key}</div>
                <div class="ability-details">
                    <h5>${a.name}</h5>
                    <p>${a.desc}</p>
                </div>
            </div>
        `).join('');
    }

    if (tips) {
        tips.innerHTML = item.tips;
    }

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeWikiModal() {
    const overlay = document.getElementById('wikiModalOverlay');
    if (overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// --- 2. LỌC VÀ TÌM KIẾM WIKI (TỰA GAME, TƯỚNG/NHÂN VẬT & TRANG BỊ/VŨ KHÍ) ---
const wikiContainer = document.getElementById('wikiContainer');
if (wikiContainer) {
    const wikiGameTabBtns = document.querySelectorAll('#wikiGameTabs .tab-btn');
    const wikiSubTabBtns = document.querySelectorAll('#wikiSubTabs .sub-tab-btn');
    const wikiRoleTabBtns = document.querySelectorAll('#wikiRoleTabs .role-tab-btn');
    const wikiCards = document.querySelectorAll('#wikiContainer .wiki-card');
    const wikiSearchInput = document.getElementById('wikiSearch');
    const wikiCountNumber = document.getElementById('wikiCountNumber');
    const wikiEmptyState = document.getElementById('wikiEmptyState');
    const crumbGame = document.getElementById('crumbGame');
    const crumbType = document.getElementById('crumbType');
    const crumbRole = document.getElementById('crumbRole');

    let currentWikiGame = 'all';
    let currentWikiType = 'all';
    let currentWikiRole = 'all';

    const gameLabels = {
        all: "Tất Cả Tựa Game",
        lol: "Liên Minh Huyền Thoại",
        lq: "Liên Quân Mobile",
        ff: "Free Fire"
    };

    const typeLabels = {
        all: "Tất Cả Mục",
        champion: "Tướng & Nhân Vật",
        equipment: "Trang Bị & Vũ Khí"
    };

    const roleLabels = {
        all: "Tất Cả Vai Trò",
        "dau-si": "Đấu Sĩ",
        "do-don": "Đỡ Đòn",
        "phap-su": "Pháp Sư",
        "sat-thu": "Sát Thủ",
        "tro-thu": "Trợ Thủ",
        "xa-thu": "Xạ Thủ"
    };

    function updateBreadcrumbs() {
        if (crumbGame) crumbGame.textContent = gameLabels[currentWikiGame] || "Tất Cả Tựa Game";
        if (crumbType) crumbType.textContent = typeLabels[currentWikiType] || "Tất Cả Mục";
        if (crumbRole) crumbRole.textContent = roleLabels[currentWikiRole] || "Tất Cả Vai Trò";
    }

    function applyWikiFilter() {
        const searchTerm = wikiSearchInput ? normalizeText(wikiSearchInput.value.trim()) : '';
        let visibleCount = 0;

        wikiCards.forEach(card => {
            const cardGame = card.getAttribute('data-game');
            const cardType = card.getAttribute('data-type');
            const cardRole = (card.getAttribute('data-role') || '').split(' ');
            const searchableText = normalizeText((card.getAttribute('data-name') || '') + ' ' + card.textContent);

            const matchesGame = (currentWikiGame === 'all' || cardGame === currentWikiGame);
            const matchesType = (currentWikiType === 'all' || cardType === currentWikiType);
            const matchesRole = (currentWikiRole === 'all' || cardRole.includes(currentWikiRole));
            const matchesSearch = searchableText.includes(searchTerm);

            if (matchesGame && matchesType && matchesRole && matchesSearch) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (wikiCountNumber) {
            wikiCountNumber.textContent = visibleCount;
        }

        if (wikiEmptyState) {
            wikiEmptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }

        updateBreadcrumbs();
    }

    wikiGameTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            wikiGameTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentWikiGame = btn.getAttribute('data-game');
            applyWikiFilter();
            updateWikiUrl();
        });
    });

    wikiSubTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            wikiSubTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentWikiType = btn.getAttribute('data-type');
            applyWikiFilter();
            updateWikiUrl();
        });
    });

    wikiRoleTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            wikiRoleTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentWikiRole = btn.getAttribute('data-role');
            applyWikiFilter();
            updateWikiUrl();
        });
    });

    if (wikiSearchInput) {
        wikiSearchInput.addEventListener('input', applyWikiFilter);
    }

    function updateWikiUrl() {
        const params = new URLSearchParams();
        if (currentWikiGame !== 'all') params.set('game', currentWikiGame);
        if (currentWikiType !== 'all') params.set('type', currentWikiType);
        if (currentWikiRole !== 'all') params.set('role', currentWikiRole);
        const queryStr = params.toString();
        const newUrl = queryStr ? `wiki.html?${queryStr}` : 'wiki.html';
        window.history.replaceState(null, '', newUrl);
    }

    function setWikiFilters(game, type, role) {
        currentWikiGame = game || 'all';
        currentWikiType = type || 'all';
        currentWikiRole = role || 'all';

        wikiGameTabBtns.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-game') === currentWikiGame);
        });

        wikiSubTabBtns.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-type') === currentWikiType);
        });

        wikiRoleTabBtns.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-role') === currentWikiRole);
        });

        applyWikiFilter();
    }

    // Đọc tham số URL khi tải trang (?tab=lol-champ, ?game=..., ?type=..., ?role=...)
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    const gameParam = urlParams.get('game');
    const typeParam = urlParams.get('type');
    const roleParam = urlParams.get('role');

    if (tabParam === 'lol-champ') {
        setWikiFilters('lol', 'champion', roleParam || 'all');
    } else if (tabParam === 'lq-champ') {
        setWikiFilters('lq', 'champion', roleParam || 'all');
    } else if (tabParam === 'ff-char') {
        setWikiFilters('ff', 'champion', roleParam || 'all');
    } else if (gameParam || typeParam || roleParam) {
        setWikiFilters(gameParam || 'all', typeParam || 'all', roleParam || 'all');
    } else {
        applyWikiFilter();
    }

    // Bắt sự kiện khi click menu dropdown Wiki ở Header nếu đang ở wiki.html
    document.querySelectorAll('.dropdown-menu a[href*="wiki.html"], .drawer-submenu a[href*="wiki.html"]').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.location.pathname.endsWith('wiki.html')) {
                e.preventDefault();
                const url = new URL(link.href, window.location.origin);
                const tab = url.searchParams.get('tab');
                const game = url.searchParams.get('game');
                const type = url.searchParams.get('type');
                if (tab === 'lol-champ') setWikiFilters('lol', 'champion');
                else if (tab === 'lq-champ') setWikiFilters('lq', 'champion');
                else if (tab === 'ff-char') setWikiFilters('ff', 'champion');
                else if (game || type) setWikiFilters(game || 'all', type || 'all');
                else setWikiFilters('all', 'all');
                updateWikiUrl();
                if (typeof closeMobileDrawer === 'function') closeMobileDrawer();
            }
        });
    });

    // Gán sự kiện click cho các thẻ Wiki để mở modal chi tiết
    wikiCards.forEach(card => {
        card.addEventListener('click', () => {
            const wikiId = card.getAttribute('data-wiki-id');
            if (wikiId) openWikiModal(wikiId);
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const wikiId = card.getAttribute('data-wiki-id');
                if (wikiId) openWikiModal(wikiId);
            }
        });
    });

    const wikiModalCloseBtn = document.getElementById('wikiModalClose');
    const wikiModalOverlay = document.getElementById('wikiModalOverlay');
    if (wikiModalCloseBtn) {
        wikiModalCloseBtn.addEventListener('click', closeWikiModal);
    }
    if (wikiModalOverlay) {
        wikiModalOverlay.addEventListener('click', (e) => {
            if (e.target === wikiModalOverlay) closeWikiModal();
        });
    }

}

// --- 3. TÌM KIẾM TOÀN TRANG THÔNG MINH ---
const siteSearchIndex = [
    { title: "Faker (Lee Sang-hyeok)", category: "Tuyển thủ • T1 (LOL)", desc: "Đường Giữa huyền thoại với 5 chức vô địch CKTG thế giới.", url: "roster.html", keywords: "faker lee sang hyeok t1 lol mid" },
    { title: "Lai Bâng (Thóng Lai Bâng)", category: "Tuyển thủ • SGP (Liên Quân)", desc: "Tuyển thủ đi rừng hàng đầu với bể tướng rộng.", url: "roster.html", keywords: "lai bang thong lai bang sgp lien quan rung" },
    { title: "Ghost (Nguyễn Văn Bảo)", category: "Tuyển thủ • Free Fire", desc: "Chuyên gia căn góc súng và giao tranh tầm trung.", url: "roster.html", keywords: "ghost nguyen van bao free fire ff" },
    { title: "Demon1 (Max Mazanov)", category: "Tuyển thủ • Valorant", desc: "Bậc thầy dùng súng trường với độ chính xác tuyệt đối.", url: "roster.html", keywords: "demon1 max mazanov valorant" },
    { title: "Chung kết thế giới LOL: Đội tuyển hạt giống số 1 chốt đội hình", category: "Tin tức • LOL", desc: "Những thay đổi về meta và chiến thuật cấm chọn.", url: "news.html", keywords: "chung ket the gioi lol cktg tin tuc meta" },
    { title: "Bản cập nhật đặc vụ mới Valorant", category: "Tin tức • Valorant", desc: "Nhà phát triển chính thức hé lộ kỹ năng của đặc vụ mới.", url: "news.html", keywords: "valorant dac vu moi cap nhat patch" },
    { title: "Lịch thi đấu: T1 vs Gen.G Esports (LCK Cup)", category: "Lịch thi đấu • 17:00 Hôm nay", desc: "Trận đại chiến tâm điểm LCK Cup đang diễn ra.", url: "index.html", keywords: "lich thi dau t1 geng lck" },
    { title: "Lịch thi đấu: Paper Rex vs DRX (VCT Pacific)", category: "Lịch thi đấu • 19:30 Hôm nay", desc: "Đại chiến khu vực Thái Bình Dương Valorant.", url: "index.html", keywords: "lich thi dau paper rex drx vct valorant" },
    { title: "Áo Đấu Pro Jersey 2026 - 450.000 đ", category: "Cửa hàng • Trang phục", desc: "Thun mè cao cấp thoát mồ hôi (Size S - XXL).", url: "store.html", keywords: "ao dau jersey 2026 quan ao t1 cua hang" },
    { title: "Balo Gaming Thể Thao Chống Nước - 790.000 đ", category: "Cửa hàng • Balo", desc: "Đựng vừa laptop 17.3 inch, vải Oxford trượt nước.", url: "store.html", keywords: "balo gaming chong nuoc laptop" },
    { title: "Lót Chuột Gaming Khổ Lớn LED RGB - 220.000 đ", category: "Cửa hàng • Phụ kiện", desc: "Kích thước 800x300x4mm, 14 chế độ sáng RGB.", url: "store.html", keywords: "lot chuot mousepad rgb gear" },
    { title: "Vô Cực Kiếm (+80 AD, +25% Chí Mạng)", category: "Wiki • Trang bị LOL", desc: "Giá: 3400 Vàng - Trang bị tăng sát thương chí mạng.", url: "wiki.html?game=lol&type=equipment", keywords: "vo cuc kiem infinity edge trang bi lol wiki" },
    { title: "Ahri - Hồ Ly Chín Đuôi", category: "Wiki • Tướng LOL", desc: "Pháp Sư / Sát Thủ đường giữa với độ cơ động cao và Hôn Gió.", url: "wiki.html?tab=lol-champ", keywords: "ahri ho ly chin duoi mid lol phap su tướng wiki" },
    { title: "Yasuo - Kẻ Bất Dung Thứ", category: "Wiki • Tướng LOL", desc: "Đấu Sĩ / Sát Thủ với Tường Gió và 100% tỷ lệ chí mạng từ nội tại.", url: "wiki.html?tab=lol-champ", keywords: "yasuo ke bat dung thu mid top lol dau si tuong gio wiki" },
    { title: "Florentino - Tay Kiếm Hào Hoa", category: "Wiki • Tướng Liên Quân", desc: "Đấu Sĩ đường Caesar với bộ combo nhặt hoa sát thương chuẩn.", url: "wiki.html?tab=lq-champ", keywords: "florentino tay kiem hao hoa nhat hoa lq lien quan wiki" },
    { title: "Nakroth - Lưỡi Đao Phán Xét", category: "Wiki • Tướng Liên Quân", desc: "Sát Thủ đi rừng cơ động bậc nhất với khả năng bắt chủ lực.", url: "wiki.html?tab=lq-champ", keywords: "nakroth luoi dao phan xet jungle rung lq lien quan wiki" },
    { title: "Thánh Kiếm (+110 Công VL, +25% Chí Mạng)", category: "Wiki • Trang bị Liên Quân", desc: "Giá: 2120 Vàng - Tăng 50% sát thương chí mạng.", url: "wiki.html?game=lq&type=equipment", keywords: "thanh kiem claves sancti trang bi lien quan lq wiki" },
    { title: "Alok (DJ Alok - Giai Điệu Sinh Mệnh)", category: "Wiki • Nhân vật Free Fire", desc: "Nhân vật tạo vòng hào quang hồi 5 HP/s và tăng 15% tốc chạy.", url: "wiki.html?tab=ff-char", keywords: "alok dj nhan vat free fire ff hoi mau toc do wiki" },
    { title: "Chrono (Hào Quang Hộ Mệnh)", category: "Wiki • Nhân vật Free Fire", desc: "Nhân vật tạo khiên trường lực chống chịu 800 sát thương trong 6s.", url: "wiki.html?tab=ff-char", keywords: "chrono cr7 nhan vat free fire ff khien chan wiki" },
    { title: "MP40 - Tiểu Liên Thần Tốc", category: "Wiki • Vũ khí Free Fire", desc: "Súng tiểu liên SMG cận chiến với tốc độ bắn 83 cao nhất game.", url: "wiki.html?game=ff&type=equipment", keywords: "mp40 tieu lien smg vu khi free fire ff wiki" },
    { title: "Vandal (Sát thương đầu: 160)", category: "Wiki • Vũ khí Valorant", desc: "Giá: 2900 Credits - Tốc độ bắn 9.75 v/s.", url: "wiki.html", keywords: "vandal sung valorant vu khi wiki" },
    { title: "Giả Lập Lên Đồ & Luyện Phản Xạ (Reflex Trainer)", category: "Phòng Tập Luyện", desc: "Thử nghiệm build đồ MOBA và test tốc độ phản xạ.", url: "practice.html", keywords: "phong tap luyen phan xa aim reflex build do" },
    { title: "Tải Game Chính Thức (LOL, Valorant, Liên Quân)", category: "Tải Game", desc: "Link tải Riot Client, App Store & CH Play an toàn.", url: "downloads.html", keywords: "tai game download riot client lien quan valorant lol" },
    { title: "Giải Đấu Trực Tiếp LOL, Free Fire, Liên Quân", category: "Giải Đấu • Video Trực Tiếp", desc: "Xem video cập nhật trực tiếp các giải đấu LOL, Free Fire và Liên Quân Mobile.", url: "tournaments.html", keywords: "giai dau truc tiep video live lol free fire lien quan tournament apl aic dtdv ffws lck cktg" }
];

const searchResultPanel = document.createElement('div');
searchResultPanel.id = 'globalSearchResults';
searchResultPanel.className = 'global-search-results';
document.body.appendChild(searchResultPanel);

function executeGlobalSearch(rawQuery) {
    const query = rawQuery.trim();
    if (!query) {
        searchResultPanel.classList.remove('open');
        return;
    }

    const normQuery = normalizeText(query);
    const matches = siteSearchIndex.filter(item => {
        const haystack = normalizeText(`${item.title} ${item.category} ${item.desc} ${item.keywords}`);
        return haystack.includes(normQuery);
    });

    if (matches.length === 0) {
        searchResultPanel.innerHTML = `
            <div class="search-res-header">
                <span>Kết quả cho "<strong>${query}</strong>"</span>
                <button type="button" onclick="document.getElementById('globalSearchResults').classList.remove('open')"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <p class="search-res-empty">Không tìm thấy nội dung phù hợp. Thử tìm: <em>Faker, Lai Bâng, Vandal, Áo đấu, Vô Cực Kiếm...</em></p>
        `;
    } else {
        searchResultPanel.innerHTML = `
            <div class="search-res-header">
                <span>Tìm thấy <strong>${matches.length}</strong> kết quả cho "<strong>${query}</strong>"</span>
                <button type="button" onclick="document.getElementById('globalSearchResults').classList.remove('open')"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="search-res-list">
                ${matches.map(m => `
                    <a href="${m.url}" class="search-res-item">
                        <span class="search-res-cat">${m.category}</span>
                        <h4>${m.title}</h4>
                        <p>${m.desc}</p>
                    </a>
                `).join('')}
            </div>
        `;
    }
    searchResultPanel.classList.add('open');
}

document.querySelectorAll('#globalSearch, .drawer-search input').forEach(input => {
    input.addEventListener('input', () => executeGlobalSearch(input.value));
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            executeGlobalSearch(input.value);
        }
    });
});

document.addEventListener('click', (e) => {
    const searchBox = document.getElementById('headerSearchBox');
    if (!searchResultPanel.contains(e.target) && (!searchBox || !searchBox.contains(e.target)) && !e.target.closest('.drawer-search')) {
        searchResultPanel.classList.remove('open');
    }
});

// --- 5. LỌC DANH SÁCH TUYỂN THỦ THEO TỰA GAME & ĐỌC THAM SỐ URL ---
const rosterContainer = document.getElementById('rosterContainer');
const rosterTabButtons = rosterContainer ? document.querySelectorAll('.game-tabs .tab-btn') : [];
const playerCards = document.querySelectorAll('#rosterContainer .player-card');

function filterRosterByGame(selectedGame) {
    rosterTabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-game') === selectedGame);
    });

    playerCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        card.style.display = (selectedGame === 'all' || cardCategory === selectedGame) ? 'block' : 'none';
    });
}

if (rosterTabButtons.length > 0 && playerCards.length > 0) {
    rosterTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedGame = button.getAttribute('data-game');
            filterRosterByGame(selectedGame);
            const newUrl = selectedGame === 'all' ? 'roster.html' : `roster.html?game=${selectedGame}`;
            window.history.replaceState(null, '', newUrl);
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const gameFromUrl = urlParams.get('game');
    if (gameFromUrl && document.querySelector(`.game-tabs .tab-btn[data-game="${gameFromUrl}"]`)) {
        filterRosterByGame(gameFromUrl);
    }

    document.querySelectorAll('.dropdown-menu a[href^="roster.html?game="], #drawerTeamSubmenu a[href^="roster.html?game="]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const url = new URL(link.href);
            const selectedGame = url.searchParams.get('game');
            if (selectedGame) {
                filterRosterByGame(selectedGame);
                window.history.replaceState(null, '', `roster.html?game=${selectedGame}`);
                if (typeof closeMobileDrawer === 'function') closeMobileDrawer();
            }
        });
    });

    // Gán sự kiện click cho các thẻ Wiki để mở modal chi tiết
    wikiCards.forEach(card => {
        card.addEventListener('click', () => {
            const wikiId = card.getAttribute('data-wiki-id');
            if (wikiId) openWikiModal(wikiId);
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const wikiId = card.getAttribute('data-wiki-id');
                if (wikiId) openWikiModal(wikiId);
            }
        });
    });

    const wikiModalCloseBtn = document.getElementById('wikiModalClose');
    const wikiModalOverlay = document.getElementById('wikiModalOverlay');
    if (wikiModalCloseBtn) {
        wikiModalCloseBtn.addEventListener('click', closeWikiModal);
    }
    if (wikiModalOverlay) {
        wikiModalOverlay.addEventListener('click', (e) => {
            if (e.target === wikiModalOverlay) closeWikiModal();
        });
    }

}

// --- 6. BỘ LỌC SẢN PHẨM TRANG CỬA HÀNG ---
const storeContainer = document.getElementById('storeContainer');
const storeFilterBtns = storeContainer ? document.querySelectorAll('.wiki-filter-bar .filter-btn') : [];
const storeCards = document.querySelectorAll('#storeContainer .wiki-card');

if (storeFilterBtns.length > 0 && storeCards.length > 0) {
    storeFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            storeFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterVal = btn.getAttribute('data-filter');

            storeCards.forEach(card => {
                const category = card.getAttribute('data-category');
                card.style.display = (filterVal === 'all' || category === filterVal) ? 'block' : 'none';
            });
        });
    });
}

// --- 7. TÍNH NĂNG THỬ NGHIỆM TRANG BỊ (ITEM BUILDER) ---
const itemSelectBtns = document.querySelectorAll('.item-select-btn');
const selectedItemsText = document.getElementById('selectedItemsText');
const totalADElem = document.getElementById('totalAD');
const totalCritElem = document.getElementById('totalCrit');
const totalGoldElem = document.getElementById('totalGold');
const resetItemsBtn = document.getElementById('resetItemsBtn');

let chosenItems = [];

if (itemSelectBtns.length > 0) {
    itemSelectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.getAttribute('data-name');
            const ad = parseInt(btn.getAttribute('data-ad'));
            const crit = parseInt(btn.getAttribute('data-crit'));
            const gold = parseInt(btn.getAttribute('data-gold'));

            chosenItems.push({ name, ad, crit, gold });
            updateItemStats();
        });
    });

    if (resetItemsBtn) {
        resetItemsBtn.addEventListener('click', () => {
            chosenItems = [];
            updateItemStats();
        });
    }
}

function updateItemStats() {
    if (!selectedItemsText) return;
    const isEn = getCurrentLang() === 'EN';
    const goldUnit = isEn ? ' Gold' : ' Vàng';

    if (chosenItems.length === 0) {
        selectedItemsText.textContent = isEn ? 'None' : 'Chưa có';
        totalADElem.textContent = '0';
        totalCritElem.textContent = '0%';
        totalGoldElem.textContent = '0' + goldUnit;
        return;
    }

    let names = chosenItems.map(i => getTranslatedText(i.name)).join(', ');
    let sumAD = chosenItems.reduce((acc, i) => acc + i.ad, 0);
    let sumCrit = chosenItems.reduce((acc, i) => acc + i.crit, 0);
    let sumGold = chosenItems.reduce((acc, i) => acc + i.gold, 0);

    selectedItemsText.textContent = names;
    totalADElem.textContent = '+' + sumAD;
    totalCritElem.textContent = sumCrit + '%';
    totalGoldElem.textContent = sumGold.toLocaleString() + goldUnit;
}

// --- 8. MINI-GAME LUYỆN PHẢN XẠ (REFLEX TRAINER) ---
const startReflexGameBtn = document.getElementById('startReflexGame');
const reflexScoreElem = document.getElementById('reflexScore');
const reflexTimerElem = document.getElementById('reflexTimer');
const reflexArena = document.getElementById('reflexArena');

let reflexScore = 0;
let reflexTimeLeft = 15;
let reflexInterval = null;
let targetTimeout = null;

if (startReflexGameBtn) {
    startReflexGameBtn.addEventListener('click', () => {
        clearInterval(reflexInterval);
        clearTimeout(targetTimeout);
        reflexArena.innerHTML = '';
        reflexScore = 0;
        reflexTimeLeft = 15;
        reflexScoreElem.textContent = reflexScore;
        reflexTimerElem.textContent = reflexTimeLeft;
        startReflexGameBtn.disabled = true;

        reflexInterval = setInterval(() => {
            reflexTimeLeft--;
            reflexTimerElem.textContent = reflexTimeLeft;
            if (reflexTimeLeft <= 0) {
                clearInterval(reflexInterval);
                clearTimeout(targetTimeout);
                const endText = getCurrentLang() === 'EN'
                    ? `Time's up! Your reflex score: ${reflexScore} 🎯`
                    : `Hết giờ! Điểm phản xạ của bạn: ${reflexScore} 🎯`;
                reflexArena.innerHTML = `<span style="color: #f59e0b; font-size: 1.3rem; font-weight: bold;">${endText}</span>`;
                startReflexGameBtn.disabled = false;
            }
        }, 1000);

        spawnTarget();
    });
}

function spawnTarget() {
    if (reflexTimeLeft <= 0) return;

    reflexArena.innerHTML = '';
    const target = document.createElement('div');
    target.style.width = '45px';
    target.style.height = '45px';
    target.style.background = '#ef4444';
    target.style.borderRadius = '50%';
    target.style.position = 'absolute';
    target.style.cursor = 'pointer';
    target.style.boxShadow = '0 0 15px #ef4444';

    const maxX = Math.max(0, reflexArena.clientWidth - 60);
    const maxY = Math.max(0, reflexArena.clientHeight - 60);
    target.style.left = Math.floor(Math.random() * maxX) + 'px';
    target.style.top = Math.floor(Math.random() * maxY) + 'px';

    target.addEventListener('click', () => {
        reflexScore++;
        reflexScoreElem.textContent = reflexScore;
        clearTimeout(targetTimeout);
        spawnTarget();
    });

    reflexArena.appendChild(target);
    targetTimeout = setTimeout(spawnTarget, 1000);
}

// --- 9. XỬ LÝ FORM ĐĂNG KÝ NHẬN TIN Ở FOOTER & CHẶN LINK RỖNG ---
const footerNewsletter = document.getElementById('footerNewsletter');
if (footerNewsletter) {
    footerNewsletter.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = footerNewsletter.querySelector('input[type="email"]');
        if (input && input.value.trim() !== '') {
            const email = input.value.trim();
            alert(getCurrentLang() === 'EN'
                ? `Thank you (${email}) for subscribing to Esports!`
                : `Cảm ơn bạn (${email}) đã đăng ký nhận tin từ Esports!`);
            input.value = '';
        }
    });
}

document.querySelectorAll('.footer-links a[href="#"], .social-icons a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert(getCurrentLang() === 'EN' ? 'This page is currently being updated!' : 'Nội dung này đang được cập nhật!');
    });
});

// --- 10. ĐIỀU KHIỂN MENU NGĂN KÉO MOBILE ---
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const drawerCloseBtn = document.getElementById('drawerCloseBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
const mobileOverlay = document.getElementById('mobileOverlay');
const drawerTeamBtn = document.getElementById('drawerTeamBtn');
const drawerTeamSubmenu = document.getElementById('drawerTeamSubmenu');

function openMobileDrawer() {
    if (mobileDrawer && mobileOverlay) {
        mobileDrawer.classList.add('open');
        mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileDrawer() {
    if (mobileDrawer && mobileOverlay) {
        mobileDrawer.classList.remove('open');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileDrawer);
if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMobileDrawer);
if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileDrawer);

if (drawerTeamBtn && drawerTeamSubmenu) {
    drawerTeamBtn.addEventListener('click', () => {
        drawerTeamBtn.classList.toggle('active');
        drawerTeamSubmenu.classList.toggle('open');
    });
}

// --- 11. BẬT/TẮT Ô TÌM KIẾM TỪ ICON KÍNH LÚP ---
const headerSearchBox = document.getElementById('headerSearchBox');
const searchToggleBtn = document.getElementById('searchToggleBtn');
const globalSearchInput = document.getElementById('globalSearch');

if (searchToggleBtn && headerSearchBox && globalSearchInput) {
    searchToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        headerSearchBox.classList.toggle('active');
        if (headerSearchBox.classList.contains('active')) {
            setTimeout(() => globalSearchInput.focus(), 50);
        }
    });

    globalSearchInput.addEventListener('click', (e) => e.stopPropagation());

    document.addEventListener('click', (e) => {
        if (!headerSearchBox.contains(e.target)) {
            headerSearchBox.classList.remove('active');
        }
    });
}

// --- 13. QUẢN LÝ GIỎ HÀNG ĐÃ THÊM ---
let esportsCart = JSON.parse(localStorage.getItem('esportsCart')) || [];

const cartBadge = document.getElementById('cartBadge');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');
const cartToggleBtn = document.getElementById('cartToggleBtn');
const cartCloseBtn = document.getElementById('cartCloseBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');

function closeCartDrawer() {
    if (cartDrawer) cartDrawer.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('open');
}

if (cartToggleBtn && cartDrawer && cartOverlay) {
    cartToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('open');
    });
}

if (cartCloseBtn) cartCloseBtn.addEventListener('click', (e) => { e.stopPropagation(); closeCartDrawer(); });
if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCartDrawer();
        document.getElementById('accountModal')?.classList.remove('open');
        document.getElementById('langMenu')?.classList.remove('open');
        if (typeof closeWikiModal === 'function') closeWikiModal();
    }
});

function getCurrentLang() {
    return localStorage.getItem('esportsLang') || 'VI';
}

function getTranslatedText(text) {
    const lang = getCurrentLang();
    if (lang === 'EN') return viToEnDict[text] || text;
    return enToViDict[text] || text;
}

function renderCart() {
    const lang = getCurrentLang();
    if (cartBadge) {
        cartBadge.textContent = esportsCart.reduce((sum, item) => sum + item.qty, 0);
    }
    if (!cartItemsList || !cartTotalPrice) return;

    if (esportsCart.length === 0) {
        const emptyMsg = lang === 'EN' ? 'Your cart is currently empty.' : 'Chưa có sản phẩm nào trong giỏ hàng.';
        cartItemsList.innerHTML = `<p class="empty-cart-msg">${emptyMsg}</p>`;
        cartTotalPrice.textContent = '0 đ';
        return;
    }

    let totalMoney = 0;
    cartItemsList.innerHTML = esportsCart.map((item, idx) => {
        totalMoney += item.price * item.qty;
        const displayName = getTranslatedText(item.name);
        const removeTitle = lang === 'EN' ? 'Remove' : 'Xóa';
        return `
            <div class="cart-item-row">
                <div class="cart-item-info">
                    <h5>${displayName}</h5>
                    <div class="cart-item-meta">
                        <span>${(item.price * item.qty).toLocaleString('vi-VN')} đ</span>
                        <div class="cart-qty-controls">
                            <button type="button" class="cart-qty-btn" onclick="updateCartQty(${idx}, -1)" aria-label="Giảm số lượng">−</button>
                            <span class="cart-qty-val">${item.qty}</span>
                            <button type="button" class="cart-qty-btn" onclick="updateCartQty(${idx}, 1)" aria-label="Tăng số lượng">+</button>
                        </div>
                    </div>
                </div>
                <button type="button" class="cart-remove-btn" onclick="removeCartItem(${idx})" title="${removeTitle}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    cartTotalPrice.textContent = totalMoney.toLocaleString('vi-VN') + ' đ';
}

window.updateCartQty = function(index, delta) {
    if (!esportsCart[index]) return;
    esportsCart[index].qty += delta;
    if (esportsCart[index].qty <= 0) {
        esportsCart.splice(index, 1); // Nếu giảm về 0 thì tự động xóa khỏi giỏ
    }
    localStorage.setItem('esportsCart', JSON.stringify(esportsCart));
    renderCart();
};

window.addToCart = function(name, price) {
    const baseName = enToViDict[name] || name;
    const existing = esportsCart.find(i => i.name === baseName);
    if (existing) {
        existing.qty += 1;
    } else {
        esportsCart.push({ name: baseName, price, qty: 1 });
    }
    localStorage.setItem('esportsCart', JSON.stringify(esportsCart));
    renderCart();

    if (cartDrawer && cartOverlay) {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('open');
    }
};

window.removeCartItem = function(index) {
    esportsCart.splice(index, 1);
    localStorage.setItem('esportsCart', JSON.stringify(esportsCart));
    renderCart();
};

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        const lang = getCurrentLang();
        if (esportsCart.length === 0) {
            alert(lang === 'EN' ? 'Your cart is empty!' : 'Giỏ hàng của bạn đang trống!');
            return;
        }
        alert(lang === 'EN'
            ? 'Order placed successfully! Thank you for supporting Esports Store.'
            : 'Đặt hàng thành công! Cảm ơn bạn đã ủng hộ Esports Store.');
        esportsCart = [];
        localStorage.removeItem('esportsCart');
        renderCart();
        closeCartDrawer();
    });
}

// --- 14. CHỌN NGÔN NGỮ & DỊCH TOÀN TRANG 2 CHIỀU CHUẨN ---
const langToggleBtn = document.getElementById('langToggleBtn');
const langMenu = document.getElementById('langMenu');
const langOptions = document.querySelectorAll('.lang-option');

// Bổ sung sự kiện mở/đóng menu ngôn ngữ (đã bị thiếu ở bản cũ)
if (langToggleBtn && langMenu) {
    langToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!langMenu.contains(e.target) && !langToggleBtn.contains(e.target)) {
            langMenu.classList.remove('open');
        }
    });
}

const viToEnDict = {
    "Trang Chủ": "Home",
    "Tin Tức": "News",
    "Đội Tuyển": "Teams",
    "Việt Nam": "Vietnam",
    "Quốc Tế": "International",
    "Cửa hàng": "Store",
    "Cửa Hàng": "Store",
    "Wiki & Thông Số": "Wiki & Stats",
    "Giải Đấu": "Tournaments",
    "Phòng Tập Luyện": "Training Room",
    "Tải Game": "Download",
    "Giỏ Hàng Của Bạn": "Your Cart",
    "Chưa có sản phẩm nào trong giỏ hàng.": "Your cart is currently empty.",
    "Tổng cộng:": "Total:",
    "Thanh Toán Ngay": "Checkout Now",
    "Đăng Nhập Esports ID": "Sign In to Esports ID",
    "Đăng Ký Esports ID": "Register Esports ID",
    "Đồng bộ giỏ hàng, lịch thi đấu và thành tích luyện tập": "Sync your cart, match schedules, and training stats",
    "Đăng Nhập": "Sign In",
    "Tạo Tài Khoản": "Create Account",
    "Chưa có tài khoản?": "Don't have an account?",
    "Đăng ký ngay": "Sign up now",
    "Đăng nhập ngay": "Sign in now",
    "CHÀO MỪNG ĐẾN VỚI ESPORTS": "WELCOME TO ESPORTS",
    "CỔNG THÔNG TIN THỂ THAO ĐIỆN TỬ HÀNG ĐẦU": "PREMIER ESPORTS INFORMATION PORTAL",
    "Nơi cập nhật toàn diện tin tức, lịch thi đấu, hồ sơ tuyển thủ và thông số trang bị chuẩn xác cho cộng đồng game thủ.": "Your comprehensive hub for esports news, match schedules, pro player profiles, and accurate gear stats.",
    "Xem Tin Tức": "Read News",
    "Tra Cứu Wiki": "Explore Wiki",
    "Xem Trực Tiếp Giải Đấu": "Watch Live Tournaments",
    "Lịch Thi Đấu Tâm Điểm": "Featured Match Schedule",
    "Các trận đấu hấp dẫn diễn ra trong tuần": "Exciting matches taking place this week",
    "17:00 - Hôm nay": "17:00 - Today",
    "19:30 - Hôm nay": "19:30 - Today",
    "Đang diễn ra": "LIVE",
    "Sắp diễn ra": "Upcoming",
    "Bản Tin Esports Mới Nhất": "Latest Esports News",
    "Tổng hợp mọi diễn biến nóng hổi từ các giải đấu chuyên nghiệp": "All the hottest updates from professional tournaments",
    "Chung kết thế giới LOL: Đội tuyển hạt giống số 1 chốt đội hình": "LoL Worlds: Top-Seeded Team Finalizes Starting Roster",
    "Những thay đổi về meta và chiến thuật cấm chọn hứa hẹn loạt trận bùng nổ...": "Meta shifts and draft strategies promise an explosive series of matches...",
    "Bản cập nhật đặc vụ mới Valorant: Sức mạnh đảo lộn bảng đấu": "New Valorant Agent Patch: Game-Changing Abilities Shake Up the Bracket",
    "Nhà phát triển chính thức hé lộ kỹ năng của đặc vụ khởi tranh mùa giải mới...": "Developers officially reveal the abilities of the newest season-opening agent...",
    "Đọc thêm": "Read more",
    "Đội Hình & Ngôi Sao Tuyển Thủ": "Rosters & Pro Players",
    "Hồ sơ chi tiết các vận động viên chuyên nghiệp hàng đầu": "Detailed profiles of top professional esports athletes",
    "Tất Cả": "All",
    "Đường Giữa huyền thoại với 5 chức vô địch CKTG thế giới.": "Legendary Mid Laner with 5 World Championship titles.",
    "Tuyển thủ đi rừng hàng đầu với bể tướng rộng và những pha xử lý đột biến.": "Top-tier Jungler known for a deep champion pool and clutch plays.",
    "Chuyên gia căn góc súng và giao tranh tầm trung xuất sắc.": "Master of crosshair placement and mid-range gunfights.",
    "Bậc thầy dùng súng trường với độ chính xác tuyệt đối.": "Rifle specialist with pinpoint mechanical accuracy.",
    "Cửa Hàng Đồ Lưu Niệm & Gear": "Merchandise & Gaming Gear Store",
    "Sở hữu ngay trang phục thi đấu chính hãng và balo gaming đẳng cấp": "Get official team jerseys and premium gaming backpacks",
    "Tất Cả Sản Phẩm": "All Products",
    "Áo Đấu Chính Thức": "Official Jerseys",
    "Balo Gaming": "Gaming Backpacks",
    "Phụ Kiện & Khác": "Accessories & More",
    "Áo Đấu Pro Jersey 2026": "Pro Jersey 2026",
    "Chất liệu:": "Material:",
    "Thun mè cao cấp thoát mồ hôi": "Premium breathable athletic mesh",
    "Kích cỡ (Size):": "Sizes:",
    "Giá bán:": "Price:",
    "Balo Gaming Thể Thao Chống Nước": "Waterproof Pro Gaming Backpack",
    "Ngăn chứa:": "Capacity:",
    "Đựng vừa laptop 17.3 inch": "Fits up to 17.3-inch laptops",
    "Vải Oxford trượt nước cao cấp": "High-density water-repellent Oxford fabric",
    "Lót Chuột Gaming Khổ Lớn LED RGB": "Extended RGB Gaming Mousepad",
    "Kích thước:": "Dimensions:",
    "Hiệu ứng:": "Lighting:",
    "14 chế độ sáng RGB viền": "14 edge RGB lighting modes",
    "Thêm Vào Giỏ": "Add to Cart",
    "Thư Viện Wiki & Thông Số": "Wiki & Stats Library",
    "Tra cứu nhanh chỉ số trang bị MOBA và vũ khí FPS chính xác": "Quick lookup for accurate MOBA item stats and FPS weapons",
    "Tra cứu hồ sơ tướng, nhân vật, bảng chỉ số trang bị và vũ khí chuẩn xác nhất": "Lookup champions, characters, gear stats, and weapons with ultimate accuracy",
    "Tất Cả Tựa Game": "All Games",
    "Tất Cả Mục": "All Items",
    "Tướng & Nhân Vật": "Champions & Characters",
    "Trang Bị & Vũ Khí": "Equipment & Weapons",
    "Tướng": "Champion",
    "Nhân Vật": "Character",
    "Trang Bị": "Item",
    "Vũ Khí": "Weapon",
    "Đang hiển thị:": "Displaying:",
    "mục": "items",
    "Trang Bị MOBA": "MOBA Items",
    "Vũ Khí FPS": "FPS Weapons",
    "Vô Cực Kiếm": "Infinity Edge",
    "Sức mạnh công kích:": "Attack Damage:",
    "Tỷ lệ chí mạng:": "Critical Strike Chance:",
    "Giá tiền:": "Cost:",
    "3400 Vàng": "3400 Gold",
    "Sát thương đầu:": "Headshot Damage:",
    "160 (1 viên chết)": "160 (One-tap kill)",
    "Tốc độ bắn:": "Fire Rate:",
    "9.75 v/s": "9.75 rds/sec",
    "Phòng Thí Nghiệm & Luyện Kỹ Năng": "Sandbox & Skill Training Lab",
    "Trải nghiệm tính toán trang bị MOBA và luyện tập phản xạ game thủ chuyên nghiệp": "Experiment with MOBA item builds and train pro-level reflexes",
    "1. Giả Lập Lên Đồ & Tính Chỉ Số (MOBA Sandbox)": "1. Item Build & Stat Simulator (MOBA Sandbox)",
    "Click chọn các trang bị bên dưới để kiểm tra tổng chỉ số nhận được:": "Click items below to calculate total bonus stats:",
    "Kho Trang Bị Có Sẵn": "Available Item Pool",
    "⚔️ Vô Cực Kiếm (+80 AD, +25% Chí Mạng) - 3400 Vàng": "⚔️ Infinity Edge (+80 AD, +25% Crit) - 3400 Gold",
    "🗡️ Thánh Kiếm (+110 AD, +25% Chí Mạng) - 2120 Vàng": "🗡️ Claves Sancti (+110 AD, +25% Crit) - 2120 Gold",
    "⚡ Kiếm Điện (+40 AD, +20% Chí Mạng) - 2600 Vàng": "⚡ Statikk Shiv (+40 AD, +20% Crit) - 2600 Gold",
    "Bảng Thống Kê Chỉ Số Tướng": "Champion Stats Summary",
    "Trang bị đã chọn:": "Selected Items:",
    "Chưa có": "None",
    "Tổng Sức Mạnh Công Kích (AD):": "Total Attack Damage (AD):",
    "Tổng Tỷ Lệ Chí Mạng:": "Total Critical Chance:",
    "Tổng Số Vàng Cần:": "Total Gold Required:",
    "0 Vàng": "0 Gold",
    "Làm Mới Build Đồ": "Reset Build",
    "2. Trò Chơi Luyện Phản Xạ Game Thủ (Reflex Trainer)": "2. Pro Reflex & Aim Trainer",
    "Bắt Đầu Luyện Tập": "Start Training",
    "Điểm Số:": "Score:",
    "| Thời Gian:": "| Time:",
    "Nhấn \"Bắt Đầu Luyện Tập\" để thử thách phản xạ": "Click \"Start Training\" to test your reflexes",
    "Hướng Dẫn Tải Game Chính Thức": "Official Game Downloads",
    "Đường dẫn tải an toàn và chính thống từ nhà phát hành": "Safe and official download links directly from publishers",
    "Nền tảng: PC Windows / macOS": "Platform: PC Windows / macOS",
    "Nền tảng: PC Windows": "Platform: PC Windows",
    "Nền tảng: Android / iOS": "Platform: Android / iOS",
    "Tải Riot Client": "Download Riot Client",
    "Tải App Store / CH Play": "Download on App Store / Google Play",
    "CÔNG TY TNHH ESPORTS VIỆT NAM": "ESPORTS VIETNAM CO., LTD",
    "Việt Nam:": "Vietnam:",
    "Học Viện Công Nghệ Bưu chính viễn thông": "Posts and Telecommunications Institute of Technology (PTIT)",
    "Số điện thoại:": "Phone:",
    "Về Chúng Tôi": "About Us",
    "Giới thiệu": "Introduction",
    "Đội ngũ tuyển thủ": "Pro Roster",
    "Tin tức sự kiện": "News & Events",
    "Hợp tác tài trợ": "Sponsorships",
    "Hỗ Trợ Khách Hàng": "Customer Support",
    "Hướng dẫn chọn size": "Size Guide",
    "Chính sách đổi trả": "Return Policy",
    "Chính sách bảo mật": "Privacy Policy",
    "Hướng dẫn mua hàng": "Shopping Guide",
    "Chính sách kiểm hàng": "Inspection Policy",
    "Hướng dẫn thanh toán": "Payment Guide",
    "Chính sách vận chuyển": "Shipping Policy",
    "Đăng Ký Nhận Tin": "Newsletter",
    "Bạn có muốn nhận khuyến mãi đặc biệt và tin tức giải đấu? Đăng ký ngay.": "Want exclusive promotions and tournament updates? Subscribe now.",
    "Đăng ký": "Subscribe",
    "© Bản quyền thuộc về Esports | MST 0317627061 | Thiết kế chuyên nghiệp": "© Copyright by Esports | Tax ID 0317627061 | Professional Design"
};

const enToViDict = Object.fromEntries(
    Object.entries(viToEnDict).map(([vi, en]) => [en, vi])
);

const placeholderViToEn = {
    "Tìm kiếm...": "Search...",
    "Tìm kiếm tên tướng, nhân vật, trang bị, vũ khí, chỉ số...": "Search champion, character, item, weapon, stats...",
    "Nhập địa chỉ email...": "Enter your email...",
    "Lọc tên trang bị / súng...": "Filter item / weapon name...",
    "Tên đăng nhập hoặc Email": "Username or Email",
    "Mật khẩu": "Password"
};

const placeholderEnToVi = Object.fromEntries(
    Object.entries(placeholderViToEn).map(([vi, en]) => [en, vi])
);

function applyPageLanguage(lang) {
    const dict = lang === 'EN' ? viToEnDict : enToViDict;
    const phDict = lang === 'EN' ? placeholderViToEn : placeholderEnToVi;
    document.documentElement.lang = lang.toLowerCase();

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while ((node = walker.nextNode())) {
        const rawText = node.nodeValue;
        const trimmed = rawText.trim();
        if (trimmed && dict[trimmed]) {
            node.nodeValue = rawText.replace(trimmed, dict[trimmed]);
        }
    }

    document.querySelectorAll('input[placeholder]').forEach(input => {
        const currentPh = input.getAttribute('placeholder');
        if (phDict[currentPh]) {
            input.setAttribute('placeholder', phDict[currentPh]);
        }
    });

    renderCart();
    updateItemStats();

    langOptions.forEach(opt => {
        opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });
}

langOptions.forEach(opt => {
    opt.addEventListener('click', () => {
        const chosenLang = opt.getAttribute('data-lang');
        localStorage.setItem('esportsLang', chosenLang);
        applyPageLanguage(chosenLang);
        langMenu?.classList.remove('open');
    });
});

const savedLang = localStorage.getItem('esportsLang') || 'VI';
if (savedLang === 'EN') {
    applyPageLanguage('EN');
} else {
    renderCart();
}
// --- 15. LUỒNG ĐĂNG KÝ RIÊNG & QUAY VỀ TRANG CHỦ ĐĂNG NHẬP ---
const accountToggleBtn = document.getElementById('accountToggleBtn');
const accountModal = document.getElementById('accountModal');
const accountForm = document.getElementById('accountForm');
const accountCloseBtn = document.getElementById('accountCloseBtn');
const toggleAuthMode = document.getElementById('toggleAuthMode');

function getSavedAccounts() {
    return JSON.parse(localStorage.getItem('esportsAccounts')) || [];
}

function setSavedAccounts(list) {
    localStorage.setItem('esportsAccounts', JSON.stringify(list));
}

function updateHeaderAccountState() {
    const currentUser = localStorage.getItem('esportsUser');
    if (!accountToggleBtn) return;
    if (currentUser) {
        accountToggleBtn.classList.add('logged-in');
        accountToggleBtn.title = `Đang đăng nhập: ${currentUser}`;
    } else {
        accountToggleBtn.classList.remove('logged-in');
        accountToggleBtn.title = 'Tài khoản';
    }
}
// 1. Bấm "Đăng ký ngay" / "Tạo tài khoản ngay" -> Chỉ mở riêng bảng Tạo Tài Khoản
const switchRegisterLink = document.querySelector('#accountModal .account-switch a');
if (switchRegisterLink) {
    switchRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'account.html?mode=register';
    });
}

// Ẩn khung "Tài Khoản Đã Lưu" và căn giữa bảng Tạo Tài Khoản khi đi từ nút Đăng ký ngay
(function applyRegisterOnlyView() {
    const params = new URLSearchParams(window.location.search);
    const managerGrid = document.querySelector('.account-manager-grid');
    if (params.get('mode') === 'register' && managerGrid) {
        managerGrid.classList.add('register-only');
    }
})();
// 2. Mở modal đăng nhập khi bấm icon User trên Header
if (accountToggleBtn && accountModal) {
    accountToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const currentUser = localStorage.getItem('esportsUser');
        if (currentUser) {
            if (confirm(`Xin chào ${currentUser}! Bạn có muốn đăng xuất không?\n(Bấm Cancel để vào trang Quản lý tài khoản)`)) {
                localStorage.removeItem('esportsUser');
                updateHeaderAccountState();
                renderSavedAccounts();
            } else {
                window.location.href = 'account.html';
            }
        } else {
            accountModal.classList.add('open');
        }
    });
}

if (accountCloseBtn && accountModal) {
    accountCloseBtn.addEventListener('click', () => accountModal.classList.remove('open'));
    accountModal.addEventListener('click', (e) => {
        if (e.target === accountModal) accountModal.classList.remove('open');
    });
}

// 3. Xử lý Đăng nhập trong Modal (đối chiếu với tài khoản đã đăng ký)
if (accountForm) {
    accountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const loginId = document.getElementById('accountUsername').value.trim();
        const password = document.getElementById('accountPassword').value;
        const accounts = getSavedAccounts();

        if (accounts.length === 0) {
            if (confirm('Chưa có tài khoản nào được đăng ký! Chuyển sang trang Đăng ký ngay?')) {
                window.location.href = 'account.html';
            }
            return;
        }

        const matched = accounts.find(
            acc => (acc.username.toLowerCase() === loginId.toLowerCase() || acc.email.toLowerCase() === loginId.toLowerCase()) && acc.password === password
        );

        if (!matched) {
            alert('Sai tên đăng nhập/email hoặc mật khẩu! Vui lòng kiểm tra lại.');
            return;
        }

        localStorage.setItem('esportsUser', matched.username);
        accountModal.classList.remove('open');
        updateHeaderAccountState();
        renderSavedAccounts();
    });
}

// 4. Tự động mở khung Đăng Nhập tại Trang Chủ sau khi đăng ký xong
(function checkAutoOpenLoginAfterRegister() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('openLogin') === '1' && accountModal) {
        const registeredUser = params.get('user') || '';
        const usernameInput = document.getElementById('accountUsername');
        const passwordInput = document.getElementById('accountPassword');

        accountModal.classList.add('open');
        if (usernameInput && registeredUser) {
            usernameInput.value = registeredUser;
        }
        if (passwordInput) {
            setTimeout(() => passwordInput.focus(), 100);
        }

        // Xóa tham số trên thanh URL cho gọn sau khi đã mở modal
        window.history.replaceState(null, '', window.location.pathname);
    }
})();

// 5. Xử lý Form Đăng Ký & Quản Lý Tài Khoản trên trang account.html
const createAccountForm = document.getElementById('createAccountForm');
const createAccountMsg = document.getElementById('createAccountMsg');
const savedAccountsList = document.getElementById('savedAccountsList');
const savedAccountCount = document.getElementById('savedAccountCount');
const activeSessionBanner = document.getElementById('activeSessionBanner');
const clearAllAccountsBtn = document.getElementById('clearAllAccountsBtn');

if (createAccountForm) {
    createAccountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('regUsername').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const favoriteGame = document.getElementById('regFavoriteGame').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;

        if (password !== confirmPassword) {
            createAccountMsg.style.color = '#ef4444';
            createAccountMsg.textContent = 'Mật khẩu xác nhận không khớp!';
            return;
        }

        const accounts = getSavedAccounts();
        const isDuplicate = accounts.some(
            acc => acc.username.toLowerCase() === username.toLowerCase() || acc.email.toLowerCase() === email.toLowerCase()
        );

        if (isDuplicate) {
            createAccountMsg.style.color = '#ef4444';
            createAccountMsg.textContent = 'Tên đăng nhập hoặc Email này đã tồn tại!';
            return;
        }

        const newAccount = {
            id: Date.now(),
            username,
            email,
            favoriteGame,
            password,
            createdAt: new Date().toLocaleDateString('vi-VN')
        };

        accounts.push(newAccount);
        setSavedAccounts(accounts);

        createAccountForm.reset();
        renderSavedAccounts();

        // Hiện thông báo "Đã xong" ngay trong màn hình thay cho hộp thoại alert
        createAccountMsg.className = 'account-feedback-msg success';
        createAccountMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> Đã xong! Tài khoản "${username}" đã được lưu.`;

        // Chờ 1.2 giây để bạn nhìn thấy chữ "Đã xong" rồi tự về Trang Chủ đăng nhập
        setTimeout(() => {
            window.location.href = `index.html?openLogin=1&user=${encodeURIComponent(username)}`;
        }, 1200);
    });
}

function renderSavedAccounts() {
    if (!savedAccountsList) return;
    const accounts = getSavedAccounts();
    const currentUser = localStorage.getItem('esportsUser');

    if (savedAccountCount) {
        savedAccountCount.textContent = accounts.length;
    }

    if (activeSessionBanner) {
        if (currentUser) {
            activeSessionBanner.innerHTML = `
                <span>Đang đăng nhập: <strong>${currentUser}</strong></span>
                <button type="button" class="acc-btn-mini danger" onclick="logoutCurrentAccount()">Đăng xuất</button>
            `;
        } else {
            activeSessionBanner.innerHTML = `<span>Trạng thái: <strong>Chưa đăng nhập</strong></span>`;
        }
    }

    if (accounts.length === 0) {
        savedAccountsList.innerHTML = `<p class="empty-cart-msg">Chưa có tài khoản nào được lưu. Hãy tạo tài khoản ở khung bên cạnh!</p>`;
        return;
    }

    savedAccountsList.innerHTML = accounts.map(acc => {
        const isCurrent = currentUser === acc.username;
        const initial = acc.username.charAt(0).toUpperCase();
        return `
            <div class="saved-account-item ${isCurrent ? 'is-current' : ''}">
                <div class="acc-item-left">
                    <div class="acc-avatar-badge">${initial}</div>
                    <div class="acc-item-meta">
                        <h4>
                            ${acc.username}
                            ${isCurrent ? '<span class="acc-current-tag">Đang dùng</span>' : ''}
                        </h4>
                        <p>${acc.email} • ${acc.favoriteGame}</p>
                        <p style="font-size: 0.75rem; color: #64748b;">Ngày tạo: ${acc.createdAt}</p>
                    </div>
                </div>
                <div class="acc-item-actions">
                    ${!isCurrent ? `<button type="button" class="acc-btn-mini" onclick="switchAccount(${acc.id})">Đăng nhập</button>` : ''}
                    <button type="button" class="acc-btn-mini" onclick="changeAccountPassword(${acc.id})" title="Đổi mật khẩu">
                        <i class="fa-solid fa-key"></i>
                    </button>
                    <button type="button" class="acc-btn-mini danger" onclick="deleteSavedAccount(${acc.id})" title="Xóa tài khoản">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

window.switchAccount = function(id) {
    const accounts = getSavedAccounts();
    const target = accounts.find(acc => acc.id === id);
    if (!target) return;
    localStorage.setItem('esportsUser', target.username);
    updateHeaderAccountState();
    renderSavedAccounts();
};

window.logoutCurrentAccount = function() {
    localStorage.removeItem('esportsUser');
    updateHeaderAccountState();
    renderSavedAccounts();
};

window.changeAccountPassword = function(id) {
    const accounts = getSavedAccounts();
    const target = accounts.find(acc => acc.id === id);
    if (!target) return;

    const newPass = prompt(`Nhập mật khẩu mới cho tài khoản "${target.username}" (tối thiểu 4 ký tự):`);
    if (newPass === null) return;
    if (newPass.trim().length < 4) {
        alert('Mật khẩu phải có ít nhất 4 ký tự!');
        return;
    }
    target.password = newPass.trim();
    setSavedAccounts(accounts);
    alert(`Đã cập nhật mật khẩu mới cho "${target.username}"!`);
};

window.deleteSavedAccount = function(id) {
    const accounts = getSavedAccounts();
    const target = accounts.find(acc => acc.id === id);
    if (!target) return;

    if (!confirm(`Bạn có chắc muốn xóa vĩnh viễn tài khoản "${target.username}"?`)) return;

    const updated = accounts.filter(acc => acc.id !== id);
    setSavedAccounts(updated);

    if (localStorage.getItem('esportsUser') === target.username) {
        localStorage.removeItem('esportsUser');
    }
    updateHeaderAccountState();
    renderSavedAccounts();
};

if (clearAllAccountsBtn) {
    clearAllAccountsBtn.addEventListener('click', () => {
        const accounts = getSavedAccounts();
        if (accounts.length === 0) {
            alert('Danh sách tài khoản đang trống!');
            return;
        }
        if (confirm('Xóa toàn bộ tài khoản đã lưu trên trình duyệt này?')) {
            localStorage.removeItem('esportsAccounts');
            localStorage.removeItem('esportsUser');
            updateHeaderAccountState();
            renderSavedAccounts();
        }
    });
}

updateHeaderAccountState();
renderSavedAccounts();