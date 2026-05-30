// تفعيل إضافة ScrollTrigger المرافقة لـ GSAP للحركات عند التمرير
gsap.registerPlugin(ScrollTrigger);

// -------------------------------------------------------------
// إعدادات الربط الخاصة بقاعدة بيانات Supabase (محدثة بروابطك)
// -------------------------------------------------------------
const SUPABASE_URL = 'https://whkpvjsbciqqmpvnfnij.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_DXwR5-E01sWlVBIVmaoVFQ_zzPlz1UT';

// (1) مصفوفة بيانات لوحات المتحف
const artworks = [
    {
        title_ar: "سيادةُ الألم", 
        title_en: "Reign Over Pain", 
        hours: "42",
        desc_ar: "هذه ليست لوحة ألم، بل لوحة امرأة واجهت وجعها ولم تنكسر. في عينيها أثر معركة، وفي ملامحها هدوء من عرف الألم وتجاوزه. الفراشات حولها ترمز لكل جزء تألّم ثم تحرر, ولكل ندبة تحوّلت إلى قوة. إنها امرأة لم يملكها الألم… بل جعلته جزءًا من نورها.",
        desc_en: "She is not made of pain— she is made of what survived it. Every butterfly is a wound turned into freedom. She did not break. She became light.",
        image: "https://i.postimg.cc/fLCgmPfh/Capture-d-e-cran-2026-04-30-a-8-12-23-PM.png"
    },
    {
        title_ar: "صوت خلف صمت", 
        title_en: "Voice Behind Silence", 
        hours: "62",
        desc_ar: "ليست هذه لوحة عن قناع… بل عن الحقيقة حين تتعب من الاختباء. وجه يبتسم للعالم، وآخر يبقى خلفه يحمل ما لم يُقل. في ملامحها صمت ثقيل، وفي عينيها صوت لا يخرج… لكنه حاضر. تحمل قناعها بيدٍ ثابتة، لا لتختبئ خلفه… بل لأنها تعرف تمامًا متى ترتديه ومتى تكشف ما وراءه. 'صوت خلف صمت' تحكي عن تلك المسافة بين ما نُظهره… وما نعيشه بصمت.",
        desc_en: "This is not a painting about a mask… but about the truth hidden behind it. One face meets the world, the other holds everything left unsaid. A silent expression with a voice that never disappeared.",
        image: "https://i.postimg.cc/fLCgmPfW/Capture-d-e-cran-2026-04-30-a-8-13-01-PM.png"
    },
    {
        title_ar: "لوحة نَذْر", 
        title_en: "The Vow", 
        hours: "22",
        desc_ar: "وجه هادئ يحمل عهدًا لا يُقال. في عينيها يقظة من عرف الثمن، وفي ملامحها صمت من اختار أن يواجه ظلّه بدل أن يهرب منه. هي ليست حكاية سقوط… بل حكاية قوّة وُلدت من العتمة، وصارت جزءًا منها دون أن تنتمي إليها.",
        desc_en: "A quiet face carrying an unspoken vow. In her eyes lives the awareness of someone who knows the cost, and in her silence, the strength of one who chose to face her shadow instead of running from it. This is not a story of falling but of power born from darkness.",
        image: "https://i.postimg.cc/pTC1zSJM/Capture-d-e-cran-2026-04-30-a-8-12-45-PM.png"
    },
    {
        title_ar: "تحت القمر… لا يولد الضعفاء ", 
        title_en: "Wol Gyeol — Beneath the Moon, the Weak Are Not Born", 
        hours: "17",
        desc_ar: "لم تولد في الضوء… بل في اللحظة التي صمت فيها القمر. تقف بهدوء لا يطلب الإذن ولا يخشى شيئًا، تحمل أسرارها كما لو أنها جزء من ليلها. في حضورها قوّة لا تحتاج إلى صوت، وفي نظرتها قرار لا يتراجع. هي لا تعلن الحرب… لكن كل شيء من حولها يعرف متى وصلت.",
        desc_en: "She was not born in sunlight, but in the moment the moon fell silent. She stands with a calm that asks for nothing and fears nothing, carrying her darkness like part of her own nature. Her power does not speak yet everything around her knows when she has arrived",
        image: "https://i.postimg.cc/sXsNBz7g/Capture-d-e-cran-2026-04-30-a-8-12-33-PM.png"
    }
];

let currentIndex = 0;
let currentLang = "ar";

const artImage = document.getElementById("art-image");
const artTitle = document.getElementById("art-title");
const artHours = document.getElementById("art-hours");
const artDesc = document.getElementById("art-desc");
const artFrame = document.getElementById("art-frame");

function updateArtwork(index, direction) {
    let xMove = direction === "next" ? -100 : 100;
    gsap.to(artFrame, {
        rotationY: direction === "next" ? -45 : 45, opacity: 0, x: xMove, duration: 0.4,
        onComplete: () => {
            const item = artworks[index];
            artImage.src = item.image;
            artTitle.innerText = currentLang === "ar" ? item.title_ar : item.title_en;
            artHours.innerText = item.hours;
            artDesc.innerText = currentLang === "ar" ? item.desc_ar : item.desc_en;
            gsap.fromTo(artFrame, 
                { rotationY: direction === "next" ? 45 : -45, opacity: 0, x: -xMove },
                { rotationY: 0, opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
            );
        }
    });
}

document.getElementById("next-btn").addEventListener("click", () => { currentIndex = (currentIndex + 1) % artworks.length; updateArtwork(currentIndex, "next"); });
document.getElementById("prev-btn").addEventListener("click", () => { currentIndex = (currentIndex - 1 + artworks.length) % artworks.length; updateArtwork(currentIndex, "prev"); });


// (2) برمجة تقليب صفحات الكتاب التفاعلي
const bookPages = Array.from(document.querySelectorAll('.page'));

bookPages.forEach((page, index) => {
    page.addEventListener('click', (e) => {
        e.stopPropagation(); 

        if (index === bookPages.length - 1 && page.classList.contains('flipped')) {
            bookPages.reverse().forEach((p, revIndex) => {
                setTimeout(() => {
                    p.classList.remove('flipped');
                    p.style.zIndex = revIndex + 1;
                }, revIndex * 150);
            });
            setTimeout(() => {
                bookPages.reverse();
            }, bookPages.length * 150);
        }
        else if (page.classList.contains('flipped')) {
            page.classList.remove('flipped');
            setTimeout(() => {
                page.style.zIndex = bookPages.length - index;
            }, 300);
        }
        else {
            page.classList.add('flipped');
            page.style.zIndex = 20 + index;
        }
    });
});


// (3) تأثيرات الانتقال والظهور التدريجي عند نزول الصفحة (Scroll Animations)
gsap.utils.toArray('.reveal-element').forEach(element => {
    gsap.fromTo(element, 
        { opacity: 0, y: 50 },
        {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse" 
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }
    );
});

gsap.utils.toArray('.gallery-item').forEach(item => {
    gsap.fromTo(item,
        { opacity: 0, y: 60 },
        {
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play reverse play reverse"
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out"
        }
    );
});

gsap.from(".gallery-item", {
    scrollTrigger: {
        trigger: "#portrait-gallery",
        start: "top 70%"
    },
    opacity: 0,
    y: 60,
    stagger: 0.1,
    duration: 0.8,
    ease: "power3.out"
});


// (4) برمجة النوافذ المنبثقة (Modals) للفورمات بنصف الشاشة
const bookModal = document.getElementById('book-modal');
const portraitModal = document.getElementById('portrait-modal');

document.getElementById('open-book-modal').addEventListener('click', () => {
    bookModal.classList.remove('hidden');
    gsap.fromTo('#book-modal-content', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
});
document.getElementById('close-book-modal').addEventListener('click', () => {
    gsap.to('#book-modal-content', { scale: 0.8, opacity: 0, duration: 0.3, onComplete: () => bookModal.classList.add('hidden') });
});

document.getElementById('open-portrait-modal').addEventListener('click', () => {
    portraitModal.classList.remove('hidden');
    gsap.fromTo('#portrait-modal-content', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
});
document.getElementById('close-portrait-modal').addEventListener('click', () => {
    gsap.to('#portrait-modal-content', { scale: 0.8, opacity: 0, duration: 0.3, onComplete: () => portraitModal.classList.add('hidden') });
});


// (5) أنظمة خطوات الفورمات الداخلية (Multi-Step Form Logic)
function nextStep(stepNumber) {
    if(stepNumber === 2 && !document.getElementById("cust-name").value) return alert("الرجاء إدخال الاسم أولاً");
    if(stepNumber === 3 && !document.getElementById("cust-contact").value) return alert("الرجاء إدخال وسيلة التواصل");
    document.querySelectorAll(".form-step").forEach(step => step.classList.add("hidden"));
    document.getElementById(`step-${stepNumber}`).classList.remove("hidden");
}
function prevStep(stepNumber) {
    document.querySelectorAll(".form-step").forEach(step => step.classList.add("hidden"));
    document.getElementById(`step-${stepNumber}`).classList.remove("hidden");
}

function nextBookStep(stepNumber) {
    if(stepNumber === 2 && !document.getElementById("book-cust-name").value) return alert("الرجاء إدخال الاسم أولاً");
    if(stepNumber === 3 && !document.getElementById("book-cust-email").value) return alert("الرجاء إدخال البريد الإلكتروني");
    document.querySelectorAll(".book-form-step").forEach(step => step.classList.add("hidden"));
    document.getElementById(`book-step-${stepNumber}`).classList.remove("hidden");
}
function prevBookStep(stepNumber) {
    document.querySelectorAll(".book-form-step").forEach(step => step.classList.add("hidden"));
    document.getElementById(`book-step-${stepNumber}`).classList.remove("hidden");
}

window.nextStep = nextStep; window.prevStep = prevStep;
window.nextBookStep = nextBookStep; window.prevBookStep = prevBookStep;


// (6) إرسال وحفظ الطلبات مباشرة بداخل جداول Supabase المطابقة للحساب 100%
document.getElementById("portrait-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const custName = document.getElementById("cust-name").value;
    const custContact = document.getElementById("cust-contact").value;
    const custCountry = document.getElementById("cust-country").value;
    const custDate = document.getElementById("cust-date").value; 

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/portrait_orders`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                name: custName,
                contact: custContact,
                country: custCountry,
                required_date: custDate || null, 
                status: "قيد الانتظار" 
            })
        });

        if (response.ok) {
            document.getElementById("portrait-form").classList.add("hidden");
            document.getElementById("success-msg").classList.remove("hidden");
        } else {
            alert("عذراً، حدث خطأ في إرسال طلبك إلى قاعدة البيانات.");
        }
    } catch (supaError) {
        console.error("Supabase Error:", supaError);
        alert("مشكلة في الاتصال بالشبكة.");
    }
});

document.getElementById("book-purchase-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const bookCustName = document.getElementById("book-cust-name").value;
    const bookCustEmail = document.getElementById("book-cust-email").value;
    const bookCustContact = document.getElementById("book-cust-contact").value;
    const bookCustCountry = document.getElementById("book-cust-country").value;

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/book_orders`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                name: bookCustName,
                email: bookCustEmail,
                contact: bookCustContact,
                country: bookCustCountry
            })
        });

        if (response.ok) {
            document.getElementById("book-purchase-form").classList.add("hidden");
            document.getElementById("book-success-msg").classList.remove("hidden");
        } else {
            alert("عذراً، حدث خطأ في إرسال طلبك إلى قاعدة البيانات.");
        }
    } catch (supaError) {
        console.error("Supabase Error:", supaError);
        alert("مشكلة في الاتصال بالشبكة.");
    }
});


// (7) قاموس الترجمات الموسّع للموقع بالكامل
const translations = {
    ar: {
        // شريط المهام (Navbar)
        navMuseum: "المتحف", navBook: "الكتاب", navArtist: "الفنانة", navPortraits: "البورتريهات",
        
        // قسم الكتاب
        bookSecTitle: "كتابي الرقمي", bookSecSubtitle: "تصفح الفصول الأولى مجاناً وعش التجربة قبل الشراء password: shawarma",
        bookTitle: "كتاب كن رسّامًا", bookPages: "📄 180 صفحة من الإلهام", bookDesc: "هذا الكتاب يأخذك في رحلة عميقة وراء الكواليس، حيث يمتزج الفن بالقصص، ويكشف لك أسرار بناء الهوية البصرية من الصفر.",
        downloadBtn: "قراءة النسخة التجريبية (PDF)", buyBtn: "شراء الكتاب الكامل",
        
        // قسم الفنانة (عني)
        aboutTitle: "وراء الفرشاة والخطوط",
        aboutSubtitle: "حيث يلتقي منطق الرياضيات بسحر الفن الواقعي",
        aboutShortDesc: '"أنا بلقيس بيداري (ويوي شارما)، طالبة رياضيات في الجامعة وفنانة بورتريه واقعي. لطالما آمنت أن الفن ليس مجرد نقل للملامح، بل هو التقاط للروح اللحظية المحفوظة خارج حدود الزمن. الرياضيات علمتني الهدوء الفكري، وأن لكل مشكلة حل؛ فبدل التسرع، أتعامل مع لوحاتي وقياساتي بدقة هندسية وصبر لا ينفد."',
        aboutBtn: "اكتشف قصة الفنانة وسيرتها الفنية كاملة 📜",
        
        // نافذة القصة المنبثقة (Story Modal)
        storyModalTitle: "القصة الكاملة والسيرة الفنية",
        storySection1Title: "📜 كيف بدأت الحكاية؟",
        storySection1Body: "بدأت رحلتي مع الرسم منذ طفولتي المبكرة، ولكن عند بلوغي الحادية عشرة من عمري، توقفت الفرشاة عن الحركة تماماً. مرت السنوات حتى وصلت لعمر الرابعة عشرة، حينما أعلنت المدرسة عن مسابقة رسم. هنا تدخل أصدقائي وألحّوا عليّ للمشاركة لعلمهم القديم بمهارتي. ورغم أنني لم أفز بتلك المسابقة، إلا أنها أشعلت الشرارة النائمة بداخلي مجدداً. عدت من بعدها بشغف مضاعف، وبدأت ألتهم تقنيات رسم الوجوه وأتحدى نفسي يوماً بعد يوم، حتى وصلت لدرجة من الواقعية تجعل من الصعب التمييز بين اللوحة والصورة الحقيقية.",
        storySection2Title: "📐 فلسفة الرياضيات والفن",
        storySection2Body: "كطالبة في تخصص الرياضيات بجامعة باجي مختار، أجد أن هذا العلم الأكاديمي الصارم قد صقل طريقتي الفنية بشكل غير مباشر. الرياضيات علمتني العقلانية التامة والهدوء؛ علمتني أن لكل مشكلة حتماً حل. عندما أواجه تعقيداً في أبعاد البورتريه, بدل أن أغضب أو أمزق الورقة، أتوقف، وأراجع قياساتي الرياضية بهدوء لأجد الخلل وأصلحه. الفن بالنسبة لي هو دمج بين انضباط العقل وعاطفة الروح. لوحتي 'سيادة الألم' تختزل فلسفتي الشخصية، فهي تجسد قدرة المرأة اللامتناهية على تحمل الوجع والوقوف في وجهه بكل شموخ، محولةً كل ندبة إلى نور خاص بها.",
        storySection3Title: "💼 الخبرات المهنية والإنجازات (CV)",
        
        // قسم معرض البورتريهات
        galleryTitle: "معرض لوحات البورتريه الخاص بي", gallerySubtitle: "حول صورك المفضلة إلى تحفة فنية مرسومة بعناية",
        openPortBtn: "اطلب بورتريهك الخاص الآن"
    },
    en: {
        // شريط المهام (Navbar)
        navMuseum: "Museum", navBook: "Book", navArtist: "The Artist", navPortraits: "Portraits",
        
        // قسم الكتاب
        bookSecTitle: "My Digital Book", bookSecSubtitle: "Browse the first chapters for free and live the experience before purchasing password: shawarma",
        bookTitle: "Be a Painter Book", bookPages: "📄 180 Pages of Inspiration", bookDesc: "This book takes you on a deep journey behind the scenes, where art blends with stories, revealing the secrets of building a visual identity from scratch.",
        downloadBtn: "Read Sample Version (PDF)", buyBtn: "Buy Full Book",
        
        // قسم الفنانة (عني)
        aboutTitle: "Behind the Brush & Lines",
        aboutSubtitle: "Where Mathematical Logic Meets the Magic of Realism",
        aboutShortDesc: '"I am Belkais Bidari (Wiwi Sharma), a university mathematics student and a realistic portrait artist. I have always believed that art is not just about copying features, but rather capturing the momentary soul preserved outside the boundaries of time. Mathematics taught me intellectual calmness and that every problem has a solution; instead of rushing, I deal with my paintings and measurements with geometric precision and endless patience."',
        aboutBtn: "Discover the Artist's Story & Full CV 📜",
        
        // نافذة القصة المنبثقة (Story Modal)
        storyModalTitle: "Full Story & Artistic Biography",
        storySection1Title: "📜 How Did the Story Begin?",
        storySection1Body: "My journey with drawing began in my early childhood, but when I reached eleven years old, the brush stopped moving completely. Years passed until I turned fourteen, when the school announced a drawing competition. Here my friends stepped in and urged me to participate, knowing my talent. Although I did not win that competition, it reignited the sleeping spark within me. I came back with a double passion, and began to devour portrait techniques and challenge myself day after day, until I reached a degree of realism that makes it difficult to distinguish between the drawing and the real photograph.",
        storySection2Title: "📐 Philosophy of Mathematics & Art",
        storySection2Body: "As a mathematics student at Badji Mokhtar University, I find that this rigorous academic science has shaped my artistic approach indirectly. Mathematics taught me utter rationality and calmness; it taught me that every problem definitely has a solution. When I face a complexity in the dimensions of a portrait, instead of getting angry or tearing up the paper, I stop and review my mathematical measurements calmly to find the flaw and fix it. For me, art is a fusion of mental discipline and soul emotion. My painting 'The Sovereignty of Pain' encapsulates my personal philosophy, embodying a woman's infinite capacity to endure pain and stand tall in the face of it, turning every scar into her own light.",
        storySection3Title: "💼 Professional Experience & Achievements (CV)",
        
        // قسم معرض البورتريهات
        galleryTitle: "My Custom Portrait Gallery", gallerySubtitle: "Turn your favorite pictures into a carefully crafted masterpiece",
        openPortBtn: "Order Your Custom Portrait Now"
    }
};

document.getElementById("lang-btn").addEventListener("click", () => {
    currentLang = currentLang === "ar" ? "en" : "ar";
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = currentLang;
    document.getElementById("lang-btn").innerText = currentLang === "ar" ? "EN" : "AR";
    
    const item = artworks[currentIndex];
    artTitle.innerText = currentLang === "ar" ? item.title_ar : item.title_en;
    artDesc.innerText = currentLang === "ar" ? item.desc_ar : item.desc_en;

    const t = translations[currentLang];
    
    // 1. ترجمة شريط المهام (Navbar Links)
    const navLinks = document.querySelectorAll("nav a");
    if(navLinks.length >= 4) {
        navLinks[0].innerText = t.navMuseum;
        navLinks[1].innerText = t.navBook;
        navLinks[2].innerText = t.navArtist;
        navLinks[3].innerText = t.navPortraits;
    }

    // 2. ترجمة قسم الكتاب بالكامل
    document.getElementById("book-section-title").innerText = t.bookSecTitle;
    document.getElementById("book-section-subtitle").innerText = t.bookSecSubtitle;
    document.getElementById("book-title").innerText = t.bookTitle;
    document.getElementById("book-pages-count").innerText = t.bookPages;
    document.getElementById("book-desc").innerText = t.bookDesc;
    document.getElementById("download-sample-btn").innerText = t.downloadBtn;
    
    const buyBookButton = document.getElementById("open-book-modal");
    if (buyBookButton) buyBookButton.innerText = t.buyBtn;
    
    // 3. ترجمة قسم الفنانة الجديد (عني)
    const aboutHeader = document.querySelector("#about-artist h2");
    const aboutSub = document.querySelector("#about-artist p");
    const aboutDescDiv = document.querySelector("#about-artist .max-w-2xl");
    const openStoryBtn = document.getElementById('open-story-modal');
    
    if (aboutHeader) aboutHeader.innerText = t.aboutTitle;
    if (aboutSub) aboutSub.innerText = t.aboutSubtitle;
    if (aboutDescDiv) aboutDescDiv.innerHTML = t.aboutShortDesc;
    if (openStoryBtn) openStoryBtn.innerText = t.aboutBtn;

    // 4. ترجمة النافذة المنبثقة للقصة (Story Modal) بالكامل واستهداف الفقرات بشكل صحيح ومضمون
    const storyModalHeader = document.querySelector("#story-modal h2");
    if (storyModalHeader) storyModalHeader.innerText = t.storyModalTitle;

    const titles = document.querySelectorAll("#story-modal h3");
    const paragraphs = document.querySelectorAll("#story-modal p");
    
    if (titles.length >= 3) {
        titles[0].innerText = t.storySection1Title;
        titles[1].innerText = t.storySection2Title;
        titles[2].innerText = t.storySection3Title;
    }
    
    // التعديل الجوهري هنا: استهداف الفقرة الثانية والثالثة مباشرة بدقة لمنع بقائهما بالعربية
    if (paragraphs.length >= 4) {
        paragraphs[2].innerText = t.storySection1Body; // فقرة: كيف بدأت الحكاية
        paragraphs[3].innerText = t.storySection2Body; // فقرة: فلسفة الرياضيات والفن
    } else if (paragraphs.length === 3) {
        paragraphs[1].innerText = t.storySection1Body;
        paragraphs[2].innerText = t.storySection2Body;
    }
    
    // ترجمة نقاط الـ CV بداخل المودال
    const cvLines = document.querySelectorAll("#story-modal ul li");
    if (cvLines.length >= 4) {
        if (currentLang === "en") {
            cvLines[0].innerHTML = `<span class='text-cream font-semibold'>Portrait Drawing Teacher (2021 - Present):</span> Providing intensive training programs for beginners to teach shading basics and dimensions.`;
            cvLines[1].innerHTML = `<span class='text-cream font-semibold'>Freelance Portrait Artist:</span> Completed over 150 custom realistic portrait paintings for clients worldwide.`;
            cvLines[2].innerHTML = `<span class='text-cream font-semibold'>Content Creator & Author:</span> Managing an art community of over 11k followers on Instagram, and published my own educational book to help artists maintain their passion and build daily drawing habits.`;
            cvLines[3].innerHTML = `<span class='text-cream font-semibold'>Art Exhibitions:</span> Participated in 6 group exhibitions and held 4 solo exhibitions to display my realistic artwork.`;
        } else {
            cvLines[0].innerHTML = `<span class='text-cream font-semibold'>مدرسة رسم بورتريه بالرصاص (منذ 2021 - حتى الآن):</span> تقديم برامج تدريبية ومكثفة للمبتدئين لتعليم أساسيات التظليل والأبعاد.`;
            cvLines[1].innerHTML = `<span class='text-cream font-semibold'>فنانة بورتريه مستقلة:</span> إنجاز أكثر من 150 لوحة بورتريه واقعية مخصصة لزبائن من مختلف الأماكن.`;
            cvLines[2].innerHTML = `<span class='text-cream font-semibold'>صانعة محتوى ومؤلفة:</span> أدير مجتمعاً فنياً يضم أكثر من 11 ألف متابع على إنستغرام، وقمت بتأليف ونشر كتابي التعليمي الخاص لمساعدة الرسامين في الحفاظ على شغفهم وبناء عادتهم اليومية.`;
            cvLines[3].innerHTML = `<span class='text-cream font-semibold'>المعارض الفنية:</span> شاركت في 6 معارض فنية جماعية، وأقمت 4 معارض فردية خاصة لعرض أعمالي الواقعية.`;
        }
    }

    // 5. ترجمة معرض لوحات البورتريه
    document.getElementById("gallery-title").innerText = t.galleryTitle;
    document.getElementById("gallery-subtitle").innerText = t.gallerySubtitle;
    document.getElementById("open-portrait-modal").innerText = t.openPortBtn;
});

// البرمجة الخاصة بفتح وإغلاق نافذة قصة الفنانة (Story Modal)
const storyModal = document.getElementById('story-modal');
const openStoryBtn = document.getElementById('open-story-modal');
const closeStoryBtn = document.getElementById('close-story-modal');

if (openStoryBtn && storyModal && closeStoryBtn) {
    openStoryBtn.addEventListener('click', () => {
        storyModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    });

    closeStoryBtn.addEventListener('click', () => {
        storyModal.classList.add('hidden');
        document.body.style.overflow = 'auto'; 
    });

    storyModal.addEventListener('click', (e) => {
        if (e.target === storyModal) {
            storyModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
}
