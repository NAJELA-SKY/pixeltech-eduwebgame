// Data flashcard untuk hardware dan software
const flashcardData = [
    {
        id: 1,
        category: "Hardware",
        question: "Apa fungsi utama CPU?",
        answer: "CPU (Central Processing Unit) adalah otak komputer yang menjalankan instruksi program dan memproses data."
    },
    {
        id: 2,
        category: "Hardware",
        question: "Apa itu RAM?",
        answer: "RAM (Random Access Memory) adalah memori jangka pendek yang menyimpan data sementara yang sedang diproses oleh komputer."
    },
    {
        id: 3,
        category: "Hardware",
        question: "Apa perbedaan antara perangkat input dan output?",
        answer: "Perangkat input memasukkan data ke komputer (keyboard, mouse), sedangkan perangkat output menampilkan hasil pemrosesan data (monitor, printer)."
    },
    {
        id: 4,
        category: "Software",
        question: "Apa yang dimaksud dengan sistem operasi?",
        answer: "Sistem operasi adalah software yang mengelola hardware komputer dan menyediakan layanan untuk aplikasi software."
    },
    {
        id: 5,
        category: "Software",
        question: "Apa perbedaan software sistem dan aplikasi?",
        answer: "Software sistem mengelola operasi komputer (OS, driver), sedangkan software aplikasi melakukan tugas spesifik untuk pengguna (Word, Photoshop)."
    },
    {
        id: 6,
        category: "Hardware",
        question: "Apa fungsi motherboard?",
        answer: "Motherboard adalah papan sirkuit utama yang menghubungkan semua komponen komputer seperti CPU, RAM, dan kartu ekspansi."
    },
    {
        id: 7,
        category: "Software",
        question: "Apa itu open source software?",
        answer: "Open source software adalah perangkat lunak yang kode sumbernya tersedia untuk umum dan dapat dimodifikasi oleh siapa saja."
    },
    {
        id: 8,
        category: "Hardware",
        question: "Apa itu GPU?",
        answer: "GPU (Graphics Processing Unit) adalah prosesor khusus yang menangani rendering grafis dan gambar, sangat penting untuk game dan desain."
    }
];

// Inisialisasi variabel flashcard
let currentCardIndex = 0;
let isFlipped = false;

// Fungsi untuk inisialisasi flashcard
function initFlashcard() {
    const flashcard = document.getElementById('flashcard');
    const cardQuestion = document.getElementById('cardQuestion');
    const cardAnswer = document.getElementById('cardAnswer');
    const cardCategory = document.getElementById('cardCategory');
    const cardCounter = document.getElementById('cardCounter');
    const prevButton = document.getElementById('prevCard');
    const nextButton = document.getElementById('nextCard');
    const flipButton = document.getElementById('flipCard');
    const shuffleButton = document.getElementById('shuffleCards');
    
    // Tampilkan flashcard pertama
    updateFlashcard();
    
    // Event listener untuk flip card
    if (flashcard) {
        flashcard.addEventListener('click', function() {
            flipCard();
        });
    }
    
    if (flipButton) {
        flipButton.addEventListener('click', function(e) {
            e.stopPropagation();
            flipCard();
        });
    }
    
    // Event listener untuk navigasi
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            navigateCard(-1);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            navigateCard(1);
        });
    }
    
    // Event listener untuk shuffle
    if (shuffleButton) {
        shuffleButton.addEventListener('click', function() {
            shuffleCards();
        });
    }
    
    // Tambahkan kontrol keyboard
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowLeft':
                navigateCard(-1);
                break;
            case 'ArrowRight':
                navigateCard(1);
                break;
            case ' ':
            case 'Enter':
                e.preventDefault();
                flipCard();
                break;
        }
    });
}

// Fungsi untuk membalik kartu
function flipCard() {
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        isFlipped = !isFlipped;
        flashcard.classList.toggle('flipped', isFlipped);
        
        // Tambahkan efek suara (opsional)
        playClickSound();
    }
}

// Fungsi untuk navigasi kartu
function navigateCard(direction) {
    // Reset posisi kartu sebelum pindah
    isFlipped = false;
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        flashcard.classList.remove('flipped');
    }
    
    // Update indeks kartu
    currentCardIndex += direction;
    
    // Pastikan indeks tetap dalam batas array
    if (currentCardIndex < 0) {
        currentCardIndex = flashcardData.length - 1;
    } else if (currentCardIndex >= flashcardData.length) {
        currentCardIndex = 0;
    }
    
    // Update tampilan kartu
    updateFlashcard();
    playClickSound();
}

// Fungsi untuk mengacak kartu
function shuffleCards() {
    // Reset posisi kartu
    isFlipped = false;
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        flashcard.classList.remove('flipped');
    }
    
    // Acak array flashcardData
    for (let i = flashcardData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flashcardData[i], flashcardData[j]] = [flashcardData[j], flashcardData[i]];
    }
    
    // Reset ke kartu pertama setelah diacak
    currentCardIndex = 0;
    updateFlashcard();
    playClickSound();
    
    // Tampilkan pesan shuffle
    showMessage("Kartu telah diacak!", "success");
}

// Fungsi untuk memperbarui tampilan flashcard
function updateFlashcard() {
    const card = flashcardData[currentCardIndex];
    
    const cardQuestion = document.getElementById('cardQuestion');
    const cardAnswer = document.getElementById('cardAnswer');
    const cardCategory = document.getElementById('cardCategory');
    const cardCounter = document.getElementById('cardCounter');
    
    if (cardQuestion) cardQuestion.textContent = card.question;
    if (cardAnswer) cardAnswer.textContent = card.answer;
    if (cardCategory) cardCategory.textContent = card.category;
    if (cardCounter) cardCounter.textContent = `Kartu ${currentCardIndex + 1} dari ${flashcardData.length}`;
    
    // Update warna kategori
    updateCategoryColor(card.category);
}

// Fungsi untuk mengupdate warna berdasarkan kategori
function updateCategoryColor(category) {
    const categoryElement = document.getElementById('cardCategory');
    if (!categoryElement) return;
    
    // Reset semua kelas warna
    categoryElement.classList.remove('hardware-color', 'software-color');
    
    // Tambahkan kelas sesuai kategori
    if (category === "Hardware") {
        categoryElement.classList.add('hardware-color');
    } else if (category === "Software") {
        categoryElement.classList.add('software-color');
    }
}

// Fungsi untuk memainkan efek suara klik
function playClickSound() {
    // Buat elemen audio untuk efek suara
    const audio = new Audio();
    
    // Coba buat suara menggunakan Web Audio API (tanpa file audio)
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = isFlipped ? 600 : 400;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.log("Web Audio API tidak didukung di browser ini");
    }
}

// Fungsi untuk menampilkan pesan
function showMessage(message, type) {
    // Hapus pesan sebelumnya jika ada
    const existingMessage = document.querySelector('.flashcard-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Buat elemen pesan baru
    const messageElement = document.createElement('div');
    messageElement.className = `flashcard-message ${type}`;
    messageElement.textContent = message;
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? 'rgba(0, 255, 157, 0.9)' : 'rgba(255, 42, 109, 0.9)'};
        color: #0a0a1a;
        border: 3px solid ${type === 'success' ? '#00ff9d' : '#ff2a6d'};
        font-family: 'Press Start 2P', cursive;
        font-size: 0.8rem;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Tambahkan animasi CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(messageElement);
    
    // Hapus pesan setelah 3 detik
    setTimeout(() => {
        messageElement.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            messageElement.remove();
        }, 300);
    }, 3000);
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah kita berada di halaman flashcard
    if (document.getElementById('flashcard')) {
        initFlashcard();
        
        // Tambahkan style untuk warna kategori
        const style = document.createElement('style');
        style.textContent = `
            .hardware-color {
                color: #00f3ff !important;
            }
            .software-color {
                color: #00ff9d !important;
            }
        `;
        document.head.appendChild(style);
    }
});