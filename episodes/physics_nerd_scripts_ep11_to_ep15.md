# Physics Nerd — Season 3 Slate (EP11–EP15, Varied Hooks v4)

> **Status:** ✅ Fact-checked by Claude, all fixes approved and applied 2026-11-23 (see `SCRIPTS_S3_REVIEW.md`). Footage checks still pending per episode.
> **Key Upgrade (v4):** Built from a deeper study of `@MichaelRossAerospace` and `@SceneMechanicsYT`. Every episode uses a **distinct hook archetype** (no repeating *"Wait—"* / *"Hold on—"* disbelief openers) and a **distinct narrative sequence** (rapid-fire multi-beat roasts, "does this actually work?" flips, real-stunt vs. movie-physics splits, misdirection twists, and structural inspections).
> **Format Rules:** 2–3s movie open -> freeze-frame hook -> narration over moving footage -> freeze-frame punchlines -> zero emotion tags, numbers written as spoken words in Clean VO, no subscribe begs.

---

## Viral Rollout & Production Status

| Priority | Ep | Movie & Scene | Upload Title | Hook Archetype | VO Words | Est. Runtime | Ready State |
|---|---|---|---|---|---|---|---|
| **1st** | **EP11** | The Avengers (2012) — Iron Man & the Nuke | Nothing In This Iron Man Scene Obeys Physics 💀 | Instant Deadpan Simile | ~134 | ~60 s | ❓ Fact-check & clip cut |
| **2nd** | **EP12** | The Martian (2015) — The Glove Thruster | Would Stabbing Your Spacesuit Actually Work In Space? 💀 | Dry Sarcastic Admiration | ~128 | ~58 s | ❓ Fact-check & clip cut |
| **3rd** | **EP13** | Mission: Impossible – Rogue Nation (2015) — Plane Hang | What Happens If You Actually Hang Onto A Plane Taking Off 💀 | Real-World Stunt Joke | ~130 | ~59 s | ❓ Fact-check & clip cut |
| **4th** | **EP14** | Avengers: Infinity War (2018) — Thor & the Star | Why Thor's Star Scene Should've Turned Him Into Spaghetti 💀 | Direct Technical Callout | ~118 | ~56 s | ❓ Fact-check & clip cut |
| **5th** | **EP15** | Godzilla (2014) — Walking Through San Francisco | Why Godzilla Wouldn't Survive Two Steps In San Francisco 💀 | Everyday-Consequence Opener | ~145 | ~62 s | ❓ Fact-check & clip cut |

---

## EP11: The Avengers (2012) — Iron Man Redirects the Nuke

* **File:** `episodes/11-avengers-nuke/script.md`
* **Upload Title:** Nothing In This Iron Man Scene Obeys Physics 💀
* **Top Banner:** `PHYSICS NERD REACTS TO THE AVENGERS`
* **Hook Archetype:** Instant Deadpan Simile
* **Sequence:** Rapid-Fire 3-Moment Roast (Grabbing the missile -> Steering it -> Hulk's "save")
* **Core Physics:** Lateral momentum redirection & terminal-velocity impact impulse

### Numbers & Fact-Check Notes for Claude
* **Missile specs:** A subsonic cruise missile (e.g., Tomahawk) weighs $\sim 3{,}000\text{ lb}$ ($\sim 1{,}360\text{ kg}$) and cruises at $\sim 550\text{ mph}$ ($\sim 885\text{ km/h}$). Check whether the film's nuke looks closer to a jet-launched tactical missile or cruise missile; "around three thousand pounds and over five hundred miles an hour" is a solid real-world cruise-missile benchmark.
* **Hulk catch:** Catching a falling body over a short distance ($\sim 1\text{ m}$) imparts the exact same fatal deceleration $G$-force as hitting the pavement—just with green skin instead of asphalt.
* **Footage check:** Verify that Tony's hands are near the rear exhaust / tail section when steering upward, and that Hulk roars right in Tony's face to wake him up.

### Beat Sheet

| # | Type | Clip / Visual Cue | Line | ~s |
|---|---|---|---|---|
| 1 | PLAY | Tony flies up and latches onto the speeding nuclear missile over New York. | *(movie audio)* | 2.5 |
| 2 | PAUSE | Freeze on Tony hugging the missile mid-air. | Tony Stark just grabbed a live nuclear missile mid-flight like it's a runaway shopping cart. | 4.5 |
| 3 | VO | Moving footage: Tony pushing the missile upward. Pop-up: `~3,000 lbs · ~550 mph` | A real cruise missile weighs around three thousand pounds and cruises at over five hundred miles an hour. Trying to wrestle that thing sideways in mid-air isn't steering—it's just becoming a hood ornament. | 11.5 |
| 4 | PAUSE | Freeze on Tony flying straight up toward the wormhole. Cutaway: `shopping-cart.jpg` or red thrust arrows on tail fins. | Also, notice how he turns it straight up with zero tail fins adjusting, while his hands are literally inches from rocket exhaust. Apparently that suit runs on pure confidence. | 9.5 |
| 5 | PLAY | Suit powers down, Tony falls back through the portal, Hulk leaps and catches him mid-air. | *(movie audio)* | 2.5 |
| 6 | VO | Moving footage: Hulk slamming into the building and crashing to the street holding Tony. White/red impact arrows. | Then his power dies, he drops at over a hundred miles an hour, and Hulk catches him mid-air. Even with Hulk sliding down the building to slow down, that first grab still slams Tony with brutal Gs. | 9.5 |
| 7 | PAUSE | Freeze on Hulk roaring in Tony's face to wake him up. Pop-up: `WAKE-UP METHOD: YELLING` | And somehow he wakes up two seconds later because Hulk yelled in his face. Doctors hate this one simple trick. | 10.5 |

### Clean VO Copy (ElevenLabs)

```text
Tony Stark just grabbed a live nuclear missile mid-flight like it's a runaway shopping cart.

A real cruise missile weighs around three thousand pounds and cruises at over five hundred miles an hour. Trying to wrestle that thing sideways in mid-air isn't steering—it's just becoming a hood ornament.

Also, notice how he turns it straight up with zero tail fins adjusting, while his hands are literally inches from rocket exhaust. Apparently that suit runs on pure confidence.

Then his power dies, he drops at over a hundred miles an hour, and Hulk catches him mid-air. Even with Hulk sliding down the building to slow down, that first grab still slams Tony with brutal Gs.

And somehow he wakes up two seconds later because Hulk yelled in his face. Doctors hate this one simple trick.
```

### Suggested Cutaway Assets (`studio/public/ep11/assets/`)
1. `shopping-cart.jpg` — A rogue metal shopping cart rolling wildly across an empty parking lot.
2. `cruise-missile.jpg` — Crisp side-profile photo of a real military cruise missile flying over water.

---

## EP12: The Martian (2015) — The "Iron Man" Glove Puncture

* **File:** `episodes/12-martian-glove/script.md`
* **Upload Title:** Would Stabbing Your Spacesuit Actually Work In Space? 💀
* **Top Banner:** `PHYSICS NERD REACTS TO THE MARTIAN`
* **Hook Archetype:** Dry Sarcastic Admiration
* **Sequence:** "Does This Actually Work?" Flip (Validates the science first -> drops the torque twist -> gives partial credit)
* **Core Physics:** Newton's 3rd Law cold-gas thrust & off-axis torque ($\tau = r \times F$)

### Numbers & Fact-Check Notes for Claude
* **Suit pressure:** NASA EMU spacesuits operate at $\sim 4.3\text{ psi}$ ($\sim 29.6\text{ kPa}$) of pure oxygen.
* **Thrust vs. torque:** Venting gas through a small glove puncture genuinely produces real thrust (single-digit newtons), so the basic principle is real. However, because the hand is offset from the astronaut's center of mass, the thrust creates rotational torque ($\tau = r \times F$), causing uncontrolled tumbling.
* **Footage check:** Verify the exact shot where Watney slices his glove and the shot where he tumbles wildly before Commander Lewis catches him.

### Beat Sheet

| # | Type | Clip / Visual Cue | Line | ~s |
|---|---|---|---|---|
| 1 | PLAY | Mark Watney pokes a hole in his glove and blasts off into space. | *(movie audio)* | 2.5 |
| 2 | PAUSE | Freeze on Watney cutting his own glove with the knife. | You have to respect a guy who gets stranded on Mars and decides the smartest move is to stab a hole in his own spacesuit. | 6.5 |
| 3 | VO | Moving footage: air jetting out of his glove, pushing him toward the ship. Pop-up: `Suit Pressure: ~4.3 psi` | Surprisingly, the basic physics here actually works. A real spacesuit is pressurized to about four pounds per square inch, and in the vacuum of space, leaking air really does act like a tiny rocket thruster. | 11.5 |
| 4 | VO | Freeze-frame on Watney's outstretched arm. Draw a white dot on his torso (`Center of Mass`) and a curved red spin arrow around him. | The problem isn't the thrust—it's steering. Because that jet is coming out of his hand instead of his center of mass, it creates massive torque. | 8.5 |
| 5 | PAUSE | Cutaway: `deflating-balloon.jpg` (balloon spinning wildly through the air). | In real life, he wouldn't fly straight like Iron Man. He'd spin out of control like a deflated birthday balloon while blasting all his oxygen into deep space. | 8.5 |
| 6 | PLAY | Watney tumbling and grabbing Commander Lewis's hand. | *(movie audio)* | 2.0 |
| 7 | PAUSE | Freeze on Watney laughing inside his helmet. Pop-up: `THRUST: REAL · STEERING: CHAOS` | To be fair, the movie actually shows him spinning all over the place, so NASA has to give him partial credit. Still, venting your own oxygen to go faster is the most Mark Watney plan possible. | 10.5 |

### Clean VO Copy (ElevenLabs)

```text
You have to respect a guy who gets stranded on Mars and decides the smartest move is to stab a hole in his own spacesuit.

Surprisingly, the basic physics here actually works. A real spacesuit is pressurized to about four pounds per square inch, and in the vacuum of space, leaking air really does act like a tiny rocket thruster. The problem isn't the thrust—it's steering. Because that jet is coming out of his hand instead of his center of mass, it creates massive torque.

In real life, he wouldn't fly straight like Iron Man. He'd spin out of control like a deflated birthday balloon while blasting all his oxygen into deep space.

To be fair, the movie actually shows him spinning all over the place, so NASA has to give him partial credit. Still, venting your own oxygen to go faster is the most Mark Watney plan possible.
```

### Suggested Cutaway Assets (`studio/public/ep12/assets/`)
1. `deflating-balloon.jpg` — A bright red party balloon shooting wildly through the air with motion blur as it deflates.
2. `spacesuit-pressure-gauge.jpg` — Close-up of a crisp white NASA spacesuit wrist pressure gauge reading around `4.3 PSI`.

---

## EP13: Mission: Impossible – Rogue Nation (2015) — Hanging Off the Airbus A400M

* **File:** `episodes/13-mi-plane-hang/script.md`
* **Upload Title:** What Happens If You Actually Hang Onto A Plane Taking Off 💀
* **Top Banner:** `PHYSICS NERD REACTS TO MISSION: IMPOSSIBLE`
* **Hook Archetype:** Real-World Stunt Joke + Respect
* **Sequence:** Real Stunt vs. Movie Physics Split (Praises Tom Cruise's real setup -> roasts Ethan Hunt's bare-hand physics)
* **Core Physics:** Aerodynamic drag at takeoff speed & grip/impact limits

### Numbers & Fact-Check Notes for Claude
* **Takeoff speed:** An Airbus A400M military transport rotates/takes off at roughly $130\text{–}160\text{ knots}$ ($\sim 150\text{–}185\text{ mph}$). "Around a hundred and fifty miles an hour" is accurate and matches Category 5 hurricane wind thresholds ($157+\text{ mph}$—Claude can adjust to *"almost Category Five"* or *"Category Four to Five"* if needed for strictness).
* **Real stunt facts:** Tom Cruise genuinely performed the stunt 8 times strapped into a full-body harness routed through the fuselage door, wearing custom scleral contact lenses to shield his eyes from wind and runway debris.
* **Footage check:** Verify Ethan's dress suit, bare fingertips on the door rim, and hair staying relatively intact during the climb.

### Beat Sheet

| # | Type | Clip / Visual Cue | Line | ~s |
|---|---|---|---|---|
| 1 | PLAY | Ethan Hunt sprints onto the wing, grabs the side door, and the massive plane lifts off. | *(movie audio)* | 2.5 |
| 2 | PAUSE | Freeze on Ethan clinging to the outside of the plane at altitude. | First off, Tom Cruise actually did this stunt for real—which means his insurance agent probably hasn't slept since twenty-fourteen. | 6.5 |
| 3 | VO | Moving footage: plane roaring down the runway. Pop-up: `Airbus A400M · Takeoff: ~150 mph` | Here's the catch. In real life, Tom was bolted to the door with a hidden harness and wore special contact lenses so the wind wouldn't wreck his eyes. | 9.0 |
| 4 | VO | Moving footage: Ethan gripping the thin door sill in a dress suit. White wind-drag arrows pushing back. | In the movie? Ethan Hunt is doing this in a tailored suit with zero harness and bare fingertips. An Airbus A-four-hundred-M takes off at around a hundred and fifty miles an hour. | 9.5 |
| 5 | PAUSE | Freeze on Ethan's fingers gripping the metal rim. Cutaway: `category-4-hurricane.jpg` | That's basically Category Four hurricane wind slamming straight into your face while you do a fingertip pull-up on slippery painted aluminum. | 7.5 |
| 6 | PLAY | Plane banking hard as Ethan yells into his comms. | *(movie audio)* | 2.0 |
| 7 | PAUSE | Freeze on Ethan's hair barely even messing up. Pop-up: `HAIR GEL = AEROSPACE GRADE` | Not to mention one tiny pebble at a hundred and fifty miles an hour hits like a paintball to the forehead. Forget the secret agents—give whoever styled his hair a raise. | 9.5 |

### Clean VO Copy (ElevenLabs)

```text
First off, Tom Cruise actually did this stunt for real—which means his insurance agent probably hasn't slept since twenty-fourteen.

Here's the catch. In real life, Tom was bolted to the door with a hidden harness and wore special contact lenses so the wind wouldn't wreck his eyes. In the movie? Ethan Hunt is doing this in a tailored suit with zero harness and bare fingertips. An Airbus A-four-hundred-M takes off at around a hundred and fifty miles an hour.

That's basically Category Four hurricane wind slamming straight into your face while you do a fingertip pull-up on slippery painted aluminum.

Not to mention one tiny pebble at a hundred and fifty miles an hour hits like a paintball to the forehead. Forget the secret agents—give whoever styled his hair a raise.
```

### Suggested Cutaway Assets (`studio/public/ep13/assets/`)
1. `category-4-hurricane.jpg` — Palm trees bent completely sideways in violent, roaring hurricane-force wind and spray.
2. `scleral-contact-lens.jpg` — Clean macro shot of a large clear protective contact lens balanced on a fingertip.

---

## EP14: Avengers: Infinity War (2018) — Thor Taking the Full Force of a Star

* **File:** `episodes/14-infinitywar-thor-star/script.md`
* **Upload Title:** Why Thor's Star Scene Should've Turned Him Into Spaghetti 💀
* **Top Banner:** `PHYSICS NERD REACTS TO INFINITY WAR`
* **Hook Archetype:** Direct Technical Callout (Scene Mechanics style)
* **Sequence:** Misdirection Twist (Dismisses the obvious heat argument -> drops the neutron-star gravity bomb -> roasts the forge contractor)
* **Core Physics:** Neutron-star mass density, extreme surface gravity ($g \approx 10^{11}\,g_{\oplus}$), and tidal spaghettification

### Numbers & Fact-Check Notes for Claude
* **Neutron star specs:** Typically $\sim 1.4\text{–}2.0\,M_{\odot}$ compressed into a sphere $\sim 12\text{ miles}$ ($\sim 20\text{ km}$) across. Surface gravity is roughly $100\text{ billion}$ to $200\text{ billion}$ times Earth's gravity.
* **Tidal forces:** Even kilometers away (where the Nidavellir rings sit), the gravitational gradient would rip apart Rocket's pod, the metal rings, Eitri, and Thor.
* **Footage check:** Confirm Eitri explicitly calls Nidavellir's heart a "neutron star" (he does: *"the heart of a dying star... a neutron star"*).

### Beat Sheet

| # | Type | Clip / Visual Cue | Line | ~s |
|---|---|---|---|---|
| 1 | PLAY | Thor pulls the iris open and takes the blinding beam of the dying star straight to the back. | *(movie audio)* | 2.5 |
| 2 | PAUSE | Freeze on Thor glowing inside the star beam. | Bro, that is not how neutron stars work—not even close. | 3.5 |
| 3 | VO | Moving footage: wide shot of the giant metal rings around the tiny glowing star. Pop-up: `Mass: ~1.5x Sun · Width: ~12 Miles` | Everyone argues about whether Thor could survive the heat. Forget the heat—he's standing right next to a neutron star. That's more mass than our entire sun crushed into a ball about the size of a city. | 11.5 |
| 4 | VO | Moving footage: Rocket's tiny pod pulling the rings. Red gravity arrows pulling everything inward toward the star. | The gravity that close is millions of times stronger than Earth's. Rocket's little spaceship wouldn't be towing giant metal rings—it would be shredded into space dust before they even parked. | 10.5 |
| 5 | PAUSE | Freeze on Thor casually gripping the metal handles. Cutaway: `dry-spaghetti.jpg` | Even if Thor is completely fireproof, tidal gravity that strong doesn't just crush you—it stretches you, the dwarf, and the whole forge into a strand of cosmic spaghetti. | 7.5 |
| 6 | PLAY | Eitri pouring the molten metal into the axe mold. | *(movie audio)* | 2.0 |
| 7 | PAUSE | Freeze on the giant metal iris closing over the star. Pop-up: `FORGE CONTRACTOR = STRONGEST IN MCU` | So yeah, Thor's durability is impressive. But whoever built a steel garage door right next to a neutron star is the real god of the MCU. | 8.5 |

### Clean VO Copy (ElevenLabs)

```text
Bro, that is not how neutron stars work—not even close.

Everyone argues about whether Thor could survive the heat. Forget the heat—he's standing right next to a neutron star. That's more mass than our entire sun crushed into a ball about the size of a city. The gravity that close is millions of times stronger than Earth's. Rocket's little spaceship wouldn't be towing giant metal rings—it would be shredded into space dust before they even parked.

Even if Thor is completely fireproof, tidal gravity that strong doesn't just crush you—it stretches you, the dwarf, and the whole forge into a strand of cosmic spaghetti.

So yeah, Thor's durability is impressive. But whoever built a steel garage door right next to a neutron star is the real god of the MCU.
```

### Suggested Cutaway Assets (`studio/public/ep14/assets/`)
1. `neutron-star-city.jpg` — Dramatic sci-fi scale comparison showing a glowing dense metallic sphere the size of Manhattan floating above a city skyline.
2. `dry-spaghetti.jpg` — A single strand of dry spaghetti being stretched/snapped, shot clean on a dark background.

---

## EP15: Godzilla (2014) — Walking Through San Francisco

* **File:** `episodes/15-godzilla-sanfrancisco/script.md`
* **Upload Title:** Why Godzilla Wouldn't Survive Two Steps In San Francisco 💀
* **Top Banner:** `PHYSICS NERD REACTS TO GODZILLA`
* **Hook Archetype:** Everyday-Consequence Opener (Michael Ross style)
* **Sequence:** Structural Engineer's Inspection (Square-Cube Law -> Ground Bearing Failure -> Hydrostatic Blood Pressure)
* **Core Physics:** Square-Cube Law ($M \propto L^3$ vs. bone strength $\propto L^2$), soil/pavement bearing pressure, and hydrostatic pressure ($P = \rho g h$)

### Numbers & Fact-Check Notes for Claude
* **2014 Godzilla specs:** Official Legendary MonsterVerse height is $355\text{ ft}$ ($108\text{ m}$) and weight is $90{,}000\text{ short tons}$ (comparable to a Nimitz-class aircraft carrier at $\sim 100{,}000\text{ tons}$).
* **Square-Cube Law:** Scaling linear dimensions by $L$ scales cross-sectional bone area by $L^2$ while scaling volume/weight by $L^3$.
* **Blood pressure:** Pumping blood vertically $\sim 300\text{ ft}$ ($\sim 30$ stories) requires extreme hydrostatic pressure—far beyond biological heart tissue limits.
* **Footage check:** Use the San Francisco street-stomp / Golden Gate / downtown arrival clips from *Godzilla* (2014) so "San Francisco" matches what's on screen.

### Beat Sheet

| # | Type | Clip / Visual Cue | Line | ~s |
|---|---|---|---|---|
| 1 | PLAY | Godzilla's massive foot slams onto the city street, shaking cars and the camera. | *(movie audio)* | 2.5 |
| 2 | PAUSE | Freeze on Godzilla towering between downtown skyscrapers. | Forget the military—San Francisco's road repair budget just went completely bankrupt. | 4.5 |
| 3 | VO | Moving footage: Godzilla stomping down the avenue. Cutaway: `aircraft-carrier.jpg` + Pop-up: `355 ft · 90,000 Tons` | Look, this version of Godzilla is over three hundred and fifty feet tall and weighs ninety thousand tons. That's basically an entire aircraft carrier trying to walk around on two legs. | 10.5 |
| 4 | VO | Freeze-frame on his legs with white vertical compression arrows. Pop-up: `Weight ∝ L³ · Bones ∝ L²` | Under the square-cube law, when you scale an animal up, its weight grows way faster than its bone strength. Real bones at that size wouldn't even let him stand up—they'd snap under his own weight. | 11.0 |
| 5 | PAUSE | Freeze on his foot stepping onto the asphalt. Cutaway: `sinkhole-street.jpg` | And even if his skeleton is made of pure titanium, city streets aren't solid rock. They're thin asphalt over sewers and subway tunnels. One step and Godzilla punches straight through the road into the basement of a Starbucks. | 11.5 |
| 6 | PLAY | Godzilla roaring into the sky. | *(movie audio)* | 2.0 |
| 7 | PAUSE | Freeze on Godzilla's head way up in the clouds. Pop-up: `15 STORIES UP · 10× A GIRAFFE` | Plus his heart would have to pump blood fifteen stories straight up just to keep him conscious—that's over ten times a giraffe's blood pressure. Honestly, the military didn't even need missiles—just let him walk two blocks and let gravity do the work. | 10.5 |

### Clean VO Copy (ElevenLabs)

```text
Forget the military—San Francisco's road repair budget just went completely bankrupt.

Look, this version of Godzilla is over three hundred and fifty feet tall and weighs ninety thousand tons. That's basically an entire aircraft carrier trying to walk around on two legs. Under the square-cube law, when you scale an animal up, its weight grows way faster than its bone strength. Real bones at that size wouldn't even let him stand up—they'd snap under his own weight.

And even if his skeleton is made of pure titanium, city streets aren't solid rock. They're thin asphalt over sewers and subway tunnels. One step and Godzilla punches straight through the road into the basement of a Starbucks.

Plus his heart would have to pump blood fifteen stories straight up just to keep him conscious—that's over ten times a giraffe's blood pressure. Honestly, the military didn't even need missiles—just let him walk two blocks and let gravity do the work.
```

### Suggested Cutaway Assets (`studio/public/ep15/assets/`)
1. `aircraft-carrier.jpg` — Massive aerial shot of a US Navy aircraft carrier at sea to sell the 90,000-ton weight scale.
2. `sinkhole-street.jpg` — Huge asphalt city street caved in over exposed underground utility pipes and subway concrete.