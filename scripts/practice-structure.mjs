// Shared information architecture. Existing specialist routes remain canonical and reachable.
export const practiceGroups = [
  {
    "key": "ai",
    "icon": "ai",
    "group": "ai",
    "name": {
      "ka": "ხელოვნური ინტელექტი და ტექნოლოგიური რეგულირება",
      "en": "AI & Technology Regulation"
    },
    "summary": {
      "ka": "AI-ის რეგულირება, სამართლებრივი რისკების შეფასება, გამოყენების წესები და მართვის სისტემის დანერგვა.",
      "en": "AI regulation, legal risk assessment, internal policies and governance implementation."
    },
    "ids": [
      "ai"
    ]
  },
  {
    "key": "privacy",
    "icon": "data",
    "group": "ai",
    "name": {
      "ka": "პერსონალურ მონაცემთა დაცვა და კიბერუსაფრთხოება",
      "en": "Data Protection & Cybersecurity"
    },
    "summary": {
      "ka": "პერსონალურ მონაცემთა დაცვა, მონაცემთა დამუშავების პროცესები, კიბერუსაფრთხოების ვალდებულებები და ინციდენტებზე სამართლებრივი რეაგირება.",
      "en": "Data protection, processing arrangements, cybersecurity obligations and legal incident response."
    },
    "ids": [
      "data-protection",
      "cyber"
    ]
  },
  {
    "key": "contracts",
    "icon": "contracts",
    "group": "digital",
    "name": {
      "ka": "ტექნოლოგიური და კომერციული ხელშეკრულებები",
      "en": "Technology & Commercial Contracts"
    },
    "summary": {
      "ka": "ტექნოლოგიური და კომერციული ხელშეკრულებები, SaaS, ლიცენზირება, IT შესყიდვები და მოლაპარაკებები.",
      "en": "Technology and commercial agreements, SaaS, licensing, IT procurement and negotiations."
    },
    "ids": [
      "contracts"
    ]
  },
  {
    "key": "products",
    "icon": "product",
    "group": "digital",
    "name": {
      "ka": "ციფრული პროდუქტები და ინტელექტუალური საკუთრება",
      "en": "Digital Products & Intellectual Property"
    },
    "summary": {
      "ka": "ციფრული პროდუქტების გაშვება, ელექტრონული კომერცია, პროგრამულ უზრუნველყოფაზე უფლებები და ინტელექტუალური საკუთრების დაცვა.",
      "en": "Digital product launches, e-commerce, software ownership and intellectual property protection."
    },
    "ids": [
      "product",
      "commerce",
      "ip"
    ]
  },
  {
    "key": "fintech",
    "icon": "fintech",
    "group": "business",
    "name": {
      "ka": "ფინტექი და ფინანსური რეგულირება",
      "en": "FinTech & Financial Regulation"
    },
    "summary": {
      "ka": "საგადახდო მომსახურება, ვირტუალური აქტივები და ფინანსური რეგულირების მოთხოვნების შეფასება.",
      "en": "Payment services, virtual assets and financial regulatory assessment."
    },
    "ids": [
      "fintech",
      "crypto"
    ]
  },
  {
    "key": "corporate",
    "icon": "startup",
    "group": "business",
    "name": {
      "ka": "კორპორაციული და კომერციული სამართალი",
      "en": "Corporate & Commercial Law"
    },
    "summary": {
      "ka": "კომპანიის დაფუძნება, კომერციული გარიგებები, საინვესტიციო საკითხები და მუდმივი იურიდიული მხარდაჭერა.",
      "en": "Company formation, commercial transactions, investment matters and ongoing legal support."
    },
    "ids": [
      "startup",
      "georgia",
      "ongoing",
      "legal-operations"
    ]
  }
];
export const sectors = [
  {
    "slug": "technology",
    "name": {
      "ka": "ტექნოლოგიური კომპანიები",
      "en": "Technology Companies"
    },
    "label": {
      "ka": "IT · SaaS · AI",
      "en": "IT · SaaS · AI"
    },
    "summary": {
      "ka": "პროგრამული უზრუნველყოფის შემქმნელებსა და ტექნოლოგიურ კომპანიებს ვუწევთ იურიდიულ მომსახურებას პროდუქტის შექმნიდან კომერციულ გარიგებებსა და მარეგულირებელი მოთხოვნების შეფასებამდე.",
      "en": "Legal advice for software developers and technology companies, from product development to commercial agreements and regulatory requirements."
    },
    "short": {
      "ka": "IT, SaaS, პროგრამული უზრუნველყოფა და AI პროდუქტები",
      "en": "IT, SaaS, software and AI products"
    },
    "image": "/assets/sectors/technology.jpg",
    "imagePosition": "center",
    "scope": {
      "ka": [
        "პროგრამული უზრუნველყოფის შექმნის, ლიცენზირებისა და SaaS ხელშეკრულებები",
        "პროდუქტის გაშვებამდე სამართლებრივი შეფასება და მომხმარებელთან ურთიერთობის პირობები",
        "AI-ის გამოყენების წესები, პერსონალურ მონაცემთა დაცვა და ინტელექტუალური საკუთრება",
        "მომწოდებლებთან და საერთაშორისო კლიენტებთან თანამშრომლობა"
      ],
      "en": [
        "Software development, licensing and SaaS contracts",
        "Pre-launch legal reviews and customer terms",
        "AI governance, data protection and intellectual property",
        "Supplier and international customer arrangements"
      ]
    },
    "ids": [
      "contracts",
      "ai",
      "product",
      "ip",
      "data-protection"
    ]
  },
  {
    "slug": "financial-services",
    "name": {
      "ka": "ფინანსური სექტორი",
      "en": "Financial Services"
    },
    "label": {
      "ka": "ფინტექი · ფინანსური ინსტიტუტები",
      "en": "FinTech · Financial institutions"
    },
    "summary": {
      "ka": "ფინტექ კომპანიებს, ბანკებსა და სხვა ფინანსურ ინსტიტუტებს ვეხმარებით ტექნოლოგიური და მარეგულირებელი საკითხების სამართლებრივ შეფასებაში.",
      "en": "Specialist technology and regulatory legal advice for FinTech companies, banks and other financial institutions."
    },
    "short": {
      "ka": "ფინტექი, ბანკები, დაზღვევა და საგადახდო მომსახურება",
      "en": "FinTech, banking, insurance and payments"
    },
    "image": "/assets/sectors/financial-services.jpg",
    "imagePosition": "center",
    "scope": {
      "ka": [
        "საგადახდო მომსახურებისა და ვირტუალური აქტივების ბიზნესმოდელების სამართლებრივი შეფასება",
        "რეგისტრაციისა და ავტორიზაციის მოთხოვნების შეფასება შესაბამისი საქმიანობის მიხედვით",
        "AI სისტემებისა და პერსონალური მონაცემების გამოყენებასთან დაკავშირებული სამართლებრივი საკითხები",
        "ტექნოლოგიურ მომწოდებლებთან ხელშეკრულებები, ინფორმაციული უსაფრთხოება და აუთსორსინგი"
      ],
      "en": [
        "Legal assessment of payments and virtual-asset business models",
        "Assessment of registration and authorisation requirements for the relevant activity",
        "Legal issues around AI systems and personal data",
        "Technology supplier contracts, information security and outsourcing"
      ]
    },
    "note": {
      "ka": "ბანკებისა და სადაზღვევო კომპანიებისთვის ამ გვერდზე წარმოდგენილი მომსახურება ეხება ტექნოლოგიურ სამართალს, მონაცემთა დაცვასა და AI-ის მართვას; სხვა სპეციალიზებული სექტორული საკითხები ცალკე ფასდება.",
      "en": "For banks and insurers, the services described here concern technology law, privacy and AI governance. Other specialised sectoral matters are assessed separately."
    },
    "ids": [
      "fintech",
      "crypto",
      "ai",
      "data-protection",
      "contracts",
      "cyber"
    ]
  },
  {
    "slug": "commerce",
    "name": {
      "ka": "ვაჭრობა და მომსახურება",
      "en": "Commerce & Services"
    },
    "label": {
      "ka": "ელექტრონული კომერცია · პლატფორმები",
      "en": "E-commerce · Platforms"
    },
    "summary": {
      "ka": "სავაჭრო და მომსახურების სფეროში მომუშავე კომპანიებს ვეხმარებით ციფრული გაყიდვების, მომხმარებელთა უფლებებისა და კომერციული პროცესების სამართლებრივ მოწესრიგებაში.",
      "en": "Legal support for commerce and service businesses across digital sales, consumer rights and commercial processes."
    },
    "short": {
      "ka": "ონლაინ ვაჭრობა, პლატფორმები და მომხმარებელთა უფლებები",
      "en": "Online commerce, platforms and consumer rights"
    },
    "image": "/assets/sectors/commerce.jpg",
    "imagePosition": "center",
    "scope": {
      "ka": [
        "ონლაინ გაყიდვისა და მომსახურებით სარგებლობის პირობები",
        "მომხმარებელთა ინფორმირება, გადახდა, შეკვეთის გაუქმება და თანხის დაბრუნება",
        "პერსონალურ მონაცემთა დაცვა და ციფრული რეკლამის სამართლებრივი საკითხები",
        "მომწოდებლებთან ხელშეკრულებები და ახალი ციფრული ფუნქციების შეფასება"
      ],
      "en": [
        "Online sales and service terms",
        "Consumer information, payments, cancellation and refunds",
        "Privacy and legal issues in digital advertising",
        "Supplier contracts and assessment of new digital features"
      ]
    },
    "ids": [
      "commerce",
      "product",
      "data-protection",
      "contracts"
    ]
  },
  {
    "slug": "startups-investors",
    "name": {
      "ka": "სტარტაპები და ინვესტორები",
      "en": "Startups & Investors"
    },
    "label": {
      "ka": "დაფუძნება · ზრდა · ინვესტიცია",
      "en": "Formation · Growth · Investment"
    },
    "summary": {
      "ka": "ტექნოლოგიურ სტარტაპებსა და ინვესტორებს ვუწევთ იურიდიულ მომსახურებას კომპანიის დაფუძნების, უფლებების განაწილებისა და საინვესტიციო გარიგებების საკითხებზე.",
      "en": "Legal advice for technology founders and investors on company formation, ownership and investment transactions."
    },
    "short": {
      "ka": "დაფუძნება, დამფუძნებელთა შეთანხმებები და ინვესტიციები",
      "en": "Formation, founder agreements and investment"
    },
    "image": "/assets/sectors/startups-investors.jpg",
    "imagePosition": "center",
    "scope": {
      "ka": [
        "კომპანიის დაფუძნება და კორპორაციული სტრუქტურის შერჩევა",
        "დამფუძნებელთა შეთანხმებები და წილზე უფლებების ეტაპობრივად მოპოვების პირობები",
        "ინტელექტუალური საკუთრების უფლებების კომპანიისთვის გადაცემა",
        "საინვესტიციო დოკუმენტების შეფასება და სამართლებრივი შემოწმებისთვის მომზადება"
      ],
      "en": [
        "Formation and corporate structure",
        "Founder agreements and vesting arrangements",
        "Assignment of intellectual property rights to the company",
        "Investment document review and due diligence readiness"
      ]
    },
    "ids": [
      "startup",
      "ip",
      "georgia",
      "contracts"
    ]
  },
  {
    "slug": "international",
    "name": {
      "ka": "საერთაშორისო კომპანიები",
      "en": "International Companies"
    },
    "label": {
      "ka": "საქართველო · საერთაშორისო საქმიანობა",
      "en": "Georgia · Cross-border business"
    },
    "summary": {
      "ka": "უცხოურ კომპანიებს ვეხმარებით საქართველოში საქმიანობის დაწყებასა და ადგილობრივი სამართლებრივი მოთხოვნების შეფასებაში. ქართულ კომპანიებს ვუწევთ იურიდიულ მომსახურებას საერთაშორისო პარტნიორებთან ურთიერთობისას.",
      "en": "Georgian-law advice for international companies entering Georgia and support for Georgian businesses working with overseas partners."
    },
    "short": {
      "ka": "საქართველოში საქმიანობის დაწყება და საერთაშორისო გარიგებები",
      "en": "Market entry in Georgia and cross-border transactions"
    },
    "image": "/assets/sectors/international.jpg",
    "imagePosition": "center",
    "scope": {
      "ka": [
        "ორგანიზაციულ-სამართლებრივი ფორმის შერჩევა და კომპანიის რეგისტრაციაში დახმარება",
        "ადგილობრივი და საერთაშორისო კომერციული ხელშეკრულებები",
        "თანამშრომლებთან და კონტრაქტორებთან ურთიერთობა, მონაცემთა საერთაშორისო გადაცემა",
        "სხვა ქვეყნების სამართლის საკითხებზე შესაბამის სპეციალისტებთან კოორდინაცია"
      ],
      "en": [
        "Choice of legal structure and support with incorporation",
        "Local and international commercial contracts",
        "Employment and contractor arrangements, international data transfers",
        "Coordination with qualified specialists on foreign-law matters"
      ]
    },
    "ids": [
      "georgia",
      "contracts",
      "data-protection",
      "ip"
    ],
    "links": [
      {
        "href": "/business/georgia/",
        "ka": "საქართველოში საქმიანობა",
        "en": "Doing business in Georgia"
      },
      {
        "href": "/business/international/",
        "ka": "საერთაშორისო კლიენტთან თანამშრომლობა",
        "en": "Working with international clients"
      }
    ]
  },
  {
    "slug": "legal-teams",
    "name": {
      "ka": "იურიდიული ფირმები და დეპარტამენტები",
      "en": "Law Firms & In-house Legal Teams"
    },
    "label": {
      "ka": "გარე ექსპერტიზა · მუდმივი მხარდაჭერა",
      "en": "Specialist advice · Ongoing support"
    },
    "summary": {
      "ka": "იურიდიულ ფირმებსა და კომპანიების იურიდიულ სამსახურებს ვთავაზობთ სპეციალიზებულ მხარდაჭერას ტექნოლოგიური სამართლის, AI-ის გამოყენებისა და იურიდიული პროცესების ავტომატიზაციის საკითხებზე.",
      "en": "Specialist support for law firms and in-house legal teams on technology law, AI adoption and legal workflow automation."
    },
    "short": {
      "ka": "სპეციალიზებული გარე იურიდიული მხარდაჭერა",
      "en": "Additional specialist legal counsel"
    },
    "image": "/assets/sectors/legal-teams.jpg",
    "imagePosition": "center",
    "scope": {
      "ka": [
        "რთული ტექნოლოგიური ხელშეკრულებების მომზადება და შეფასება",
        "AI-ის დანერგვისა და მონაცემთა დაცვის სამართლებრივი საკითხები",
        "იურიდიული პროცესების მოწესრიგება, შაბლონები და ხელშეკრულებების მართვა",
        "ცალკეული პროექტის ან რეგულარული საკონსულტაციო მომსახურების პირობების შეთანხმება"
      ],
      "en": [
        "Drafting and review of complex technology contracts",
        "AI adoption and data protection matters",
        "Legal process improvement, templates and contract management",
        "Agreed project-based or ongoing advisory support"
      ]
    },
    "ids": [
      "ongoing",
      "legal-operations",
      "contracts",
      "ai",
      "data-protection"
    ],
    "links": [
      {
        "href": "/advisory/legal-ai-automation/",
        "ka": "იურიდიულ საქმიანობაში AI-ის დანერგვა და ავტომატიზაცია",
        "en": "Legal AI & Automation Consulting"
      }
    ]
  }
];
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function sectorCards(){return sectors.map(s=>'<a class="dlg-sector-card" href="/business/sectors/'+s.slug+'/" data-site-link><div class="dlg-sector-photo"><img src="'+s.image+'" alt="" loading="lazy" decoding="async" style="object-position:'+s.imagePosition+'"></div><div class="dlg-sector-copy"><span class="dlg-sector-label" data-en="'+esc(s.label.en)+'">'+esc(s.label.ka)+'</span><h3 data-en="'+esc(s.name.en)+'">'+esc(s.name.ka)+'</h3><p data-en="'+esc(s.short.en)+'">'+esc(s.short.ka)+'</p><span class="dlg-sector-arrow" aria-hidden="true">↗</span></div></a>').join('');}
