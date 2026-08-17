/**
 * Air / Land / Sea domain + platform copy — externalized (D-015).
 * Owner decision 2026-08-17 (D-022): platforms are described by MISSION
 * PROFILE only; public designations are [NEEDS INPUT] and logged in
 * content/legacy/CONTENT-GAPS.md. Public pages carry mission profiles and
 * architecture only — no specifications, figures or integration detail.
 * Mission sequences are representative scenarios, labelled as such.
 */

export type MissionStep = { t: string; text: string };
export type MissionSequenceDef = { name: string; steps: MissionStep[] };

export type PlatformDef = {
  slug: string;
  profileName: string;
  oneLiner: string;
  mission: string[];
  roles: string[];
  atlasNote: string;
};

export type DomainDef = {
  id: "air" | "land" | "sea";
  index: string;
  label: string;
  positioning: string;
  heroId: string;
  lede: string;
  problem: { title: string; body: string[] };
  atlas: { title: string; body: string };
  platforms: PlatformDef[];
  sequences: MissionSequenceDef[];
};

export const domainDefs: DomainDef[] = [
  {
    id: "air",
    index: "01",
    label: "Air",
    positioning: "Persistence and reach.",
    heroId: "air-domain-hero",
    lede: "The air domain is where scale pays: many inexpensive airframes, flown as one system, watching more sky than any crewed alternative could afford to.",
    problem: {
      title: "The sky rewards persistence and punishes everything else.",
      body: [
        "Weather moves faster than tasking. Wind rewrites endurance mid-flight. Airspace is shared, regulated and increasingly contested — and a single aircraft, however capable, is a single point of failure with a fuel clock.",
        "The engineering answer is not a bigger aircraft. It is many aircraft that behave as one: coverage that survives the loss of any airframe, hands the task between platforms as conditions change, and keeps flying its intent when the link home thins.",
      ],
    },
    atlas: {
      title: "One operator. Many aircraft. One intent.",
      body: "Under ATLAS, an air group is one node tree: intent enters once, decomposes across airframes, and reports come back compressed. Aircraft join, leave and fail without renegotiating the mission — the formation is the platform.",
    },
    platforms: [
      {
        slug: "collaborative-aircraft",
        profileName: "Collaborative Aircraft",
        oneLiner: "Small airframes that fly as one system — coverage, search and relay at scale.",
        mission: [
          "The collaborative profile trades exquisite platforms for numbers that cooperate: airframes cheap enough to field in quantity, coordinated tightly enough to behave as a single instrument. Coverage is a property of the group, not of any aircraft in it.",
          "Typical work is search and rescue sweeps, wide-area sensing and communications relay — missions where area, persistence and graceful degradation matter more than any single platform's performance.",
        ],
        roles: ["SEARCH & RESCUE", "WIDE-AREA SENSING", "COMMUNICATIONS RELAY"],
        atlasNote: "Each airframe is an edge node; the group is the deliverable.",
      },
      {
        slug: "interceptor",
        profileName: "Interceptor",
        oneLiner: "Airspace protection against unauthorized uncrewed aircraft.",
        mission: [
          "Inexpensive uncrewed aircraft have made protected airspace contestable — over critical infrastructure, public events and sensitive sites. The interceptor profile exists to keep that airspace protected: persistent readiness and rapid response to violations, integrated into one air picture.",
          "Detection, tracking and response operate as a single system under ATLAS, and the decision to act is never the machine's: response authority routes through a named human operator and is recorded end to end.",
        ],
        roles: ["AIRSPACE PROTECTION", "CRITICAL-SITE OVERWATCH", "EVENT SECURITY"],
        atlasNote: "Human authority over consequential decisions is architecture here, not policy.",
      },
      {
        slug: "long-endurance-surveillance",
        profileName: "Long-Endurance Surveillance",
        oneLiner: "Persistent watch over wide areas, borders and approaches.",
        mission: [
          "Some problems are solved by staying: maritime approaches, long borders, remote infrastructure. The long-endurance profile keeps sensors on station for extended periods, cycling platforms so the watch itself never lands.",
          "Its product is continuity — a picture that does not blink, feeding the same mesh every other SkyShield system reads.",
        ],
        roles: ["WIDE-AREA SURVEILLANCE", "BORDER & APPROACHES", "INFRASTRUCTURE PATROL"],
        atlasNote:
          "Persistence comes from rotation logic in the stack, not heroics in the airframe.",
      },
    ],
    sequences: [
      {
        name: "Search and rescue — representative sequence",
        steps: [
          {
            t: "T+00:00",
            text: "Alert received. Operator authorizes a search intent: area, priorities, constraints.",
          },
          {
            t: "T+00:04",
            text: "The group launches and self-allocates search sectors from its own capabilities.",
          },
          {
            t: "T+01:12",
            text: "A candidate detection is reported upward, compressed; a second airframe re-tasks to confirm.",
          },
          {
            t: "T+01:31",
            text: "Confirmed find. Position relayed to responders; the group holds overwatch and relay until released.",
          },
        ],
      },
      {
        name: "Infrastructure patrol — representative sequence",
        steps: [
          {
            t: "T+00:00",
            text: "Standing patrol intent: corridor, cadence, reporting thresholds.",
          },
          {
            t: "T+02:40",
            text: "An anomaly along the corridor is flagged and cross-checked by a second sensor pass.",
          },
          {
            t: "T+02:47",
            text: "The report reaches the operator with imagery and location — a decision, not a data dump.",
          },
          {
            t: "T+03:05",
            text: "Patrol resumes cadence. The anomaly enters the audit record with its full chain.",
          },
        ],
      },
      {
        name: "Airspace violation — representative sequence",
        steps: [
          {
            t: "T+00:00",
            text: "Unauthorized aircraft detected entering protected airspace; track established and shared on the mesh.",
          },
          {
            t: "T+00:01",
            text: "Interceptor readiness confirmed. The picture — not a decision — is forwarded to the operator.",
          },
          {
            t: "T+00:02",
            text: "A named human authorizes response within defined bounds; the authorization is logged end to end.",
          },
          {
            t: "T+00:06",
            text: "Airspace restored. Every step of the chain is replayable from the audit record.",
          },
        ],
      },
    ],
  },
  {
    id: "land",
    index: "02",
    label: "Land",
    positioning: "Terrain, endurance, presence.",
    heroId: "land-domain-hero",
    lede: "The land domain is where autonomy earns its keep in dust and distance: vehicles that carry, scout and coordinate across terrain that punishes everything mechanical — developed and proven in Morocco.",
    problem: {
      title: "Terrain is an adversary that never gets tired.",
      body: [
        "Ground is the hardest domain to move through: slopes that lie to path planners, dust that blinds sensors, valleys that swallow radio. Every kilometre is contested by physics before anyone else gets a vote.",
        "And the missions that matter most — resupply, reconnaissance, keeping a command post moving — are exactly the ones that expose people the longest. The case for ground autonomy is not efficiency. It is that presence should not require exposure.",
      ],
    },
    atlas: {
      title: "The coordination tier travels with the fleet.",
      body: "On land, ATLAS puts the coordination tier on wheels: vehicles launch, recover and re-home to a command element that moves with them. The tree does not care where its nodes are parked — displacement is a manoeuvre, not an outage.",
    },
    platforms: [
      {
        slug: "logistics",
        profileName: "Logistics",
        oneLiner: "Autonomous resupply across terrain that exposes people the longest.",
        mission: [
          "Resupply is the most repetitive, most exposed work on the ground. The logistics profile moves material across contested distance without a person in the cab — planned around traversability, executed with graceful reversion when the route disagrees with the map.",
          "Vehicles run in convoy or alone, hand tasks between each other, and keep moving their intent through communication shadows.",
        ],
        roles: ["RESUPPLY", "CONVOY OPERATIONS", "LAST-KILOMETRE DELIVERY"],
        atlasNote: "A convoy is a node tree at walking pace — same contracts, heavier payload.",
      },
      {
        slug: "reconnaissance",
        profileName: "Reconnaissance",
        oneLiner: "Forward eyes that report before anyone is exposed.",
        mission: [
          "The reconnaissance profile goes first: route assessment, forward observation, sensor picket. Its job is to convert unknown ground into a picture someone can plan against — without spending anyone's safety to get it.",
          "Reports come back compressed and prioritized; what the vehicle saw is on the mesh before it finishes seeing it.",
        ],
        roles: ["ROUTE ASSESSMENT", "FORWARD OBSERVATION", "SENSOR PICKET"],
        atlasNote:
          "Awareness spreads laterally — a scout's picture belongs to everyone on the mesh.",
      },
      {
        slug: "mobile-command",
        profileName: "Mobile Command",
        oneLiner: "The coordination tier, on the move.",
        mission: [
          "The mobile command profile carries coordination into the field: a vehicle the rest of the fleet launches from, recovers to and re-homes on while it displaces. Command is a position that moves, not a building that waits.",
          "When it relocates, the fleet's missions continue uninterrupted — rejoin and reconciliation are architecture, not procedure.",
        ],
        roles: ["FLEET COORDINATION", "LAUNCH & RECOVERY", "DISPLACING COMMAND"],
        atlasNote: "The forward node is a vehicle; the tree re-roots without stopping.",
      },
    ],
    sequences: [
      {
        name: "Resupply through a communications shadow — representative sequence",
        steps: [
          {
            t: "T+00:00",
            text: "Resupply intent issued: destination, cargo priority, route constraints.",
          },
          {
            t: "T+00:35",
            text: "Convoy enters a valley; the link home drops. Nothing pauses — intent bounds keep executing.",
          },
          {
            t: "T+01:10",
            text: "Contact restored on the far side. State reconciles; reports catch up in one compressed burst.",
          },
          {
            t: "T+01:42",
            text: "Delivery confirmed. The whole gap is replayable from the audit log.",
          },
        ],
      },
      {
        name: "Wide-area reconnaissance — representative sequence",
        steps: [
          {
            t: "T+00:00",
            text: "Area assessment intent decomposes into sectors across three vehicles.",
          },
          {
            t: "T+00:58",
            text: "An impassable washout is mapped and shared; sibling vehicles reroute around it immediately.",
          },
          {
            t: "T+02:20",
            text: "Sector reports merge into one terrain picture with flagged observations.",
          },
          {
            t: "T+02:26",
            text: "The operator receives the picture and a recommendation queue — decisions, not raw feeds.",
          },
        ],
      },
      {
        name: "Command displacement — representative sequence",
        steps: [
          {
            t: "T+00:00",
            text: "The command element begins displacing to a new position; fleet missions continue.",
          },
          {
            t: "T+00:12",
            text: "Vehicles re-home navigation and recovery references to the moving element.",
          },
          {
            t: "T+00:40",
            text: "New position established. Rejoins reconcile automatically; no mission restarted.",
          },
          {
            t: "T+00:41",
            text: "The displacement exists in the record as one manoeuvre — not an outage.",
          },
        ],
      },
    ],
  },
  {
    id: "sea",
    index: "03",
    label: "Sea",
    positioning: "The domain nobody watches.",
    heroId: "sea-domain-hero",
    lede: "Most of the planet is ocean and almost none of it is observed. The sea domain exists because presence there has always been priced for navies — and autonomy reprices it.",
    problem: {
      title: "The ocean is too big for crews and too important to ignore.",
      body: [
        "Coastlines, exclusive economic zones and approaches are watched in samples: a patrol here, a satellite pass there, and long silences in between. What happens in the silences is the problem — and crewed persistence at sea is one of the most expensive things a state can buy.",
        "Below the surface it gets harder still: radio dies within metres of the waterline, so a subsurface platform is autonomous or it is useless. The sea does not permit remote control. It demands systems that decide for themselves inside the intent they were given.",
      ],
    },
    atlas: {
      title: "Autonomy is not a feature at sea. It is admission.",
      body: "The sea is ATLAS's strongest argument: surface vessels hold the watch and the link, subsurface platforms work beneath it in near-silence, and both reconcile into one picture when they meet. The architecture's tolerance for disconnection isn't stressed here — it's assumed.",
    },
    platforms: [
      {
        slug: "surface-vessel",
        profileName: "Surface Vessel",
        oneLiner: "Persistent maritime awareness without a crew to rotate.",
        mission: [
          "The surface profile keeps station where crews cannot affordably stay: coastal waters, approaches, zones that deserve a permanent watch and have never had one. Sea state, drift and traffic are operating conditions, not exceptions.",
          "It holds the surface picture, relays for what works below, and feeds the same mesh as every other SkyShield node.",
        ],
        roles: ["COASTAL PATROL", "EEZ AWARENESS", "SURFACE PICTURE & RELAY"],
        atlasNote: "The vessel is also infrastructure — the mesh's anchor point at sea.",
      },
      {
        slug: "subsurface-vessel",
        profileName: "Subsurface Vessel",
        oneLiner: "Survey and monitoring where communication barely exists.",
        mission: [
          "Underwater, the link is measured in metres and minutes. The subsurface profile is built for that truth: it takes an intent down with it, executes inside its bounds, and reconciles its findings when it surfaces or meets a relay.",
          "Survey, environmental monitoring and infrastructure inspection are its work — the patient, unwatched missions the ocean has always hidden.",
        ],
        roles: ["SUBSEA SURVEY", "ENVIRONMENTAL MONITORING", "INFRASTRUCTURE INSPECTION"],
        atlasNote: "The degraded-operation state machine is this platform's normal day.",
      },
    ],
    sequences: [
      {
        name: "Zone patrol — representative sequence",
        steps: [
          { t: "T+00:00", text: "Patrol intent: zone, cadence, contact-reporting thresholds." },
          {
            t: "T+04:30",
            text: "An unidentified contact crosses the zone; track established and shared.",
          },
          {
            t: "T+04:36",
            text: "The operator sees a track with history and context, not a radar blip.",
          },
          { t: "T+09:00", text: "Watch continues. The vessel's persistence is the deliverable." },
        ],
      },
      {
        name: "Subsurface survey under comms denial — representative sequence",
        steps: [
          {
            t: "T+00:00",
            text: "Survey intent loaded; the platform submerges and the link closes behind it.",
          },
          {
            t: "T+03:15",
            text: "Survey lines execute autonomously; anomalies queue for report, prioritized.",
          },
          {
            t: "T+06:40",
            text: "Rendezvous with the surface vessel; findings reconcile in one exchange.",
          },
          {
            t: "T+06:45",
            text: "The operator reads hours of unwatched work as one ordered report.",
          },
        ],
      },
      {
        name: "Approach watch — representative sequence",
        steps: [
          {
            t: "T+00:00",
            text: "Standing watch over a port approach: persistent presence, defined thresholds.",
          },
          { t: "T+18:00", text: "Shift change for humans; nothing changes on the water." },
          {
            t: "T+31:20",
            text: "A pattern anomaly across several tracks is flagged from the mesh's memory.",
          },
          {
            t: "T+31:25",
            text: "The picture, with history, reaches the operator ashore. The watch never blinked.",
          },
        ],
      },
    ],
  },
];

export const platformCta = {
  note: "Public pages describe mission profiles and architecture only. Platform designations, public-releasable specifications and integration detail move through the verified contact path.",
  primary: { label: "Verified technical request", href: "/contact" },
};
