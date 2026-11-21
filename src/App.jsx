import React from 'react';

/* Converted from the 604 Car Spa design. Logic lives in renderVals(); render() maps it to JSX. */

const VEH = [
  { id: 'car', label: 'Car' },
  { id: 'suv5', label: '5 Seater SUV' },
  { id: 'truck', label: 'Truck' },
  { id: 'suv7', label: '7+ Seater SUV/Van' },
];
const CITIES = ['Surrey','Langley','Delta','Richmond','Burnaby','Vancouver','New Westminster','Coquitlam','Port Coquitlam','Port Moody','Maple Ridge','White Rock','Mission'];
const HOODS = ['Cloverdale','Newton','Guildford','Fleetwood','South Surrey','Fraser Heights','Port Kells','Clayton'];
const slug = s => s.toLowerCase().replace(/\s+/g, '-');
const small = v => v === 'car' || v === 'suv5';
const by = (a, b) => v => (small(v) ? a : b);

const PK = {
  interior: { title: 'Interior', href: '#/interior', items: [
    { name: 'Basic Interior Clean', price: by(99, 129), mins: v => v === 'car' ? 90 : 120,
      inc: ['Quick vacuum', 'Dusting of dash, console and door panels', 'Seat wipe-down', 'Interior windows'] },
    { name: 'Full Deep Interior Detail', price: () => 169, mins: by(180, 210),
      inc: ['Full vacuum incl. trunk', 'Steam cleaning', 'Deep clean of dash, vents, cup holders and door panels', 'Shampoo and extraction of carpets, seats and mats', 'Stain treatment', 'Door jambs', 'Odour treatment', 'Final inspection'] },
  ]},
  insideout: { title: 'Inside & Out', href: '#/inside-out', items: [
    { name: 'Essential', price: by(199, 229), mins: () => 150,
      inc: ['Full vacuum', 'Interior wipe-down', 'Interior windows', 'Floor mats', 'Exterior hand wash', 'Wheels and tires', 'Door jambs', 'Tire dressing', 'Exterior windows', 'Spot shampoo and steam where needed', 'Final inspection'] },
    { name: 'Deep', price: by(249, 279), mins: () => 240, plus: 'Everything in Essential, plus:',
      inc: ['Full shampoo and extraction', 'Steam cleaning', 'Deep interior clean', 'Wheel wells', 'Spray sealant'] },
    { name: 'Premium + 1 Stage Polish', price: by(349, 399), mins: () => 300, plus: 'Everything in Deep, plus:',
      inc: ['One-step machine polish', 'Paint sealant'] },
  ]},
  exterior: { title: 'Exterior', href: '#/exterior', items: [
    { name: 'Basic', price: by(99, 119), mins: v => v === 'suv7' ? 120 : 90,
      inc: ['Hand wash', 'Wheels and tires', 'Exterior windows', 'Microfiber dry', 'Tire shine'] },
    { name: 'Premium', price: by(149, 179), mins: () => 120, plus: 'Everything in Basic, plus:',
      inc: ['Bug and tar removal', 'Wheel wells', 'Door jambs', 'Clay bar', 'Spray sealant', 'Final inspection'] },
    { name: 'Premium + 1 Stage Paint Enhancement', price: by(249, 299), mins: () => 180, plus: 'Everything in Premium, plus:',
      inc: ['One-step machine polish', 'Paint sealant'] },
  ]},
};

const FAQ = {
  water: { q: 'Do you need my water and power?', a: 'Water and power access are appreciated and help the job go smoothly. If you don\'t have an outdoor tap or outlet, mention it when you book so we can plan around it.' },
  apt: { q: 'I live in an apartment or park underground. Can you still come?', a: 'Often, yes, but you\'ll need permission from your property manager or strata first. Generators can\'t be run underground, and washing inside a parkade isn\'t possible without strata approval.' },
  rain: { q: 'What happens if it rains?', a: 'If rain is forecast, exterior work is rescheduled. Interior work can go ahead as long as there\'s shelter for the vehicle, like a garage or carport.' },
  time: { q: 'How long does it take?', a: 'Most appointments take 3–6 hours. Each package lists a typical time, and it varies with vehicle size and condition.' },
  stains: { q: 'Can you remove stains and smells?', a: 'Stains and odours are treated with steam, shampoo, extraction and odour treatment, and many improve a lot. Some set-in stains and smells can\'t be removed completely, so there\'s no guarantee of full removal. You\'ll get an honest read before work starts.' },
  pay: { q: 'How do I pay?', a: '[Placeholder: add accepted payment methods and when payment is due.]' },
  offer: { q: 'How does the 10% first-booking discount work?', a: '10% off your first service when you book online. Automatic, no code needed.' },
};

const PROBLEMS = {
  milk: { label: 'Milk spill cleaning', eyebrow: 'Milk spill cleaning', title: 'Spilled milk in your car? Get it treated early.',
    intro: 'Milk soaks into carpet and seat foam, and the smell gets worse as it sours, especially in a warm car. I come to you and treat it on site.',
    steps: ['Find where the milk has soaked in, including under seats and mats', 'Steam cleaning', 'Shampoo and extraction of the affected carpet, seats and mats', 'Stain treatment', 'Odour treatment', 'Final inspection'],
    honest: 'Milk that has soaked deep into foam or sat for a long time may not come out completely. I\'ll look at it before starting and tell you what to realistically expect. No guarantees of complete stain or smell removal.',
    tips: ['Blot up what you can. Don\'t rub it in.', 'Pull out wet floor mats if they come out easily.', 'Leave windows cracked to let air move.'] },
  vomit: { label: 'Vomit cleanup in your car', eyebrow: 'Vomit cleanup', title: 'Vomit cleanup in your car, done at your door.',
    intro: 'Whether it was a sick kid, a pet or a long drive, vomit gets into seams, seat tracks and vents. It needs more than a wipe.',
    steps: ['Remove residue from seats, carpet, seams and seat tracks', 'Steam cleaning', 'Shampoo and extraction of affected areas', 'Deep clean of nearby surfaces, vents and door panels', 'Stain treatment', 'Odour treatment'],
    honest: 'Most cleanups go well, but if it has soaked into foam or sat for days, some staining or odour may remain. I\'ll tell you what to expect before I start. No guarantees of complete stain or smell removal.',
    tips: ['Remove solids with a paper towel or plastic bag.', 'Blot, don\'t scrub, so it doesn\'t spread deeper.', 'Air the car out with windows cracked.'] },
};

const money = n => '$' + (Math.round(n * 100) / 100).toFixed(2);
const hrs = m => { const h = m / 60; return (h % 1 ? h.toFixed(1) : h) + ' hrs'; };

class App extends React.Component {
  state = { vehicle: null, ba: [50, 50, 50, 50, 50, 50], baFocus: -1, w: typeof window !== 'undefined' ? window.innerWidth : 1280, menu: false, hash: typeof location !== 'undefined' ? location.hash : '' };

  componentDidMount() {
    this.startLoader();
    this.muteAll(); setTimeout(() => this.muteAll(), 300);
    this.onResize = () => this.setState({ w: window.innerWidth });
    this.onHash = () => { this.setState({ hash: location.hash, menu: false }); window.scrollTo(0, 0); };
    window.addEventListener('resize', this.onResize);
    window.addEventListener('hashchange', this.onHash);
    this.onKey = e => { if ((this.state.lb ?? -1) < 0) return; const n = 13;
      if (e.key === 'Escape') this.setState({ lb: -1 });
      if (e.key === 'ArrowRight') this.setState(s => ({ lb: (s.lb + 1) % n }));
      if (e.key === 'ArrowLeft') this.setState(s => ({ lb: (s.lb - 1 + n) % n })); };
    window.addEventListener('keydown', this.onKey);
    this.scrubCur = 0;
    const tick = () => {
      this.scrubRaf = requestAnimationFrame(tick);
      const wrap = document.querySelector('[data-scrub]'); if (!wrap) return;
      const v = wrap.querySelector('[data-scrub-video]'), bar = wrap.querySelector('[data-scrub-bar]');
      const r = wrap.getBoundingClientRect(), span = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, span > 0 ? -r.top / span : 0));
      this.scrubCur += (p - this.scrubCur) * 0.12;
      if (bar) bar.style.width = (this.scrubCur * 100).toFixed(2) + '%';
      if (v && v.duration && !v.seeking) {
        const t = this.scrubCur * (v.duration * 0.72);
        if (Math.abs(v.currentTime - t) > 0.016) v.currentTime = t;
      }
    };
    tick();
    this.setupReveal();
    this.placeInd(); setTimeout(() => this.placeInd(), 400);
    this.onIndResize = () => this.placeInd(); window.addEventListener('resize', this.onIndResize);
    this.kickVideos();
  }
  componentDidUpdate() { this.kickVideos(); this.muteAll(); this.setupReveal(); this.placeInd(); }
  kickVideos() {
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('video').forEach(v => {
      v.muted = true;
      if (v.hasAttribute('data-scrub-video')) return;
      if (reduce) { v.pause(); return; }
      if (v.paused && !v.dataset.kicked) { v.dataset.kicked = '1'; v.play().catch(() => {}); }
    });
  }
  muteAll() {
    document.querySelectorAll('video').forEach(v => {
      v.defaultMuted = true; v.muted = true; v.volume = 0; v.controls = false;
      if (v.hasAttribute('data-start') && !v.__startH) {
        v.__startH = true;
        const jump = () => { const s = +v.dataset.start || 0; if (s && v.currentTime < s - 0.05) v.currentTime = s; };
        v.addEventListener('loadedmetadata', jump); v.addEventListener('timeupdate', jump); if (v.readyState >= 1) jump();
      }
      if (v.dataset.pov && !v.__pov) {
        v.__pov = true;
        const start = () => { if (v.currentTime < 6) v.currentTime = 6; };
        v.addEventListener('loadedmetadata', start); if (v.readyState >= 1) start();
        v.addEventListener('ended', () => { v.currentTime = 6; v.play().catch(() => {}); });
      }
      if (!v.__silenced) { v.__silenced = true; v.addEventListener('volumechange', () => { if (!v.muted || v.volume) { v.muted = true; v.volume = 0; } }); }
    });
  }
  startLoader() {
    let seen = false; try { seen = sessionStorage.getItem('604-loader-seen') === '1'; } catch (e) {}
    if (seen) { this.setState({ loader: 'done' }); return; }
    document.documentElement.style.overflow = 'hidden';
    const bar = document.querySelector('[data-load-bar]');
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t0 = performance.now(), MIN = 900, MAX = 3000;
    if (bar) bar.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(0.85)' }], { duration: MAX, easing: 'cubic-bezier(0.23,1,0.32,1)', fill: 'forwards' });
    let done = false;
    const finish = () => {
      if (done) return; done = true;
      const wait = Math.max(0, MIN - (performance.now() - t0));
      setTimeout(() => {
        if (bar) bar.animate([{ transform: getComputedStyle(bar).transform }, { transform: 'scaleX(1)' }], { duration: 220, easing: 'ease-out', fill: 'forwards' });
        setTimeout(() => {
          this.setState({ loader: 'out' });
          document.documentElement.style.overflow = '';
          try { sessionStorage.setItem('604-loader-seen', '1'); } catch (e) {}
          setTimeout(() => this.setState({ loader: 'done' }), reduce ? 0 : 480);
        }, 240);
      }, wait);
    };
    if (document.readyState === 'complete') finish(); else window.addEventListener('load', finish, { once: true });
    setTimeout(finish, MAX);
  }
  flashPrices() {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    requestAnimationFrame(() => document.querySelectorAll('[data-price]').forEach(el => el.animate(
      [{ opacity: 0.35, filter: 'blur(3px)', transform: 'translateY(3px)' }, { opacity: 1, filter: 'blur(0)', transform: 'none' }],
      { duration: 240, easing: 'cubic-bezier(0.23,1,0.32,1)' })));
  }
  placeInd() {
    const g = document.querySelector('[data-veh-group]'); if (!g) return;
    const ind = g.querySelector('[data-veh-ind]'), b = g.querySelector('[data-veh-btn][aria-pressed="true"]'); if (!ind || !b) return;
    const first = !this.indReady;
    if (first) ind.style.transition = 'none';
    ind.style.width = b.offsetWidth + 'px'; ind.style.height = b.offsetHeight + 'px';
    ind.style.transform = 'translate(' + b.offsetLeft + 'px,' + b.offsetTop + 'px)'; ind.style.opacity = '1';
    if (first) { ind.offsetWidth; this.indReady = true; requestAnimationFrame(() => { ind.style.transition = 'transform 280ms cubic-bezier(0.23,1,0.32,1), width 280ms cubic-bezier(0.23,1,0.32,1), height 280ms cubic-bezier(0.23,1,0.32,1)'; }); }
  }
  setupReveal() {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!this.revealIO) this.revealIO = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target; el.style.opacity = '1'; el.style.transform = 'none'; this.revealIO.unobserve(el);
    }), { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('[data-reveal]').forEach((el, i) => {
      if (el.__rv) return; el.__rv = true;
      if (reduce) return;
      const sm = el.hasAttribute('data-reveal-sm'), dl = el.dataset.revealDelay != null && el.dataset.revealDelay !== '' ? +el.dataset.revealDelay : (i % 2 ? 140 : 0);
      el.style.opacity = '0'; el.style.transform = sm ? 'translateY(14px)' : 'translateY(28px)';
      el.style.transition = sm ? 'opacity 500ms cubic-bezier(0.23,1,0.32,1) ' + dl + 'ms, transform 600ms cubic-bezier(0.23,1,0.32,1) ' + dl + 'ms' : 'opacity 900ms cubic-bezier(0.22,1,0.36,1) ' + dl + 'ms, transform 1100ms cubic-bezier(0.22,1,0.36,1) ' + dl + 'ms';
      this.revealIO.observe(el);
    });
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.scrubRaf);
    window.removeEventListener('resize', this.onIndResize);
    if (this.revealIO) this.revealIO.disconnect();
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('hashchange', this.onHash);
  }

  route() {
    let h = (this.state.hash || '').replace(/^#\/?/, '');
    if (!h) {
      const sp = this.props.startPage ?? 'home';
      h = { home: '', interior: 'interior', insideout: 'inside-out', exterior: 'exterior', ceramic: 'ceramic', city: 'city/langley', problem: 'problem/milk' }[sp] || '';
    }
    const [a, b] = h.split('/');
    if (a === 'interior' || a === 'inside-out' || a === 'exterior' || a === 'ceramic') return { page: a };
    if (a === 'city') return { page: 'city', city: CITIES.find(c => slug(c) === b) || 'Langley' };
    if (a === 'problem') return { page: 'problem', problem: PROBLEMS[b] ? b : 'milk' };
    return { page: 'home' };
  }

  group(key, v, opts = {}) {
    const g = PK[key];
    const items = opts.only ? g.items.filter(i => opts.only.includes(i.name)) : g.items;
    return {
      title: opts.title || g.title, href: g.href, hasLink: !opts.noLink, linkLabel: 'About ' + g.title.toLowerCase() + ' detailing →',
      cards: items.map((i, idx) => {
        const p = i.price(v);
        return { delay: idx * 70, name: i.name, duration: '≈ ' + hrs(i.mins(v)), regular: '$' + p, first: money(p * 0.9), total: money(p * 0.9 + p * 0.05),
          hasPlus: !!i.plus, plus: i.plus || '', includes: i.inc, bookAria: 'Book ' + g.title + ' ' + i.name };
      }),
    };
  }

  renderVals() {
    const r = this.route();
    const v = this.state.vehicle || this.props.defaultVehicle || 'car';
    const isMobile = this.state.w < 1100;
    const scrollTo = id => () => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' }); };

    let hero = {}, groups, pkgHeading = 'Pick your vehicle. Prices update.', faqKeys = ['water', 'apt', 'rain', 'time', 'stains', 'pay', 'offer'];
    const all = () => ['interior', 'insideout', 'exterior'].map(k => this.group(k, v));
    if (r.page === 'interior') {
      hero = { eyebrow: 'Interior detailing', title: 'A clean cabin, without leaving home.', intro: 'From a quick refresh to steam, shampoo and extraction, done in your driveway, workplace or yard.', video: './media/reel-interior.mp4', slotId: 'hero-interior', slotText: 'Photo: steam cleaning or seat extraction' };
      groups = [this.group('interior', v, { noLink: true })]; pkgHeading = 'Interior packages';
      faqKeys = ['stains', 'time', 'rain', 'water', 'apt', 'pay'];
    } else if (r.page === 'inside-out') {
      hero = { eyebrow: 'Inside & out detailing', title: 'Inside and out, in one visit.', intro: 'Full interior and exterior care in a single appointment. Choose how deep you want to go.', video: './media/reel-063.mp4', slotId: 'hero-insideout', slotText: 'Photo: finished car, doors open, in a driveway' };
      groups = [this.group('insideout', v, { noLink: true })]; pkgHeading = 'Inside & out packages';
    } else if (r.page === 'exterior') {
      hero = { eyebrow: 'Exterior detailing', title: 'A proper hand wash, at your door.', intro: 'Hand wash, wheels, tires and glass, up to clay bar, sealant and a one-step machine polish.', video: './media/reel-489.mp4', slotId: 'hero-exterior', slotText: 'Photo: foam hand wash on site' };
      groups = [this.group('exterior', v, { noLink: true })]; pkgHeading = 'Exterior packages';
      faqKeys = ['rain', 'water', 'apt', 'time', 'pay', 'offer'];
    } else if (r.page === 'ceramic') {
      hero = { eyebrow: 'Paint protection & ceramic coating', title: 'Protect the finish.', intro: 'One-step machine polish, paint sealant and a 1-year ceramic coating, applied wherever your car is parked.', video: './media/reel-pov.mp4', start: 3, slotId: 'hero-ceramic', slotText: 'Photo: machine polishing paint, close-up' };
      groups = [this.group('exterior', v, { only: ['Premium + 1 Stage Paint Enhancement'], title: 'Exterior' }), this.group('insideout', v, { only: ['Premium + 1 Stage Polish'], title: 'Inside & Out' })];
      pkgHeading = 'Packages with a one-step polish';
      faqKeys = ['rain', 'water', 'apt', 'time', 'pay'];
    } else if (r.page === 'city') {
      hero = { eyebrow: 'Mobile detailing · ' + r.city + ', BC', title: 'Mobile car detailing in ' + r.city + '.', intro: '604 Car Spa comes to your driveway, workplace or yard in ' + r.city + ' with all the equipment. Owner-operated, licensed and insured.', video: './media/reel-546.mp4', slotId: 'hero-city', slotText: 'Photo: on-site job in a local driveway' };
      groups = all();
    } else if (r.page === 'problem') {
      const p = PROBLEMS[r.problem];
      hero = { eyebrow: p.eyebrow, title: p.title, intro: p.intro, video: './media/reel-interior.mp4', slotId: 'hero-problem-' + r.problem, slotText: 'Photo: seat or carpet extraction in progress' };
      groups = [this.group('interior', v, { only: ['Full Deep Interior Detail'], title: 'Recommended: Full Deep Interior Detail' })];
      pkgHeading = 'Recommended package'; faqKeys = ['stains', 'time', 'rain', 'apt', 'pay'];
    } else groups = all();

    const pe = this.props.photoEditMode ? 'none' : 'auto';
    const baMeta = [['door', 'Interior · door panel'], ['trunk', 'Interior · trunk carpet'], ['footwell', 'Interior · passenger footwell'], ['cloth', 'Interior · cloth seats'], ['wheel', 'Exterior · wheels and tires'], ['crv', 'Exterior · Honda CR-V rear']];

    const h = React.createElement;
    const strip = (words, bg, fg, dir, dur) => {
      const seq = [];
      for (let k = 0; k < 2; k++) for (let r = 0; r < 3; r++) words.forEach((w, j) => {
        seq.push(h('span', { key: k + '-' + r + '-' + j + 'w', style: { padding: '0 clamp(20px,3vw,44px)', whiteSpace: 'nowrap' } }, w));
        seq.push(h('span', { key: k + '-' + r + '-' + j + 'd', 'aria-hidden': true, style: { flex: 'none', width: '0.42em', height: '0.42em', transform: 'rotate(45deg)', background: fg, opacity: 0.9 } }));
      });
      return h('div', { 'aria-hidden': true, style: { background: bg, color: fg, overflow: 'hidden', padding: 'clamp(14px,1.8vw,22px) 0' } },
        h('div', { className: 'mq-track', style: { display: 'flex', alignItems: 'center', width: 'max-content', animation: dir + ' ' + dur + 's linear infinite', fontFamily: 'Archivo, sans-serif', fontStretch: '125%', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em', fontSize: 'clamp(26px,3.6vw,52px)', lineHeight: 1 } }, seq));
    };
    const GAL = ['Rear seat and footwell', 'Rear footwell and seat back', 'Front cabin and dash', 'Instrument cluster', 'Steering wheel and dash', 'Ram rear bench and floor', 'Ram front cabin and door panel', 'Ram Rebel, finished in the driveway', 'Tesla Model Y interior', 'Tesla Model Y interior', 'Tesla Model Y interior', 'Tesla Model Y interior', 'Tesla Model Y interior'];
    const lb = this.state.lb ?? -1, n = GAL.length;
    const go = d => e => { e.stopPropagation(); this.setState(s => ({ lb: (s.lb + d + n) % n })); };
    return {
      gallery: GAL.map((a, i) => ({ src: './media/gallery/' + String(i + 1).padStart(2, '0') + '.jpg', aria: 'Open photo: ' + a, open: () => this.setState({ lb: i }) })).slice(0, this.state.galAll ? GAL.length : 5),
      galHasMore: GAL.length > 5, galMoreLabel: this.state.galAll ? 'Show less' : 'See more (' + (GAL.length - 5) + ')', galToggle: () => this.setState(s => ({ galAll: !s.galAll })),
      lbOpen: lb >= 0, lbSrc: lb >= 0 ? './media/gallery/' + String(lb + 1).padStart(2, '0') + '.jpg' : '', lbAlt: lb >= 0 ? GAL[lb] : '', lbCount: (lb + 1) + ' / ' + n,
      lbClose: e => { e.stopPropagation(); this.setState({ lb: -1 }); }, lbPrev: go(-1), lbNext: go(1),
      stripTop2: strip(['Licensed', 'Insured', 'Fully Mobile', 'Owner-Operated', '10% Off Your First Booking'], '#fff', '#0D1012', 'mq-left', 55),
      stripBottom2: strip(['Your Ride', 'Our Responsibility'], '#45D4D5', '#0D1012', 'mq-right', 40),
      stripTop: strip(['Your Ride', 'Our Responsibility'], '#45D4D5', '#0D1012', 'mq-left', 40),
      stripBottom: strip(['Interior Detailing', 'Inside & Out', 'Exterior Detailing', 'Ceramic Coating', 'We Come To You'], '#fff', '#0D1012', 'mq-right', 60),
      isMobile, isDesktop: !isMobile, menuOpen: this.state.menu, menuLabel: this.state.menu ? 'Close' : 'Menu', showMobileMenu: isMobile && this.state.menu,
      toggleMenu: () => this.setState(s => ({ menu: !s.menu })), closeMenu: () => this.setState({ menu: false }),
      navLinks: [{ label: 'Interior', href: '#/interior' }, { label: 'Inside & Out', href: '#/inside-out' }, { label: 'Exterior', href: '#/exterior' }, { label: 'Ceramic', href: '#/ceramic' }, { label: 'Areas', href: '#/city/surrey' }],
      isHome: r.page === 'home', isInner: r.page !== 'home', isCity: r.page === 'city', isProblem: r.page === 'problem', isCeramic: r.page === 'ceramic',
      showBA: ['home', 'interior', 'inside-out', 'exterior', 'city'].includes(r.page),
      showSwarn: r.page === 'home' || r.page === 'city', showReviews: r.page !== 'problem',
      addonsRot: this.state.addons ? 'rotate(45deg)' : 'rotate(0deg)', addonsToggle: e => this.setState({ addons: e.currentTarget.open }),
      loaderOn: this.state.loader !== 'done', loaderOpacity: this.state.loader === 'out' ? 0 : 1, loaderPE: this.state.loader === 'out' ? 'none' : 'auto', loaderShift: this.state.loader === 'out' ? 'translateY(-8px) scale(0.98)' : 'none',
      heroVideo: hero.video ? React.createElement('video', { key: hero.video, src: hero.video, 'data-start': hero.start || '', autoPlay: true, muted: true, loop: true, playsInline: true, preload: 'auto', 'aria-hidden': true, style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 45%', display: 'block' } }) : null,
      hero, goPackages: scrollTo('packages'), pkgHeading, pkgGroups: groups,
      vehicles: VEH.map(x => ({ label: x.label, pressed: x.id === v ? 'true' : 'false', fg: x.id === v ? '#fff' : '#3C4246', select: () => { if (x.id !== v) { this.setState({ vehicle: x.id }); this.flashPrices(); } } })),
      sliderPE: pe,
      baPairs: baMeta.map(([id, cap], i) => {
        const pos = this.state.ba[i];
        const op = x => Math.max(0, Math.min(1, x));
        return { pos, beforeOp: op((pos - 8) / 14), afterOp: op((92 - pos) / 14), left: pos + '%', clip: 'inset(0 ' + (100 - pos) + '% 0 0)', caption: cap, aria: 'Before and after comparison: ' + cap,
          beforeSrc: './media/ba-' + id + '-before.png', afterSrc: './media/ba-' + id + '-after.png', beforeText: 'Before photo: ' + cap, afterText: 'After photo: ' + cap,
          ring: this.state.baFocus === i ? '0 0 0 4px #45D4D5' : '0 6px 20px rgba(0,0,0,0.35)',
          onChange: e => { const n = +e.target.value; this.setState(s => { const ba = s.ba.slice(); ba[i] = n; return { ba }; }); },
          onFocus: () => this.setState({ baFocus: i }), onBlur: () => this.setState({ baFocus: -1 }) };
      }),
      steps: [
        { n: 1, title: 'Book online', body: 'Pick your package and vehicle size, then choose a time. 10% off your first booking applies automatically.' },
        { n: 2, title: 'We confirm', body: 'Swarn confirms the time, location and any details about your vehicle.' },
        { n: 3, title: 'We arrive with everything', body: 'A fully mobile setup at your driveway, workplace or yard.' },
        { n: 4, title: 'You get your car back spotless', body: 'Every job ends with a final inspection before it\'s handed back.' },
      ],
      reviews: [
        { name: 'Young Nam', pre: 'Outstanding service! He spent nearly four hours detailing my car and carefully cleaned ', hl: 'every little corner', post: '.' },
        { name: 'Lusina Bag', pre: 'Excellent car detailing service — my vehicle looked ', hl: 'showroom-new', post: ' inside and out, with every detail from the wheels to the dashboard handled meticulously. Highly recommend for anyone wanting a true deep clean!' },
        { name: 'Margaret Wells', pre: 'Fantastic job! Highly recommend. Tech was ', hl: 'polite and did a wonderful job', post: '' },
      ],
      faqs: faqKeys.map(k => FAQ[k]),
      city: r.city ? { heading: 'Detailing across ' + r.city, body: 'No shop and no drop-off. Book online, and Swarn comes to wherever your car is parked in ' + r.city + ', Monday to Saturday, 7am–7pm.', slug: slug(r.city), hasHoods: r.city === 'Surrey', hoods: HOODS, others: CITIES.filter(c => c !== r.city).map(c => ({ name: c, href: '#/city/' + slug(c) })) } : { hoods: [], others: [] },
      cityOptions: CITIES.map(c => ({ name: c, slug: slug(c), href: '#/city/' + slug(c) })),
      pickCity: e => { location.hash = '#/city/' + e.target.value; },
      problem: r.problem ? PROBLEMS[r.problem] : { steps: [], tips: [] },
      problemTabs: Object.keys(PROBLEMS).map(k => ({ label: PROBLEMS[k].label, href: '#/problem/' + k, current: k === r.problem ? 'page' : 'false', bg: k === r.problem ? '#0D1012' : '#fff', fg: k === r.problem ? '#fff' : '#14171A' })),
      footerServices: [{ label: 'Interior Detailing', href: '#/interior' }, { label: 'Inside & Out Detailing', href: '#/inside-out' }, { label: 'Exterior Detailing', href: '#/exterior' }, { label: 'Paint Protection & Ceramic Coating', href: '#/ceramic' }, { label: 'Milk spill cleaning', href: '#/problem/milk' }, { label: 'Vomit cleanup in your car', href: '#/problem/vomit' }],
    };
  }

  render() {
    const { addonsRot, addonsToggle, baPairs, city, cityOptions, closeMenu, faqs, footerServices, galHasMore, galMoreLabel, galToggle, gallery, goPackages, hero, heroVideo, isCeramic, isCity, isDesktop, isHome, isInner, isMobile, isProblem, lbAlt, lbClose, lbCount, lbNext, lbOpen, lbPrev, lbSrc, loaderOn, loaderOpacity, loaderPE, loaderShift, menuLabel, menuOpen, navLinks, pickCity, pkgGroups, pkgHeading, problem, problemTabs, reviews, showBA, showMobileMenu, showReviews, showSwarn, sliderPE, steps, stripBottom, stripBottom2, stripTop, stripTop2, toggleMenu, vehicles } = this.renderVals();
    return (
      <>
      <div style={{minHeight: "100vh", display: "flex", flexDirection: "column"}}>
        {loaderOn ? (
          <>
            <div role="status" aria-label="Loading 604 Car Spa" style={{position: "fixed", inset: "0", zIndex: "300", background: "#0D1012", display: "flex", alignItems: "center", justifyContent: "center", opacity: loaderOpacity, transition: "opacity 450ms cubic-bezier(0.23,1,0.32,1)", pointerEvents: loaderPE}}>
              <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "22px", transform: loaderShift, transition: "transform 450ms cubic-bezier(0.23,1,0.32,1)"}}>
                <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
                  <span style={{background: "#45D4D5", color: "#0D1012", fontWeight: "900", fontStretch: "125%", fontSize: "30px", padding: "8px 12px", borderRadius: "10px", letterSpacing: "-0.02em", lineHeight: "1"}}>
                    {"604"}
                  </span>
                  <span style={{fontWeight: "800", fontStretch: "125%", fontSize: "30px", letterSpacing: "-0.01em", color: "#fff", lineHeight: "1"}}>
                    {"Car Spa"}
                  </span>
                </div>
                <div style={{width: "160px", height: "2px", borderRadius: "2px", background: "rgba(255,255,255,0.14)", overflow: "hidden"}}>
                  <div data-load-bar="" style={{height: "100%", width: "100%", background: "#45D4D5", transformOrigin: "left center", transform: "scaleX(0)"}}></div>
                </div>
                <span style={{fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#A7AEB3", fontWeight: "600"}}>
                  {"Your Ride · Our Responsibility"}
                </span>
              </div>
            </div>
          </>
        ) : null}
        <div role="note" style={{background: "#45D4D5", color: "#0D1012", padding: "9px 20px", textAlign: "center", fontSize: "14px", fontWeight: "600", lineHeight: "1.35"}}>
          {"10% off your first service when you book online. Automatic, no code needed."}
        </div>
        <header style={{position: "sticky", top: "0", zIndex: "50", background: "rgba(13,16,18,0.92)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid #22272B"}}>
          <div style={{maxWidth: "1320px", margin: "0 auto", padding: "0 20px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px"}}>
            <a href="#/" aria-label="604 Car Spa home" style={{display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#fff"}}>
              <span style={{background: "#45D4D5", color: "#0D1012", fontWeight: "900", fontStretch: "125%", fontSize: "17px", padding: "5px 8px", borderRadius: "7px", letterSpacing: "-0.02em"}}>
                {"604"}
              </span>
              <span style={{display: "flex", flexDirection: "column", lineHeight: "1.05"}}>
                <span style={{fontWeight: "800", fontStretch: "125%", fontSize: "17px", letterSpacing: "-0.01em", color: "#fff"}}>
                  {"Car Spa"}
                </span>
              </span>
            </a>
            {isDesktop ? (
              <>
                <nav aria-label="Main" style={{display: "flex", alignItems: "center", gap: "6px"}}>
                  {(navLinks || []).map((l, $index) => (
                    <React.Fragment key={$index}>
                      <a href={l?.href} style={{color: "#E6E9EB", textDecoration: "none", fontSize: "15px", fontWeight: "500", padding: "10px 14px", borderRadius: "999px", transition: "color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, text-shadow 200ms ease, border-color 200ms ease, transform 160ms ease-out"}} className="dc1 dc2">
                        {l?.label}
                      </a>
                    </React.Fragment>
                  ))}
                </nav>
                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                  <a href="tel:+16723386915" style={{color: "#fff", textDecoration: "none", fontWeight: "600", fontSize: "15px", padding: "12px 16px", border: "1px solid #3A4045", borderRadius: "999px", transition: "color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, text-shadow 200ms ease, border-color 200ms ease, transform 160ms ease-out"}} className="dc3 dc4">
                    {"672-338-6915"}
                  </a>
                  <a href="https://app.nexusbookai.com/604carspa/book" style={{background: "#45D4D5", color: "#0D1012", textDecoration: "none", fontWeight: "700", fontSize: "15px", padding: "13px 22px", borderRadius: "999px", transition: "color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, text-shadow 200ms ease, border-color 200ms ease, transform 160ms ease-out"}} className="dc5 dc6">
                    {"Book Online"}
                  </a>
                </div>
              </>
            ) : null}
            {isMobile ? (
              <>
                <button onClick={toggleMenu} aria-expanded={menuOpen} aria-label="Menu" style={{background: "transparent", border: "1px solid #3A4045", color: "#fff", borderRadius: "999px", height: "44px", padding: "0 18px", fontSize: "15px", fontWeight: "600", cursor: "pointer", transition: "color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 160ms ease-out"}} className="dc7 dc8">
                  {menuLabel}
                </button>
              </>
            ) : null}
          </div>
          {showMobileMenu ? (
            <>
              <nav aria-label="Mobile" style={{borderTop: "1px solid #22272B", padding: "8px 20px 20px", display: "flex", flexDirection: "column"}}>
                {(navLinks || []).map((l, $index) => (
                  <React.Fragment key={$index}>
                    <a href={l?.href} onClick={closeMenu} style={{color: "#fff", textDecoration: "none", fontSize: "20px", fontWeight: "600", fontStretch: "115%", padding: "14px 0", borderBottom: "1px solid #22272B"}}>
                      {l?.label}
                    </a>
                  </React.Fragment>
                ))}
              </nav>
            </>
          ) : null}
        </header>
        <main style={{flex: "1"}}>
          {isHome ? (
            <>
              <section data-screen-label="Home · Hero" style={{position: "relative", background: "#0D1012", color: "#fff", minHeight: "min(880px,calc(100svh - 100px))", display: "flex", alignItems: "flex-end", overflow: "hidden"}}>
                <div style={{position: "absolute", inset: "0"}}>
                  <video src="media/reel-546.mp4" autoPlay={true} muted={true} loop={true} playsInline={true} preload="auto" aria-hidden="true" style={{width: "100%", height: "100%", objectFit: "cover", display: "block"}}></video>
                </div>
                <div style={{position: "absolute", inset: "0", pointerEvents: "none", background: "linear-gradient(180deg,rgba(13,16,18,0.35) 0%,rgba(13,16,18,0.15) 35%,rgba(13,16,18,0.88) 78%,#0D1012 100%)"}}></div>
                <div style={{position: "relative", pointerEvents: "none", width: "100%", maxWidth: "1320px", margin: "0 auto", padding: "120px 20px 56px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"}}>
                  <h1 style={{margin: "0 0 24px", fontStretch: "125%", fontWeight: "800", fontSize: "clamp(40px,7.2vw,104px)", lineHeight: "0.95", letterSpacing: "-0.035em", textWrap: "balance"}}>
                    {"That new-car feeling."}
                    <br />
                    {"Right in your driveway."}
                  </h1>
                  <p style={{margin: "0", fontSize: "clamp(17px,1.5vw,20px)", lineHeight: "1.5", color: "#D5DADD", maxWidth: "46ch"}}>
                    {"Swarn comes to your home, workplace or yard with all the equipment. No shop, no waiting room."}
                  </p>
                  <div style={{marginTop: "32px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", pointerEvents: "auto"}}>
                    <button onClick={goPackages} style={{background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.55)", fontWeight: "700", fontSize: "16px", padding: "17px 26px", borderRadius: "999px", cursor: "pointer", transition: "color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 160ms ease-out"}} className="dc9 dc10">
                      {"See Packages & Prices"}
                    </button>
                    <a href="https://app.nexusbookai.com/604carspa/book" style={{background: "#45D4D5", color: "#0D1012", textDecoration: "none", fontWeight: "700", fontSize: "16px", padding: "18px 28px", borderRadius: "999px", transition: "color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 160ms ease-out"}} className="dc11 dc12">
                      {"Book Online"}
                    </a>
                  </div>
                </div>
              </section>
            </>
          ) : null}
          {isInner ? (
            <>
              <section data-screen-label="Inner · Hero" style={{position: "relative", background: "#0D1012", color: "#fff", minHeight: "min(760px,calc(100svh - 100px))", display: "flex", alignItems: "flex-end", overflow: "hidden"}}>
                {" "}{heroVideo}{" "}
                <div aria-hidden="true" style={{position: "absolute", inset: "0", pointerEvents: "none", background: "linear-gradient(90deg,rgba(13,16,18,0.88) 0%,rgba(13,16,18,0.6) 45%,rgba(13,16,18,0.2) 100%),linear-gradient(180deg,rgba(13,16,18,0.3) 0%,rgba(13,16,18,0) 40%,rgba(13,16,18,0.7) 100%)"}}></div>
                <div style={{position: "relative", width: "100%", maxWidth: "1320px", margin: "0 auto", padding: "120px 20px 64px"}}>
                  <div style={{maxWidth: "720px"}}>
                    <p style={{margin: "0 0 16px", fontSize: "13px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#7FE3E4", fontWeight: "600"}}>
                      {hero?.eyebrow}
                    </p>
                    <h1 style={{margin: "0", fontStretch: "125%", fontWeight: "800", fontSize: "clamp(36px,5vw,68px)", lineHeight: "1", letterSpacing: "-0.03em", textWrap: "balance"}}>
                      {hero?.title}
                    </h1>
                    <p style={{margin: "22px 0 0", fontSize: "18px", lineHeight: "1.55", color: "#D5DADD", maxWidth: "48ch", textWrap: "pretty"}}>
                      {hero?.intro}
                    </p>
                    <div style={{marginTop: "30px", display: "flex", flexWrap: "wrap", gap: "12px"}}>
                      <a href="https://app.nexusbookai.com/604carspa/book" style={{background: "#45D4D5", color: "#0D1012", textDecoration: "none", fontWeight: "700", fontSize: "16px", padding: "17px 26px", borderRadius: "999px", transition: "color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 160ms ease-out"}} className="dc13 dc14">
                        {"Book Online"}
                      </a>
                      <button onClick={goPackages} style={{background: "transparent", color: "#fff", border: "1.5px solid #3A4045", fontWeight: "700", fontSize: "16px", padding: "16px 24px", borderRadius: "999px", cursor: "pointer", transition: "color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 160ms ease-out"}} className="dc15 dc16">
                        {"See prices"}
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : null}
          {isHome ? (
            <>
              <section data-screen-label="Strips" aria-label="Your Ride · Our Responsibility" style={{background: "#0D1012", overflow: "hidden", padding: "clamp(36px,5vw,64px) 0"}}>
                <div style={{transform: "rotate(-3deg)", margin: "0 -40px"}}>
                  {stripTop}
                </div>
                <div style={{transform: "rotate(-2deg)", margin: "clamp(10px,1.5vw,18px) -40px 0"}}>
                  {stripBottom}
                </div>
              </section>
            </>
          ) : null}
          {isHome ? (
            <>
              <div data-screen-label="Transformation scroll" data-scrub="" style={{position: "relative", height: "210svh", background: "#0D1012"}}>
                <div style={{position: "sticky", top: "0", height: "100svh", overflow: "hidden"}}>
                  <div style={{position: "absolute", inset: "0", overflow: "hidden"}}>
                    <video data-scrub-video="" src="./media/transformation.mp4" muted={true} playsInline preload="auto" aria-label="Car going from foam-covered to clean as you scroll" style={{position: "absolute", left: "0", top: "0", width: "100%", height: "109%", objectFit: "cover", objectPosition: "center top", display: "block"}}></video>
                  </div>
                  <div aria-hidden="true" style={{position: "absolute", inset: "0", pointerEvents: "none", background: "linear-gradient(180deg,rgba(13,16,18,0.35) 0%,rgba(13,16,18,0) 25%,rgba(13,16,18,0) 70%,rgba(13,16,18,0.75) 100%)"}}></div>
                  <div style={{position: "absolute", left: "0", right: "0", bottom: "0", padding: "0 20px clamp(20px,4svh,40px)"}}>
                    <div style={{maxWidth: "1320px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "14px"}}>
                      <div style={{height: "3px", background: "rgba(255,255,255,0.22)", borderRadius: "3px", overflow: "hidden"}}>
                        <div data-scrub-bar="" style={{height: "100%", width: "0%", background: "#45D4D5"}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          <section data-screen-label="Trust bar" aria-label="Why customers trust us" style={{background: "#0D1012", color: "#fff", borderTop: "1px solid #22272B", borderBottom: "1px solid #22272B"}}>
            <ul style={{listStyle: "none", margin: "0 auto", maxWidth: "1320px", padding: "18px 20px calc(18px + clamp(28px,4vw,64px))", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 30px", fontSize: "15px", fontWeight: "500"}}>
              <li style={{display: "flex", alignItems: "center", gap: "8px"}}>
                <a href="https://maps.app.goo.gl/VCF4xSp7aMsLi7A27" style={{color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px"}} className="dc17">
                  <span aria-hidden="true" style={{color: "#45D4D5", letterSpacing: "1px"}}>
                    {"★★★★★"}
                  </span>
                  <strong style={{fontWeight: "700"}}>
                    {"5.0"}
                  </strong>
                  <span>
                    {"from 39 Google reviews"}
                  </span>
                </a>
              </li>
              <li style={{display: "flex", alignItems: "center", gap: "8px"}}>
                <span aria-hidden="true" style={{width: "6px", height: "6px", borderRadius: "50%", background: "#45D4D5"}}></span>
                {"Licensed"}
              </li>
              <li style={{display: "flex", alignItems: "center", gap: "8px"}}>
                <span aria-hidden="true" style={{width: "6px", height: "6px", borderRadius: "50%", background: "#45D4D5"}}></span>
                {"Insured"}
              </li>
              <li style={{display: "flex", alignItems: "center", gap: "8px"}}>
                <span aria-hidden="true" style={{width: "6px", height: "6px", borderRadius: "50%", background: "#45D4D5"}}></span>
                {"Fully mobile"}
              </li>
              <li style={{display: "flex", alignItems: "center", gap: "8px"}}>
                <span aria-hidden="true" style={{width: "6px", height: "6px", borderRadius: "50%", background: "#45D4D5"}}></span>
                {"Owner-operated"}
              </li>
            </ul>
          </section>
          {isCity ? (
            <>
              <section data-screen-label="City · Areas" style={{position: "relative", marginTop: "calc(-1 * clamp(28px,4vw,64px))", clipPath: "polygon(0 clamp(28px,4vw,64px),100% 0,100% 100%,0 100%)", background: "#F4F1EC"}}>
                <div style={{maxWidth: "1320px", margin: "0 auto", padding: "80px 20px 96px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,400px),1fr))", gap: "40px"}}>
                  <div>
                    <h2 style={{margin: "0", fontStretch: "125%", fontWeight: "800", fontSize: "clamp(28px,3.4vw,44px)", lineHeight: "1.05", letterSpacing: "-0.025em", textWrap: "balance"}}>
                      {city?.heading}
                    </h2>
                    <p style={{margin: "18px 0 0", fontSize: "18px", lineHeight: "1.6", color: "#3C4246", maxWidth: "52ch", textWrap: "pretty"}}>
                      {city?.body}
                    </p>
                    {city?.hasHoods ? (
                      <>
                        <p style={{margin: "26px 0 10px", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: "700", color: "#555B60"}}>
                          {"Surrey neighbourhoods"}
                        </p>
                        <ul style={{listStyle: "none", margin: "0", padding: "0", display: "flex", flexWrap: "wrap", gap: "8px"}}>
                          {(city?.hoods || []).map((h, $index) => (
                            <React.Fragment key={$index}>
                              <li style={{background: "#fff", border: "1px solid #E0DBD2", borderRadius: "999px", padding: "8px 14px", fontSize: "15px"}}>
                                {h}
                              </li>
                            </React.Fragment>
                          ))}
                        </ul>
                      </>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="city-pick" style={{display: "block", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: "700", color: "#555B60", marginBottom: "10px"}}>
                      {"Template preview · choose a city"}
                    </label>
                    <select id="city-pick" value={city?.slug} onChange={pickCity} style={{width: "100%", maxWidth: "360px", height: "52px", borderRadius: "12px", border: "1px solid #CFC9BE", background: "#fff", padding: "0 14px", fontSize: "16px", fontFamily: "inherit", color: "#14171A"}}>
                      {(cityOptions || []).map((o, $index) => (
                        <React.Fragment key={$index}>
                          <option value={o?.slug}>
                            {o?.name}
                          </option>
                        </React.Fragment>
                      ))}
                    </select>
                    <p style={{margin: "28px 0 10px", fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: "700", color: "#555B60"}}>
                      {"Also serving"}
                    </p>
                    <ul style={{listStyle: "none", margin: "0", padding: "0", display: "flex", flexWrap: "wrap", gap: "8px"}}>
                      {(city?.others || []).map((o, $index) => (
                        <React.Fragment key={$index}>
                          <li>
                            <a href={o?.href} style={{display: "block", border: "1px solid #CFC9BE", borderRadius: "999px", padding: "8px 14px", fontSize: "15px", textDecoration: "none", transition: "color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 160ms ease-out"}} className="dc18 dc19">
                              {o?.name}
                            </a>
                          </li>
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </>
          ) : null}
          {isProblem ? (
            <>
              <section data-screen-label="Problem · Details" style={{position: "relative", marginTop: "calc(-1 * clamp(28px,4vw,64px))", clipPath: "polygon(0 clamp(28px,4vw,64px),100% 0,100% 100%,0 100%)", background: "#F4F1EC"}}>
                <div style={{maxWidth: "1320px", margin: "0 auto", padding: "80px 20px 96px"}}>
                  <div style={{display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px"}}>
                    {(problemTabs || []).map((t, $index) => (
                      <React.Fragment key={$index}>
                        <a href={t?.href} aria-current={t?.current} style={{textDecoration: "none", fontSize: "15px", fontWeight: "600", padding: "10px 16px", borderRadius: "999px", border: "1px solid #CFC9BE", background: t?.bg, color: t?.fg, transition: "color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 160ms ease-out"}} className="dc20 dc21">
                          {t?.label}
                        </a>
                      </React.Fragment>
                    ))}
                  </div>
                  <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "20px"}}>
                    <div style={{background: "#fff", border: "1px solid #E0DBD2", borderRadius: "20px", padding: "30px"}}>
                      <h2 style={{margin: "0 0 16px", fontStretch: "120%", fontWeight: "800", fontSize: "24px", letterSpacing: "-0.02em"}}>
                        {"What I do"}
                      </h2>
                      <ul style={{margin: "0", padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: "9px", fontSize: "16px", lineHeight: "1.5", color: "#3C4246"}}>
                        {(problem?.steps || []).map((s, $index) => (
                          <React.Fragment key={$index}>
                            <li>
                              {s}
                            </li>
                          </React.Fragment>
                        ))}
                      </ul>
                    </div>
                    <div style={{background: "#0D1012", color: "#fff", borderRadius: "20px", padding: "30px"}}>
                      <h2 style={{margin: "0 0 16px", fontStretch: "120%", fontWeight: "800", fontSize: "24px", letterSpacing: "-0.02em"}}>
                        {"Honest expectations"}
                      </h2>
                      <p style={{margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#D5DADD", textWrap: "pretty"}}>
                        {problem?.honest}
                      </p>
                    </div>
                    <div style={{background: "#fff", border: "1px solid #E0DBD2", borderRadius: "20px", padding: "30px"}}>
                      <h2 style={{margin: "0 0 16px", fontStretch: "120%", fontWeight: "800", fontSize: "24px", letterSpacing: "-0.02em"}}>
                        {"Until I get there"}
                      </h2>
                      <ul style={{margin: "0", padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: "9px", fontSize: "16px", lineHeight: "1.5", color: "#3C4246"}}>
                        {(problem?.tips || []).map((s, $index) => (
                          <React.Fragment key={$index}>
                            <li>
                              {s}
                            </li>
                          </React.Fragment>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : null}
          {isCeramic ? (
            <>
              <section data-screen-label="Ceramic · Feature" style={{position: "relative", marginTop: "calc(-1 * clamp(28px,4vw,64px))", clipPath: "polygon(0 clamp(28px,4vw,64px),100% 0,100% 100%,0 100%)", background: "#F4F1EC"}}>
                <div style={{maxWidth: "1320px", margin: "0 auto", padding: "80px 20px 96px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,400px),1fr))", gap: "24px", alignItems: "stretch"}}>
                  <div style={{background: "#0D1012", color: "#fff", borderRadius: "24px", padding: "clamp(28px,4vw,48px)", display: "flex", flexDirection: "column", gap: "18px"}}>
                    <p style={{margin: "0", fontSize: "13px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#7FE3E4", fontWeight: "600"}}>
                      {"Add-on · 2 hrs"}
                    </p>
                    <h2 style={{margin: "0", fontStretch: "125%", fontWeight: "800", fontSize: "clamp(30px,3.6vw,48px)", lineHeight: "1", letterSpacing: "-0.03em"}}>
                      {"Ceramic Coating (1 year)"}
                    </h2>
                    <p style={{margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#D5DADD", maxWidth: "46ch"}}>
                      {"Add a one-year ceramic coating to any package. Pair it with a one-step polish so the coating goes on over a refined finish."}
                    </p>
                    <div style={{display: "flex", alignItems: "baseline", gap: "10px", marginTop: "auto"}}>
                      <span style={{fontStretch: "125%", fontWeight: "800", fontSize: "44px", letterSpacing: "-0.03em"}}>
                        {"$149"}
                      </span>
                      <span style={{color: "#A7AEB3", fontSize: "15px"}}>
                        {"+ $7.45 GST · total $156.45"}
                      </span>
                    </div>
                    <a href="https://app.nexusbookai.com/604carspa/book" style={{alignSelf: "flex-start", background: "#45D4D5", color: "#0D1012", textDecoration: "none", fontWeight: "700", fontSize: "16px", padding: "16px 24px", borderRadius: "999px", transition: "color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 160ms ease-out"}} className="dc22 dc23">
                      {"Book with ceramic"}
                    </a>
                  </div>
                  <div style={{position: "relative", minHeight: "320px", borderRadius: "24px", overflow: "hidden", background: "#161A1D"}}>
                    <image-slot id="ceramic-beading" shape="rect" placeholder="Photo: water beading on freshly coated paint"></image-slot>
                  </div>
                </div>
              </section>
            </>
          ) : null}
          {isHome ? (
            <>
              <div data-screen-label="On the job · reveal" style={{marginTop: "calc(-1 * clamp(28px,4vw,64px))", clipPath: "polygon(0 clamp(28px,4vw,64px),100% 0,100% 100%,0 100%)", position: "relative", overflow: "clip", background: "#0D1012"}}>
                <div aria-hidden="true" style={{position: "sticky", top: "0", height: "100svh", zIndex: "0", overflow: "hidden"}}>
                  <img src="https://images.unsplash.com/photo-1541447270888-83e8494f9c06?fm=jpg&q=70&w=2400&auto=format&fit=crop" alt="" style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 55%", display: "block"}} />
                  <div style={{position: "absolute", inset: "0", background: "linear-gradient(180deg,rgba(13,16,18,0.78) 0%,rgba(13,16,18,0.5) 35%,rgba(13,16,18,0.55) 65%,rgba(13,16,18,0.82) 100%)"}}></div>
                </div>
                <div style={{position: "relative", zIndex: "1", marginTop: "-100svh", minHeight: "200svh", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                  <section data-screen-label="On the job" style={{position: "relative", background: "transparent", color: "#fff"}}>
                    <div style={{maxWidth: "1320px", margin: "0 auto", padding: "50svh 20px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(32px,5vw,72px)"}}>
                      <div data-reveal="" style={{flex: "1 1 320px", maxWidth: "520px"}}>
                        <p style={{margin: "0 0 12px", fontSize: "13px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#7FE3E4", fontWeight: "600"}}>
                          {"On the job"}
                        </p>
                        <h2 style={{margin: "0", fontStretch: "125%", fontWeight: "800", fontSize: "clamp(30px,4vw,56px)", lineHeight: "1", letterSpacing: "-0.03em", textWrap: "balance"}}>
                          {"See the work, start to finish."}
                        </h2>
                        <p style={{margin: "20px 0 0", fontSize: "18px", lineHeight: "1.6", color: "#D5DADD", maxWidth: "44ch"}}>
                          {"Recent jobs from Instagram, filmed in customers' driveways."}
                        </p>
                        <a href="https://instagram.com/604.carspa" style={{display: "inline-block", marginTop: "28px", color: "#fff", fontWeight: "600", fontSize: "15px"}} className="dc24">
                          {"Follow @604.carspa"}
                        </a>
                      </div>
                      <div data-reveal="" style={{flex: "1 1 380px", display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "clamp(12px,2vw,24px)", maxWidth: "620px"}}>
                        <div style={{aspectRatio: "9/16", borderRadius: "28px", overflow: "hidden", background: "#161A1D", border: "6px solid #22272B"}}>
                          <video src="./media/reel-063.mp4" autoPlay={true} muted={true} loop playsInline preload="auto" aria-label="Instagram reel: detailing job" style={{width: "100%", height: "100%", objectFit: "cover", display: "block"}}></video>
                        </div>
                        <div style={{position: "relative", aspectRatio: "9/16", borderRadius: "28px", overflow: "hidden", background: "#161A1D", border: "6px solid #22272B", marginTop: "clamp(24px,5vw,64px)"}}>
                          <video src="./media/reel-pov.mp4#t=6" autoPlay={true} muted={true} playsInline preload="auto" data-pov="1" aria-label="Instagram reel: detailing from Swarn's point of view" style={{width: "100%", height: "100%", objectFit: "cover", display: "block"}}></video>
                          <div aria-hidden="true" style={{position: "absolute", inset: "0", pointerEvents: "none", background: "linear-gradient(180deg,rgba(13,16,18,0.75) 0%,rgba(13,16,18,0) 32%,rgba(13,16,18,0) 70%,rgba(13,16,18,0.7) 100%)"}}></div>
                          <div style={{position: "absolute", top: "16px", left: "16px", right: "16px", pointerEvents: "none", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px"}}>
                            <span style={{display: "flex", alignItems: "center", gap: "6px", background: "#45D4D5", color: "#0D1012", fontSize: "11px", fontWeight: "800", letterSpacing: "0.14em", textTransform: "uppercase", padding: "5px 9px", borderRadius: "999px"}}>
                              <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "#0D1012"}}></span>
                              {"POV"}
                            </span>
                            <span style={{fontStretch: "125%", fontWeight: "800", fontSize: "clamp(20px,2.4vw,30px)", lineHeight: "0.95", letterSpacing: "-0.03em", color: "#fff", textShadow: "0 2px 12px rgba(0,0,0,0.45)"}}>
                              {"From my POV"}
                            </span>
                          </div>
                          <span style={{position: "absolute", left: "16px", bottom: "14px", pointerEvents: "none", fontSize: "13px", fontWeight: "600", color: "#fff"}}>
                            {"Swarn · on the job"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </>
          ) : null}
          {showBA ? (
            <>
              <section data-screen-label="Before & after" style={{position: "relative", marginTop: "calc(-1 * clamp(28px,4vw,64px))", clipPath: "polygon(0 clamp(28px,4vw,64px),100% 0,100% 100%,0 100%)", background: "#0D1012", color: "#fff"}}>
                <div style={{maxWidth: "1320px", margin: "0 auto", padding: "88px 20px"}}>
                  <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "20px", marginBottom: "36px"}}>
                    <div>
                      <p style={{margin: "0 0 12px", fontSize: "13px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#7FE3E4", fontWeight: "600"}}>
                        {"Before & after"}
                      </p>
                      <h2 style={{margin: "0", fontStretch: "125%", fontWeight: "800", fontSize: "clamp(30px,4vw,56px)", lineHeight: "1", letterSpacing: "-0.03em"}}>
                        {"Drag to see the difference."}
                      </h2>
                    </div>
                    <a href="https://instagram.com/604.carspa" style={{color: "#fff", fontWeight: "600", fontSize: "15px"}} className="dc25">
                      {"More on Instagram @604.carspa"}
                    </a>
                  </div>
                  <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: "20px"}}>
                    {(baPairs || []).map((p, $index) => (
                      <React.Fragment key={$index}>
                        <figure style={{margin: "0"}}>
                          <div style={{position: "relative", aspectRatio: "4/5", borderRadius: "18px", overflow: "hidden", background: "#161A1D", touchAction: "pan-y"}}>
                            <div style={{position: "absolute", inset: "0"}}>
                              <div role="img" aria-label={p?.afterText} style={{width: "100%", height: "100%", backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${p?.afterSrc ?? ""})`}}></div>
                            </div>
                            <div style={{position: "absolute", inset: "0", clipPath: p?.clip}}>
                              <div role="img" aria-label={p?.beforeText} style={{width: "100%", height: "100%", backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${p?.beforeSrc ?? ""})`}}></div>
                            </div>
                            <span style={{position: "absolute", top: "14px", left: "14px", pointerEvents: "none", background: "rgba(13,16,18,0.8)", color: "#fff", fontSize: "12px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", padding: "6px 10px", borderRadius: "999px", opacity: p?.beforeOp, transition: "opacity 180ms ease"}}>
                              {"Before"}
                            </span>
                            <span style={{position: "absolute", top: "14px", right: "14px", pointerEvents: "none", background: "#45D4D5", color: "#0D1012", fontSize: "12px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", padding: "6px 10px", borderRadius: "999px", opacity: p?.afterOp, transition: "opacity 180ms ease"}}>
                              {"After"}
                            </span>
                            <div aria-hidden="true" style={{position: "absolute", top: "0", bottom: "0", left: p?.left, width: "3px", marginLeft: "-1.5px", background: "#fff", pointerEvents: "none"}}>
                              <div style={{position: "absolute", top: "50%", left: "50%", width: "48px", height: "48px", margin: "-24px 0 0 -24px", borderRadius: "50%", background: "#fff", color: "#0D1012", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "16px", boxShadow: p?.ring}}>
                                {"‹ ›"}
                              </div>
                            </div>
                            <input type="range" min="0" max="100" value={p?.pos} onChange={p?.onChange} onFocus={p?.onFocus} onBlur={p?.onBlur} aria-label={p?.aria} style={{position: "absolute", inset: "0", width: "100%", height: "100%", margin: "0", opacity: "0", cursor: "ew-resize", pointerEvents: sliderPE}} />
                          </div>
                          <figcaption style={{marginTop: "12px", fontSize: "15px", color: "#A7AEB3"}}>
                            {p?.caption}
                          </figcaption>
                        </figure>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </section>
            </>
          ) : null}
          {isHome ? (
            <>
              <div data-screen-label="More videos · reveal" style={{marginTop: "calc(-1 * clamp(28px,4vw,64px))", clipPath: "polygon(0 clamp(28px,4vw,64px),100% 0,100% 100%,0 100%)", position: "relative", overflow: "clip", background: "#0D1012"}}>
                <div aria-hidden="true" style={{position: "sticky", top: "0", height: "100svh", zIndex: "0", overflow: "hidden"}}>
                  <img src="https://images.unsplash.com/photo-1634636208509-63bcd2a1b13f?fm=jpg&q=70&w=2400&auto=format&fit=crop" alt="" style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%", display: "block"}} />
                  <div style={{position: "absolute", inset: "0", background: "linear-gradient(180deg,rgba(13,16,18,0.78) 0%,rgba(13,16,18,0.5) 35%,rgba(13,16,18,0.55) 65%,rgba(13,16,18,0.82) 100%)"}}></div>
                </div>
                <div style={{position: "relative", zIndex: "1", marginTop: "-100svh", minHeight: "200svh", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                  <section data-screen-label="More videos" style={{position: "relative", background: "transparent", color: "#fff"}}>
                    <div style={{maxWidth: "1320px", margin: "0 auto", padding: "50svh 20px", display: "flex", flexWrap: "wrap-reverse", alignItems: "center", gap: "clamp(32px,5vw,72px)"}}>
                      <div data-reveal="" style={{flex: "1 1 380px", display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "clamp(12px,2vw,24px)", maxWidth: "620px"}}>
                        <div style={{aspectRatio: "9/16", borderRadius: "28px", overflow: "hidden", background: "#161A1D", border: "6px solid #22272B", marginTop: "clamp(24px,5vw,64px)"}}>
                          <video src="./media/reel-546b.mp4" autoPlay={true} muted={true} loop playsInline preload="auto" aria-label="Instagram reel: detailing job" style={{width: "100%", height: "100%", objectFit: "cover", display: "block"}}></video>
                        </div>
                        <div style={{aspectRatio: "9/16", borderRadius: "28px", overflow: "hidden", background: "#161A1D", border: "6px solid #22272B"}}>
                          <video src="./media/reel-489b.mp4" autoPlay={true} muted={true} loop playsInline preload="auto" aria-label="Instagram reel: detailing job" style={{width: "100%", height: "100%", objectFit: "cover", display: "block"}}></video>
                        </div>
                      </div>
                      <div data-reveal="" style={{flex: "1 1 320px", maxWidth: "520px"}}>
                        <p style={{margin: "0 0 12px", fontSize: "13px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#7FE3E4", fontWeight: "600"}}>
                          {"More from the driveway"}
                        </p>
                        <h2 style={{margin: "0", fontStretch: "125%", fontWeight: "800", fontSize: "clamp(30px,4vw,56px)", lineHeight: "1", letterSpacing: "-0.03em", textWrap: "balance"}}>
                          {"Every job, filmed on site."}
                        </h2>
                        <p style={{margin: "20px 0 0", fontSize: "18px", lineHeight: "1.6", color: "#D5DADD", maxWidth: "44ch"}}>
                          {"More recent work, shared on Instagram."}
                        </p>
                        <a href="https://instagram.com/604.carspa" style={{display: "inline-block", marginTop: "28px", color: "#fff", fontWeight: "600", fontSize: "15px"}} className="dc26">
                          {"Watch more @604.carspa"}
                        </a>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </>
          ) : null}
          {isHome ? (
            <>
              <section id="gallery" data-screen-label="Gallery" style={{position: "relative", marginTop: "calc(-1 * clamp(28px,4vw,64px))", clipPath: "polygon(0 clamp(28px,4vw,64px),100% 0,100% 100%,0 100%)", background: "#F4F1EC", scrollMarginTop: "70px"}}>
                <div style={{maxWidth: "1320px", margin: "0 auto", padding: "88px 20px"}}>
                  <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "20px", marginBottom: "36px"}}>
                    <div>
                      <p style={{margin: "0 0 12px", fontSize: "13px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#0B6E6F", fontWeight: "700"}}>
                        {"Gallery"}
                      </p>
                      <h2 style={{margin: "0", fontStretch: "125%", fontWeight: "800", fontSize: "clamp(30px,4vw,56px)", lineHeight: "1", letterSpacing: "-0.03em"}}>
                        {"Finished interiors."}
                      </h2>
                    </div>
                    <a href="https://instagram.com/604.carspa" style={{fontWeight: "600", fontSize: "15px"}}>
                      {"More on Instagram @604.carspa"}
                    </a>
                  </div>
                  <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: "14px"}}>
                    {(gallery || []).map((g, $index) => (
                      <React.Fragment key={$index}>
                        <button onClick={g?.open} aria-label={g?.aria} style={{padding: "0", border: "0", cursor: "zoom-in", borderRadius: "18px", overflow: "hidden", aspectRatio: "3/4", background: "#E0DBD2", display: "block"}} className="dc27">
                          <div style={{width: "100%", height: "100%", backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${g?.src ?? ""})`}}></div>
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                  {galHasMore ? (
                    <>
                      <div style={{display: "flex", justifyContent: "center", marginTop: "28px"}}>
                        <button onClick={galToggle} style={{background: "#0D1012", color: "#fff", border: "0", fontWeight: "700", fontSize: "15px", padding: "15px 28px", borderRadius: "999px", cursor: "pointer", transition: "color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, transform 160ms ease-out"}} className="dc28 dc29">
                          {galMoreLabel}
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
              </section>
            </>
          ) : null}
          {lbOpen ? (
            <>
              <div role="dialog" aria-modal="true" aria-label="Gallery photo" onClick={lbClose} style={{position: "fixed", inset: "0", zIndex: "100", background: "rgba(13,16,18,0.94)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(16px,4vw,56px)"}}>
                <div role="img" aria-label={lbAlt} style={{width: "100%", height: "100%", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundImage: `url(${lbSrc ?? ""})`}}></div>
                <button onClick={lbPrev} aria-label="Previous photo" style={{position: "absolute", left: "16px", top: "50%", marginTop: "-26px", width: "52px", height: "52px", borderRadius: "50%", border: "0", background: "#fff", color: "#0D1012", fontSize: "22px", fontWeight: "700", cursor: "pointer", transition: "color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 160ms ease-out"}} className="dc30 dc31">
                  {"‹"}
                </button>
                <button onClick={lbNext} aria-label="Next photo" style={{position: "absolute", right: "16px", top: "50%", marginTop: "-26px", width: "52px", height: "52px", borderRadius: "50%", border: "0", background: "#fff", color: "#0D1012", fontSize: "22px", fontWeight: "700", cursor: "pointer", transition: "color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 160ms ease-out"}} className="dc32 dc33">
                  {"›"}
                </button>
                <button onClick={lbClose} aria-label="Close" style={{position: "absolute", top: "16px", right: "16px", height: "44px", padding: "0 18px", borderRadius: "999px", border: "0", background: "#45D4D5", color: "#0D1012", fontSize: "15px", fontWeight: "700", cursor: "pointer", transition: "color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 160ms ease-out"}} className="dc34 dc35">
                  {"Close"}
                </button>
                <span style={{position: "absolute", bottom: "18px", left: "50%", transform: "translateX(-50%)", color: "#fff", fontSize: "14px", fontWeight: "600"}}>
                  {lbCount}
                </span>
              </div>
            </>
          ) : null}
          <section id="packages" data-screen-label="Packages" style={{position: "relative", marginTop: "calc(-1 * clamp(28px,4vw,64px))", clipPath: "polygon(0 clamp(28px,4vw,64px),100% 0,100% 100%,0 100%)", background: "#F4F1EC", scrollMarginTop: "70px"}}>
            <div style={{maxWidth: "1320px", margin: "0 auto", padding: "88px 20px 96px"}}>
              <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "20px"}}>
                <div>
                  <p style={{margin: "0 0 12px", fontSize: "13px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#0B6E6F", fontWeight: "700"}}>
                    {"Packages & prices"}
                  </p>
                  <h2 style={{margin: "0", fontStretch: "125%", fontWeight: "800", fontSize: "clamp(30px,4vw,56px)", lineHeight: "1", letterSpacing: "-0.03em", textWrap: "balance"}}>
                    {pkgHeading}
                  </h2>
                </div>
                <p style={{margin: "0", fontSize: "15px", lineHeight: "1.5", color: "#555B60", maxWidth: "40ch"}}>
                  {"Prices in CAD. First-booking price is 10% off when you book online. GST is 5% of the regular price."}
                </p>
              </div>
              <div style={{position: "sticky", top: "76px", zIndex: "20", margin: "32px 0 8px", padding: "8px 0"}}>
                <div role="group" aria-label="Vehicle size" data-veh-group="" style={{position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(46%,150px),1fr))", gap: "6px", background: "#fff", border: "1px solid #E0DBD2", borderRadius: "18px", padding: "6px", boxShadow: "0 10px 30px -18px rgba(13,16,18,0.35)", maxWidth: "760px"}}>
                  <div data-veh-ind="" aria-hidden="true" style={{position: "absolute", left: "0", top: "0", width: "0", height: "0", borderRadius: "13px", background: "#0D1012", boxShadow: "0 6px 16px -8px rgba(13,16,18,0.6)", pointerEvents: "none", opacity: "0"}}></div>
                  {(vehicles || []).map((v, $index) => (
                    <React.Fragment key={$index}>
                      <button data-veh-btn="" onClick={v?.select} aria-pressed={v?.pressed} style={{position: "relative", zIndex: "1", border: "0", borderRadius: "13px", minHeight: "48px", padding: "8px 12px", fontSize: "15px", fontWeight: "700", cursor: "pointer", background: "transparent", color: v?.fg, transition: "color 200ms ease, transform 160ms ease-out, box-shadow 200ms ease", WebkitTapHighlightColor: "transparent"}} className="dc36 dc37">
                        {v?.label}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              {(pkgGroups || []).map((g, $index) => (
                <React.Fragment key={$index}>
                  <div style={{marginTop: "48px"}}>
                    <div style={{display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "12px", borderBottom: "1px solid #D8D2C7", paddingBottom: "14px", marginBottom: "20px"}}>
                      <h3 style={{margin: "0", fontStretch: "120%", fontWeight: "800", fontSize: "clamp(22px,2.4vw,30px)", letterSpacing: "-0.02em"}}>
                        {g?.title}
                      </h3>
                      {g?.hasLink ? (
                        <>
                          <a href={g?.href} style={{fontSize: "15px", fontWeight: "600"}}>
                            {g?.linkLabel}
                          </a>
                        </>
                      ) : null}
                    </div>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,290px),1fr))", gap: "16px"}}>
                      {(g?.cards || []).map((c, $index) => (
                        <React.Fragment key={$index}>
                          <article data-reveal="" data-reveal-sm="" data-reveal-delay={c?.delay} style={{background: "#fff", border: "1px solid #E0DBD2", borderRadius: "20px", padding: "26px", display: "flex", flexDirection: "column", gap: "18px"}}>
                            <div style={{display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "flex-start"}}>
                              <h4 style={{margin: "0", fontStretch: "115%", fontWeight: "800", fontSize: "21px", lineHeight: "1.15", letterSpacing: "-0.015em", textWrap: "balance"}}>
                                {c?.name}
                              </h4>
                              <span style={{flex: "none", fontSize: "13px", fontWeight: "600", color: "#555B60", background: "#F4F1EC", borderRadius: "999px", padding: "5px 10px"}}>
                                {c?.duration}
                              </span>
                            </div>
                            <div style={{borderTop: "1px solid #EDE9E2", borderBottom: "1px solid #EDE9E2", padding: "16px 0", display: "grid", gap: "6px"}}>
                              <div style={{display: "flex", justifyContent: "space-between", fontSize: "15px", color: "#555B60"}}>
                                <span>
                                  {"Regular"}
                                </span>
                                <span data-price="" style={{display: "inline-block", textDecoration: "line-through"}}>
                                  {c?.regular}
                                </span>
                              </div>
                              <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "10px"}}>
                                <span style={{fontSize: "15px", fontWeight: "700", color: "#0B6E6F"}}>
                                  {"First booking"}
                                </span>
                                <span data-price="" style={{display: "inline-block", fontStretch: "125%", fontWeight: "800", fontSize: "36px", letterSpacing: "-0.03em", lineHeight: "1", fontVariantNumeric: "tabular-nums"}}>
                                  {c?.first}
                                </span>
                              </div>
                              <div style={{display: "flex", justifyContent: "space-between", fontSize: "15px", color: "#3C4246"}}>
                                <span>
                                  {"Total with GST"}
                                </span>
                                <strong data-price="" style={{display: "inline-block", fontWeight: "700", fontVariantNumeric: "tabular-nums"}}>
                                  {c?.total}
                                </strong>
                              </div>
                            </div>
                            <div>
                              {c?.hasPlus ? (
                                <>
                                  <p style={{margin: "0 0 8px", fontSize: "15px", fontWeight: "700"}}>
                                    {c?.plus}
                                  </p>
                                </>
                              ) : null}
                              <ul style={{margin: "0", padding: "0", listStyle: "none", display: "grid", gap: "7px", fontSize: "15px", lineHeight: "1.4", color: "#3C4246"}}>
                                {(c?.includes || []).map((i, $index) => (
                                  <React.Fragment key={$index}>
                                    <li style={{display: "flex", gap: "9px"}}>
                                      <span aria-hidden="true" style={{color: "#1A9FA0", fontWeight: "800"}}>
                                        {"✓"}
                                      </span>
                                      <span>
                                        {i}
                                      </span>
                                    </li>
                                  </React.Fragment>
                                ))}
                              </ul>
                            </div>
                            <a href="https://app.nexusbookai.com/604carspa/book" aria-label={c?.bookAria} style={{marginTop: "auto", textAlign: "center", background: "#0D1012", color: "#fff", textDecoration: "none", fontWeight: "700", fontSize: "15px", padding: "15px 20px", borderRadius: "999px", transition: "background-color 200ms ease, color 200ms ease, transform 160ms ease-out, box-shadow 200ms ease"}} className="dc38 dc39">
                              {"Book this package"}
                            </a>
                          </article>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </React.Fragment>
              ))}
              <details onToggle={addonsToggle} style={{marginTop: "40px", background: "#fff", border: "1px solid #E0DBD2", borderRadius: "20px"}}>
                <summary style={{cursor: "pointer", padding: "22px 26px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", fontStretch: "115%", fontWeight: "800", fontSize: "20px"}}>
                  {"Add-ons "}
                  <span aria-hidden="true" style={{display: "inline-block", fontSize: "24px", fontWeight: "400", color: "#0B6E6F", transition: "transform 220ms cubic-bezier(0.23,1,0.32,1)", transform: addonsRot}}>
                    {"+"}
                  </span>
                </summary>
                <div style={{padding: "0 26px 22px", display: "grid", gap: "0"}}>
                  <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "10px", padding: "16px 0", borderTop: "1px solid #EDE9E2"}}>
                    <div>
                      <strong style={{fontSize: "17px"}}>
                        {"Ceramic Coating (1 year)"}
                      </strong>
                      <div style={{fontSize: "15px", color: "#555B60", marginTop: "4px"}}>
                        {"2 hrs"}
                      </div>
                    </div>
                    <div style={{textAlign: "right"}}>
                      <strong style={{fontSize: "20px"}}>
                        {"$149"}
                      </strong>
                      <div style={{fontSize: "14px", color: "#555B60"}}>
                        {"+ GST · $156.45 total"}
                      </div>
                    </div>
                  </div>
                  <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "10px", padding: "16px 0", borderTop: "1px solid #EDE9E2"}}>
                    <div style={{maxWidth: "60ch"}}>
                      <strong style={{fontSize: "17px"}}>
                        {"Pet Hair Removal"}
                      </strong>
                      <div style={{fontSize: "15px", color: "#555B60", marginTop: "4px", lineHeight: "1.45"}}>
                        {"Extra charges may apply for severe buildup. You'll be told before work starts."}
                      </div>
                    </div>
                    <div style={{textAlign: "right"}}>
                      <strong style={{fontSize: "20px"}}>
                        {"$39"}
                      </strong>
                      <div style={{fontSize: "14px", color: "#555B60"}}>
                        {"+ GST · $40.95 total"}
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </section>
          <section data-screen-label="How it works" style={{position: "relative", marginTop: "calc(-1 * clamp(28px,4vw,64px))", clipPath: "polygon(0 clamp(28px,4vw,64px),100% 0,100% 100%,0 100%)", background: "#fff"}}>
            <div style={{maxWidth: "1320px", margin: "0 auto", padding: "88px 20px"}}>
              <p style={{margin: "0 0 12px", fontSize: "13px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#0B6E6F", fontWeight: "700"}}>
                {"How it works"}
              </p>
              <h2 style={{margin: "0 0 40px", fontStretch: "125%", fontWeight: "800", fontSize: "clamp(30px,4vw,56px)", lineHeight: "1", letterSpacing: "-0.03em"}}>
                {"Four steps. You don't leave home."}
              </h2>
              <ol style={{listStyle: "none", margin: "0", padding: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: "16px"}}>
                {(steps || []).map((s, $index) => (
                  <React.Fragment key={$index}>
                    <li style={{borderTop: "3px solid #0D1012", paddingTop: "20px"}}>
                      <span style={{display: "block", fontStretch: "125%", fontWeight: "800", fontSize: "15px", color: "#0B6E6F"}}>
                        {"0"}{s?.n}
                      </span>
                      <h3 style={{margin: "10px 0 8px", fontStretch: "115%", fontWeight: "800", fontSize: "22px", letterSpacing: "-0.015em", lineHeight: "1.15"}}>
                        {s?.title}
                      </h3>
                      <p style={{margin: "0", fontSize: "16px", lineHeight: "1.55", color: "#555B60", textWrap: "pretty"}}>
                        {s?.body}
                      </p>
                    </li>
                  </React.Fragment>
                ))}
              </ol>
              <div style={{marginTop: "48px", background: "#F4F1EC", borderRadius: "20px", padding: "clamp(24px,3vw,36px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: "24px"}}>
                <h3 style={{margin: "0", fontStretch: "120%", fontWeight: "800", fontSize: "24px", letterSpacing: "-0.02em"}}>
                  {"Before I arrive"}
                </h3>
                <div>
                  <strong style={{display: "block", fontSize: "16px", marginBottom: "6px"}}>
                    {"Space around the vehicle"}
                  </strong>
                  <span style={{fontSize: "15px", lineHeight: "1.5", color: "#555B60"}}>
                    {"Room to open every door and work all the way around the car."}
                  </span>
                </div>
                <div>
                  <strong style={{display: "block", fontSize: "16px", marginBottom: "6px"}}>
                    {"Water and power appreciated"}
                  </strong>
                  <span style={{fontSize: "15px", lineHeight: "1.5", color: "#555B60"}}>
                    {"An outdoor tap and outlet nearby help the job go smoothly."}
                  </span>
                </div>
                <div>
                  <strong style={{display: "block", fontSize: "16px", marginBottom: "6px"}}>
                    {"3–6 hours typical"}
                  </strong>
                  <span style={{fontSize: "15px", lineHeight: "1.5", color: "#555B60"}}>
                    {"Depends on the package, vehicle size and condition."}
                  </span>
                </div>
              </div>
            </div>
          </section>
          {showSwarn ? (
            <>
              <section data-screen-label="Meet Swarn" style={{position: "relative", marginTop: "calc(-1 * clamp(28px,4vw,64px))", clipPath: "polygon(0 clamp(28px,4vw,64px),100% 0,100% 100%,0 100%)", background: "#0D1012", color: "#fff"}}>
                <div style={{maxWidth: "1320px", margin: "0 auto", padding: "88px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", gap: "clamp(32px,5vw,72px)", alignItems: "center"}}>
                  <div style={{position: "relative", aspectRatio: "4/5", maxHeight: "680px", borderRadius: "24px", overflow: "hidden", background: "#161A1D"}}>
                    <image-slot id="owner-swarn" shape="rect" placeholder="Photo: Swarn at work on a customer's car"></image-slot>
                  </div>
                  <div>
                    <p style={{margin: "0 0 12px", fontSize: "13px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#7FE3E4", fontWeight: "600"}}>
                      {"Meet Swarn · Owner & detailer"}
                    </p>
                    <h2 style={{margin: "0", fontStretch: "125%", fontWeight: "800", fontSize: "clamp(30px,4vw,56px)", lineHeight: "1.02", letterSpacing: "-0.03em", textWrap: "balance"}}>
                      {"When you book with me, I'm the person doing the work."}
                    </h2>
                    <div style={{marginTop: "24px", display: "grid", gap: "16px", fontSize: "18px", lineHeight: "1.6", color: "#D5DADD", maxWidth: "52ch"}}>
                      <p style={{margin: "0"}}>
                        {"No crew, no subcontractors. I run 604 Car Spa myself and I do every job, from a basic interior clean to a full polish."}
                      </p>
                      <p style={{margin: "0"}}>
                        {"I bring the equipment to your driveway, workplace or yard. If a stain or smell can't be fully fixed, I'll tell you before I start."}
                      </p>
                    </div>
                    <p style={{margin: "28px 0 0", fontStretch: "115%", fontWeight: "700", fontSize: "20px", color: "#fff"}}>
                      {"Swarn"}
                    </p>
                    <p style={{margin: "4px 0 0", fontSize: "15px", color: "#A7AEB3"}}>
                      {"Licensed · Insured · Fully mobile"}
                    </p>
                  </div>
                </div>
              </section>
            </>
          ) : null}
          {showReviews ? (
            <>
              <section data-screen-label="Reviews" style={{position: "relative", marginTop: "calc(-1 * clamp(28px,4vw,64px))", clipPath: "polygon(0 clamp(28px,4vw,64px),100% 0,100% 100%,0 100%)", background: "#F4F1EC"}}>
                <div style={{maxWidth: "1320px", margin: "0 auto", padding: "88px 20px"}}>
                  <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", marginBottom: "36px"}}>
                    <div>
                      <p style={{margin: "0 0 12px", fontSize: "13px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#0B6E6F", fontWeight: "700"}}>
                        {"Google reviews"}
                      </p>
                      <div style={{display: "flex", alignItems: "baseline", gap: "14px", flexWrap: "wrap"}}>
                        <span style={{fontStretch: "125%", fontWeight: "800", fontSize: "clamp(48px,6vw,80px)", letterSpacing: "-0.04em", lineHeight: "1"}}>
                          {"5.0"}
                        </span>
                        <span>
                          <span aria-hidden="true" style={{color: "#1A9FA0", fontSize: "24px", letterSpacing: "2px"}}>
                            {"★★★★★"}
                          </span>
                          <span style={{display: "block", fontSize: "16px", color: "#555B60"}}>
                            {"from 39 Google reviews"}
                          </span>
                        </span>
                      </div>
                    </div>
                    <a href="https://maps.app.goo.gl/VCF4xSp7aMsLi7A27" style={{background: "#0D1012", color: "#fff", textDecoration: "none", fontWeight: "700", fontSize: "15px", padding: "15px 22px", borderRadius: "999px", transition: "color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 160ms ease-out"}} className="dc40 dc41">
                      {"Read all reviews on Google"}
                    </a>
                  </div>
                  <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "16px"}}>
                    {(reviews || []).map((r, $index) => (
                      <React.Fragment key={$index}>
                        <article style={{background: "#fff", border: "1px solid #E0DBD2", borderRadius: "20px", padding: "26px", display: "flex", flexDirection: "column", gap: "16px"}}>
                          <span aria-label="5 out of 5 stars" style={{color: "#1A9FA0", fontSize: "18px", letterSpacing: "2px"}}>
                            {"★★★★★"}
                          </span>
                          <p style={{margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#3C4246", textWrap: "pretty"}}>
                            {"“"}{r?.pre}
                            <strong style={{color: "#0B6E6F", fontWeight: "700"}}>
                              {r?.hl}
                            </strong>
                            {r?.post}{"”"}
                          </p>
                          <div style={{marginTop: "auto", paddingTop: "18px", borderTop: "1px solid #EDE9E2"}}>
                            <strong style={{display: "block", fontStretch: "115%", fontWeight: "800", fontSize: "17px", textTransform: "uppercase", letterSpacing: "0.01em"}}>
                              {r?.name}
                            </strong>
                            <span style={{fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#555B60"}}>
                              {"Google review"}
                            </span>
                          </div>
                        </article>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </section>
            </>
          ) : null}
          <section data-screen-label="FAQ" style={{position: "relative", marginTop: "calc(-1 * clamp(28px,4vw,64px))", clipPath: "polygon(0 clamp(28px,4vw,64px),100% 0,100% 100%,0 100%)", background: "#fff"}}>
            <div style={{maxWidth: "1320px", margin: "0 auto", padding: "88px 20px", display: "flex", flexWrap: "wrap", gap: "40px"}}>
              <div style={{flex: "1 1 300px"}}>
                <p style={{margin: "0 0 12px", fontSize: "13px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#0B6E6F", fontWeight: "700"}}>
                  {"FAQ"}
                </p>
                <h2 style={{margin: "0", fontStretch: "125%", fontWeight: "800", fontSize: "clamp(30px,4vw,56px)", lineHeight: "1", letterSpacing: "-0.03em"}}>
                  {"Good to know before you book."}
                </h2>
                <p style={{margin: "20px 0 0", fontSize: "16px", lineHeight: "1.55", color: "#555B60"}}>
                  {"Something else? Call or text "}
                  <a href="tel:+16723386915">
                    {"672-338-6915"}
                  </a>
                  {" or email "}
                  <a href="mailto:604carspa@gmail.com">
                    {"604carspa@gmail.com"}
                  </a>
                  {"."}
                </p>
              </div>
              <div style={{flex: "2 1 460px", minWidth: "0", borderTop: "1px solid #E0DBD2"}}>
                {(faqs || []).map((f, $index) => (
                  <React.Fragment key={$index}>
                    <details style={{borderBottom: "1px solid #E0DBD2"}}>
                      <summary style={{cursor: "pointer", padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px", fontSize: "18px", fontWeight: "700", lineHeight: "1.35"}}>
                        {f?.q}
                        <span aria-hidden="true" style={{flex: "none", width: "32px", height: "32px", borderRadius: "50%", border: "1px solid #CFC9BE", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "400", fontSize: "20px", color: "#0B6E6F"}}>
                          {"+"}
                        </span>
                      </summary>
                      <p style={{margin: "0", padding: "0 48px 24px 0", fontSize: "16px", lineHeight: "1.65", color: "#3C4246", textWrap: "pretty"}}>
                        {f?.a}
                      </p>
                    </details>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>
          <section data-screen-label="Strips 2" aria-label="Licensed, insured, fully mobile" style={{position: "relative", background: "#0D1012", overflow: "hidden", padding: "clamp(48px,6vw,88px) 0", marginTop: "calc(-1 * clamp(28px,4vw,64px))", clipPath: "polygon(0 clamp(28px,4vw,64px),100% 0,100% 100%,0 100%)"}}>
            <div style={{transform: "rotate(2deg)", margin: "0 -40px"}}>
              {stripTop2}
            </div>
            <div style={{transform: "rotate(3deg)", margin: "clamp(10px,1.5vw,18px) -40px 0"}}>
              {stripBottom2}
            </div>
          </section>
          <section data-screen-label="Final CTA" style={{position: "relative", background: "#45D4D5", color: "#0D1012"}}>
            <div style={{maxWidth: "1320px", margin: "0 auto", padding: "clamp(64px,8vw,112px) 20px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "32px"}}>
              <div>
                <h2 style={{margin: "0", fontStretch: "125%", fontWeight: "800", fontSize: "clamp(38px,6vw,88px)", lineHeight: "0.95", letterSpacing: "-0.04em"}}>
                  {"Ready for a cleaner car?"}
                </h2>
                <p style={{margin: "18px 0 0", fontSize: "18px", fontWeight: "500"}}>
                  {"10% off your first service when you book online."}
                </p>
              </div>
              <div style={{display: "flex", flexWrap: "wrap", gap: "12px"}}>
                <a href="https://app.nexusbookai.com/604carspa/book" style={{background: "#0D1012", color: "#fff", textDecoration: "none", fontWeight: "700", fontSize: "17px", padding: "19px 30px", borderRadius: "999px", transition: "color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 160ms ease-out"}} className="dc42 dc43">
                  {"Book Online"}
                </a>
                <a href="tel:+16723386915" style={{background: "transparent", color: "#0D1012", border: "2px solid #0D1012", textDecoration: "none", fontWeight: "700", fontSize: "17px", padding: "17px 28px", borderRadius: "999px", transition: "color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 160ms ease-out"}} className="dc44 dc45">
                  {"Call 672-338-6915"}
                </a>
              </div>
            </div>
          </section>
        </main>
        <footer data-screen-label="Footer" style={{position: "relative", marginTop: "calc(-1 * clamp(28px,4vw,64px))", clipPath: "polygon(0 clamp(28px,4vw,64px),100% 0,100% 100%,0 100%)", background: "#0D1012", color: "#D5DADD"}}>
          <div style={{maxWidth: "1320px", margin: "0 auto", padding: "72px 20px 40px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: "40px"}}>
            <div>
              <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                <span style={{background: "#45D4D5", color: "#0D1012", fontWeight: "900", fontStretch: "125%", fontSize: "17px", padding: "5px 8px", borderRadius: "7px"}}>
                  {"604"}
                </span>
                <span style={{fontWeight: "800", fontStretch: "125%", fontSize: "18px", color: "#fff"}}>
                  {"Car Spa"}
                </span>
              </div>
              <p style={{margin: "16px 0 0", fontSize: "15px", lineHeight: "1.6", color: "#A7AEB3"}}>
                {"Your Ride · Our Responsibility. Owner-operated mobile detailing based in Surrey, BC."}
              </p>
              <p style={{margin: "24px 0 8px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: "700", color: "#fff"}}>
                {"Hours"}
              </p>
              <p style={{margin: "0", fontSize: "15px", lineHeight: "1.7"}}>
                {"Monday–Saturday 7am–7pm"}
                <br />
                {"Sunday closed"}
              </p>
            </div>
            <div>
              <p style={{margin: "0 0 12px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: "700", color: "#fff"}}>
                {"Contact"}
              </p>
              <ul style={{listStyle: "none", margin: "0", padding: "0", display: "grid", gap: "10px", fontSize: "15px"}}>
                <li>
                  <a href="tel:+16723386915" style={{color: "#D5DADD"}} className="dc46">
                    {"672-338-6915"}
                  </a>
                </li>
                <li>
                  <a href="mailto:604carspa@gmail.com" style={{color: "#D5DADD"}} className="dc47">
                    {"604carspa@gmail.com"}
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/604.carspa" style={{color: "#D5DADD"}} className="dc48">
                    {"Instagram @604.carspa"}
                  </a>
                </li>
                <li>
                  <a href="https://maps.app.goo.gl/VCF4xSp7aMsLi7A27" style={{color: "#D5DADD"}} className="dc49">
                    {"Google reviews"}
                  </a>
                </li>
                <li>
                  <a href="https://app.nexusbookai.com/604carspa/book" style={{color: "#7FE3E4", fontWeight: "700"}} className="dc50">
                    {"Book online"}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p style={{margin: "0 0 12px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: "700", color: "#fff"}}>
                {"Services"}
              </p>
              <ul style={{listStyle: "none", margin: "0", padding: "0", display: "grid", gap: "10px", fontSize: "15px"}}>
                {(footerServices || []).map((l, $index) => (
                  <React.Fragment key={$index}>
                    <li>
                      <a href={l?.href} style={{color: "#D5DADD"}} className="dc51">
                        {l?.label}
                      </a>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
            <div>
              <p style={{margin: "0 0 12px", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: "700", color: "#fff"}}>
                {"Service areas"}
              </p>
              <ul style={{listStyle: "none", margin: "0", padding: "0", display: "flex", flexWrap: "wrap", gap: "8px 16px", fontSize: "15px"}}>
                {(cityOptions || []).map((o, $index) => (
                  <React.Fragment key={$index}>
                    <li>
                      <a href={o?.href} style={{color: "#D5DADD"}} className="dc52">
                        {o?.name}
                      </a>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
              <p style={{margin: "16px 0 0", fontSize: "14px", lineHeight: "1.6", color: "#A7AEB3"}}>
                {"Surrey: Cloverdale, Newton, Guildford, Fleetwood, South Surrey, Fraser Heights, Port Kells, Clayton."}
              </p>
            </div>
          </div>
          <div style={{maxWidth: "1320px", margin: "0 auto", padding: "20px 20px 28px", borderTop: "1px solid #22272B", fontSize: "13px", color: "#A7AEB3", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "10px"}}>
            <span>
              {"© 604 Car Spa · Surrey, BC"}
            </span>
            <span>
              {"Prices in CAD, plus 5% GST."}
            </span>
          </div>
          {isMobile ? (
            <>
              <div style={{height: "84px"}}></div>
            </>
          ) : null}
        </footer>
        {isMobile ? (
          <>
            <div role="navigation" aria-label="Quick actions" style={{position: "fixed", left: "0", right: "0", bottom: "0", zIndex: "60", background: "rgba(13,16,18,0.96)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderTop: "1px solid #22272B", padding: "10px 12px calc(10px + env(safe-area-inset-bottom))", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "10px"}}>
              <a href="tel:+16723386915" style={{display: "flex", alignItems: "center", justifyContent: "center", minHeight: "52px", border: "1.5px solid #3A4045", borderRadius: "999px", color: "#fff", textDecoration: "none", fontWeight: "700", fontSize: "16px", transition: "color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 160ms ease-out"}} className="dc53 dc54">
                {"Call"}
              </a>
              <a href="https://app.nexusbookai.com/604carspa/book" style={{display: "flex", alignItems: "center", justifyContent: "center", minHeight: "52px", background: "#45D4D5", borderRadius: "999px", color: "#0D1012", textDecoration: "none", fontWeight: "700", fontSize: "16px", transition: "color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease, transform 160ms ease-out"}} className="dc55 dc56">
                {"Book · 10% off"}
              </a>
            </div>
          </>
        ) : null}
      </div>
      </>
    );
  }
}

export default App;
