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
            // متطابق 100% مع أعمدة جدول portrait_orders (name, contact, country, required_date, status)
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
            // متطابق 100% مع أعمدة جدول book_orders (name, email, contact, country)
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
        bookSecTitle: "كتابي الرقمي", bookSecSubtitle: "تصفح الفصول الأولى مجاناً وعش التجربة قبل الشراء",
        bookTitle: "اسم الكتاب الفخم", bookPages: "📄 180 صفحة من الإلهام", bookDesc: "هذا الكتاب يأخذك في رحلة عميقة وراء الكواليس، حيث يمتزج الفن بالقصص.",
        downloadBtn: "قراءة النسخة التجريبية (PDF)", buyBtn: "شراء الكتاب الكامل",
        galleryTitle: "معرض لوحات البورتريه الخاص بي", gallerySubtitle: "حول صورك المفضلة إلى تحفة فنية مرسومة بعناية",
        openPortBtn: "اطلب بورتريهك الخاص الآن"
    },
    en: {
        bookSecTitle: "My Digital Book", bookSecSubtitle: "Browse the first chapters for free and live the experience",
        bookTitle: "The Luxurious Book Name", bookPages: "📄 180 Pages of Inspiration", bookDesc: "This book takes you on a deep journey behind the scenes, where art blends with stories.",
        downloadBtn: "Read Sample Version (PDF)", buyBtn: "Buy Full Book",
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
    document.getElementById("book-section-title").innerText = t.bookSecTitle;
    document.getElementById("book-section-subtitle").innerText = t.bookSecSubtitle;
    document.getElementById("book-title").innerText = t.bookTitle;
    document.getElementById("book-pages-count").innerText = t.bookPages;
    document.getElementById("book-desc").innerText = t.bookDesc;
    document.getElementById("download-sample-btn").innerText = t.downloadBtn;
    document.getElementById("buy-book-btn").innerText = t.buyBtn;
    
    document.getElementById("gallery-title").innerText = t.galleryTitle;
    document.getElementById("gallery-subtitle").innerText = t.gallerySubtitle;
    document.getElementById("open-portrait-modal").innerText = t.openPortBtn;
});
// البرمجة الخاصة بفتح وإغلاق نافذة قصة الفنانة (Story Modal)
const storyModal = document.getElementById('story-modal');
const openStoryBtn = document.getElementById('open-story-modal');
const closeStoryBtn = document.getElementById('close-story-modal');

if (openStoryBtn && storyModal && closeStoryBtn) {
    // فتح النافذة عند الضغط على الزر
    openStoryBtn.addEventListener('click', () => {
        storyModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // منع سكرول الموقع الخلفي
    });

    // إغلاق النافذة عند الضغط على علامة X
    closeStoryBtn.addEventListener('click', () => {
        storyModal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // إعادة السكرول الطبيعي
    });

    // إغلاق النافذة إذا ضغط المستخدم في أي مكان خارج الإطار الأسود
    storyModal.addEventListener('click', (e) => {
        if (e.target === storyModal) {
            storyModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
}
