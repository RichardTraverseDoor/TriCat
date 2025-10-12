<template>
  <div class="home-wrapper">
    <div class="floating-paw floating-paw--one">🐾</div>
    <div class="floating-paw floating-paw--two">🐱</div>
    <div class="floating-paw floating-paw--three">🧶</div>

    <main class="home-content">
      <header class="home-hero">
        <span class="badge">Dein verspielter Lernbegleiter</span>
        <h1 class="font-heading text-glow">
          Willkommen bei <span class="text-emerald-300">TriCat</span>
        </h1>
        <p>
          TriCat ist dafür da, <strong class="text-emerald-200">Dir</strong> den Alltag zu versüßen –
          organisiert, freundlich und mit einer Prise Katzenmagie.
        </p>
      </header>

      <section class="card-frosted feature-card">
        <h2 class="font-heading text-emerald-200">Was TriCat alles kann</h2>
        <ol>
          <li>
            <span class="feature-icon">📅</span>
            <div>
              <h3 class="font-heading">Kalender</h3>
              <p>Behalte deine Termine und Deadlines immer im Blick.</p>
            </div>
          </li>
          <li>
            <span class="feature-icon">🗓️</span>
            <div>
              <h3 class="font-heading">Plan</h3>
              <p>Gestalte deinen Stundenplan so flexibel wie du bist.</p>
            </div>
          </li>
          <li>
            <span class="feature-icon">📈</span>
            <div>
              <h3 class="font-heading">Noten</h3>
              <p>Behalt den Überblick über deinen Fortschritt und feiere Erfolge.</p>
            </div>
          </li>
          <li>
            <span class="feature-icon">🧠</span>
            <div>
              <h3 class="font-heading">Karten</h3>
              <p>Lerne spielerisch mit Karten, die sich an deinen Stil anpassen.</p>
            </div>
          </li>
        </ol>
      </section>

      <footer class="home-footer">
        Viel Spaß beim Nutzen von TriCat!
      </footer>
    </main>
  </div>
</template>

<style scoped>
.home-wrapper {
  position: relative;
  min-height: 100vh;
  padding: clamp(2.5rem, 8vw, 5rem) clamp(1.25rem, 6vw, 3.5rem) clamp(6rem, 10vw, 8rem);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.home-content {
  width: min(100%, 820px);
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 6vw, 3.75rem);
  text-align: center;
  color: rgba(229, 247, 236, 0.95);
}

.home-hero {
  display: grid;
  gap: 1.25rem;
  place-items: center;
}

.home-hero h1 {
  font-size: clamp(2.6rem, 6vw, 4.4rem);
  letter-spacing: 0.01em;
}

.home-hero p {
  max-width: 42ch;
  font-size: clamp(1.05rem, 2.8vw, 1.25rem);
  color: rgba(203, 244, 222, 0.88);
  line-height: 1.7;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1.2rem;
  border-radius: 9999px;
  background: rgba(34, 197, 94, 0.18);
  color: rgba(187, 247, 208, 0.95);
  font-size: 0.95rem;
  font-weight: 600;
  box-shadow: 0 12px 28px rgba(16, 185, 129, 0.18);
}

.badge::before {
  content: '✨';
}

.feature-card {
  border-radius: clamp(1.75rem, 4vw, 2.5rem);
  padding: clamp(1.8rem, 4vw, 3rem) clamp(1.5rem, 4vw, 2.5rem);
  text-align: left;
}

.feature-card > h2 {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  margin-bottom: clamp(1.25rem, 3vw, 2rem);
  text-align: center;
}

.feature-card ol {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: clamp(1rem, 3.5vw, 1.75rem);
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-card li {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem 1.1rem;
  border-radius: 20px;
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.32);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.feature-card li:hover {
  transform: translateY(-4px);
  box-shadow: 0 22px 48px rgba(16, 185, 129, 0.22);
}

.feature-icon {
  font-size: 1.9rem;
  line-height: 1;
  filter: drop-shadow(0 6px 12px rgba(74, 222, 128, 0.4));
}

.feature-card h3 {
  font-size: 1.2rem;
  color: rgba(187, 247, 208, 0.96);
  margin-bottom: 0.35rem;
}

.feature-card p {
  margin: 0;
  color: rgba(226, 232, 240, 0.75);
  font-size: 0.98rem;
  line-height: 1.6;
}

.home-footer {
  font-size: 0.95rem;
  color: rgba(148, 191, 161, 0.9);
  text-shadow: 0 1px 0 rgba(15, 23, 42, 0.8);
}

.floating-paw {
  position: absolute;
  font-size: clamp(2.5rem, 10vw, 4rem);
  opacity: 0.22;
  color: #a7f3d0;
  animation: float 12s ease-in-out infinite;
}

.floating-paw--one {
  top: clamp(1.5rem, 5vw, 3rem);
  left: clamp(0.5rem, 10vw, 6rem);
}

.floating-paw--two {
  bottom: clamp(3rem, 12vw, 6rem);
  right: clamp(1rem, 8vw, 5rem);
  animation-delay: -4s;
}

.floating-paw--three {
  top: 50%;
  right: clamp(2rem, 12vw, 7rem);
  animation-delay: -8s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-18px) rotate(6deg);
  }
}

@media (max-width: 640px) {
  .home-wrapper {
    padding: clamp(2rem, 8vw, 3rem) clamp(1rem, 6vw, 2rem) clamp(5rem, 12vw, 7rem);
  }

  .feature-card li {
    padding: 0.85rem 0.95rem;
  }

  .floating-paw {
    opacity: 0.16;
  }
}
</style>
