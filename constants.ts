import { PromptItem } from './types';

// --- רשימת הקטגוריות ---
// כאן קובעים אילו כפתורי סינון יופיעו למעלה.
const CATEGORIES_NAMES = [
  'תדמית גברים',
  'תדמית נשים',
  'ילדים',
  'זוגיות',
  'תלת מימד',
  'מוצר',
  'מאויר',
  'אחר'
];

export const CATEGORY_LIST = ['הכל', ...CATEGORIES_NAMES];

// --- המידע של הגלריה ---
// כאן משנים את התמונות, הכותרות והפרומפטים.
// כדי להוסיף תמונה חדשה: העתק את כל הבלוק בין הסוגריים המסולסלים { ... }, והדבק אותו מתחת.
// אל תשכח לשנות את ה-ID למספר הבא בתור.

export const PROMPTS_DATA: PromptItem[] = [
  {
    id: 1,
    title: "פורטרט עסקי לגבר",
    category: "תדמית גברים",
    // כאן מדביקים את הפרומפט באנגלית
    promptText: "Cinematic shot, realistic portrait of a confident businessman in a modern office, wearing a navy blue suit, natural lighting, 8k resolution, highly detailed skin texture.",
    // כאן שמים קישור לתמונה (URL) או שם קובץ (למשל 'image1.jpg' אם העלית אותו לתיקייה הראשית)
    imageUrl: "https://picsum.photos/id/100/600/400", 
  },
  {
    id: 2,
    title: "צילום מוצר בושם",
    category: "מוצר",
    promptText: "Professional product photography of a luxury perfume bottle, placed on a black marble surface, gold accents, soft spotlight, water droplets, bokeh background.",
    imageUrl: "https://picsum.photos/id/200/600/400",
  },
  {
    id: 3,
    title: "ילד משחק בפארק",
    category: "ילדים",
    promptText: "A cute 5-year-old boy laughing while running in a sunny park, vibrant green grass, soft sunlight flare, shallow depth of field, Nikon D850 style.",
    imageUrl: "https://picsum.photos/id/300/600/400",
  },
  {
    id: 4,
    title: "דמות תלת מימד חמודה",
    category: "תלת מימד",
    promptText: "3D render of a cute fluffy monster holding a heart, Pixar style, pastel colors, soft lighting, occlusion render, high quality.",
    imageUrl: "https://picsum.photos/id/400/600/400",
  },
  {
    id: 5,
    title: "#1 תדמית לאישה בסטודיו",
    category: "תדמית נשים",
    promptText: "A beautiful woman standing on the beach during golden hour, wind blowing through hair, warm tones, realistic photography, emotional atmosphere.",
    imageUrl: 'public/women_studio1,
  },
  {
    id: 6,
    title: "עיצוב פנים סלון",
    category: "אחר",
    promptText: "Modern minimalist living room interior design, beige and white color palette, large windows with sunlight, cozy atmosphere, architectural photography.",
    imageUrl: "https://picsum.photos/id/600/600/400",
  },
  // --- הוסף פריטים נוספים מתחת לשורה זו ---
  
];
