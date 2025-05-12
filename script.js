document.addEventListener('DOMContentLoaded', function() {
    // Sample movie data
    const movies = [
        {
            id: 1,
            title: "አዛምድ",
            year: "2022",
            thumbnail: "images/azamd.jfif",
            videoSrc: "https://example.com/videos/tizita.mp4",
            category: "comedy"
        },
        {
            id: 2,
            title: "ፍቅር እስከ መቃብር",
            year: "2021",
            thumbnail: "images/fikr eske meqabir.jfif",
            videoSrc: "https://example.com/videos/fikir-eske-mekabir.mp4",
            category: "romance"
        },
        {
            id: 3,
            title: "ሰማያዊ ፈረስ",
            year: "2023",
            thumbnail: "images/semayawi feres.jfif",
            videoSrc: "https://example.com/videos/semayawi-feres.mp4",
            category: "action"
        },
        {
            id: 4,
            title: "የታገተ ፊቅር",
            year: "2020",
            thumbnail: "images/yetagete fikr.jfif",
            videoSrc: "https://example.com/videos/yefiker-wazema.mp4",
            category: "romance"
        },
        {
            id: 5,
            title: "ለፊቅሬ ስል",
            year: "2022",
            thumbnail: "images/lefkre sel.jfif",
            videoSrc: "https://example.com/videos/lib-weled.mp4",
            category: "drama"
        },
        {
            id: 6,
            title: "ጓደኛ ዞን",
            year: "2021",
            thumbnail: "images/guadegna zon.jfif",
            videoSrc: "https://example.com/videos/key-sert.mp4",
            category: "action"
        },
        {
            id: 7,
            title: "ዘመኔ",
            year: "2023",
            thumbnail: "images/zemene.jfif",
            videoSrc: "https://example.com/videos/zemen.mp4",
            category: "drama"
        },
        {
            id: 8,
            title: "የሱፍ አበባ",
            year: "2020",
            thumbnail: "images/yesuf abeba.jfif",
            videoSrc: "https://example.com/videos/abeba.mp4",
            category: "romance"
        }
    ];

    // New movies data
    const newMovies = [
        {
            id: 9,
            title: "ፍቅር በቃኝ",
            year: "2023",
            thumbnail: "images/fikr bekagn.jfif",
            videoSrc: "https://example.com/videos/selam-ethiopia.mp4",
            category: "drama"
        },
        {
            id: 10,
            title: "ህዳር",
            year: "2023",
            thumbnail: "images/hidar.jfif",
            videoSrc: "https://example.com/videos/guzo.mp4",
            category: "action"
        },
        {
            id: 11,
            title: "አንድ ታሪክ",
            year: "2023",
            thumbnail: "images/and tarik.jfif",
            videoSrc: "https://example.com/videos/mistir.mp4",
            category: "drama"
        },
        {
            id: 12,
            title: "አናስገባም",
            year: "2023",
            thumbnail: "images/anasgebam.jfif",
            videoSrc: "https://example.com/videos/tseday.mp4",
            category: "comedy"
        }
    ];

    // DOM Elements
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const movieGrid = document.getElementById('movie-grid');
    const newMoviesSlider = document.getElementById('new-movies-slider');
    const catalogGrid = document.getElementById('catalog-grid');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const videoModal = document.getElementById('video-modal');
    const videoPlayer = document.getElementById('video-player');
    const modalTitle = document.getElementById('modal-title');
    const closeModal = document.getElementById('close-modal');
    const sliderPrev = document.getElementById('slider-prev');
    const sliderNext = document.getElementById('slider-next');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const contactForm = document.querySelector('.contact-form');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Dark Mode Toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Mobile Menu Toggle
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#mobile-menu-toggle') && !e.target.closest('.mobile-menu')) {
            mobileMenu.classList.remove('active');
        }
    });

    // Active Navigation Link
    function setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking a link
            mobileMenu.classList.remove('active');
        });
    });

    // Render Movies
    function renderMovies(movieList, container) {
        container.innerHTML = '';
        
        if (movieList.length === 0) {
            container.innerHTML = '<p class="no-results">ምንም ፊልም አልተገኘም</p>';
            return;
        }
        
        movieList.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <div class="movie-thumbnail">
                    <img src="${movie.thumbnail}" alt="${movie.title}">
                    <div class="play-button" data-id="${movie.id}">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <p class="movie-year">${movie.year}</p>
                </div>
            `;
            container.appendChild(movieCard);
            
            // Add click event to play button
            const playButton = movieCard.querySelector('.play-button');
            playButton.addEventListener('click', () => {
                openVideoModal(movie);
            });
        });
    }

    // Render New Movies Slider
    function renderNewMovies() {
        newMoviesSlider.innerHTML = '';
        
        newMovies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.style.minWidth = '250px';
            movieCard.innerHTML = `
                <div class="movie-thumbnail">
                    <img src="${movie.thumbnail}" alt="${movie.title}">
                    <div class="play-button" data-id="${movie.id}">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <p class="movie-year">${movie.year}</p>
                </div>
            `;
            newMoviesSlider.appendChild(movieCard);
            
            // Add click event to play button
            const playButton = movieCard.querySelector('.play-button');
            playButton.addEventListener('click', () => {
                openVideoModal(movie);
            });
        });
    }

    // Slider Navigation
    sliderPrev.addEventListener('click', () => {
        newMoviesSlider.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });

    sliderNext.addEventListener('click', () => {
        newMoviesSlider.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });

    // Filter Movies by Category
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter movies
            if (filter === 'all') {
                renderMovies(movies, catalogGrid);
            } else {
                const filteredMovies = movies.filter(movie => movie.category === filter);
                renderMovies(filteredMovies, catalogGrid);
            }
        });
    });

    // Search Functionality
    function searchMovies() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredMovies = movies.filter(movie => 
            movie.title.toLowerCase().includes(searchTerm)
        );
        renderMovies(filteredMovies, movieGrid);
    }

    searchInput.addEventListener('input', searchMovies);
    searchButton.addEventListener('click', searchMovies);

    // Video Modal Functions
    function openVideoModal(movie) {
        modalTitle.textContent = movie.title;
        videoPlayer.src = movie.videoSrc;
        videoModal.style.display = 'block';
        videoPlayer.load();
        videoPlayer.play();
        
        // Prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
        videoModal.style.display = 'none';
        videoPlayer.pause();
        videoPlayer.src = '';
        
        // Re-enable scrolling
        document.body.style.overflow = 'auto';
    }

    closeModal.addEventListener('click', closeVideoModal);
    
    // Close modal when clicking outside
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.style.display === 'block') {
            closeVideoModal();
        }
    });

    // Contact Form Submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, you would send the form data to a server
        // For this example, we'll just show an alert
        alert('መልዕክትዎ በተሳካ ሁኔታ ተልኳል!');
        contactForm.reset();
    });

    // Initialize the page
    renderMovies(movies, movieGrid);
    renderNewMovies();
    renderMovies(movies, catalogGrid);
    setActiveLink();
});