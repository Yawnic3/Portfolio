// Load Vercel's first-party Web Analytics only on this site's Vercel deployments.
// Keep local previews and the separate Sites host free of unavailable endpoint requests.
(()=>{const host=location.hostname;const onVercel=host.endsWith('.vercel.app')||host==='qingyuantian.dev'||host==='www.qingyuantian.dev';if(!onVercel)return;window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};const script=document.createElement('script');script.defer=true;script.src='/_vercel/insights/script.js';document.head.appendChild(script)})();
