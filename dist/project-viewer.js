(() => {
  const tabs = [...document.querySelectorAll('[data-project]')];
  const panels = tabs.map(tab => document.getElementById(tab.dataset.project));
  if (!tabs.length) return;
  function select(index) {
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[i].hidden = !active;
    });
    // Canvas-based demos remeasure after their panel becomes visible.
    window.dispatchEvent(new Event('resize'));
  }
  function fromHash() {
    const target = document.getElementById(location.hash.slice(1));
    const index = panels.findIndex(panel => panel === target || panel.contains(target));
    if (index >= 0) select(index);
  }
  panels.forEach((panel, i) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabs[i].id);
  });
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      select(i);
      history.replaceState(null, '', '#' + tab.dataset.project);
    });
    tab.addEventListener('keydown', event => {
      const keys = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 :
        (i + (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1) + tabs.length) % tabs.length;
      tabs[next].focus();
      tabs[next].click();
    });
  });
  select(0);
  fromHash();
  window.addEventListener('hashchange', fromHash);
})();
