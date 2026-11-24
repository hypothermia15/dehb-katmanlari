'use strict';
/* icerik.js — şemadaki dokuz ögenin metni ve kaynakları.
   Her cümle bir kaynağa dayanır; "hesap" ve "açıklama" diye işaretlenenler yazarın kendi açıklamasıdır.
   Kaynak anahtarları KAYNAK tablosundadır. */
const KAYNAK = {
  nejm: { kisa: 'Buitelaar ve Newcorn, 2026', tam: 'Buitelaar JK, Newcorn JH. Adult Attention Deficit–Hyperactivity Disorder. N Engl J Med. 2026;395(15):1519-1528.', doi: '10.1056/NEJMcp2516040' },
  nrdp: { kisa: 'Faraone ve ark., 2024', tam: 'Faraone SV, Bellgrove MA, Brikell I, ve ark. Attention-deficit/hyperactivity disorder. Nat Rev Dis Primers. 2024;10(1):11.', doi: '10.1038/s41572-024-00495-0' },
  gen: { kisa: 'Faraone ve Larsson, 2019', tam: 'Faraone SV, Larsson H. Genetics of attention deficit hyperactivity disorder. Mol Psychiatry. 2019;24(4):562-575.', doi: '10.1038/s41380-018-0070-0' },
  h17: { kisa: 'Hoogman ve ark., 2017', tam: 'Hoogman M, Bralten J, Hibar DP, ve ark. Subcortical brain volume differences in participants with attention deficit hyperactivity disorder in children and adults: a cross-sectional mega-analysis. Lancet Psychiatry. 2017;4(4):310-319.', doi: '10.1016/S2215-0366(17)30049-4' },
  h19: { kisa: 'Hoogman ve ark., 2019', tam: 'Hoogman M, Muetzel R, Guimaraes JP, ve ark. Brain Imaging of the Cortex in ADHD: A Coordinated Analysis of Large-Scale Clinical and Population-Based Samples. Am J Psychiatry. 2019;176(7):531-542.', doi: '10.1176/appi.ajp.2019.18091033' },
  koi: { kisa: 'Koirala ve ark., 2024', tam: 'Koirala S, Grimsrud G, Mooney MA, ve ark. Neurobiology of attention-deficit hyperactivity disorder: historical challenges and emerging frontiers. Nat Rev Neurosci. 2024;25(12):759-775.', doi: '10.1038/s41583-024-00869-z' },
  kim: { kisa: 'Kim ve ark., 2020', tam: 'Kim JH, Kim JY, Lee J, ve ark. Environmental risk factors, protective factors, and peripheral biomarkers for ADHD: an umbrella review. Lancet Psychiatry. 2020;7(11):955-970.', doi: '10.1016/S2215-0366(20)30312-6' },
  chen: { kisa: 'Chen ve ark., 2017', tam: 'Chen Q, Brikell I, Lichtenstein P, ve ark. Familial aggregation of attention-deficit/hyperactivity disorder. J Child Psychol Psychiatry. 2017;58(3):231-239.', doi: '10.1111/jcpp.12616' },
  franz: { kisa: 'Franz ve ark., 2018', tam: 'Franz AP, Bolat GU, Bolat H, ve ark. Attention-Deficit/Hyperactivity Disorder and Very Preterm/Very Low Birth Weight: A Meta-analysis. Pediatrics. 2018;141(1).', doi: '10.1542/peds.2017-1645' },
  haan: { kisa: 'Haan ve ark., 2022', tam: 'Haan E, Westmoreland KE, Schellhas L, ve ark. Prenatal smoking, alcohol and caffeine exposure and offspring externalizing disorders: a systematic review and meta-analysis. Addiction. 2022;117(10):2602-2613.', doi: '10.1111/add.15858' },
  fri: { kisa: 'Frisira ve ark., 2025', tam: 'Frisira E, Holland J, Sayal K. Systematic review and meta-analysis: relative age in attention-deficit/hyperactivity disorder and autism spectrum disorder. Eur Child Adolesc Psychiatry. 2025;34(2):381-401.', doi: '10.1007/s00787-024-02459-x' },
  wil: { kisa: 'Willcutt ve ark., 2005', tam: 'Willcutt EG, Doyle AE, Nigg JT, Faraone SV, Pennington BF. Validity of the executive function theory of attention-deficit/hyperactivity disorder: a meta-analytic review. Biol Psychiatry. 2005;57(11):1336-1346.', doi: '10.1016/j.biopsych.2005.02.006' }
};

const REHBER = {
  sim: { ad: 'Dopamin Simülatörü', url: 'https://hypothermia15.github.io/dopamin-simulatoru/', ne: 'Bir dopamin sinapsını molekül molekül izleyin.' },
  gorev: { ad: 'Dikkat Görevleri', url: 'https://hypothermia15.github.io/dikkat-gorevleri/', ne: 'Stroop, N-geri ve Go/No-Go görevlerini deneyin.' },
  adim: { ad: 'DEHB: Sonraki Adım', url: 'https://hypothermia15.github.io/dehb-sonraki-adim/', ne: 'Ebeveyn için sekiz gündelik durum ve denenecek küçük adımlar.' }
};

/* Alanlar: sade (herkes için), ayrinti (asistan ve öğrenci için, paragraf dizisi),
   yanlis (sık yanlış okuma), yas (çocuk ve erişkin farkı, varsa), rehber (REHBER anahtarı), kaynak (KAYNAK anahtarları).
   Metin içinde [anahtar] yazılan yer kaynak bağlantısına çevrilir. */
const OGE = {
  genetik: {
    ad: 'Genetik', bant: 'koken',
    ozet: 'Büyük ölçüde kalıtsal, tek gen yok',
    sade: 'DEHB büyük ölçüde kalıtsaldır. Tek bir “DEHB geni” yoktur: her biri çok küçük etkili pek çok genetik farklılık birlikte rol oynar.',
    ayrinti: [
      'DEHB poligenik ve çok etkenli bir nörogelişimsel durumdur. Kalıtsallığı yaklaşık %80 olarak verilir [nejm]. İkiz çalışmalarını derleyen bir gözden geçirme %74 bildirir [gen].',
      'Hem sık hem nadir genetik varyantlar erken nöron gelişimini, sinaptik iletimi, düzenleyici yolakları, beyin yapısını ve işlevini etkiler [nejm].',
      'Tek tek risk varyantlarının etkisi çok küçüktür. Kalıtsallığın yaklaşık üçte biri, her biri küçük etkili çok sayıda sık varyanttan oluşan poligenik bileşene bağlanır. Nadir eklenme ve silinmeler de kalıtsallığın bir bölümünü açıklar [gen].'
    ],
    yanlis: '“Yüzde 80 kalıtsal”, bir çocuğun DEHB’sinin yüzde 80’inin genlerinden geldiği anlamına gelmez. Kalıtsallık bir toplum ölçüsüdür: kişiler arasındaki farkların ne kadarının genetik farklarla açıklandığını söyler. Tek bir kişinin geleceğini söylemez. (Açıklama: kalıtsallık kavramının tanımı.)',
    kaynak: ['nejm', 'gen', 'nrdp']
  },
  cevre: {
    ad: 'Çevresel etkenler', bant: 'koken',
    ozet: 'İlişkili etkenler var, çoğu için neden denemez',
    sade: 'Bazı erken yaşam koşulları DEHB ile daha sık birlikte görülür. Bunların çoğu için “neden” demek mümkün değildir.',
    ayrinti: [
      'Artmış DEHB riskiyle ilişkilendirilen etkenler: düşük doğum ağırlığı, erken doğum, psikososyal güçlükler (istismar, ihmal, yoksulluk), gebelikte alkol ve nikotin gibi maddelerle karşılaşma, kurşun ve trafik kaynaklı hava kirliliği gibi çevresel toksinler. Bu etkenlerin çoğu için nedensellik gösterilmemiştir [nejm].',
      'Kapsamlı bir derleme de aynı sonuca varır: bozukluğun çevresel ilişkileri bulunmuştur, ama nedenselliği göstermek güç olmuştur. Aynı derleme etiyolojiyi ağırlıklı olarak genetik diye tanımlar [nrdp].'
    ],
    yanlis: 'Bu liste bir suçlu listesi değildir. İlişki, neden demek değildir. Kaynakların kendisi çoğu etken için nedenselliğin gösterilmediğini açıkça yazar.',
    kaynak: ['nejm', 'nrdp']
  },
  yapi: {
    ad: 'Beyin yapısı', bant: 'beyin',
    ozet: 'Küçük grup farkları, büyük örtüşme',
    sade: 'Görüntüleme çalışmalarında DEHB’li grupların bazı beyin bölgeleri ortalamada biraz daha küçük bulunmuştur. Fark çok küçüktür ve kişiler arasında büyük örtüşme vardır.',
    ayrinti: [
      'Prefrontal korteksin bazı alanlarında hacim ya da kalınlık hafifçe azalmıştır. Bazal gangliyonlarda kaudat ve putamende hacim farkı vardır. Bunlar grup düzeyinde eğilimlerdir, tanı testi değildir [nejm].',
      'Korteks altı yapılar: 23 merkezden 1713 DEHB’li ve 1529 kontrol katılımcının verisinde akkumbens (d = −0,15), amigdala (−0,19), kaudat (−0,11), hipokampus (−0,11), putamen (−0,14) ve kafa içi hacim (−0,10) DEHB grubunda daha küçük bulundu. Pallidum ve talamusta fark yoktu. Uyarıcı ilaç kullanımı sonuçları etkilemedi [h17].',
      'Korteks: 36 merkezden 2246 DEHB’li ve 1934 kontrol katılımcıda, DEHB’li çocuklarda başlıca frontal, singulat ve temporal bölgelerde yüzey alanı daha düşüktü. En büyük etki toplam yüzey alanındaydı (d = −0,21) [h19].',
      'Güncel bir derleme, birkaç bölgeyle sınırlı açıklamalar yerine beynin geneline bakan bir çerçeve önerir ve yetersiz örneklemli çalışmaların alanı uzun süre yavaşlattığını vurgular [koi].'
    ],
    yanlis: 'Beyin görüntülemesi DEHB tanısı koymaz. Etki büyüklüğü 0,2 olan bir farkta iki grubun dağılımı yaklaşık yüzde 92 örtüşür: tek bir kişinin görüntüsüne bakarak hangi gruptan olduğu söylenemez. (Hesap: normal dağılım varsayımıyla örtüşme katsayısı.)',
    yas: 'Korteks altı farklar çocuklarda (15 yaş altı) erişkinlerden (21 yaş üstü) daha büyüktü ve erişkinlerde vaka-kontrol farkı anlamlı değildi. Yazarlar bunu olgunlaşmada gecikme olarak yorumlar. Veri kesitsel olduğu için bu bir varsayımdır [h17]. Korteks yüzey alanı farkı da yalnızca çocuklarda bulundu, ergen ve erişkin gruplarında bulunmadı [h19].',
    kaynak: ['nejm', 'h17', 'h19', 'koi']
  },
  kimya: {
    ad: 'Nörokimya', bant: 'beyin',
    ozet: 'Dopamin ve noradrenalin, belki serotonin',
    sade: 'DEHB’de dopamin ve noradrenalin sistemlerinin daha az etkin çalıştığı düşünülür. “Beyinde dopamin eksik” demek fazla basittir.',
    ayrinti: [
      'DEHB ile ilişkilendirilen beyin bölgelerinin çoğu dopamin ve noradrenalinle düzenlenir. DEHB ilaçlarının hedef aldığı ileticiler de bu ikisidir. Serotonerjik düzenekler de rol oynayabilir ve bazı yeni DEHB ilaçları serotonini de hedefler [nejm].',
      'Genetikten davranışa uzanan pek çok düzeyde araştırma yapılmış olmasına karşın DEHB’nin patogenezi hâlâ açıklığa kavuşmamıştır. Bozukluk çok ayrışıktır ve birden çok etiyolojisi vardır [koi].'
    ],
    yanlis: 'Tanı, tanı ölçütlerine dayanır [nejm]. Bir kan testi ya da “dopamin ölçümü” bu ölçütlerin parçası değildir.',
    rehber: 'sim',
    kaynak: ['nejm', 'koi']
  },
  plan: {
    ad: 'Planlama ve düzenleme', bant: 'davranis',
    ozet: 'Planlama, sıraya koyma, zaman yönetimi',
    sade: 'İşleri planlamak, sıraya koymak ve zamanı yönetmek güçleşir.',
    ayrinti: [
      'Planlama ve düzenlemede güçlük ile zayıf zaman yönetimi, DEHB’nin davranışsal ve bilişsel özellikleri arasında sayılır [nejm].',
      'DEHB’li kişiler planlama, inhibisyon ve çalışma belleği gibi yürütücü işlev görevlerinde etkilenmemiş kişilere göre daha düşük performans gösterir [nejm].'
    ],
    yas: 'Erişkinlerde dikkatsizlik belirtileri, gündelik işlerde çelinebilirlik ve unutkanlığın yanında çoğu kez etkinlikleri planlayıp düzenleyememe ve zayıf zaman yönetimi olarak görünür [nejm].',
    rehber: 'adim',
    kaynak: ['nejm']
  },
  dikkat: {
    ad: 'Dikkat ve bellek', bant: 'davranis',
    ozet: 'Dikkati sürdürme, çalışma belleği',
    sade: 'Dikkati sürdürmek ve çeldiricilere direnmek zorlaşır. Bilgiyi kısa süre akılda tutup kullanmak da güçleşebilir.',
    ayrinti: [
      'Dikkati sürdürme ve çeldiricilere direnme güçlüğü ile çalışma belleği ve dikkat görevlerinde sorunlar DEHB’nin özellikleri arasındadır [nejm].',
      '83 çalışmayı kapsayan bir meta-analizde DEHB gruplarının yürütücü işlev ölçümlerindeki farkı orta büyüklükteydi (etki büyüklüğü 0,46-0,69). Yazarlar bu zayıflıkların DEHB için ne gerekli ne yeterli olduğu sonucuna vardı [wil].'
    ],
    yanlis: 'Bir dikkat testindeki puan tanı koydurmaz. Grup ortalamaları farklıdır, ama bu zayıflıklar DEHB için ne gerekli ne yeterlidir [wil].',
    rehber: 'gorev',
    kaynak: ['nejm', 'wil']
  },
  odul: {
    ad: 'Ödül işleme', bant: 'davranis',
    ozet: 'Hemen gelen küçük ödül ağır basar',
    sade: 'Hemen gelen küçük ödül, bekleyince gelecek büyük ödülden daha çekici gelir.',
    ayrinti: [
      'DEHB’li kişiler ödüllere farklı yanıt verir: küçük ve hemen gelen ödülü, büyük ve geciken ödüle yeğlerler. Kortikal uyarılmışlığı uygun düzeyde sürdürmekte de güçlük çekerler [nejm].'
    ],
    yanlis: 'Bu, grup düzeyinde gözlenen bir yanıt örüntüsüdür. Bir karakter yargısı ya da “isteksizlik” açıklaması olarak okunmamalıdır. (Açıklama: yazarın yorumu.)',
    rehber: 'sim',
    kaynak: ['nejm']
  },
  duygu: {
    ad: 'Duygu düzenleme', bant: 'davranis',
    ozet: 'Çabuk parlayan, çabuk sönen tepkiler',
    sade: 'Duygusal tepkiler daha çabuk ve daha güçlü olabilir. Engellenmeye dayanmak zorlaşır.',
    ayrinti: [
      'Artmış duygusal tepkisellik, engellenmeyle baş etmede güçlük ve irritabilite DEHB’nin özellikleri arasında sayılır [nejm].',
      'Duygu düzenleme güçlüğü çekirdek tanı ölçütlerinin parçası değildir, ama DEHB’li erişkinlerin çoğunda bulunur. Duygusal ipuçlarına kısa süreli ve abartılı tepkiler, irritabilite ya da sözel saldırganlık biçiminde görünebilir [nejm].'
    ],
    yanlis: 'Tanı ölçütlerinde yer almaması, klinikte önemsiz olduğu anlamına gelmez: kaynak bunu değerlendirmede bakılması gereken eşlik eden özellikler arasında sayar [nejm].',
    rehber: 'adim',
    kaynak: ['nejm']
  },
  yas: {
    ad: 'Yaşla ne değişir?', bant: 'zaman',
    ozet: 'Çocukluktan erişkinliğe',
    sade: 'DEHB yalnızca çocukluk dönemine özgü değildir. Olguların en az üçte birinde erişkinlikte sürer, ama görünümü değişir.',
    ayrinti: [
      'Yaygınlık ve şiddet yaşla azalır: dünya genelinde tahmini yaygınlık çocuklarda %5,3, genç erişkinlerde %2,5’tir. Erişkinlikte erkek ve kadın oranları yaklaşık eşittir [nejm].',
      'İzlem çalışmaları olguların en az üçte birinde erişkinlikte süren bir gidiş, daha büyük bir bölümünde ise kalıcı işlevsel güçlük göstermiştir [nejm].',
      'Çekirdek belirtiler çocuklarda ve erişkinlerde aynıdır, ama erişkinler için belirti eşiği daha düşüktür ve klinik görünüm çoğu kez farklıdır. Ergenlikten sonra hiperaktivite en sık iç huzursuzluk ve sakince dinlenememe olarak görünür [nejm].',
      'Kızlar genel olarak erkeklerden daha az yıkıcı davranır ve belirtilerini telafi etmeye ya da gizlemeye eğilimlidir. Kadınlarda tanı çoğu kez erkeklerden daha geç yaşta konur [nejm].'
    ],
    yanlis: '“Büyüyünce geçer” her çocuk için doğru değildir. Belirtiler azalsa bile işlevsel güçlük sürebilir [nejm].',
    kaynak: ['nejm']
  }
};

/* ── Olasılık oyunu ──
   TABAN: çocuklarda dünya geneli tahmini yaygınlık (%5,3) [nejm].
   Her etkende yayımlanmış oran (olasılık oranı OR, göreli risk RR ya da tehlike oranı HR) taban değere uygulanır:
   OR: p = OR·p0 / (1 − p0 + OR·p0);  RR: p = RR·p0;  HR: p = 1 − (1 − p0)^HR.
   Bu dönüşüm yazarın hesabıdır; kaynaklardaki çalışmalar farklı ülkelerden ve farklı tanı tanımlarından gelir. */
const TABAN = 0.053;
const ETKEN = [
  { id: 'sinif', grup: 'okul', tur: 'RR', oran: 1.38, ad: 'Sınıfın en küçüklerinden olmak',
    soru: 'Okula başlama tarihine göre sınıfının en küçükleri arasında olan 1000 çocuktan kaçı DEHB tanısı alır?',
    bilgi: 'Sınıfın en küçükleri DEHB tanısını daha sık alır: göreli risk 1,38. Etki öğretmen değerlendirmelerinde görülür, ebeveyn değerlendirmelerinde görülmez. Yazarlar bu farkın etkiye katkıda bulunabileceğini belirtir [fri].',
    ders: 'Bu etken çocuğun kendisinden çok, kiminle karşılaştırıldığıyla ilgili olabilir.' },
  { id: 'astim', grup: 'cocukluk', tur: 'OR', oran: 1.51, ad: 'Çocuklukta astım',
    soru: 'Astımı olan 1000 çocuktan kaçında DEHB beklenir?',
    bilgi: 'Çocukluk çağı astımı DEHB ile ilişkilidir: olasılık oranı 1,51 (%95 GA 1,4-1,63). Kanıt düzeyi “güçlü biçimde düşündürücü” olarak sınıflanmıştır [kim].',
    ders: 'İlişki gösterilmiştir, nedensellik gösterilmemiştir.' },
  { id: 'sigara', grup: 'gebelik', tur: 'OR', oran: 1.6, ad: 'Gebelikte annenin sigara içmesi', ikinci: { oran: 1.0, etiket: 'Aile etkenlerini hesaba kat (oran 1,0 olur)' },
    soru: 'Annesi gebelikte sigara içmiş 1000 çocuktan kaçında DEHB beklenir?',
    bilgi: 'Gözlemsel çalışmaların ortak sonucu olasılık oranını 1,6 verir (%95 GA 1,45-1,76) [kim]. Ama aynı ailenin çocuklarını karşılaştıran, genetik etkiye duyarlı tasarımlarda ilişki kaybolur: 1 011 546 katılımcılı en büyük analizde olasılık oranı günde 1-9 sigara için 0,90, 10 ve üzeri için 1,04 bulunmuştur. Yazarlar nedensel bir ilişkiyi destekleyen açık bir kanıt olmadığı sonucuna varır [haan].',
    ders: 'Aynı sayı iki ayrı öykü anlatabilir. Bu bulgu gebelikte sigaranın zararsız olduğu anlamına gelmez: yalnızca DEHB ile ilişkisinin aile etkenleriyle açıklanabildiğini gösterir.' },
  { id: 'obezite', grup: 'gebelik', tur: 'OR', oran: 1.63, ad: 'Annenin gebelik öncesi obezitesi',
    soru: 'Annesi gebelik öncesinde obez olan 1000 çocuktan kaçında DEHB beklenir?',
    bilgi: 'Olasılık oranı 1,63 (%95 GA 1,49-1,77). Kanıt düzeyi “ikna edici” olarak sınıflanmıştır. Yazarlar yine de önceki aile çalışmalarına dayanarak bu ilişkinin ailesel ya da genetik etkenlerle karışmış olabileceğini ve nedenselliğin gösterilmesi için yeni çalışmalar gerektiğini yazar [kim].',
    ders: 'En güçlü kanıt düzeyi bile “neden” demek için yetmez.' },
  { id: 'cokerken', grup: 'dogum', tek: 'dogum', tur: 'OR', oran: 2.25, ad: 'Çok erken doğum ya da çok düşük doğum ağırlığı',
    soru: 'Çok erken ya da çok düşük doğum ağırlığıyla doğan 1000 çocuktan kaçında DEHB beklenir?',
    bilgi: 'Tanıya dayalı 12 çalışmada (toplam 1787 kişi) olasılık oranı 2,25 bulunmuştur (%95 GA 1,56-3,26) [franz].',
    ders: 'Risk iki katından fazla artsa bile bu çocukların yaklaşık onda dokuzunda DEHB yoktur.' },
  { id: 'asirierken', grup: 'dogum', tek: 'dogum', tur: 'OR', oran: 4.05, ad: 'Aşırı erken doğum ya da aşırı düşük doğum ağırlığı',
    soru: 'Aşırı erken ya da aşırı düşük doğum ağırlığıyla doğan 1000 çocuktan kaçında DEHB beklenir?',
    bilgi: 'Aynı meta-analizde olasılık oranı 4,05’tir (%95 GA 2,38-6,87): durum ağırlaştıkça oran büyür [franz].',
    ders: 'Durum ağırlaştıkça oran büyüyor. Yine de bu çocukların çoğunda DEHB yoktur.' },
  { id: 'kuzen', grup: 'aile', tek: 'aile', tur: 'HR', oran: 2.24, ad: 'Kuzeninde DEHB olması',
    soru: 'Kuzeninde DEHB olan 1000 çocuktan kaçında DEHB beklenir?',
    bilgi: 'İsveç’te 1 656 943 kişilik kütük çalışmasında, DEHB’li bir kişinin kuzenlerinde tehlike oranı 2,24 bulunmuştur [chen].',
    ders: 'Akrabalık uzaklaştıkça oran küçülür.' },
  { id: 'kardes', grup: 'aile', tek: 'aile', tur: 'HR', oran: 8.27, ad: 'Kardeşinde DEHB olması',
    soru: 'Kardeşinde DEHB olan 1000 çocuktan kaçında DEHB beklenir?',
    bilgi: 'Aynı çalışmada öz kardeşler için tehlike oranı 8,27’dir. Anne bir yarı kardeşlerde 2,86, baba bir yarı kardeşlerde 2,31, çift yumurta ikizlerinde 8,44 bulunmuştur [chen].',
    ders: 'Listedeki en güçlü etken ailedir. Buna karşın kardeşi DEHB’li çocukların çoğunda DEHB yoktur.' },
  { id: 'yarim', grup: 'aile', tek: 'aile', tur: 'HR', oran: 2.86, ad: 'Anne bir yarı kardeşinde DEHB olması', yalnizGezinti: true,
    bilgi: 'Anne bir yarı kardeşlerde tehlike oranı 2,86, baba bir yarı kardeşlerde 2,31’dir. Fark anlamlıdır. Yazarlar ailesel kümelenmeyi genetik etkenlerin yanında az miktarda ortak çevre etkeninin de sürdürdüğü sonucuna varır [chen].' },
  { id: 'egzama', grup: 'cocukluk', tur: 'OR', oran: 1.31, ad: 'Çocuklukta egzama', yalnizGezinti: true,
    bilgi: 'Olasılık oranı 1,31 (%95 GA 1,20-1,44), kanıt düzeyi “ikna edici” [kim]. Nedensellik gösterilmemiştir.' },
  { id: 'preeklampsi', grup: 'gebelik', tur: 'OR', oran: 1.28, ad: 'Gebelikte preeklampsi', yalnizGezinti: true,
    bilgi: 'Olasılık oranı 1,28 (%95 GA 1,21-1,35), kanıt düzeyi “ikna edici” [kim]. Nedensellik gösterilmemiştir.' }
];

const GRUP = [
  { id: 'aile', ad: 'Aile öyküsü', not: 'birini seçin' },
  { id: 'dogum', ad: 'Doğum', not: 'birini seçin' },
  { id: 'gebelik', ad: 'Gebelik' },
  { id: 'cocukluk', ad: 'Çocukluk' },
  { id: 'okul', ad: 'Okul' }
];
