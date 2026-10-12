# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three primary audiences, served together:

- **Overseas school teachers and school leaders** deciding whether to send
  delegates. They check credibility, track record, dates and who to contact
- **Student delegates**, prospective or selected, finding out what forum
  involves: programme, speakers, FAQ, what to expect in Singapore
- **Laureates and partners** (scientists, Ministry of Education, Global Young
  Scientists Summit, sponsors) checking ISYF's standing and history

Alumni and Hwa Chong community also visit archives, but design decisions
favour three groups above.

## Product Purpose

Official website of International Science Youth Forum (ISYF) @ Singapore,
student-run science enrichment forum first held in 2009, hosted by Hwa Chong
Institution's Students' Science Research Club (SSRC) and co-organised by
Ministry of Education, Singapore. Site covers every edition, hosts current
edition's details and keeps past edition websites as archives.

Success between editions (for example while ISYF 2027 is "coming soon"):
visitor leaves convinced ISYF is a serious, long-running forum with real
Nobel laureates and eminent scientists behind it.

## Positioning

18 consecutive editions since 2009, run by students, where delegates meet
Nobel laureates face to face through lectures, Masterclasses and dialogues,
held in conjunction with Global Young Scientists Summit. Laureate roster
and unbroken edition history are evidence no neighbouring youth programme
can copy.

## Operating Context

- Each edition runs a few days in January at Hwa Chong Institution, Singapore
- Edition cycle: upcoming edition shows coming-soon page until sections go
  live, then finished edition moves to `/<year>` archive with its own menu
  and Archive bar (see README "Starting a new edition")
- Contact runs through `reach_isyf@hci.edu.sg`, Instagram and YouTube
  (`data/site.js`)

## Capabilities and Constraints

- Nuxt 3, Vue 3, vanilla CSS with variables in `assets/css/index.css`;
  static generate deployed to GitHub Pages under configurable base URL
- Routes: `/` home, `/history` editions and themes, `/laureates` laureates
  and scientists, `/2027` upcoming edition, `/2026/...` archived site
- Shared content lives in `data/editions.js`, `data/scientists.js`,
  `data/site.js`
- **Yearly handover:** new student committee takes over each year and must
  update site by editing `data/` files, without design knowledge. Design
  must stay data-driven and must not need hand-tuned layout per entry
- Undecided: whether archived edition pages may receive visual changes

## Evidence on Hand

- 18 editions with themes, `data/editions.js`
- 78 laureates and eminent scientists with invite years, `data/scientists.js`
- Speaker and team photos, `public/images/profiles/`
- Hwa Chong clocktower and Singapore location photography, `public/images/`
- Partner logos, `public/images/logos/`
- ISYF 2026 programme, photos, poster exhibition and infographic gallery
  under `/2026` and `public/`
- "120+ students and educators each year" is confirmed accurate by the
  team (shown on home page)
- No testimonials, per-edition delegate counts or quotes on hand. Do not
  fabricate them

## Product Principles

1. Legacy is proof. Lead with real editions, real laureates and real years
   before any claim
2. Serve teacher, delegate and laureate in one pass. Credibility,
   practical detail and standing must each be easy to find
3. Data drives every page. Next committee updates `data/`, design follows
   without hand edits
4. Archives stay findable. Every past edition keeps a working route
