document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const closeMenu = () => { if (!toggle || !nav) return; toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Відкрити меню'); nav.classList.remove('is-open'); };
  if (toggle && nav) {
    toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); toggle.setAttribute('aria-label', open ? 'Відкрити меню' : 'Закрити меню'); nav.classList.toggle('is-open', !open); });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  }
  document.querySelectorAll('[data-current-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  const form = document.querySelector('#consultation-form');
  if (!form) return;
  const status = document.querySelector('#form-status');
  const selectedContact = document.querySelector('#selected-contact');
  const contactMethods = form.querySelectorAll('input[name="contact-method"]');
  const showSelectedContact = (input) => {
    if (!selectedContact || !input) return;
    const { contactLabel, contactValue, contactHref } = input.dataset;
    const external = contactLabel === 'Telegram' ? ' target="_blank" rel="noopener noreferrer"' : '';
    selectedContact.innerHTML = `Для звʼязку через ${contactLabel}: <a href="${contactHref}"${external}>${contactValue}</a>`;
  };
  contactMethods.forEach(input => input.addEventListener('change', () => showSelectedContact(input)));
  const setError = (id, message) => { const error = document.querySelector(`#${id}-error`); const field = error?.closest('.field'); if (error) error.textContent = message; if (field) field.classList.toggle('has-error', Boolean(message)); };
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.elements.name.value.trim(); const contact = form.elements.contact.value.trim(); const question = form.elements.question.value.trim(); const method = form.querySelector('input[name="contact-method"]:checked');
    setError('name', name.length < 2 ? 'Укажіть імʼя (щонайменше 2 символи).' : '');
    setError('contact', contact.length < 3 ? 'Укажіть телефон або email для відповіді.' : '');
    setError('question', question.length < 10 ? 'Опишіть питання трохи детальніше (щонайменше 10 символів).' : '');
    const methodError = document.querySelector('#method-error'); methodError.textContent = method ? '' : 'Оберіть бажаний спосіб звʼязку.';
    if (!name || name.length < 2 || !contact || contact.length < 3 || !question || question.length < 10 || !method) { status.textContent = 'Перевірте, будь ласка, поля, позначені повідомленнями.'; status.classList.remove('success'); return; }
    status.textContent = 'Дякуємо! Дані пройшли перевірку, але форма поки не надсилає їх на сервер. Будь ласка, скористайтеся вказаними контактами або підключіть сервіс обробки заявок.'; status.classList.add('success');
  });
});
