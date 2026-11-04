// Personalize your birthday messages here. Each entry matches its photo in index.html.
const messages = [
  { from: "Name", preview: "Open this letter for a special surprise.", fullText: "Happy Birthday! This is my first letter to you. I hope today is filled with things that make you smile." },
  { from: "Name", preview: "A little note, just for you.", fullText: "Here is another message made with love. Replace this with the real words you want to share." },
  { from: "Name", preview: "Some memories deserve to last forever.", fullText: "Thank you for all the beautiful memories. May this birthday be as wonderful as you are." },
  { from: "Name", preview: "There is more to this photo.", fullText: "This photo reminds me of a happy moment. You can write the full story here." },
  { from: "Name", preview: "A birthday wish for you.", fullText: "Wishing you days full of hope, laughter, and the warmest memories." },
  { from: "Name", preview: "Something I've wanted to tell you.", fullText: "You have made so many ordinary days feel special. Thank you for that." },
  { from: "Name", preview: "One more cherished memory.", fullText: "Here's to all the memories we've made, and to many beautiful ones still ahead." },
  { from: "Name", preview: "The last letter, but not the last memory.", fullText: "Happy Birthday! I made this little website to remind you how appreciated you are." }
];

const gallery = document.querySelector('.image-container');
const photoImages = [...document.querySelectorAll('.image-container img')];
const title = document.getElementById('message-title');
const preview = document.getElementById('message-text');
const modal = document.getElementById('memory-modal');
const modalImage = document.getElementById('modal-image');
const modalFrom = document.getElementById('modal-from');
const modalTitle = document.getElementById('modal-title');
const fullText = document.getElementById('modal-full-message');
const openCard = document.getElementById('open-card');
const closeButton = document.getElementById('close-modal');

let selectedIndex = 0;
let rotation = -45;  // Photo 1 faces forward; the same picture's letter is selected.

function updateGallery() {
  gallery.style.transform = `perspective(1100px) rotateY(${rotation}deg)`;
  const memory = messages[selectedIndex];
  title.textContent = `From: ${memory.from}`;
  preview.textContent = memory.preview;
}

document.getElementById('prev').addEventListener('click', () => {
  selectedIndex = (selectedIndex - 1 + messages.length) % messages.length;
  rotation += 45;
  updateGallery();
});

document.getElementById('next').addEventListener('click', () => {
  selectedIndex = (selectedIndex + 1) % messages.length;
  rotation -= 45;
  updateGallery();
});

function openMemory() {
  const memory = messages[selectedIndex];
  modalImage.src = photoImages[selectedIndex].src;
  modalImage.alt = `Enlarged memory photo ${selectedIndex + 1}`;
  modalFrom.textContent = `From: ${memory.from}`;
  modalTitle.textContent = `From: ${memory.from}`;
  fullText.textContent = memory.fullText;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  closeButton.focus();
}

function closeMemory() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  openCard.focus();
}

openCard.addEventListener('click', openMemory);
closeButton.addEventListener('click', closeMemory);
modal.querySelector('[data-close-modal]').addEventListener('click', closeMemory);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) closeMemory();
});

// No timer for photos. Only the arrows rotate the 3D gallery.
updateGallery();
