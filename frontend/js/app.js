// TokStudio — Core App Logic

const App = {
    currentTab: 'home',
    
    init() {
        this.setupNavigation();
        this.setupGestures();
        console.log('[TokStudio] App initialized');
    },

    setupNavigation() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = item.dataset.tab;
                if (tab) this.switchTab(tab);
            });
        });
    },

    switchTab(tab) {
        this.currentTab = tab;
        
        // Update nav active state
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.toggle('active', el.dataset.tab === tab);
        });

        // Show/hide feed
        const feed = document.getElementById('video-feed');
        if (feed) {
            feed.style.display = tab === 'home' ? '' : 'none';
        }

        console.log(`[TokStudio] Switched to tab: ${tab}`);
    },

    setupGestures() {
        let lastTap = 0;
        
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTap < 300) {
                this.handleDoubleTap(e);
            }
            lastTap = now;
        }, { passive: true });
    },

    handleDoubleTap(e) {
        const touch = e.changedTouches?.[0];
        if (!touch) return;
        
        // Only on video items
        const videoItem = e.target.closest?.('.video-item');
        if (!videoItem) return;

        // Create heart animation
        const heart = document.createElement('div');
        heart.className = 'double-tap-heart';
        heart.textContent = '♥';
        heart.style.left = touch.clientX + 'px';
        heart.style.top = touch.clientY + 'px';
        videoItem.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
