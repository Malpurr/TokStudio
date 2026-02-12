// TokStudio — Video Feed with Vertical Snap Scrolling

const VideoFeed = {
    container: null,
    currentIndex: 0,
    videos: [],

    mockVideos: [
        {
            username: '@creator1',
            description: 'Check out this amazing sunset 🌅 #nature #vibes',
            music: 'Sunset Vibes - Lofi Beats',
            likes: '245.3K',
            comments: '1,432',
            shares: '5,678',
            gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        },
        {
            username: '@dancer_pro',
            description: 'New choreography drop 💃🔥 #dance #trending',
            music: 'Original Sound - dancer_pro',
            likes: '1.2M',
            comments: '45.2K',
            shares: '89.1K',
            gradient: 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)',
        },
        {
            username: '@foodie',
            description: 'Wait for it... 🍕 #cooking #recipe',
            music: 'Cooking Time - Chef Beats',
            likes: '567K',
            comments: '8,901',
            shares: '12.3K',
            gradient: 'linear-gradient(135deg, #6b2fa0 0%, #f2994a 100%)',
        },
        {
            username: '@travel_diary',
            description: 'Found paradise 🏝️ #travel #explore #wanderlust',
            music: 'Island Breeze - Summer Mix',
            likes: '892K',
            comments: '15.6K',
            shares: '34.2K',
            gradient: 'linear-gradient(135deg, #004e92 0%, #000428 100%)',
        },
        {
            username: '@comedy_king',
            description: 'POV: Monday morning 😂💀 #funny #relatable',
            music: 'Original Sound - comedy_king',
            likes: '2.1M',
            comments: '98.7K',
            shares: '156K',
            gradient: 'linear-gradient(135deg, #c31432 0%, #240b36 100%)',
        },
    ],

    init() {
        this.container = document.getElementById('video-feed');
        if (!this.container) return;
        
        this.render();
        this.setupScrollObserver();
        console.log('[TokStudio] Video feed initialized');
    },

    createVideoHTML(video, index) {
        return `
            <div class="video-item ${index === 0 ? 'active' : ''}" data-index="${index}">
                <div class="video-placeholder" style="background: ${video.gradient}">
                    <div class="video-gradient-top"></div>
                    <div class="video-gradient-bottom"></div>
                </div>
                <div class="video-overlay">
                    <div class="action-buttons">
                        <div class="avatar-button">
                            <div class="avatar-small"></div>
                            <div class="follow-badge">+</div>
                        </div>
                        <button class="action-btn" data-action="like">
                            <span class="action-icon">♥</span>
                            <span class="action-count">${video.likes}</span>
                        </button>
                        <button class="action-btn" data-action="comment">
                            <span class="action-icon">💬</span>
                            <span class="action-count">${video.comments}</span>
                        </button>
                        <button class="action-btn" data-action="share">
                            <span class="action-icon">↗</span>
                            <span class="action-count">${video.shares}</span>
                        </button>
                        <button class="action-btn" data-action="bookmark">
                            <span class="action-icon">🔖</span>
                        </button>
                    </div>
                    <div class="video-info">
                        <p class="video-username">${video.username}</p>
                        <p class="video-description">${video.description}</p>
                        <div class="music-ticker">
                            <span class="music-icon">♪</span>
                            <span class="music-name">${video.music}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    render() {
        this.container.innerHTML = this.mockVideos
            .map((v, i) => this.createVideoHTML(v, i))
            .join('');
        
        // Attach like handlers
        this.container.querySelectorAll('[data-action="like"]').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('liked');
            });
        });
    },

    setupScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = parseInt(entry.target.dataset.index);
                    this.currentIndex = idx;
                    
                    // Update active states
                    this.container.querySelectorAll('.video-item').forEach(el => {
                        el.classList.toggle('active', parseInt(el.dataset.index) === idx);
                    });
                }
            });
        }, {
            root: this.container,
            threshold: 0.6
        });

        this.container.querySelectorAll('.video-item').forEach(el => {
            observer.observe(el);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => VideoFeed.init());
