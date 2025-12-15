// Data kuis tentang hardware dan software
const quizData = [
    {
        question: "Apa kepanjangan dari CPU?",
        options: [
            "Central Processing Unit",
            "Computer Processing Unit", 
            "Central Program Unit",
            "Computer Program Unit"
        ],
        correct: 0,
        category: "Hardware"
    },
    {
        question: "Manakah yang termasuk perangkat input?",
        options: [
            "Monitor",
            "Printer", 
            "Speaker",
            "Keyboard"
        ],
        correct: 3,
        category: "Hardware"
    },
    {
        question: "Apa fungsi utama RAM?",
        options: [
            "Menyimpan data permanen",
            "Memproses instruksi program", 
            "Menyimpan data sementara yang sedang diproses",
            "Menampilkan gambar di monitor"
        ],
        correct: 2,
        category: "Hardware"
    },
    {
        question: "Manakah yang termasuk sistem operasi?",
        options: [
            "Microsoft Word",
            "Adobe Photoshop", 
            "Windows 10",
            "Google Chrome"
        ],
        correct: 2,
        category: "Software"
    },
    {
        question: "Apa perbedaan utama antara software sistem dan aplikasi?",
        options: [
            "Software sistem berbayar, aplikasi gratis",
            "Software sistem untuk programmer, aplikasi untuk pengguna biasa",
            "Software sistem mengelola komputer, aplikasi untuk tugas spesifik",
            "Tidak ada perbedaan, keduanya sama"
        ],
        correct: 2,
        category: "Software"
    },
    {
        question: "Apa yang dimaksud dengan open source software?",
        options: [
            "Software yang harus dibeli dengan harga mahal",
            "Software yang kode sumbernya tersedia untuk umum",
            "Software yang hanya bisa digunakan oleh perusahaan",
            "Software yang tidak bisa diinstal di komputer"
        ],
        correct: 1,
        category: "Software"
    },
    {
        question: "Komponen manakah yang disebut sebagai 'otak' komputer?",
        options: [
            "RAM",
            "Motherboard", 
            "CPU",
            "Hard Disk"
        ],
        correct: 2,
        category: "Hardware"
    },
    {
        question: "Manakah yang BUKAN termasuk perangkat output?",
        options: [
            "Monitor",
            "Printer", 
            "Speaker",
            "Scanner"
        ],
        correct: 3,
        category: "Hardware"
    },
    {
        question: "Apa kepanjangan dari OS dalam istilah komputer?",
        options: [
            "Operating Software",
            "Operating System", 
            "Output System",
            "Optical Storage"
        ],
        correct: 1,
        category: "Software"
    },
    {
        question: "Software manakah yang digunakan untuk membuat dokumen teks?",
        options: [
            "Microsoft Excel",
            "Adobe Photoshop", 
            "Microsoft Word",
            "Google Chrome"
        ],
        correct: 2,
        category: "Software"
    }
];

// Variabel untuk melacak status kuis
let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(quizData.length).fill(null);

// Fungsi untuk inisialisasi kuis
function initQuiz() {
    const startButton = document.getElementById('startQuiz');
    const nextButton = document.getElementById('nextQuestion');
    const prevButton = document.getElementById('prevQuestion');
    const submitButton = document.getElementById('submitQuiz');
    
    // Sembunyikan hasil dan tampilkan kuis
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('quizQuestions').style.display = 'block';
    
    // Event listener untuk tombol mulai
    if (startButton) {
        startButton.addEventListener('click', startQuiz);
    }
    
    // Event listener untuk tombol navigasi
    if (nextButton) {
        nextButton.addEventListener('click', () => navigateQuestion(1));
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', () => navigateQuestion(-1));
    }
    
    // Event listener untuk tombol submit
    if (submitButton) {
        submitButton.addEventListener('click', submitQuiz);
    }
    
    // Tampilkan pertanyaan pertama jika kuis sudah dimulai
    if (currentQuestion >= 0) {
        displayQuestion();
        updateProgressBar();
        updateNavigationButtons();
    }
}

// Fungsi untuk memulai kuis
function startQuiz() {
    // Reset variabel kuis
    currentQuestion = 0;
    score = 0;
    userAnswers.fill(null);
    
    // Tampilkan area kuis dan sembunyikan tombol mulai
    document.getElementById('quizStart').style.display = 'none';
    document.getElementById('quizQuestions').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
    
    // Tampilkan pertanyaan pertama
    displayQuestion();
    updateProgressBar();
    updateNavigationButtons();
    
    // Tampilkan pesan mulai
    showQuizMessage("Kuis dimulai! Pilih jawaban yang menurutmu benar.", "info");
}

// Fungsi untuk menampilkan pertanyaan
function displayQuestion() {
    const questionElement = document.getElementById('questionText');
    const optionsElement = document.getElementById('questionOptions');
    const questionCounter = document.getElementById('questionCounter');
    const questionCategory = document.getElementById('questionCategory');
    
    if (currentQuestion < 0 || currentQuestion >= quizData.length) return;
    
    const question = quizData[currentQuestion];
    
    // Tampilkan teks pertanyaan
    if (questionElement) {
        questionElement.textContent = question.question;
    }
    
    // Tampilkan nomor pertanyaan
    if (questionCounter) {
        questionCounter.textContent = `Pertanyaan ${currentQuestion + 1} dari ${quizData.length}`;
    }
    
    // Tampilkan kategori
    if (questionCategory) {
        questionCategory.textContent = `Kategori: ${question.category}`;
        questionCategory.className = `question-category ${question.category.toLowerCase()}`;
    }
    
    // Kosongkan opsi sebelumnya
    if (optionsElement) {
        optionsElement.innerHTML = '';
        
        // Buat opsi jawaban
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('button');
            optionElement.className = 'quiz-option';
            if (userAnswers[currentQuestion] === index) {
                optionElement.classList.add('selected');
            }
            optionElement.textContent = option;
            optionElement.dataset.index = index;
            
            optionElement.addEventListener('click', () => selectOption(index));
            
            optionsElement.appendChild(optionElement);
        });
    }
}

// Fungsi untuk memilih opsi jawaban
function selectOption(optionIndex) {
    // Simpan jawaban pengguna
    userAnswers[currentQuestion] = optionIndex;
    
    // Update tampilan opsi yang dipilih
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((option, index) => {
        if (index === optionIndex) {
            option.classList.add('selected');
            
            // Tambahkan efek visual untuk jawaban yang dipilih
            option.style.animation = 'none';
            setTimeout(() => {
                option.style.animation = 'pulse 0.3s';
            }, 10);
        } else {
            option.classList.remove('selected');
        }
    });
    
    // Update status tombol navigasi
    updateNavigationButtons();
    
    // Mainkan efek suara
    playQuizSound('select');
}

// Fungsi untuk navigasi pertanyaan
function navigateQuestion(direction) {
    // Validasi batas pertanyaan
    const newIndex = currentQuestion + direction;
    if (newIndex < 0 || newIndex >= quizData.length) return;
    
    // Update indeks pertanyaan saat ini
    currentQuestion = newIndex;
    
    // Tampilkan pertanyaan
    displayQuestion();
    updateProgressBar();
    updateNavigationButtons();
    
    // Mainkan efek suara
    playQuizSound('navigate');
}

// Fungsi untuk memperbarui progress bar
function updateProgressBar() {
    const progressBar = document.getElementById('quizProgress');
    if (progressBar) {
        const progress = ((currentQuestion + 1) / quizData.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

// Fungsi untuk memperbarui status tombol navigasi
function updateNavigationButtons() {
    const prevButton = document.getElementById('prevQuestion');
    const nextButton = document.getElementById('nextQuestion');
    const submitButton = document.getElementById('submitQuiz');
    
    // Update tombol previous
    if (prevButton) {
        prevButton.disabled = currentQuestion === 0;
    }
    
    // Update tombol next
    if (nextButton) {
        if (currentQuestion === quizData.length - 1) {
            nextButton.style.display = 'none';
            if (submitButton) submitButton.style.display = 'inline-block';
        } else {
            nextButton.style.display = 'inline-block';
            if (submitButton) submitButton.style.display = 'none';
        }
    }
    
    // Update tombol submit (hanya ditampilkan di pertanyaan terakhir)
    if (submitButton) {
        submitButton.disabled = userAnswers[currentQuestion] === null;
    }
}

// Fungsi untuk mengirim kuis
function submitQuiz() {
    // Hitung skor
    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizData[index].correct) {
            score++;
        }
    });
    
    // Tampilkan hasil
    showResults();
    
    // Mainkan efek suara
    playQuizSound(score >= quizData.length / 2 ? 'win' : 'lose');
}

// Fungsi untuk menampilkan hasil kuis
function showResults() {
    // Sembunyikan pertanyaan dan tampilkan hasil
    document.getElementById('quizQuestions').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    
    // Hitung persentase
    const percentage = Math.round((score / quizData.length) * 100);
    
    // Update elemen hasil
    document.getElementById('scoreValue').textContent = `${score} / ${quizData.length}`;
    document.getElementById('scorePercentage').textContent = `${percentage}%`;
    
    // Tampilkan pesan berdasarkan skor
    const messageElement = document.getElementById('scoreMessage');
    let message = "";
    let messageType = "";
    
    if (percentage >= 90) {
        message = "Luar biasa! Kamu sangat menguasai materi hardware dan software!";
        messageType = "excellent";
    } else if (percentage >= 70) {
        message = "Bagus! Pemahamanmu tentang hardware dan software sudah baik.";
        messageType = "good";
    } else if (percentage >= 50) {
        message = "Cukup baik. Pertahankan dan tingkatkan lagi belajarmu!";
        messageType = "average";
    } else {
        message = "Yuk, belajar lagi! Pelajari materi hardware dan software lebih dalam.";
        messageType = "poor";
    }
    
    messageElement.textContent = message;
    messageElement.className = `quiz-message ${messageType}`;
    
    // Tampilkan detail jawaban
    const answersElement = document.getElementById('answersDetail');
    answersElement.innerHTML = '';
    
    quizData.forEach((question, index) => {
        const answerItem = document.createElement('div');
        answerItem.className = 'answer-item';
        
        const isCorrect = userAnswers[index] === question.correct;
        const userAnswerText = userAnswers[index] !== null ? 
            question.options[userAnswers[index]] : "Tidak dijawab";
        const correctAnswerText = question.options[question.correct];
        
        answerItem.innerHTML = `
            <div class="answer-question"><strong>${index + 1}. ${question.question}</strong></div>
            <div class="answer-user ${isCorrect ? 'correct' : 'incorrect'}">
                <span>Jawaban kamu:</span> ${userAnswerText}
            </div>
            ${!isCorrect ? `
                <div class="answer-correct">
                    <span>Jawaban benar:</span> ${correctAnswerText}
                </div>
            ` : ''}
            <div class="answer-category">Kategori: ${question.category}</div>
        `;
        
        answersElement.appendChild(answerItem);
    });
    
    // Tampilkan pesan hasil
    showQuizMessage(`Kuis selesai! Skor kamu: ${score}/${quizData.length}`, 
                   percentage >= 70 ? "success" : "info");
}

// Fungsi untuk memainkan efek suara kuis
function playQuizSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Tentukan frekuensi berdasarkan jenis suara
        let frequency = 440;
        let duration = 0.1;
        
        switch(type) {
            case 'select':
                frequency = 523.25; // C5
                break;
            case 'navigate':
                frequency = 392; // G4
                break;
            case 'correct':
                frequency = 659.25; // E5
                duration = 0.2;
                break;
            case 'incorrect':
                frequency = 220; // A3
                duration = 0.3;
                break;
            case 'win':
                // Mainkan chord kemenangan
                playChord([659.25, 830.61, 987.77], 0.5);
                return;
            case 'lose':
                frequency = 146.83; // D3
                duration = 0.5;
                break;
        }
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
        console.log("Web Audio API tidak didukung");
    }
}

// Fungsi untuk memainkan chord (beberapa nada sekaligus)
function playChord(frequencies, duration) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        frequencies.forEach(freq => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = freq;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        });
    } catch (e) {
        console.log("Web Audio API tidak didukung");
    }
}

// Fungsi untuk menampilkan pesan kuis
function showQuizMessage(message, type) {
    // Hapus pesan sebelumnya jika ada
    const existingMessage = document.querySelector('.quiz-notification');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Buat elemen pesan baru
    const messageElement = document.createElement('div');
    messageElement.className = `quiz-notification ${type}`;
    messageElement.textContent = message;
    
    // Tambahkan ke halaman
    document.querySelector('.quiz-container').prepend(messageElement);
    
    // Hapus pesan setelah 3 detik
    setTimeout(() => {
        messageElement.classList.add('fade-out');
        setTimeout(() => {
            messageElement.remove();
        }, 500);
    }, 3000);
}

// Fungsi untuk restart kuis
function restartQuiz() {
    // Reset ke keadaan awal
    currentQuestion = 0;
    score = 0;
    userAnswers.fill(null);
    
    // Tampilkan layar mulai
    document.getElementById('quizStart').style.display = 'block';
    document.getElementById('quizQuestions').style.display = 'none';
    document.getElementById('quizResults').style.display = 'none';
    
    // Tampilkan pesan
    showQuizMessage("Kuis telah direset. Klik 'Mulai Kuis' untuk memulai lagi.", "info");
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah kita berada di halaman kuis
    if (document.getElementById('quizContainer')) {
        initQuiz();
        
        // Tambahkan tombol restart
        const restartButton = document.getElementById('restartQuiz');
        if (restartButton) {
            restartButton.addEventListener('click', restartQuiz);
        }
        
        // Tambahkan style untuk notifikasi dan animasi
        const style = document.createElement('style');
        style.textContent = `
            .quiz-notification {
                padding: 15px;
                margin-bottom: 20px;
                border: 3px solid;
                font-family: 'Press Start 2P', cursive;
                font-size: 0.8rem;
                text-align: center;
                animation: slideDown 0.3s ease-out;
            }
            
            .quiz-notification.info {
                background-color: rgba(0, 243, 255, 0.1);
                border-color: var(--neon-blue);
                color: var(--neon-blue);
            }
            
            .quiz-notification.success {
                background-color: rgba(0, 255, 157, 0.1);
                border-color: var(--neon-green);
                color: var(--neon-green);
            }
            
            .quiz-notification.fade-out {
                opacity: 0;
                transform: translateY(-20px);
                transition: all 0.5s;
            }
            
            .question-category {
                display: inline-block;
                padding: 5px 10px;
                margin-bottom: 15px;
                border: 2px solid;
                font-size: 0.8rem;
            }
            
            .question-category.hardware {
                border-color: var(--neon-blue);
                color: var(--neon-blue);
                background-color: rgba(0, 243, 255, 0.1);
            }
            
            .question-category.software {
                border-color: var(--neon-green);
                color: var(--neon-green);
                background-color: rgba(0, 255, 157, 0.1);
            }
            
            .answer-item {
                padding: 15px;
                margin-bottom: 15px;
                border: 2px solid #333;
                background-color: rgba(255, 255, 255, 0.05);
            }
            
            .answer-user.correct {
                color: var(--neon-green);
            }
            
            .answer-user.incorrect {
                color: var(--neon-pink);
            }
            
            .answer-correct {
                color: var(--neon-blue);
                margin-top: 5px;
            }
            
            .answer-category {
                margin-top: 10px;
                font-size: 0.8rem;
                color: var(--text-secondary);
            }
            
            .quiz-message {
                margin: 20px 0;
                padding: 15px;
                border: 3px solid;
                text-align: center;
            }
            
            .quiz-message.excellent {
                border-color: gold;
                color: gold;
                background-color: rgba(255, 215, 0, 0.1);
            }
            
            .quiz-message.good {
                border-color: var(--neon-green);
                color: var(--neon-green);
            }
            
            .quiz-message.average {
                border-color: orange;
                color: orange;
                background-color: rgba(255, 165, 0, 0.1);
            }
            
            .quiz-message.poor {
                border-color: var(--neon-pink);
                color: var(--neon-pink);
            }
            
            @keyframes slideDown {
                from { transform: translateY(-20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
});