/* ==========================================================================
   MechanicDesk — shared content model.
   Every string here is taken verbatim from www.mechanicdesk.com.au
   (home, integrations, support, contact pages, and js/index.js pricing data).
   The three concepts render THIS data — content parity is guaranteed.
   ========================================================================== */

const SITE = 'https://www.mechanicdesk.com.au/';
const u = (p) => SITE + p;

const brand = {
  name: 'MechanicDesk',
  legal: 'Autodeck Pty. Ltd.',
  title: 'Workshop Software - Software for Automotive, Mechanical and Electrical Workshops | MechanicDesk',
  metaDescription: 'MechanicDesk is workshop management software for automotive, mechanical and electrical workshops. Bookings, jobs, invoicing, inventory, service reminders and reporting in one place.',
  product: 'Workshop Management Software',
  heroLead: 'Intuitive. Comprehensive. Too Easy.',
  heroSub: 'Effectively manage all aspects of your workshop with ease',
  cta: 'Start Your 14 Days Free Trial',
  ctaShort: 'Start free trial',
  login: { label: 'Login', url: u('auto_workshop/login') },
  signup: { label: 'Sign Up', url: u('signup.html') },
  blogUrl: u('blog/'),
  manual: 'https://mechanicdesk.zendesk.com/hc/en-au',
  email: 'contact@mechanicdesk.com.au',
  supportEmail: 'support@mechanicdesk.com.au',
  address: {
    line1: 'Suite 2, Level 10, 34 Queen Street',
    line2: 'Melbourne',
    line3: 'Victoria 3000, Australia',
    oneLine: 'Suite 2, Level 10, 34 Queen Street, Melbourne Victoria 3000, Australia'
  },
  phones: [
    { label: 'Australia', number: '1300 737 100' },
    { label: 'New Zealand', number: '0800 110 259' },
    { label: 'United Kingdom', number: '0800 096 8794' },
    { label: 'Global', number: '+61 1300 737 100' }
  ],
  social: [
    { name: 'Facebook', icon: 'facebook', url: 'http://www.facebook.com/mechanicdesk' },
    { name: 'X / Twitter', icon: 'twitter', url: 'https://twitter.com/mechanicdesk' }
  ],
  apps: {
    heading: 'Download MechanicDesk App!',
    ios: { top: 'Available on the', name: 'App Store', url: 'https://apps.apple.com/au/app/mechanicdesk-mobile/id1441067162' },
    android: { top: 'Get it on', name: 'Google Play', url: 'https://play.google.com/store/apps/details?id=mobile.mechanicdesk' }
  },
  about: {
    heading: 'About us',
    body: 'MechanicDesk is a product of Autodeck Pty. Ltd. We are a web based company providing innovative ideas for people and businesses. We are passionate about creating products that help people solve everyday problems and make their lives easier. We will always work hard to please our customers and are always happy to do business with you.'
  },
  copyright: 'Copyright 2014 - 2026. MechanicDesk. All rights reserved.'
};

/* In the order the sections actually appear on the page, so the menu reads as a
   map of the scroll rather than the order the live site happens to use. */
const nav = [
  { label: 'Integrations', href: '#integrations' },
  { label: 'Testimonials', href: '#proven' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Support/Demo', href: '#support' },
  { label: 'Contact Us', href: '#contact' }
];

/* Full menu tree of the live site, preserved in the footer. */
const navFull = [
  { label: 'Integrations', children: [
    { label: 'All Integrations', href: u('integrations.html') },
    { label: 'Xero', href: u('addon-xero.html') },
    { label: 'MYOB', href: u('addon-myob.html') },
    { label: 'Repco Navigator Pro', href: u('addon-navigator-pro.html') },
    { label: 'Burson EzyParts', href: u('addon-burson-ezyparts.html') },
    { label: 'Mailchimp', href: u('addon-mailchimp.html') }
  ]},
  { label: 'Partners', children: [
    { label: 'Our Partners', href: u('partner-list.html') },
    { label: 'Our Partner Program', href: u('partners.html') },
    { label: 'Partner Login', href: u('partner/partner/login') }
  ]},
  { label: 'Company', children: [
    { label: 'Our Blog', href: u('blog/') },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Privacy Policy', href: u('privacy-policy.html') },
    { label: 'Terms of Service', href: u('terms-and-conditions.html') }
  ]}
];

/* --- Section 1: Intuitive. Comprehensive. Too Easy. ---------------------- */
const pillars = {
  eyebrow: 'Why MechanicDesk',
  heading: 'Intuitive. Comprehensive. Too Easy.',
  sub: 'Effectively manage all aspects of your workshop with ease',
  items: [
    { icon: 'cloud', title: 'Truly hassle-free',
      text: 'No installation or manual data backup required. We take care of this so you can focus on your workshop, accessing it anywhere, anytime, on any device.' },
    { icon: 'toolbox', title: 'Everything you need',
      text: 'We have it all - from bookings, job management, inventory management, custom invoices to vehicle history and service reminders via email or SMS.' },
    { icon: 'zap', title: 'Simple and easy to use',
      text: 'Intelligent auto-suggest, auto-complete and automatic address verification all mean less typing and a smoother workflow.' }
  ]
};

/* --- Section 2: Powerful. Streamlined. Connected. ------------------------ */
const integrations = {
  eyebrow: 'Integrations',
  heading: 'Powerful. Streamlined. Connected.',
  sub: "Integrate with various software systems to streamline your workshop's workflows and processes",
  intro: 'We understand the wide range of utitilies required to run a workshop and a business effectively, everything from part look up and ordering to financial accounting and customer relations management. With our partner integrations, we aim to help provide you with the best tools that you will need for every aspect of your business.',
  moreLabel: 'More details',
  moreUrl: u('integrations.html'),
  logos: [
    { name: 'Vehicle Visual', file: 'vehicle_visual.png' },
    { name: 'Autopro', file: 'autopro_logo.jpg' },
    { name: 'Burson EzyParts', file: 'ezyparts_logo2025.png' },
    { name: 'Carjam', file: 'carjam.png' },
    { name: 'Repco Navigator Pro', file: 'repco_navigator.png' },
    { name: 'My Car Check', file: 'mycarchecklogo.png' },
    { name: 'MYOB', file: 'myob.png' },
    { name: 'Till Payments', file: 'till_payments.png' },
    { name: 'Windcave', file: 'windcave.png' },
    { name: 'Mailchimp', file: 'mailchimplogo.png' },
    { name: 'NAPA PROLink', file: 'napa_pro_link.png' },
    { name: 'Auto One', file: 'autoone.png' },
    { name: 'BNT', file: 'bnt.png' },
    { name: 'Autolign', file: 'autolign.png' },
    { name: 'Xero', file: 'xero.png' },
    { name: 'QuickBooks', file: 'quickbooks.png' },
    { name: 'hsy', file: 'hsy.png' }
  ],
  categories: [
    { name: 'Accounting', items: [
      { name: 'Xero', file: 'xero.png', url: 'http://www.xero.com/', lines: [
        'Xero is an easy-to-use but powerful online accounting software designed for the cloud. Xero accounting software is made for small business owners.',
        'MechanicDesk currently integrates with all versions of Xero.' ] },
      { name: 'MYOB', file: 'myob.png', url: 'http://www.myob.com/', lines: [
        'MYOB, Mind Your Own Business, is an Australian multinational corporation that provides tax, accounting and other services to small and medium businesses.',
        'MechanicDesk currently integrates with MYOB AccountRight and MYOB Essentials (online versions only).' ] },
      { name: 'Intuit QuickBooks', file: 'quickbooks.png', url: 'http://www.intuit.com.au/', lines: [
        "QuickBooks is Intuit's set of software solutions designed to manage payroll, inventory, sales and other needs of a small business. The software features marketing tools, merchant services, product and supplies, as well as training solutions.",
        'MechanicDesk currently integrates with QuickBooks Online.' ] }
    ]},
    { name: 'Supplier', items: [
      { name: 'Repco Navigator Pro', file: 'repco_navigator.png', url: 'http://www.repcotrade.com.au', lines: [
        "Navigator Pro is Repco's Online parts ordering solution available for trade account customers so you can order parts without picking up the phone, saving you time, effort and money in your workshop." ] },
      { name: 'Burson EzyParts', file: 'ezyparts_logo2025.png', url: 'http://www.burson.com.au/trade-centre/ezyparts/', lines: [
        "Burson EzyParts is Burson's Online parts ordering solution available for trade account customers so you can order parts without picking up the phone, saving you time, effort and money in your workshop." ] },
      { name: 'NAPA PROLink', file: 'napa_pro_link.png', url: 'https://www.napaparts.com.au/', lines: [
        "NAPA PROLink streamlines the parts buying process by providing a real-time, online connection between a local shop's computer system and the nearest NAPA Auto Parts store that dispatches the parts" ] },
      { name: 'Autopro', file: 'autopro_logo.jpg', url: 'http://www.autopro.com.au/', lines: [
        "Autopro is the online ordering platform for Autopro Parts Professionals, Australia's oldest and largest independent automotive aftermarket parts and accessories retailer." ] },
      { name: 'hsy', file: 'hsy.png', url: 'http://www.hsy.com.au/', lines: [
        "hsy Autoparts is Australia's leading distributor and supplier to the independent repairers. Specialising in BMW, Mercedes, Audi, VW, Mini, Porsche, Volvo, Skoda, Peugeot, Citroen and Renault. Providing you with a comprehensive range of new OEM and quality aftermarket spare parts for both passenger vehicles and light commercials." ] },
      { name: 'Auto One', file: 'autoone.png', url: 'http://www.autoone.com.au/', lines: [
        'Established in 1988, Auto One is an independently owned Australian business whose shareholders are the members who serve and give you professional advice at your local Auto One store.' ] },
      { name: 'BNT', file: 'bnt.png', url: 'https://bntnz.co.nz/', lines: [
        "BNT Automotive has been a supplier to the New Zealand aftermarket for over 60 years. BNT prides itself on offering superior service to our customers and offering an extensive range of products that service New Zealands diverse automotive marketplace. With 60 branches BNT's geographic reach has stores located throughout all major centres over the country." ] },
      { name: 'Autolign', file: 'autolign.png', url: 'https://www.autolign.co.nz/', lines: [
        "Autolign is New Zealand's largest Specialised Steering and Suspension Importers and Distributors. The company specialises in the supply of suspension components to wholesalers, resellers and the trade with its supply of leading brands from around the world." ] }
    ]},
    { name: 'Mass Mail/CRM', items: [
      { name: 'MailChimp', file: 'mailchimplogo.png', url: 'http://www.mailchimp.com/', lines: [
        "MailChimp is a marketing automation platform and an email marketing service. MailChimp's operator is the American based company Rocket Science Group." ] }
    ]},
    { name: 'EFTPOS Terminals', items: [
      { name: 'Windcave', file: 'windcave.png', url: 'http://www.windcave.com/', lines: [
        "Windcave (previously Payment Express) is a high growth, innovative global leader in payment technology. Providing PCI DSS compliant payment solutions, we're certified with all major card schemes. A global end to end platform for ecommerce, retail and unattended that facilitates payments seamlessly in real time.",
        'MechanicDesk currently integrates with Windcave EFTPOS terminals to streamline EFTPOS payment processes in MechanicDesk.' ] },
      { name: 'Till Payments', file: 'till_payments.png', url: 'https://tillpayments.com/', lines: [
        'Till Payments is an integrated payment solutions provider committed to accelerating growth for businesses around the world.',
        'MechanicDesk currently integrates with Till Payments EFTPOS terminals to streamline EFTPOS payment processes in MechanicDesk.' ] }
    ]},
    { name: 'Vehicle Look Up', items: [
      { name: 'Australian Vehicle Lookup', file: 'vehicle_visual.png', url: '', lines: [
        'This is a vehicle information lookup service for vehicles based in Australia.' ] },
      { name: 'CarJam (New Zealand only)', file: 'carjam.png', url: 'http://www.carjam.co.nz/', lines: [
        'CarJam is a New Zealand based online service offering automotive information and history look up services.' ] },
      { name: 'MyCarCheck (United Kingdom only)', file: 'mycarchecklogo.png', url: 'http://www.mycarcheck.com/', lines: [
        'My Car Check is a British vehicle history checking company owned by CDL Vehicle Information Services.' ] }
    ]},
    { name: 'Loyalty Programmes', items: [
      { name: 'AMS Rewards (Australia only)', file: 'ams_rewards.png', url: 'https://amsrewards.com.au/', lines: [
        "AMS Rewards, part of Australian Motoring Services (AMS), is the driving force behind the Australian Auto Club's Show Your Card and Save Program, which offers Members high value discounts at a range of retailers and on goods and services throughout Australia." ] }
    ]}
  ]
};

/* --- Section 3: Suitable for -------------------------------------------- */
const suitable = {
  eyebrow: 'Suitable for',
  heading: 'Suitable for any service centers',
  /* Photos live in images/pexels/ — reference them as ../images/pexels/<file>
     and display with object-fit: cover (they are real 4:3 photographs, not
     the cut-outs the live site uses). */
  items: [
    { title: 'Auto Service Centre', file: 'type-auto.jpg' },
    { title: 'Marine Service Centre', file: 'type-marine.jpg' },
    { title: 'Heavy Machinery & Equipments', file: 'type-machinery.jpg' },
    { title: 'Bikes & Bicycle Service Centre', file: 'type-bikes.jpg' },
    { title: 'Tyres & Spare Parts Shop', file: 'type-tyres.jpg' }
  ]
};

/* --- Section 4: Proven. Loved. Relied on. ------------------------------- */
const proven = {
  eyebrow: 'Testimonials',
  heading: 'Proven. Loved. Relied on.',
  sub: 'More than 20,000+ Mechanics love MechanicDesk',
  note: 'Hear it from those who use MechanicDesk every day',
  moreLabel: 'More happy customers',
  moreUrl: u('testimonials.html'),
  /* Real reviews, verbatim from the site's own javascripts/testimonials.js
     (the carousel data behind testimonials.html). 32 exist; these nine are the
     shortest, spread across AU and NZ. Nothing here is invented. */
  /* Real reviews, verbatim from the site's own javascripts/testimonials.js —
     the carousel data behind testimonials.html. 32 exist there; these nine are
     the shortest, spread across AU and NZ. Nothing here is invented. */
  reviewCount: 32,
  reviewsUrl: u('testimonials.html'),
  reviews: [
    { text: "The team at MechanicDesk are always improving the software and the integration with Xero makes invoicing and accounting a breeze at work or at home... A must for any vehicle based workshop",
      person: "Brett Horsfall", company: "Mag & Turbo Tyre & Service Centre", address: "New Zealand" },
    { text: "I constantly invoice and receipt people through-out the day, I need to be able to do this fast and efficiently and I can with MechanicDesk",
      person: "Suzi McClure", company: "McClure's Vehicle Maintenance", address: "NSW, Australia" },
    { text: "Absolutely brilliant. This best describes MechanicDesk. Not just the software, but most importantly the back up service that comes with it. The team are innovative, responsive, and it's a pleasure to receive such great service...",
      person: "Simon Price", company: "Airlie Auto Electrics & Mechanical", address: "QLD, Australia" },
    { text: "We trialled several different software packages before deciding on MechanicDesk, and are very happy with our choice. The design is clear and easy to use, which has meant our staff have all learned the program quickly...",
      person: "James", company: "Gardiners Garage", address: "VIC, Australia" },
    { text: "Since joining MechanicDesk we are operating more efficiently and productively. Linking MechanicDesk with Xero is the icing on the cake as it has cut our data entry in half. I highly recommended MechanicDesk to anyone looking for mechanical software, nothing comes close to the excellent service, support and functionality from them.",
      person: "Melissa Sultana", company: "Better Truck Repairs P/L", address: "NSW, Australia" },
    { text: "We have had experience using 3 Workshop management Add-Ons and after trying and testing MechanicDesk for us it ticks all the boxes. MechanicDesk integrates strongly with Xero and integrates really well with inventory. From an end user point of view the automotive industry has been crying out for a simple to use yet powerful system.",
      person: "Todd Dunick", company: "Worksmarter", address: "New Zealand" },
    { text: "For me MechanicDesk has made life much easier, from being able to check and take bookings from my smart phone, easily able to customise invoice and job descriptions. I particular like how quickly I can make an invoice and assign parts where appropriate. MechanicDesk has been well thought and was very easy to make the change without having to take weeks to learn a new system.",
      person: "Nigel", company: "Aussie Tune Dandenong", address: "VIC, Australia" },
    { text: "I searched everywhere for a system that would suit our workshop needs and couldn't find one to suit, until I discovered MechanicDesk. It is perfect for our booking diary and the team even customised it to suit our individual needs. Any change we required to our account was implemented almost immediately and was never too much trouble for the team at MechaniDesk to do it for us.",
      person: "Adam Hurle", company: "Peter Hood Holden", address: "SA, Australia" },
    { text: "We needed to switch to Mechanic Desk in a hurry as our other system could not keep pace with Xero. Vinh and the team were great. I had a lot of questions and wanted a specific invoice format. They were able to address my questions with patience and design the invoice template we required. Together we looked at how we could best bring the data over from our current system and this was done very quickly",
      person: "Monique Clow", company: "Truck Alignment Services", address: "Christchurch, New Zealand" }
  ],
  customers: [
    { name: 'Mag & Turbo Tyre & Service Centre', file: 'mag-turbo.png' },
    { name: 'Tyres2go Tyres & Service Centre', file: 'tyres.png' },
    { name: 'Ironman4x4 & Service Centre', file: 'ironman.png' }
  ],
  stats: [
    { value: '20000', suffix: '+', label: 'Mechanics on MechanicDesk' },
    { value: '14', suffix: '', label: 'Days free trial' },
    { value: '18', suffix: '', label: 'Partner integrations' },
    { value: '4', suffix: '', label: 'Countries supported' }
  ]
};

/* --- Section 5: Features (all 12, full bullet lists) -------------------- */
const features = {
  eyebrow: 'Features',
  heading: 'Everything you need in one place',
  items: [
    { icon: 'calendar', name: 'Booking Diary',
      blurb: 'Create, reschedule or delete bookings in just a few clicks. Bookings are readily convertible to jobs, saving you time.',
      bullets: [
        'Create bookings and reschedule them via an intuitive drag and drop diary.',
        'Automatic booking reminders are sent to your customers the day before the appointment via either email or SMS.',
        'Diary entries are colour coded to help you identify the state of any job quickly.',
        'Diary entries automatically span as you go along so you always have the most up to date overview of your workshop schedule.',
        'Filters on the Diary help you filter out irrelevant information.',
        'The Diary supports many different views such as the day view, week view, month view, etc.'
      ],
      link: { label: 'Show me more about Booking Diary', url: u('feature-booking.html') } },

    { icon: 'receipt', name: 'Invoicing/Quoting',
      blurb: 'Quick and easy invoicing/quoting with preconfigured invoice items. Convert invoices/quotes to jobs or bookings directly.',
      bullets: [
        'Save commonly used invoice items to use on other invoices and quotes.',
        'Convert invoices directly into jobs or bookings with one click.',
        'Convert quotes directly into invoices or jobs or bookings with one click.',
        'Easily print invoices/quotes or send them to your clients via email.',
        'All invoice templates are fully customisable so your invoice can look exactly the way you want it to look.'
      ],
      link: { label: 'Show me more about Invoicing/Quoting', url: u('feature-invoice.html') } },

    { icon: 'piston', name: 'Stock Control',
      blurb: 'Know exactly what your workshop has in stock at all times. Paired with our stock alert and stock reordering helpers, your workshop will never run out of stock again.',
      bullets: [
        'Straightforward stock level control.',
        'Stock alerts are unobtrusive and stock reordering based on stock levels is intuitive and quick.',
        'Multiple searchable fields help you find any stock item with minimal effort.',
        'Each stock item holds its own complete sales and purchase history.',
        'MechanicDesk supports most barcode scanners and label printers. Just plug and play!',
        'MechanicDesk also supports quick and easy stock takes, all of which are kept for your record and can be accessed at any time.'
      ],
      link: { label: 'Show me more about Stock Control', url: u('feature-inventory.html') } },

    { icon: 'oilcan', name: 'Service Scheduling',
      blurb: 'Easily know which vehicles are due or overdue for service. Easily send reminders to your customers via both email and SMS.',
      bullets: [
        'We support scheduling for services, registrations and warrant of fitnesses (NZ).',
        'You have full control over when, how and what is sent in your service reminders to your customers.',
        'Both email and SMS reminders are supported.'
      ],
      link: { label: 'Show me more about Service Scheduling', url: u('feature-service-schedule.html') } },

    { icon: 'gauge', name: 'Reporting',
      blurb: 'Better understand your business with our reporting system - everything from sales and received payments to stock value and employee efficiency.',
      bullets: [
        'We support Income, Expense, Work in Progress, Employee, Marketing and Stock report categories, each with their own set of reports.'
      ],
      link: { label: 'Show me more about Reporting', url: u('feature-report.html') } },

    { icon: 'network', name: 'Multisite Management',
      blurb: 'Managing multiple workshops is a breeze with MechanicDesk. View reports, move stock, etc. all in one place.',
      bullets: [
        'Link multiple workshops together so they can share customers, vehicles, service histories and stock information.',
        'Manage workshops at different sites centrally through one workstation.',
        'Switch between different sites with ease to see reports, stock levels, etc.',
        'Transfer stock between sites in just a few clicks.',
        'Each workshop may require a separately purchased MechanicDesk account'
      ],
      link: { label: 'Show me more about Multisite Management', url: u('feature-multisite.html') } },

    { icon: 'jobwrench', name: 'Job Management',
      blurb: 'The essence of MechanicDesk - keeping you up to date with each and every job in your workshop at a glance. Manage jobs with your colleagues centrally and in real time.',
      bullets: [
        'Quickly locate jobs with our powerful search engine.',
        'Each job holds all information pertaining to it e.g. invoices, bills, purchase orders, job cards, etc. in an unobtrusive way.',
        'Jobs allow you to link to many other functions and utilites in MechanicDesk such as service scheduling, productivity tracking, etc.',
        'Easily print job cards or send them to your technicians via email.'
      ],
      highlight: "MechanicDesk's Job Type functionality helps you save commonly done jobs and services as templates to be used over and over again, drastically cutting down time spent on preparing job cards and/or invoices.",
      link: { label: 'Show me more about Job Management', url: u('feature-job.html') } },

    { icon: 'car', name: 'Customer and Vehicle Management',
      blurb: "Easily store your workshop's customers details for use throughout the system via MechanicDesk's intelligent auto-suggest and auto-complete functions.",
      bullets: [
        'All of your customers information at your fingertips. You will never have to fumble around looking for phone numbers or email addresses ever again.',
        'MechanicDesk supports unlimited customer entries in your database.',
        'We also support complete customer and vehicle histories as well as the ability to upload photos and documents against any customer or vehicle.',
        'Send statements or communicate with your customers via email directly from MechanicDesk.'
      ],
      link: { label: 'Show me more about Customer and Vehicle Management', url: u('feature-customer.html') } },

    { icon: 'truck', name: 'Supplier Management',
      blurb: 'Reorder from your trusted suppliers in a dash. Stay on top of your bills and bill payments with ease.',
      bullets: [
        'All of your supplier information at your fingertips. You will never have to fumble around looking for phone numbers or email addresses ever again.',
        'MechanicDesk supports unlimited supplier entries in your database.',
        'We also support complete supplier purchase histories as well as the ability to upload photos and documents against any supplier.',
        'Send statements or communicate with your suppliers via email or SMS directly from MechanicDesk.',
        'Raise purchase orders and send them via email to your suppliers in under a minute.'
      ],
      highlight: 'MechanicDesk supports integrations with major automotive supplier platforms such as Repco Navigator Pro, Burson EzyParts, etc. and more.',
      link: { label: 'Show me more about Supplier Management', url: u('feature-supplier.html') } },

    { icon: 'barcode', name: 'Point of Sales',
      blurb: 'Make lightning quick sales on the spot with only a few clicks. If you have barcode scanners and label printers, even better!',
      bullets: [
        'Most commercial barcode scanners and label printers are supported.',
        'Track your workshop sources of business at the POS.'
      ],
      link: { label: 'Show me more about Point of Sales', url: u('integrations.html#eftpos') } },

    { icon: 'transfer', name: 'Data Import/Export',
      blurb: "We help you import your workshop data so you don't have to start over from scratch. Your data is available to you at all times.",
      bullets: [
        'We understand how valuable your data is to your business. Hence we strive to do all we can to import your data into your MechanicDesk. We do this at no additional cost to you and hope that it helps to make your transition to MechanicDesk as smooth as possible.',
        'We are able to help you import customer, vehicle, supplier, stock and vehicle history data (up to 3 years prior to the present day).',
        'Data is typically imported into the system within 1-3 days.',
        "Any data you enter into MechanicDesk via any means is your data. Thus you can export all or some portion of it at any time via our data export function. You can do this as many times as you require to serve as a secondary backup of your data in addition to MechanicDesk's backup and safeguard routines, again, at no additional cost to you."
      ],
      link: { label: 'Show me more about Data Import/Export', url: u('feature-import-export.html') } },

    { icon: 'support', name: 'Superhero Support',
      blurb: "We believe that software is only as good as the support that follows it. Your support team is here whenever you need us, and that's a promise.",
      bullets: [
        'The team at MechanicDesk understands the frustration of having unanswered questions hamper your entire day of productivity. This forms the backbone of our customer support efforts. With us, you will never have to wait until the next day for answers.',
        'Our typical turnaround time is 10-15 minutes of your initial contact.',
        'We are reachable via chat from this website, email or phone. Please refer to the Support/Demo tab for more details.',
        'We provide the same high standard of support to you, regardless of your subscription plan.'
      ],
      link: { label: 'Show me more about MechanicDesk Support', url: u('feature-support.html') } }
  ]
};

/* --- Section 6: Pricing (real region data from js/index.js) -------------- */
const pricing = {
  eyebrow: 'Pricing plans',
  heading: 'A plan for any workshop',
  regions: [
    { key: 'australia', name: 'Australia', monthUnit: '/ month + GST' },
    { key: 'newZealand', name: 'New Zealand', monthUnit: '/ month' },
    { key: 'unitedKingdom', name: 'United Kingdom', monthUnit: '/ month' },
    { key: 'global', name: 'Global', monthUnit: '/ month' }
  ],
  plans: [
    { key: 'starter', name: 'Starter', users: '1 user/employee', featured: false },
    { key: 'small', name: 'Small', users: '3 users/employees', featured: false },
    { key: 'team', name: 'Team', users: '6 users/employees', featured: true },
    { key: 'large', name: 'Large', users: '15 users/employees', featured: false }
  ],
  trial: '14 days free trial',
  support: 'Full support from our support team',
  signupLabel: 'Sign Up',
  signupUrl: u('signup.html'),
  data: {
    australia: {
      starter: { cost: '$85.00', costPerExtraUser: '+ $15/m', costPerSms: '+ $0.10', costPerSmsText: '10 cents', stockCountLimit: '50,000' },
      small: { cost: '$115.00', costPerExtraUser: '+ $15/m', costPerSms: '+ $0.10', costPerSmsText: '10 cents', stockCountLimit: '100,000' },
      team: { cost: '$150.00', costPerExtraUser: '+ $10/m', costPerSms: '+ $0.10', costPerSmsText: '10 cents', stockCountLimit: 'Unlimited' },
      large: { cost: '$250.00', costPerExtraUser: '+ $10/m', costPerSms: '+ $0.10', costPerSmsText: '10 cents', stockCountLimit: 'Unlimited' }
    },
    newZealand: {
      starter: { cost: 'NZD $85.00', costPerExtraUser: '+ $15/m', costPerSms: '+ $0.10', costPerSmsText: '10 cents', stockCountLimit: '50,000' },
      small: { cost: 'NZD $115.00', costPerExtraUser: '+ $15/m', costPerSms: '+ $0.10', costPerSmsText: '10 cents', stockCountLimit: '100,000' },
      team: { cost: 'NZD $150.00', costPerExtraUser: '+ $10/m', costPerSms: '+ $0.10', costPerSmsText: '10 cents', stockCountLimit: 'Unlimited' },
      large: { cost: 'NZD $250.00', costPerExtraUser: '+ $10/m', costPerSms: '+ $0.10', costPerSmsText: '10 cents', stockCountLimit: 'Unlimited' }
    },
    unitedKingdom: {
      starter: { cost: '£45', costPerExtraUser: '+ £10/m', costPerSms: '+ £0.05', costPerSmsText: '5 cents', stockCountLimit: '50,000' },
      small: { cost: '£60', costPerExtraUser: '+ £10/m', costPerSms: '+ £0.05', costPerSmsText: '5 cents', stockCountLimit: '100,000' },
      team: { cost: '£75', costPerExtraUser: '+ £5/m', costPerSms: '+ £0.05', costPerSmsText: '5 cents', stockCountLimit: 'Unlimited' },
      large: { cost: '£120', costPerExtraUser: '+ £5/m', costPerSms: '+ £0.05', costPerSmsText: '5 cents', stockCountLimit: 'Unlimited' }
    },
    global: {
      starter: { cost: 'USD $50.00', costPerExtraUser: '+ $10/m', costPerSms: '+ $0.10', costPerSmsText: '10 cents', stockCountLimit: '50,000' },
      small: { cost: 'USD $60.00', costPerExtraUser: '+ $10/m', costPerSms: '+ $0.10', costPerSmsText: '10 cents', stockCountLimit: '100,000' },
      team: { cost: 'USD $85.00', costPerExtraUser: '+ $10/m', costPerSms: '+ $0.10', costPerSmsText: '10 cents', stockCountLimit: 'Unlimited' },
      large: { cost: 'USD $165.00', costPerExtraUser: '+ $10/m', costPerSms: '+ $0.10', costPerSmsText: '10 cents', stockCountLimit: 'Unlimited' }
    }
  },
  addons: {
    heading: 'Optional Addons',
    note: '* Available at additional charges, please contact our support for more details',
    items: [
      { name: 'Customized Templates', text: 'Customized print templates allow you to have your own uniquely designed invoice, job card, quote etc..' },
      { name: 'Digital Signatures', text: 'Capture your customer signature for job card and purchasing authorizations directly from your phone or tablet.' }
    ]
  }
};

/* --- Section 7: Support / Demo ------------------------------------------ */
const support = {
  eyebrow: 'Support/Demo',
  heading: 'Support that answers, not tickets that queue',
  sub: 'Our typical turnaround time is 10-15 minutes of your initial contact.',
  items: [
    { icon: 'book', title: 'Online manual', text: 'Please click the button below to access our online manual', action: { label: 'Online Manual', url: 'https://mechanicdesk.zendesk.com/hc/en-au' } },
    { icon: 'phone', title: 'Give us a call', text: 'Our support line numbers are', phones: true },
    { icon: 'screen', title: 'TeamViewer', text: 'We perform all support/demo functions via TeamViewer', action: { label: 'Book a demo', url: '#contact' } },
    { icon: 'mail', title: 'Send us a message', text: 'Please click the button below to send us an online message', action: { label: 'Message', url: '#contact' } }
  ],
  tutorialsNote: 'Over 50 step-by-step video tutorials cover everything from your first job to integrations, reporting and the mobile app.'
};

/* --- Section 8: Blog ---------------------------------------------------- */
const blog = {
  eyebrow: 'Our Latest Blog Posts',
  heading: 'News, tips thoughts, stories and ideas',
  moreLabel: 'view more',
  posts: [
    { title: 'Vehicle Visuals: A picture is worth a thousand words',
      excerpt: 'We at MechanicDesk would like to introduce you to our newest integration, Vehicle Visuals!...',
      file: 'blog-vehicle-visuals.jpg', url: 'https://www.mechanicdesk.com.au/blog/' },
    { title: 'Clocking your time has never been easier',
      excerpt: 'With our most recent update we have implemented a new feature called The Workstation...',
      file: 'blog-time-clocking.jpg', url: 'https://www.mechanicdesk.com.au/blog/' }
  ]
};

/* --- Section 9: Contact ------------------------------------------------- */
const contact = {
  eyebrow: 'Contact Us',
  heading: 'We always love hearing from you',
  sub: 'Send us a Message',
  formFields: [
    { name: 'name', label: 'Name', type: 'text', required: false },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel', required: false },
    { name: 'message', label: 'Message', type: 'textarea', required: true }
  ],
  submit: 'Send Message',
  thanksTitle: 'Thank you!',
  thanksText: 'We have received your message and will be in touch shortly.',
  reachHeading: 'How to Reach Us',
  callHeading: 'Please Give us a call'
};

/* --- Product tour ------------------------------------------------------- */
/* Desktop screens are frames captured from MechanicDesk's own tutorial videos
   (Tutorial 3 "Working on a job", plus the Diary, Inventory and Reports
   tutorials). Phone screens come from the MechanicDesk Mobile App Store
   listing. shared.cjs drops any slide whose file is not on disk. */
const productTour = {
  url: 'mechanicdesk.com.au/auto_workshop/app',
  slides: [
    { file: 'diary.png', tab: 'Diary', caption: 'Booking diary with drag and drop scheduling' },
    { file: 'app-dashboard.png', tab: 'Jobs', caption: 'Current jobs, unpaid invoices and jobs on hold' },
    { file: 'app-jobcard.png', tab: 'Job #10', caption: 'Job card and invoice side by side' },
    { file: 'app-checksheet.png', tab: 'Job #10', caption: 'Check sheet, photos and clock on' },
    { file: 'app-timesheet.png', tab: 'Timesheets', caption: 'Timesheets recorded against the job' },
    { file: 'app-invoice.png', tab: 'Invoice', caption: 'Invoice lines, discounts and GST' },
    { file: 'app-taxinvoice.png', tab: 'Print', caption: 'Tax invoice ready to print or email' },
    { file: 'app-jobcard-print.png', tab: 'Print', caption: 'Printed job card with barcode' },
    { file: 'inventory.png', tab: 'Inventory', caption: 'Stock control with reorder alerts' },
    { file: 'reports.png', tab: 'Reports', caption: 'Reports on sales, hours and stock' }
  ],
  phone: [
    { file: 'm1.png', caption: 'MechanicDesk Mobile' },
    { file: 'm2.png', caption: 'MechanicDesk Mobile' },
    { file: 'm3.png', caption: 'MechanicDesk Mobile' }
  ],
  source: 'Real screens from the MechanicDesk tutorials and mobile app.'
};

const trustStrip = [
  'No installation required',
  'Automatic data backup',
  'Any device, anywhere',
  '14 days free trial'
];

module.exports = { brand, nav, navFull, pillars, integrations, suitable, proven, features, pricing, support, blog, contact, trustStrip, productTour, SITE, u };
