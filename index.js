/*
 * Letters & Memories — Mochi edition.
 * Customize your four image paths and letters below.
 * No automatic rotation. No affection bar. Only one gallery Mochi per photo.
 */
const photos = [
  'photos/photo1.jpeg',       // Your first photo
  'photos/photo2.jpeg', // Replace when photo2.jpg is uploaded
  'photos/photo3.jpeg', // Replace when photo3.jpg is uploaded
  'photos/photo4.jpg',  // Replace when photo4.jpg is uploaded
];

const messages = [
  { from: 'Aplateau plateau', preview: 'Lesgo Sheina! lesgo home! ', fullText: `“birthday mo?”

“ah, oo.”

Oh.

Oh.

Happiet bidet wowowowowoowow. Um um um... My OG bff since li'erly like li'erly day onEzzz eyyyy. Saw how you grew and felt like a proud motha,, nyeknyok nyeknyok wowza eme. 

People who gets to be your friend are lucky. They can experience having an all-rounder friend. Namamrangka at nanunulsol, nakakaladkad pero kapag ayaw talaga, baka pwede pa rin. Parang alam lahat ng fandom, sides ng tiktok, movies, kpop, cartoons, at any any pa. Nerbyosa pero hindi natatapos ang araw na hindi nakasusubok sa kinanenerbyosang gawin

May you healthily recover and finally obtain a good health buong buhay mo 🍀

Rararara, smirnoff!!` },
  { from: 'Kirang', preview: 'Birthday na ni eyna x2', fullText: `Ayun, birthday na niya. Finally, may bente anyos na rin satin! Dito na ako mag-oover sa message cuz yk can't do it in real life 🤗  You've been one of my closest friend since birth (i hope u get the reference 😝) u're one of the people na nakakaintindi sa takbo ng utak ko, with just one look may inside joke na agad. I admire how u can connect with everyone cuz u so flexible gurrrll lahat ata ng bagay nakaka-relate ka. I want to remind u lang na u can take things slow kahit na di masyadong nakiki-agree ang course mo. u always have us kapag need mo huminga, ma-distract for a while (bilyar yan of course) at kasamang dededma sa mga pending school works.

+++ dadamayan ka namin mag-healthy living (minsan) para di ka ma-fomo sa mga kakainin namin mwehehehehe support kita dyan sa pag-prioritize mo ng health mo. pagaling ka para magawa na natin mga drawing natin. to more spontaneous ganaps and bilyar nang madaling araw! happy birthday, we luv uuu 🫶🏻` },
  { from: 'Tempo Weaver', preview: 'HABADU SHEYNAMERLSS', fullText: `Happy birthday, sheina! thank you sa pag check sakin lately 🥹💗 kahit hindi na tayo nakakapagkita, i miss you. Miss ko na bond nating magkakaibigan ung kahit pagod sa paglalakad before tapos ending laging maple or rob lang din galaan HAHAHAHAHA. Mag 20 ka na, thank you for having you as my friend. Sana maging successful ka tapos wag mo me kalimutan and miss ko na pumunta at makipagchika sayo sa dorm niyo ni cai. Ung moments natin dati ng kwentuhan, rants groupings niyo etc. At mga reaksyon mong nakakatawa HAHAHAHAHA ung commute mo na makasama mo lang din kami kahit naic pa inuuwian mo. HBD HBD ULIT SANA MAGKITA NA US ULIT lovelotsss eynamerls 💗💗💗💗` },
  { from: 'Sami', preview: 'birthday ni sheina purpol?! ', fullText: `happiest birthday, sheinamerls! 



thank you so so so much for every dorm stay, kwento, and everything. sobrang unexpected ng friendship natin yet here we are... and iʼm vv glad that we were able to go this far. 



alam mo namang ikaw lang kasama ko sa hirap dahil parehas tayo ng dinadamdam na sakit 😜 sana before this year ends, you learn to take care of yourself. marami pa tayong kailangang gawin may it be planned or spontaneous. 



i hope you enjoy your day, and know that you are a blessing to everyone. 



i loaf u so much! 💘 ` }
];

const $ = (id) => document.getElementById(id);
const TOTAL = photos.length;
const photoImages = ['miniLeftImg', 'miniCenterImg', 'miniRightImg', 'leftImg', 'centerImg', 'rightImg', 'modalImage'].map($);

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
  img.dataset.photoIndex = String(wrapped);
  img.src = photos[wrapped];
}

function renderMini() {
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
  renderMini();
  renderExpanded();
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
