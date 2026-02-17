Goal and judging angle

Deliver a single landing page web prototype that proves AI or ML enhanced flood forecasting and preparedness in the Philippines, then upgrades users to the ResQLink Android app for mobile native response tools. Flood is the primary demo path. Other hazards appear as preview states so the experience stays on brief.

One sentence concept

ResQLink Web turns a location into a clear flood risk forecast, explains the drivers behind the risk, and generates a shareable preparedness plan. The ResQLink Mobile App unlocks alerts, offline resilience, and full incident reporting.

Product rules

Flood first. The golden path is flood forecasting and preparedness.

Storytelling hero, action starts at the map section.

Web is complete without install. App is an upgrade, not a requirement.

No outcome guarantees. Always show uncertainty, freshness, and limitations.

Landing page structure

Section 1 Hero

Purpose

Set the story and promise. Do not dump controls here.

UI

Headline and one sentence value

Primary CTA: Check my flood risk

Secondary link: Skip to demo

Behavior

Primary CTA scrolls to the flood map section and auto focuses the location input

Skip to demo does the same, but opens the location picker immediately

Section 2 Flood risk forecast map

Purpose

Visualize flood risk clearly.

UI

Location selector (search or pin)

Time horizon toggle (24h, 72h, 7d)

Map zoom and highlight

Risk band labels: Low, Moderate, High, Extreme

Confidence chip: High, Medium, Low

Data freshness row: Last updated

Legend and what this means microcopy

Optional

More details drawer for secondary layers (keep hidden by default)

Section 3 Explainable AI

Purpose

Help users understand contributing factors.

Primary action

Explain this risk

Panel content

Ranked drivers for the selected location

Rainfall forecast trend

River or coastline proximity

Terrain and elevation

Drainage and land cover proxy

Historical impact reports if available

What data was used (source types and freshness categories)

Confidence reason

Limitations

Section 4 Preparedness plan generator

Purpose

Provide clear, actionable preparedness information.

Primary action

Generate my plan

Plan output

Checklist: Before, During, After

Triggers to act tied to risk bands

Evac route overlay: primary and fallback

Go bag essentials

Local info slots: contacts and nearest center

Actions

Share plan

Save as PDF

Section 5 Response tools preview

Purpose

Show how AI supports response once incidents happen, without stealing focus from flood forecasting.

Micro demo only

3 step triage simulation

Report submission

AI summarization

Smart priority ranking with why this rank drawer

Rule

Keep it short and clearly labeled as a simulation on web

Section 6 Multi hazard preview

Purpose

Acknowledge PH multi hazard reality without diluting the case study.

UI

Hazard tabs or cards

Flood is active

Typhoon, Earthquake, Landslide, Volcanic as preview with Coming next

Rule

The golden path stays Flood

Section 7 Platforms preview

Purpose

Show stakeholder coverage without building full dashboards.

Cards

Citizen

Rescuer

LGU

Each opens a modal

3 screens max

3 bullets max

Section 8 App upgrade CTA

Trigger

Appears only after a plan is generated.

Primary

Get the ResQLink app

Inside the modal

Download APK

Send to my phone with QR and copy link

Install steps

Trust note about official source and verification

Locked feature rule

Every locked feature shows one reason: background alerts, offline storage, device sensors, Bluetooth

Footer trust

Data sources placeholder list

Privacy short line

Not a guarantee disclaimer

Feature mapping

Web must deliver fully

Flood risk visualization

Contributing factors explanation

Preparedness plan artifact

Share link and PDF export

Web can demo as simulation

AI triage process (report to summary to ranking)

App unlocks full response features

Instant SOS reporting with GPS and photo

Push alerts and quiet hours

Offline cached plans

BLE mesh resilience

Matching and self assign workflows

Multi agency tools and resource allocation

Prototype interactions

Golden path, 60 second judge run

1 Set location 2 View flood risk band with confidence and freshness 3 Open explain panel and read top drivers 4 Generate plan and see checklist, triggers, routes 5 Share or save plan 6 See app upgrade strip and open download modal

Required states

Loading skeleton for map and plan

Location permission denied with manual search fallback

No data coverage fallback and generic plan option

Fetch error with retry

Low confidence with reason

Stale data warning

Copy rules

Replace promises like saves lives with support language like helps coordinate and helps prioritize

Every number must be cited in resources.txt

Every output must be labeled as an estimate when applicable

Design rules

One grid system across sections

One primary CTA per section

Map and plan are the two hero modules

Risk never relies on color alone, always include labels

Components must have hover, pressed, loading, empty, error states

QA checklist tied to requirements and rubric

Case study requirements

Flood risk visualization present and clear

Contributing factors explained in a ranked panel

Preparedness output is actionable and shareable

AI or ML value is demonstrated through changing outputs and explanations

Rubric alignment

Relevance stays high because the main path is flood first

Information accuracy protected by uncertainty, freshness, limitations, and no guarantees

UI and UX stays strong with a single golden path and complete states

Creativity and originality come from explainability, governance, and plan artifact output

Presentation clarity: one minute demo path, no dashboard clutter

Disqualification risk controls

Track every external asset and cite it in resources.txt

Add an AI disclosure line in resources.txt

Avoid copycat layouts and do not lift proprietary visuals

Figma build plan

1 Desktop landing page frame and mobile frame 2 Components first: buttons, chips, tooltip, drawer, modal, card, checklist, legend 3 Build sections in order: map, explain panel, plan output 4 Add response tools micro demo and platform previews 5 Add app modal and locked feature tooltips 6 Prototype golden path and edge states