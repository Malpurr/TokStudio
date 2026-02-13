/* ===== Video Feed Module ===== */

const VideoFeed = {
  videos: [
    { id: 1, user: 'sophia_art', initial: 'S', desc: 'Creating magic with watercolors ✨ #art #painting', music: 'Lofi Dreams - ChillBeats', likes: '42.1K', comments: '1,248', shares: '892', saves: '3.2K', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 2, user: 'alex.dev', initial: 'A', desc: 'Built this app in 48 hours 🚀 What do you think? #coding #dev', music: 'Midnight City - M83', likes: '18.7K', comments: '567', shares: '2.1K', saves: '5.4K', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: 3, user: 'luna.creates', initial: 'L', desc: 'POV: You discover a hidden café in Tokyo 🗼☕', music: 'Sakura - Japanese Lofi', likes: '89.3K', comments: '3,421', shares: '12.4K', saves: '8.9K', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { id: 4, user: 'marcox', initial: 'M', desc: 'This sunset was unreal 🌅 Nature never disappoints', music: 'Golden Hour - JVKE', likes: '156K', comments: '5,678', shares: '23.1K', saves: '14.2K', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { id: 5, user: 'design.daily', initial: 'D', desc: 'UI design process from scratch → final ✦ #design #ux', music: 'Blinding Lights - The Weeknd', likes: '34.5K', comments: '892', shares: '4.3K', saves: '11.7K', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
    { id: 6, user: 'jay_music', initial: 'J', desc: 'Produced this beat on my phone 🎵 Full track dropping soon', music: 'Original Sound - jay_music', likes: '67.8K', comments: '2,134', shares: '8.9K', saves: '6.3K', gradient: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)' },
    { id: 7, user: 'emma.vibes', initial: 'E', desc: 'Outfit check 💫 Thrifted everything for under $30', music: 'Levitating - Dua Lipa', likes: '23.4K', comments: '743', shares: '1.8K', saves: '4.1K', gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' },
    { id: 8, user: 'tech.wizard', initial: 'T', desc: 'Explaining quantum computing in 60 seconds ⚛️', music: 'Interstellar Theme - Hans Zimmer', likes: '112K', comments: '8,921', shares: '34.5K', saves: '22.1K', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { id: 9, user: 'creative.hub', initial: 'C', desc: 'Stop motion animation frame by frame 🎬 #animation', music: 'Electric Feel - MGMT', likes: '56.7K', comments: '1,567', shares: '6.7K', saves: '9.8K', gradient: 'linear-gradient(135deg, #f5576c 0%, #ff6a00 100%)' },
    { id: 10, user: 'neon.dreams', initial: 'N', desc: 'Cyberpunk city at night 🌃 Shot on iPhone', music: 'Synthwave Nights - RetroBeats', likes: '78.9K', comments: '2,890', shares: '15.3K', saves: '12.6K', gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)' },
    { id: 11, user: 'fit.journey', initial: 'F', desc: '30-day transformation 💪 Consistency is key', music: 'Stronger - Kanye West', likes: '45.2K', comments: '1,234', shares: '7.8K', saves: '5.5K', gradient: 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)' },
    { id: 12, user: 'cook.master', initial: 'K', desc: 'Making the perfect ramen from scratch 🍜', music: 'lo-fi cooking vibes', likes: '91.3K', comments: '4,567', shares: '18.2K', saves: '16.8K', gradient: 'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)' },
  ],

  likedVideos: new Set(),
  savedVideos: new Set(),
  followedUsers: new Set(),
  lastTap: 0,

  init() {
    this.renderFeed();
    this.initDoubleTap();
  },

  renderFeed() {
    const container = document.getElementById('video-feed');
    container.innerHTML = '';
    this.videos.forEach(v => {
      const slide = document.createElement('div');
      slide.className = 'video-slide';
      slide.dataset.id = v.id;
      const liked = this.likedVideos.has(v.id);
      const saved = this.savedVideos.has(v.id);
      const followed = this.followedUsers.has(v.user);
      slide.innerHTML = `
        <div class="video-bg" style="background:${v.gradient}"></div>
        <div class="video-gradient-top"></div>
        <div class="video-gradient-bottom"></div>
        <div class="video-info">
          <div class="video-user">
            <div class="video-avatar">${v.initial}</div>
            <span class="video-username">@${v.user}</span>
            <button class="video-follow-btn${followed ? ' following' : ''}" data-user="${v.user}">${followed ? 'Following' : 'Follow'}</button>
          </div>
          <div class="video-desc">${v.desc}</div>
          <div class="video-music">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 18V5l12-2v13M9 18c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zM21 16c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/></svg>
            <div class="music-marquee"><span>${v.music}&nbsp;&nbsp;&nbsp;&nbsp;${v.music}</span></div>
          </div>
        </div>
        <div class="video-actions">
          <button class="action-btn${liked ? ' liked' : ''}" data-action="like" data-id="${v.id}">
            <svg viewBox="0 0 24 24" fill="${liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span>${v.likes}</span>
          </button>
          <button class="action-btn" data-action="comment">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>${v.comments}</span>
          </button>
          <button class="action-btn" data-action="share">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
            <span>${v.shares}</span>
          </button>
          <button class="action-btn${saved ? ' liked' : ''}" data-action="save" data-id="${v.id}">
            <svg viewBox="0 0 24 24" fill="${saved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            <span>${v.saves}</span>
          </button>
          <div class="music-disc">${v.initial}</div>
        </div>`;
      container.appendChild(slide);
    });
    this.bindActions();
  },

  bindActions() {
    // Like buttons
    document.querySelectorAll('[data-action="like"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        this.toggleLike(id, btn);
      });
    });
    // Save buttons
    document.querySelectorAll('[data-action="save"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        this.toggleSave(id, btn);
      });
    });
    // Follow buttons
    document.querySelectorAll('.video-follow-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const user = btn.dataset.user;
        if (this.followedUsers.has(user)) {
          this.followedUsers.delete(user);
          btn.textContent = 'Follow';
          btn.classList.remove('following');
        } else {
          this.followedUsers.add(user);
          btn.textContent = 'Following';
          btn.classList.add('following');
        }
      });
    });
  },

  toggleLike(id, btn) {
    const svg = btn.querySelector('svg');
    if (this.likedVideos.has(id)) {
      this.likedVideos.delete(id);
      btn.classList.remove('liked');
      svg.setAttribute('fill', 'none');
    } else {
      this.likedVideos.add(id);
      btn.classList.add('liked', 'burst');
      svg.setAttribute('fill', 'currentColor');
      setTimeout(() => btn.classList.remove('burst'), 400);
    }
  },

  toggleSave(id, btn) {
    const svg = btn.querySelector('svg');
    if (this.savedVideos.has(id)) {
      this.savedVideos.delete(id);
      btn.classList.remove('liked');
      svg.setAttribute('fill', 'none');
    } else {
      this.savedVideos.add(id);
      btn.classList.add('liked', 'burst');
      svg.setAttribute('fill', 'currentColor');
      setTimeout(() => btn.classList.remove('burst'), 400);
    }
  },

  initDoubleTap() {
    const feed = document.getElementById('video-feed');
    const heart = document.getElementById('double-tap-heart');

    feed.addEventListener('click', (e) => {
      // Ignore if clicking on buttons
      if (e.target.closest('.action-btn, .video-follow-btn')) return;

      const now = Date.now();
      if (now - this.lastTap < 300) {
        // Double tap detected
        const slide = e.target.closest('.video-slide');
        if (!slide) return;
        const id = parseInt(slide.dataset.id);

        // Like it
        if (!this.likedVideos.has(id)) {
          const likeBtn = slide.querySelector('[data-action="like"]');
          if (likeBtn) this.toggleLike(id, likeBtn);
        }

        // Show heart animation
        heart.classList.remove('show');
        void heart.offsetWidth; // reflow
        heart.classList.add('show');
        setTimeout(() => heart.classList.remove('show'), 800);
      }
      this.lastTap = now;
    });
  }
};

document.addEventListener('DOMContentLoaded', () => VideoFeed.init());
