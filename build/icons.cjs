// Shared 24x24 stroke icon set (currentColor). Used by all three concepts.
const S = 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';

const icons = {
  cloud: '<svg ' + S + '><path d="M17.5 19H7a4.5 4.5 0 0 1-.9-8.9A6 6 0 0 1 17.7 11a4 4 0 0 1-.2 8Z"/></svg>',
  layers: '<svg ' + S + '><path d="M12 3 3 7.5 12 12l9-4.5L12 3Z"/><path d="m3 12.5 9 4.5 9-4.5"/><path d="m3 17 9 4.5L21 17"/></svg>',
  zap: '<svg ' + S + '><path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z"/></svg>',
  calendar: '<svg ' + S + '><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/><path d="M8 14h3v3H8z"/></svg>',
  receipt: '<svg ' + S + '><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>',
  box: '<svg ' + S + '><path d="m12 3 8 4v10l-8 4-8-4V7l8-4Z"/><path d="m4 7 8 4 8-4M12 11v10"/></svg>',
  bell: '<svg ' + S + '><path d="M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6"/><path d="M10.5 20a2 2 0 0 0 3 0"/></svg>',
  chart: '<svg ' + S + '><path d="M4 20h16"/><rect x="5" y="11" width="3.5" height="6" rx="1"/><rect x="10.2" y="7" width="3.5" height="10" rx="1"/><rect x="15.4" y="13" width="3.5" height="4" rx="1"/></svg>',
  network: '<svg ' + S + '><rect x="9" y="3" width="6" height="5" rx="1.5"/><rect x="2.5" y="16" width="6" height="5" rx="1.5"/><rect x="15.5" y="16" width="6" height="5" rx="1.5"/><path d="M12 8v4M5.5 16v-2h13v2"/></svg>',
  clipboard: '<svg ' + S + '><path d="M9 4h6v3H9z"/><path d="M15 5h2.5A1.5 1.5 0 0 1 19 6.5v13A1.5 1.5 0 0 1 17.5 21h-11A1.5 1.5 0 0 1 5 19.5v-13A1.5 1.5 0 0 1 6.5 5H9"/><path d="m8.5 13.5 2 2 4.5-4.5"/></svg>',
  users: '<svg ' + S + '><circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5.2a3.2 3.2 0 0 1 0 6.1M17.5 20a5.5 5.5 0 0 0-1.7-4"/></svg>',
  truck: '<svg ' + S + '><path d="M2.5 7.5h10v9h-10z"/><path d="M12.5 11h4l3 3v2.5h-7z"/><circle cx="6.5" cy="18.5" r="1.8"/><circle cx="16.5" cy="18.5" r="1.8"/></svg>',
  card: '<svg ' + S + '><rect x="2.5" y="5.5" width="19" height="13" rx="2"/><path d="M2.5 10h19M6 14.5h4"/></svg>',
  transfer: '<svg ' + S + '><path d="M7 3v14M7 3 4 6.5M7 3l3 3.5"/><path d="M17 21V7M17 21l3-3.5M17 21l-3-3.5"/></svg>',
  support: '<svg ' + S + '><path d="M4 13a8 8 0 0 1 16 0"/><rect x="2.5" y="13" width="4" height="6" rx="1.6"/><rect x="17.5" y="13" width="4" height="6" rx="1.6"/><path d="M19.5 19v.5a2.5 2.5 0 0 1-2.5 2.5h-2"/></svg>',
  book: '<svg ' + S + '><path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H12v18H5.5A1.5 1.5 0 0 1 4 19.5Z"/><path d="M20 4.5A1.5 1.5 0 0 0 18.5 3H12v18h6.5A1.5 1.5 0 0 0 20 19.5Z"/></svg>',
  phone: '<svg ' + S + '><path d="M6 3h3l1.5 4.5-2 1.5a10 10 0 0 0 6.5 6.5l1.5-2L21 15v3a2.5 2.5 0 0 1-2.7 2.5A16 16 0 0 1 3.5 5.7A2.5 2.5 0 0 1 6 3Z"/></svg>',
  screen: '<svg ' + S + '><rect x="2.5" y="4" width="19" height="12.5" rx="2"/><path d="M9 20.5h6M12 16.5v4"/><path d="m9.5 8 2.5 2.2L14.5 8"/></svg>',
  mail: '<svg ' + S + '><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3.5 6.5 8.5 7 8.5-7"/></svg>',
  pin: '<svg ' + S + '><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>',
  check: '<svg ' + S + '><path d="m4.5 12.5 5 5 10-11"/></svg>',
  arrow: '<svg ' + S + '><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  plus: '<svg ' + S + '><path d="M12 5v14M5 12h14"/></svg>',
  clock: '<svg ' + S + '><circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l3.5 2"/></svg>',
  star: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9Z"/></svg>',
  facebook: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.6V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.5V13h2.8v8h3.2Z"/></svg>',
  twitter: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.3 3h3.3l-7.2 8.3L21.5 21h-6l-4.7-5.6L5.4 21H2.1l7.5-8.6L2.5 3h6.1l4.4 5.2L17.3 3Zm-1.1 16h1.8L7.7 4.9H5.8L16.2 19Z"/></svg>',
  apple: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.7-1.8-3.3-1.8-1.4-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.9-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.8-.4 6.9 1.1 9.1.8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.7 3-.7 1.4 0 1.8.7 3 .7 1.2 0 2-1.1 2.8-2.2.9-1.3 1.3-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.5ZM14.3 5.7c.6-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.1 1.8-1 2.9 1.1.1 2.2-.6 2.8-1.4Z"/></svg>',
  play: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.6 2.4c-.4.3-.6.8-.6 1.5v16.2c0 .7.2 1.2.6 1.5l9.1-9.6-9.1-9.6Zm10.3 8.4 2.7-2.9L5.9 2.1c-.3-.2-.6-.2-.9-.2l8.9 8.9Zm0 2.4L5 22.1c.3 0 .6 0 .9-.2l10.7-5.8-2.7-2.9Zm3.9-4.1 3.5 1.9c.7.4.7 1.5 0 1.9l-3.5 1.9-3-3.2 3-2.5Z"/></svg>'
};

/* --- Automotive / workshop set -------------------------------------------
   Drawn on the same 24px grid, 1.6 stroke, so they mix with the set above. */
Object.assign(icons, {
  wrench: '<svg ' + S + '><path d="M15.4 3.6a4.6 4.6 0 0 0-5.9 5.9L4 15l2.2 2.2 5.5-5.5a4.6 4.6 0 0 0 5.9-5.9l-2.5 2.5-1.7-1.7 2-2Z"/><path d="M14.6 13.2 20 18.6 18.6 20l-5.4-5.4"/></svg>',
  spanners: '<svg ' + S + '><path d="M7.6 3.6 5.4 5.8l1.4 1.4-1.4 1.4L4 7.2 3.2 8a3.4 3.4 0 0 0 .8 3.6l7.6 7.6"/><path d="M20.4 3.6 18 6l1.4 1.4L14 12.8"/><path d="m9.6 15.2 6.8 5.2 2-2-5.2-6.8"/></svg>',
  gauge: '<svg ' + S + '><path d="M3.5 17a9 9 0 1 1 17 0"/><path d="M12 17v-.01"/><path d="m15.5 10.5-3.1 5"/><path d="M5.6 13h1.2M17.2 13h1.2M8 8.4l.9.9M16 8.4l-.9.9M12 6.5v1.2"/></svg>',
  piston: '<svg ' + S + '><rect x="7.6" y="3.2" width="8.8" height="5.4" rx="1"/><path d="M9.2 5.2h5.6M9.2 6.9h5.6"/><path d="M10.4 8.6 9.4 16.2M13.6 8.6l1 7.6"/><path d="M9.4 16.2h5.2"/><circle cx="12" cy="18.8" r="2.3"/></svg>',
  tyre: '<svg ' + S + '><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.6"/><path d="M12 3v3.4M12 17.6V21M3 12h3.4M17.6 12H21M5.6 5.6l2.4 2.4M16 16l2.4 2.4M18.4 5.6 16 8M8 16l-2.4 2.4"/></svg>',
  oilcan: '<svg ' + S + '><path d="M3.5 12.5h9.5V18a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18Z"/><path d="M13 14h3l4.5-4.5"/><path d="M6 12.5V10h5v2.5"/><path d="M18 4.5c1.2 1.5 1.8 2.6 1.8 3.3a1.8 1.8 0 0 1-3.6 0c0-.7.6-1.8 1.8-3.3Z"/></svg>',
  car: '<svg ' + S + '><path d="M3 14.5h18"/><path d="M4.5 14.5 6.3 9a2 2 0 0 1 1.9-1.4h7.6A2 2 0 0 1 17.7 9l1.8 5.5"/><path d="M3 14.5V18h2.2M21 14.5V18h-2.2"/><circle cx="7.2" cy="17.8" r="1.7"/><circle cx="16.8" cy="17.8" r="1.7"/><path d="M9 17.8h6"/></svg>',
  carfront: '<svg ' + S + '><rect x="2.5" y="9.5" width="19" height="8.5" rx="2"/><path d="M5 9.5 6.6 5.6A2 2 0 0 1 8.4 4.4h7.2a2 2 0 0 1 1.8 1.2L19 9.5"/><path d="M5.5 13.5h2.5M16 13.5h2.5M10 16.5h4"/></svg>',
  brakedisc: '<svg ' + S + '><circle cx="11" cy="12" r="8"/><circle cx="11" cy="12" r="3"/><path d="M11 5.4v1.6M11 17v1.6M4.4 12H6M16 12h1.6"/><path d="M19 8.5h1.5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H19Z"/></svg>',
  engine: '<svg ' + S + '><rect x="3.4" y="9.6" width="17.2" height="9.4" rx="1.6"/><path d="M6.6 9.6V6.8h3.2v2.8M14.2 9.6V6.8h3.2v2.8"/><path d="M3.4 13.6h17.2"/><path d="M7 16.4v.01M12 16.4v.01M17 16.4v.01"/></svg>',
  hoist: '<svg ' + S + '><path d="M3 20h18"/><path d="M12 20v-6"/><path d="M6 14h12"/><path d="M7.5 10.5h9l-1.3-3.1A1.6 1.6 0 0 0 13.7 6.4h-3.4a1.6 1.6 0 0 0-1.5 1L7.5 10.5Z"/><path d="M6 10.5h12"/></svg>',
  sparkplug: '<svg ' + S + '><path d="M10.9 2.6h2.2v3.1h-2.2z"/><path d="M9.3 5.7h5.4l-.8 3.3h-3.8Z"/><path d="M10.1 9h3.8v2.6h-3.8z"/><path d="M10.1 10.3h3.8"/><path d="M11.1 11.6v5.1h1.8v-5.1"/><path d="M11.1 16.7h1.8v2.2l-.9 2.1-.9-2.1Z"/></svg>',
  barcode: '<svg ' + S + '><path d="M4 5v14M7 5v14M10 5v10M13 5v14M16.5 5v10M20 5v14"/></svg>',
  toolbox: '<svg ' + S + '><rect x="2.5" y="8.5" width="19" height="11" rx="2"/><path d="M9 8.5V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5v2"/><path d="M2.5 13h19"/><path d="M10 13v2.5h4V13"/></svg>',
  jobwrench: '<svg ' + S + '><path d="M15 5h2.5A1.5 1.5 0 0 1 19 6.5v13A1.5 1.5 0 0 1 17.5 21h-11A1.5 1.5 0 0 1 5 19.5v-13A1.5 1.5 0 0 1 6.5 5H9"/><path d="M9 3.6h6v3H9z"/><path d="M13.8 10.6a2.3 2.3 0 0 0-3 3l-2.6 2.6 1.2 1.2 2.6-2.6a2.3 2.3 0 0 0 3-3l-1.2 1.2-1-1 1-1.4Z"/></svg>',
  torque: '<svg ' + S + '><path d="M4.5 15.5a7.5 7.5 0 1 1 15 0"/><path d="M17.5 12.5 20 15.5l-3 2"/><path d="m11 14 4-4"/><path d="M9.4 12.4a2.2 2.2 0 1 1 3.2 3.2 2.2 2.2 0 0 1-3.2-3.2Z"/></svg>',
  battery: '<svg ' + S + '><rect x="2.5" y="8" width="17" height="10" rx="1.5"/><path d="M19.5 11.5h2v3h-2z"/><path d="M6 5.5h3M15 5.5h3"/><path d="M7.5 13h2.5M8.75 11.75v2.5M14 13h2.5"/></svg>',
  hazard: '<svg ' + S + '><path d="M12 4.5 21 19.5H3Z"/><path d="M12 10v4M12 16.6v.01"/></svg>',
  shieldcheck: '<svg ' + S + '><path d="M12 3.2 19 6v5.6c0 4-2.9 7.6-7 9.2-4.1-1.6-7-5.2-7-9.2V6Z"/><path d="m9 12 2.2 2.2L15.4 10"/></svg>',
  bolt: '<svg ' + S + '><path d="M12 3.6 17.4 6.8v6.4L12 16.4 6.6 13.2V6.8Z"/><circle cx="12" cy="10" r="2.6"/></svg>',
  obd: '<svg ' + S + '><path d="M5 8.5h14v4a3.5 3.5 0 0 1-3.5 3.5h-7A3.5 3.5 0 0 1 5 12.5Z"/><path d="M8 8.5V6h8v2.5"/><path d="M11 16v4M13 16v4"/><path d="M8.5 11.5h1.5M14 11.5h1.5"/></svg>',
  lock: '<svg ' + S + '><rect x="5.2" y="10.4" width="13.6" height="9.4" rx="2"/><path d="M8.6 10.4V7.9a3.4 3.4 0 0 1 6.8 0v2.5"/></svg>',
  pause: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><rect x="7" y="5" width="3.4" height="14" rx="1.2"/><rect x="13.6" y="5" width="3.4" height="14" rx="1.2"/></svg>',
  playtri: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8.2 5.4 19 12 8.2 18.6Z"/></svg>'
});

module.exports = { icons };
