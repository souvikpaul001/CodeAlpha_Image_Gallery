// Image data array
const images = [
    { src: 'https://wallpaperaccess.com/full/349872.jpg', category: 'nature', caption: 'Mountain Vista' },
    { src: 'https://tse2.mm.bing.net/th/id/OIP.aTLCE4YMLtQWqDe_Gdz-5wHaEo?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=600', category: 'nature', caption: 'Sunset Beach' },
    { src: 'https://tse2.mm.bing.net/th/id/OIP.CuiQ7CSSej-QMbwpS2z-1QHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3', category: 'car', caption: 'Lamborghini' },
    { src: 'https://th.bing.com/th/id/R.ef92072cb72cda374416f3061a1042dc?rik=G1ZOZBP%2ba2vWoA&riu=http%3a%2f%2fmedia.architecturaldigest.com%2fphotos%2f5699802bc6772b7614567435%2fmaster%2fpass%2fnew-york-city-guide.jpg&ehk=PZIhbuZENsoKveFEAJCtXWs7wBrajYvGzHKiPGhT24c%3d&risl=1&pid=ImgRaw&r=0', category: 'city', caption: 'NYC' },
    { src: 'https://wallpapercave.com/wp/wp9938035.jpg', category: 'Group photo', caption: 'Friend trip' },
    { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600', category: 'nature', caption: 'Forest Path' },
    { src: 'https://i.ytimg.com/vi/bBMjrvNpd4A/maxresdefault.jpg', category: 'city', caption: 'Kolkata' },
    { src: 'https://wallpapers.com/images/hd/group-on-mountain-arms-on-shoulders-wb67kbaxo2kx5h3d.jpg', category: 'Group photo', caption: 'Friends' },
    { src: 'https://images.wallpapersden.com/image/download/misty-yosemite_am5laWiUmZqaraWkpJRobWllrWdma2U.jpg', category: 'nature', caption: 'Misty Mountains' },
    { src: 'https://electrek.co/wp-content/uploads/sites/3/2018/03/707142_mission_e_cross_turismo_2018_porsche_ag-e1520335133282.jpg?quality=82&strip=all', category: 'car', caption: 'Porsche' },
    { src: 'https://tse3.mm.bing.net/th/id/OIP.EAz3zhJ4W3ca1LGj2T898AHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3', category: 'city', caption: 'bengaluru' },
    { src: 'https://wallpaperaccess.com/full/419183.jpg', category: 'nature', caption: 'Winter' },
    { src: 'https://wallpaperaccess.com/full/489713.jpg', category: 'city', caption: 'Dubai' },
    { src: 'https://tse2.mm.bing.net/th/id/OIP.2-xYaI69xb-2XNKhvNxcHwHaE6?cb=ucfimg2&ucfimg=1&w=1100&h=730&rs=1&pid=ImgDetMain&o=7&rm=3', category: 'Group photo', caption: 'Family' },
    { src: 'https://tse1.mm.bing.net/th/id/OIP.x1yYaewQ3EZJdtgErcT5qgHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3', category: 'car', caption: 'BMW' },
];

let currentFilter = 'all';
let currentIndex = 0;
let filteredImages = [...images];


const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function renderGallery() {
    gallery.innerHTML = '';
    filteredImages.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${img.src}" alt="${img.caption}">
            <div class="item-caption">${img.caption}</div>
        `;
        item.addEventListener('click', () => openLightbox(index));
        gallery.appendChild(item);
    });
}

function filterGallery(category) {
    currentFilter = category;
    filteredImages = category === 'all' 
        ? [...images] 
        : images.filter(img => img.category === category);
    renderGallery();
}

function openLightbox(index) {
    currentIndex = index;
    lightbox.classList.add('active');
    updateLightboxImage();
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

function updateLightboxImage() {
    const img = filteredImages[currentIndex];
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.caption;
}

function showNext() {
    currentIndex = (currentIndex + 1) % filteredImages.length;
    updateLightboxImage();
}

function showPrev() {
    currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightboxImage();
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');
        filterGallery(e.target.dataset.filter);
    });
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
});

renderGallery();