/* ===== TokStudio App Core ===== */

const App = {
  currentScreen: 'home',
  screens: ['home', 'discover', 'create', 'inbox', 'profile'],

  init() {
    this.initNav();
    this.initDiscover();
    this.initInbox();
    this.initProfile();
    this.initCreate();
    this.initInboxTabs();
    this.initProfileTabs();
  },

  // ===== NAVIGATION =====
  initNav() {
    document.querySelectorAll('#bottom-nav [data-screen]').forEach(btn => {
      btn.addEventListener('click', () => this.navigate(btn.dataset.screen));
    });
  },

  navigate(screen) {
    if (this.currentScreen === screen) return;
    this.currentScreen = screen;

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen-${screen}`).classList.add('active');

    document.querySelectorAll('#bottom-nav [data-screen]').forEach(b => {
      b.classList.toggle('active', b.dataset.screen === screen);
    });

    // Hide nav on create screen, show on others
    const nav = document.getElementById('bottom-nav');
    if (screen === 'create') {
      nav.style.transform = 'translateY(100%)';
      nav.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
  },

  // ===== DISCOVER =====
  initDiscover() {
    const tags = [
      { label: '🔥 Trending', active: true }, { label: 'Dance' }, { label: 'Comedy' },
      { label: 'Gaming' }, { label: 'Food' }, { label: 'Fashion' }, { label: 'Music' },
      { label: 'Art' }, { label: 'Tech' }, { label: 'Travel' }
    ];
    const tagsEl = document.getElementById('trending-tags');
    tags.forEach(t => {
      const el = document.createElement('span');
      el.className = `tag${t.active ? ' active' : ''}`;
      el.textContent = t.label;
      el.addEventListener('click', () => {
        tagsEl.querySelectorAll('.tag').forEach(x => x.classList.remove('active'));
        el.classList.add('active');
      });
      tagsEl.appendChild(el);
    });

    const colors = [
      'linear-gradient(135deg, #667eea, #764ba2)',
      'linear-gradient(135deg, #f093fb, #f5576c)',
      'linear-gradient(135deg, #4facfe, #00f2fe)',
      'linear-gradient(135deg, #43e97b, #38f9d7)',
      'linear-gradient(135deg, #fa709a, #fee140)',
      'linear-gradient(135deg, #a18cd1, #fbc2eb)',
      'linear-gradient(135deg, #fccb90, #d57eeb)',
      'linear-gradient(135deg, #e0c3fc, #8ec5fc)',
      'linear-gradient(135deg, #f5576c, #ff6a00)',
      'linear-gradient(135deg, #667eea, #764ba2)',
      'linear-gradient(135deg, #89f7fe, #66a6ff)',
      'linear-gradient(135deg, #fddb92, #d1fdff)',
    ];
    const views = ['1.2M', '892K', '2.1M', '456K', '3.4M', '128K', '567K', '1.8M', '234K', '945K', '678K', '1.1M'];
    const grid = document.getElementById('discover-grid');
    for (let i = 0; i < 12; i++) {
      const item = document.createElement('div');
      item.className = 'discover-item';
      item.innerHTML = `
        <div class="thumb" style="background:${colors[i]}"></div>
        <div class="thumb-overlay">
          <div class="thumb-views">
            <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            ${views[i]}
          </div>
        </div>`;
      grid.appendChild(item);
    }
  },

  // ===== INBOX =====
  initInbox() {
    const notifications = [
      { type: 'like', user: 'sophia_art', text: '<strong>sophia_art</strong> liked your video', time: '2m', unread: true },
      { type: 'comment', user: 'alex.dev', text: '<strong>alex.dev</strong> commented: "This is fire 🔥"', time: '5m', unread: true },
      { type: 'follow', user: 'design.daily', text: '<strong>design.daily</strong> started following you', time: '12m', unread: true },
      { type: 'like', user: 'marcox', text: '<strong>marcox</strong> and 42 others liked your video', time: '1h' },
      { type: 'comment', user: 'luna.creates', text: '<strong>luna.creates</strong> replied: "Love this edit!"', time: '2h' },
      { type: 'follow', user: 'tech.wizard', text: '<strong>tech.wizard</strong> started following you', time: '3h' },
      { type: 'system', user: 'TokStudio', text: 'Your video reached <strong>10K views!</strong> 🎉', time: '5h' },
      { type: 'like', user: 'emma.vibes', text: '<strong>emma.vibes</strong> liked your comment', time: '8h' },
      { type: 'comment', user: 'jay_music', text: '<strong>jay_music</strong> mentioned you in a comment', time: '12h' },
      { type: 'system', user: 'TokStudio', text: 'New feature: <strong>Duet mode</strong> is now available!', time: '1d' },
      { type: 'follow', user: 'creative.hub', text: '<strong>creative.hub</strong> started following you', time: '1d' },
      { type: 'like', user: 'neon.dreams', text: '<strong>neon.dreams</strong> and 18 others liked your video', time: '2d' },
    ];
    const list = document.getElementById('inbox-list');
    const iconMap = {
      like: `<svg viewBox="0 0 24 24" fill="currentColor" width="20"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
      comment: `<svg viewBox="0 0 24 24" fill="currentColor" width="20"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
      follow: `<svg viewBox="0 0 24 24" fill="currentColor" width="20"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>`,
      system: `<svg viewBox="0 0 24 24" fill="currentColor" width="20"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
    };
    notifications.forEach(n => {
      const item = document.createElement('div');
      item.className = `inbox-item${n.unread ? ' unread' : ''}`;
      item.dataset.type = n.type;
      item.innerHTML = `
        <div class="inbox-avatar ${n.type}-avatar">${iconMap[n.type]}</div>
        <div class="inbox-content">
          <div class="inbox-text">${n.text}</div>
          <div class="inbox-time">${n.time}</div>
        </div>
        <div class="inbox-thumb" style="background:linear-gradient(135deg, #333, #222)"></div>`;
      list.appendChild(item);
    });
  },

  initInboxTabs() {
    document.querySelectorAll('.inbox-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.inbox-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.tab;
        document.querySelectorAll('.inbox-item').forEach(item => {
          item.style.display = (filter === 'all' || item.dataset.type === filter.replace('s','')) ? '' : 'none';
        });
      });
    });
  },

  // ===== PROFILE =====
  initProfile() {
    const grid = document.getElementById('profile-grid');
    const gradients = [
      'linear-gradient(135deg, #667eea, #764ba2)',
      'linear-gradient(135deg, #f093fb, #f5576c)',
      'linear-gradient(135deg, #4facfe, #00f2fe)',
      'linear-gradient(135deg, #43e97b, #38f9d7)',
      'linear-gradient(135deg, #fa709a, #fee140)',
      'linear-gradient(135deg, #a18cd1, #fbc2eb)',
      'linear-gradient(135deg, #fccb90, #d57eeb)',
      'linear-gradient(135deg, #e0c3fc, #8ec5fc)',
      'linear-gradient(135deg, #f5576c, #ff6a00)',
      'linear-gradient(135deg, #89f7fe, #66a6ff)',
      'linear-gradient(135deg, #fddb92, #d1fdff)',
      'linear-gradient(135deg, #667eea, #764ba2)',
    ];
    const viewCounts = ['12.4K', '8.9K', '45.2K', '3.1K', '22.7K', '15.8K', '6.3K', '31.5K', '9.7K', '18.2K', '4.6K', '27.1K'];
    for (let i = 0; i < 12; i++) {
      const item = document.createElement('div');
      item.className = 'profile-grid-item';
      item.style.background = gradients[i];
      item.innerHTML = `<div class="views-overlay"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>${viewCounts[i]}</div>`;
      grid.appendChild(item);
    }
  },

  initProfileTabs() {
    document.querySelectorAll('.profile-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  },

  // ===== CREATE =====
  initCreate() {
    const recordBtn = document.getElementById('record-btn');
    let recording = false;
    let progress = 0;
    let interval;

    recordBtn.addEventListener('click', () => {
      recording = !recording;
      recordBtn.classList.toggle('recording', recording);
      const circle = recordBtn.querySelector('.record-progress');
      if (recording) {
        progress = 0;
        interval = setInterval(() => {
          progress += 1;
          const offset = 289 - (289 * progress / 100);
          circle.style.strokeDashoffset = offset;
          if (progress >= 100) {
            clearInterval(interval);
            recording = false;
            recordBtn.classList.remove('recording');
          }
        }, 600); // 60s mode = 600ms per %
      } else {
        clearInterval(interval);
        circle.style.strokeDashoffset = 289;
      }
    });

    document.getElementById('btn-close-camera').addEventListener('click', () => {
      this.navigate('home');
    });

    // Camera tab switching
    document.querySelectorAll('.cam-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tab.parentElement.querySelectorAll('.cam-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
    document.querySelectorAll('.cam-mode').forEach(mode => {
      mode.addEventListener('click', () => {
        document.querySelectorAll('.cam-mode').forEach(m => m.classList.remove('active'));
        mode.classList.add('active');
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
