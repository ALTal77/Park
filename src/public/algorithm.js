// قيمة كبيرة جداً تستخدم كما لا نهاية - تمثل الحالات غير الممكنة أو غير المقبولة
const OO = 1e18;

// المتغيرات الأساسية للمسألة
let numSeats, numColors, target; // عدد المقاعد، عدد الألوان المتاحة، قيمة الجمال المستهدفة

// المصفوفات الرئيسية
// مصفوفة تخزن الألوان المحددة مسبقاً (0 يعني غير محدد)
let a = Array(101).fill(0);
// مصفوفة ثنائية لتخزين تكلفة كل لون لكل مقعد
let cost = Array.from({ length: 101 }, () => Array(101).fill(0));
// مصفوفة ثلاثية للبرمجة الديناميكية لتخزين النتائج المحسوبة مسبقاً
let dp = Array.from({ length: 101 }, () => Array.from({ length: 101 }, () => Array(102).fill(-1)));

/**
 * دالة الحساب الرئيسية باستخدام البرمجة الديناميكية
 *  idx - الموقع الحالي في المقاعد
 *  beauty - قيمة الجمال الحالية
 *  prevColor - اللون السابق
 *  number أقل تكلفة ممكنة للوصول للهدف
 */
function calc(idx, beauty, prevColor) {
    // حالة القاعدة: عند الوصول لنهاية المقاعد
    if (idx === numSeats) {
        // نتحقق إذا وصلنا للقيمة المستهدفة من الجمال
        return (beauty === target) ? 0 : OO;
    }

    // التحقق من القيم المحسوبة مسبقاً (البرمجة الديناميكية)
    let ret = dp[idx][beauty][prevColor];
    if (ret !== -1) return ret;

    // نبدأ بقيمة كبيرة جداً
    ret = OO;

    // حالة المقعد المحدد مسبقاً
    if (a[idx] !== 0) {
        // لا خيار - نستخدم اللون المحدد مسبقاً
        // نحسب قيمة الجمال الجديدة (نضيف 1 إذا كان اللون مختلف عن السابق)
        ret = calc(idx + 1, beauty + (prevColor !== a[idx] ? 1 : 0), a[idx]);
    } else {
        // حالة المقعد غير المحدد - نجرب جميع الألوان المتاحة
        for (let i = 1; i <= numColors; i++) {
            // لكل لون نحسب:
            // 1. تكلفة وضع هذا اللون في المقعد الحالي (cost[idx][i])
            // 2. التكلفة المستقبلية للمقاعد المتبقية
            // 3. نضيف 1 لقيمة الجمال إذا كان اللون مختلف عن السابق
            ret = Math.min(ret, cost[idx][i] + calc(idx + 1, beauty + (prevColor !== i ? 1 : 0), i));
        }
    }

    // نخزن النتيجة في مصفوفة البرمجة الديناميكية لاستخدامها لاحقاً
    dp[idx][beauty][prevColor] = ret;
    return ret;
}

/**
 * الدالة الرئيسية لمعالجة المدخلات وإيجاد الحل
 *  input - سلسلة المدخلات
 */
function main(input) {
    const data = input.trim().split('\n');
    [numSeats, numColors, target] = data[0].split(' ').map(Number);
    a = data[1].split(' ').map(Number);

    for (let i = 0; i < numSeats; i++) {
        const row = data[i + 2].split(' ').map(Number);
        for (let j = 1; j <= numColors; j++) {
            cost[i][j] = row[j - 1];
        }
    }

    dp = Array.from({ length: 101 }, () => Array.from({ length: 101 }, () => Array(102).fill(-1)));
    let ans = calc(0, 0, numColors + 1);

    return ans === OO ? -1 : ans;
}
