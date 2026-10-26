(function () {
  'use strict';
  var pixelId = '8771827096186081';
  var consentKey = 'zapsim-marketing-consent-v1';
  var consent = null;
  try { consent = localStorage.getItem(consentKey); } catch (_) {}
  var started = false;
  var panel;
  function save(value) {
    consent = value;
    try { localStorage.setItem(consentKey, value); } catch (_) {}
  }
  function startMeasurement() {
    if (started || consent !== 'yes') return;
    started = true;
    if (!window.fbq) {
      var queue = function () {
        if (queue.callMethod) queue.callMethod.apply(queue, arguments);
        else queue.queue.push(arguments);
      };
      window.fbq = queue;
      window._fbq = queue;
      queue.push = queue;
      queue.loaded = true;
      queue.version = '2.0';
      queue.queue = [];
      var script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);
    }
    window.fbq('consent', 'grant');
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
    if (!window.__zapsimGa4Loaded) {
      window.__zapsimGa4Loaded = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
      var gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-P59D9YGVX2';
      document.head.appendChild(gaScript);
      window.gtag('js', new Date());
      window.gtag('config', 'G-P59D9YGVX2', { anonymize_ip: true });
    }
    if (location.pathname === '/planos/' || location.hash === '#planos') {
      window.fbq('track', 'ViewContent', { content_name: 'Planos ZapSim' });
    }
  }
  function showPanel() {
    panel.hidden = false;
    panel.querySelector('button').focus();
  }
  function closePanel() { panel.hidden = true; }
  var style = document.createElement('style');
  style.textContent = '.zs-measure-panel{position:fixed;bottom:60px;left:16px;right:16px;max-width:520px;padding:20px;background:#fff;color:#17202a;border:1px solid #dfe7e2;border-radius:12px;box-shadow:0 8px 30px #0003;z-index:9999;font:14px/1.5 system-ui,sans-serif}.zs-measure-panel[hidden]{display:none}.zs-measure-panel p{margin:0 0 14px}.zs-measure-panel button,.zs-measure-settings{cursor:pointer;border:1px solid #0a4d2e;border-radius:8px;padding:10px 14px;font:inherit}.zs-measure-panel button{margin:0 8px 4px 0;background:#0a4d2e;color:#fff}.zs-measure-panel button+button{background:#fff;color:#0a4d2e}.zs-measure-settings{position:fixed;bottom:12px;left:12px;z-index:9998;background:#fff;color:#0a4d2e;font:12px system-ui,sans-serif}';
  document.head.appendChild(style);
  panel = document.createElement('section');
  panel.className = 'zs-measure-panel';
  panel.setAttribute('aria-label', 'Preferências de medição de anúncios');
  panel.innerHTML = '<p>Podemos usar o Pixel da Meta para medir visitas e cliques de assinatura e melhorar nossos anúncios? Ele pode usar cookies e compartilhar dados de navegação com a Meta. Sua escolha não impede o uso do site. Saiba mais na <a href="/privacidade/">Política de Privacidade</a> e na <a href="/cookies/">Política de Cookies</a>.</p><button type="button">Permitir medição</button><button type="button">Agora não</button>';
  var buttons = panel.querySelectorAll('button');
  buttons[0].addEventListener('click', function () {
    save('yes');
    if (started) window.fbq('consent', 'grant');
    else startMeasurement();
    closePanel();
  });
  buttons[1].addEventListener('click', function () {
    save('no');
    if (window.fbq) window.fbq('consent', 'revoke');
    closePanel();
  });
  document.body.appendChild(panel);
  var settings = document.createElement('button');
  settings.type = 'button';
  settings.className = 'zs-measure-settings';
  settings.textContent = 'Preferências de cookies';
  settings.addEventListener('click', showPanel);
  document.body.appendChild(settings);
  panel.hidden = consent === 'yes' || consent === 'no';
  if (consent === 'yes') startMeasurement();
  document.addEventListener('click', function (event) {
    var trigger = event.target.closest && event.target.closest('[data-open-cookie-preferences]');
    if (trigger) showPanel();
  });
  document.addEventListener('click', function (event) {
    if (consent !== 'yes' || !window.fbq) return;
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    var url;
    try { url = new URL(link.href, location.href); } catch (_) { return; }
    if (url.hostname !== 'www.asaas.com' || url.pathname !== '/c/vnkxcjfbba1yh9t7') return;
    window.fbq('track', 'InitiateCheckout', {
      content_name: 'ZapSim Plano One', content_ids: ['zapsim-one'],
      content_type: 'product', value: 89, currency: 'BRL', num_items: 1
    });
  });
}());
