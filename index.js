/*
 * Letters & Memories — Mochi edition.
 * Customize your four image paths and letters below.
 * No automatic rotation. No affection bar. Only one gallery Mochi per photo.
 */

const photos = [
  'photos/photo1.jpeg',        // Photo 1
  'photos/photo2.jpg',        // Photo 2
  'photos/photo3.jpeg',        // Photo 3
  'photos/photo4.jpeg',         // Photo 4
  'photos/photo5.jpeg',        // Photo 5
  'photos/photo6.jpg',    // Photo 6 placeholder
  ];
/* PRELOAD PHOTOS FOR FASTER GALLERY */
const photoCache = photos.map((src) => {
  const image = new Image();
  image.src = src;

  if (image.decode) {
    image.decode().catch(() => {});
  }

  return image;
});



const messages = [
  { from: 'Aplateau plateau', preview: 'Lesgo Sheina! lesgo home! ', fullText: `“birthday mo?”

“ah, oo.”

Oh.

Oh.

Happiet bidet wowowowowoowow. Um um um... My OG bff since li'erly like li'erly day onEzzz eyyyy. Saw how you grew and felt like a proud motha,, nyeknyok nyeknyok wowza eme. 

People who gets to be your friend are lucky. They can experience having an all-rounder friend. Namamrangka at nanunulsol, nakakaladkad pero kapag ayaw talaga, baka pwede pa rin. Parang alam lahat ng fandom, sides ng tiktok, movies, kpop, cartoons, at any any pa. Nerbyosa pero hindi natatapos ang araw na hindi nakasusubok sa kinanenerbyosang gawin

May you healthily recover and finally obtain a good health buong buhay mo 🍀

Rararara, smirnoff!!` },
  { from: 'Sami', preview: 'Birthday ni sheina purpol?! ', fullText: `
happiest birthday, sheinamerls! 

thank you so so so much for every dorm stay, kwento, and everything. sobrang unexpected ng friendship natin yet here we are... and iʼm vv glad that we were able to go this far. 

alam mo namang ikaw lang kasama ko sa hirap dahil parehas tayo ng dinadamdam na sakit 😜 sana before this year ends, you learn to take care of yourself. marami pa tayong kailangang gawin may it be planned or spontaneous. 

i hope you enjoy your day, and know that you are a blessing to everyone. 

i loaf u so much! 💘 

` },
  { from: 'Tempo Weaver', preview: 'HABADU SHEYNAMERLSS', fullText: `Happy birthday, sheina! thank you sa pag check sakin lately 🥹💗 kahit hindi na tayo nakakapagkita, i miss you. Miss ko na bond nating magkakaibigan ung kahit pagod sa paglalakad before tapos ending laging maple or rob lang din galaan HAHAHAHAHA. Mag 20 ka na, thank you for having you as my friend. Sana maging successful ka tapos wag mo me kalimutan and miss ko na pumunta at makipagchika sayo sa dorm niyo ni cai. Ung moments natin dati ng kwentuhan, rants groupings niyo etc. At mga reaksyon mong nakakatawa HAHAHAHAHA ung commute mo na makasama mo lang din kami kahit naic pa inuuwian mo. HBD HBD ULIT SANA MAGKITA NA US ULIT lovelotsss eynamerls 💗💗💗💗` },
  { from: 'Kirang', preview: 'Birthday na ni eyna x2', fullText: `Ayun, birthday na niya. Finally, may bente anyos na rin satin! Dito na ako mag-oover sa message cuz yk can't do it in real life 🤗  You've been one of my closest friend since birth (i hope u get the reference 😝) u're one of the people na nakakaintindi sa takbo ng utak ko, with just one look may inside joke na agad. I admire how u can connect with everyone cuz u so flexible gurrrll lahat ata ng bagay nakaka-relate ka. I want to remind u lang na u can take things slow kahit na di masyadong nakiki-agree ang course mo. u always have us kapag need mo huminga, ma-distract for a while (bilyar yan of course) at kasamang dededma sa mga pending school works.

+++ dadamayan ka namin mag-healthy living (minsan) para di ka ma-fomo sa mga kakainin namin mwehehehehe support kita dyan sa pag-prioritize mo ng health mo. pagaling ka para magawa na natin mga drawing natin. to more spontaneous ganaps and bilyar nang madaling araw! happy birthday, we luv uuu 🫶🏻` },

  {
    from: 'K',
    preview: 'Hapi bidet, my wanderwol :)',
    fullText: `hapi bente bidet eyna, yk the rest mali HAHAHAHAHHAHSHSHAHAHAHAHA

I dont know what words to pull out to start this message, but God knows how thankful and grateful I am to be called ur friend. yk how proud I am sa iyo, and thats beyond true. Isa kang walastik, mah fren. my one of the most flexible friends kaya tanggapin mo na na tinatawag kitang geek most of the time ure my favorite geek out of all geeks, tho

magulo man ang takbo ng buhay ko ngayon, isa ka sa mga hindi nagsasawang umintindi sa akin. I so love crying over everything, esp kapag ikaw na ang hinahagulgulan ko. judger ka, pero you never judge me, kahit nakita mo na ako at my very rock bottom. I am beyond and forever thankful that I have you to run to whenever everything feels like its against me

u mah og mewmew eyna. we get along with a lot of things. magkadugtong nga ata pusod natin, naputol lang. Ive seen different versions of you the mahiyain at tahimik na version and now the loud one with that baddie energy and I love all of them

niweys, magpagaling ka naman parang isang ubo ka na lang lagi tuwing binibisita ko kayo sa dorm niyo paano ko kayo malilibre ng sargo niyan? 

I always wish for nothing but the best for u. Godspeed ⭐️`
  },

  {
    from: 'Ibonieee',
    preview: 'Uyy bente  ',
    fullText: `HAPPY BIRTHDAY BEBIII!! ❤️

Uyyy, bente na siya. Gudbai -teen naaa HAHAHAHAHA

Happiest birthday sa isa sa pinakamalakas na taong kilala ko. Alam kong this year has been really rough on you, and ang dami mong pinagdaanan. I know na napapagod ka na rin, kaya I hope you take things slow, and don't pressure yourself too much. Allow yourself to breathe, rest, and be happy kahit sa mga simpleng moments lang. You deserve to enjoy life without having to worry about everything all the time.

I hope you know how much I admire you kahit minsan masungit ka sa akin tas lagi pa akong iniirapan tskk HAHAHAHAHA, I'm always here for you, and that won't change. Isang tawag mo lang, matic andyan na ako. You don't have to go through everything alone, okay?

Pagaling na po, bebiii. Andami nang gustong makipag-bilyar sa'yo. Ramdam ko na ikaw talaga MVP nila HAHAHAHAHAHA.

Enjoy your dayyy, bebiii! Deserve mo mag-enjoy ngayon. I hope this new chapter brings you more reasons to smile, more peaceful days, and all the happiness you deserve.

HAPPY 20TH BIRTHDAY!! ❤️`
  }
];



const $ = (id) => document.getElementById(id);
const TOTAL = photos.length;
const photoImages = ['miniFarLeftImg', 'miniLeftImg', 'miniCenterImg', 'miniRightImg', 'miniFarRightImg', 'leftImg', 'centerImg', 'rightImg', 'modalImage'].map($);

// Match every gallery frame to the real photo proportions.
// Portrait photos get taller frames; landscape photos get wider frames.
function fitFrameToPhoto(img) {
  if (!img.naturalWidth || !img.naturalHeight) return;
  const ratio = img.naturalWidth / img.naturalHeight;
  const frame = img.closest('.mini-card, .gallery-photo, .photo-frame');
  if (!frame) return;

  frame.style.setProperty('--photo-ratio', String(ratio));
  frame.dataset.orientation = ratio < 0.92
    ? 'portrait'
    : ratio > 1.08 ? 'landscape' : 'square';
}
photoImages.forEach(img => {
  img.addEventListener('load', () => fitFrameToPhoto(img));
  if (img.complete && img.naturalWidth) fitFrameToPhoto(img);
});

// If a personal photo isn't uploaded yet, its corresponding demo image displays instead.
photoImages.forEach(img => img.addEventListener('error', () => {
  const index = Number(img.dataset.photoIndex || 0);
  const fallback = `assets/demo-photo-${index + 1}.svg`;
  if (!img.src.endsWith(fallback)) img.src = fallback;
}));

let currentIndex = 0;
let lastMochiPosition = -1;
let previousFocus = null;


const wrap = (index) => (index + TOTAL) % TOTAL;

function setPhoto(img, index) {
  const wrapped = wrap(index);
  const newSrc = photos[wrapped];

  if (
    img.dataset.photoIndex === String(wrapped) &&
    img.getAttribute('src') === newSrc
  ) {
    return;
  }

  img.dataset.photoIndex = String(wrapped);
  img.decoding = 'async';
  img.src = newSrc;
}


function renderMini() {
  setPhoto($('miniFarRightImg'), currentIndex + 2);
  setPhoto($('miniFarLeftImg'), currentIndex - 2);
  setPhoto($('miniLeftImg'), currentIndex - 1);
  setPhoto($('miniCenterImg'), currentIndex);
  setPhoto($('miniRightImg'), currentIndex + 1);
}

// Each image shows the uploaded orange pixel cat perched along the top photo border.
function randomMochiPosition() {
  const positions = ['mochi-location-top', 'mochi-location-left', 'mochi-location-right'];
  const choices = [0, 1, 2].filter(i => i !== lastMochiPosition);
  const next = choices[Math.floor(Math.random() * choices.length)];
  lastMochiPosition = next;
  $('galleryCat').className = `gallery-cat ${positions[next]}`;
}

function renderExpanded() {
  setPhoto($('leftImg'), currentIndex - 1);
  setPhoto($('centerImg'), currentIndex);
  setPhoto($('rightImg'), currentIndex + 1);
  const letter = messages[currentIndex];
  $('messageTitle').textContent = `From: ${letter.from}`;
  $('messagePreview').textContent = letter.preview;
  randomMochiPosition();
}

function showGallery() {
  $('frontView').classList.add('hidden');
  $('expandedView').classList.remove('hidden');
  renderExpanded();
}
function minimizeGallery() {
  $('expandedView').classList.add('hidden');
  $('frontView').classList.remove('hidden');
  renderMini();
  $('expandGallery').focus();
}

function changePhoto(delta) {
  currentIndex = wrap(currentIndex + delta);

  if ($('expandedView').classList.contains('hidden')) {
    renderMini();
  } else {
    renderExpanded();
  }
}


$('expandGallery').addEventListener('click', showGallery);
$('minimizeGallery').addEventListener('click', minimizeGallery);
$('prevBtn').addEventListener('click', () => changePhoto(-1));
$('nextBtn').addEventListener('click', () => changePhoto(1));

function openLetter() {
  const letter = messages[currentIndex];
  setPhoto($('modalImage'), currentIndex);
  $('modalFrom').textContent = `From: ${letter.from}`;
  $('modalTitle').textContent = `From: ${letter.from}`;
  $('modalMessage').textContent = letter.fullText;
  previousFocus = document.activeElement;
  $('memoryModal').hidden = false;
  document.body.classList.add('modal-open');
  $('closeModal').focus();
}
function closeLetter() {
  $('memoryModal').hidden = true;
  document.body.classList.remove('modal-open');
  if (previousFocus && previousFocus.isConnected) previousFocus.focus();
}
$('openLetter').addEventListener('click', openLetter);
$('closeModal').addEventListener('click', closeLetter);
document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeLetter));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !$('memoryModal').hidden) closeLetter();
});

// Mochi's original canvas animation handles blinking, tail wagging, and tap hearts.
// No toys, feeding, petting or drag-and-drop handlers are attached here.

renderMini();
renderExpanded();
$('expandedView').classList.add('hidden');
$('frontView').classList.remove('hidden');
