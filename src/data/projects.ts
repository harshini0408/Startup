import type { Project } from '@/types'
import imgKairos from '@/assets/showcase/kairos.jpg'
import imgAether from '@/assets/showcase/aether.jpg'
import imgVerve from '@/assets/showcase/verve.jpg'
import imgOrbit from '@/assets/showcase/orbit.jpg'

export const projects: Project[] = [
  {
    id: 'kairos',
    slug: 'kairos-fleet',
    title: 'Kairos Autonomous Fleet',
    client: 'Logos Intelligence [Studio Prototype]',
    category: 'Autonomous Dispatch Engine',
    tags: ['React', 'TypeScript', 'FastAPI', 'Vector Routing', 'PostgreSQL'],
    year: '2025',
    oneLineOutcome: 'Sub-100ms telemetry synchronization and zero unhandled dispatches across 2,400+ simulated multi-modal freight corridors.',
    industry: 'Autonomous Logistics & Fleet Transit',
    description: 'A real-time telemetry cockpit and predictive dispatch orchestrator engineered for complex multi-modal transit networks.',
    coverImage: imgKairos,
    featured: true,
    workType: 'STUDIO PROTOTYPE',
    nextSlug: 'spatial-architect',
    context:
      'Multi-modal logistics operators manage complex cross-border corridors across rail, short-sea, and trucking. In traditional transit hubs, operational tracking relied on disconnected batch scripts and scheduled SQL cron jobs run every 30 to 45 minutes.',
    problem:
      'When rail bottlenecks, border customs holds, or inclement weather disrupted a primary corridor, dispatchers operated completely blind for up to 45 minutes. By the time alerts were recognized, delayed cargo had already triggered cascading warehouse congestion and multi-million dollar SLA default penalties.',
    approach:
      'We discarded monolithic batch polling in favor of an event-driven actor model. Every physical asset (truck, container, rail chassis), transit waypoint, and geofence boundary is modeled as an active streaming entity that evaluates its own trajectory locally and publishes high-frequency telemetry events to an asynchronous message broker.',
    experience:
      'We designed an ultra-dark glassmorphic cockpit that maximizes legibility in high-stress operational environments. Crucial telemetry—such as corridor velocities, delay hazards, and automated rerouting suggestions—is color-coded with subtle amber and sand highlights. Operators can seamlessly scrub through historical timestamps or click any cluster to inspect vehicle-level telemetries without leaving the primary spatial map.',
    engineering:
      'The frontend is built with React 19, custom WebGL canvas layers for smooth 60 FPS vector map rendering, and strict TypeScript types. The backend is orchestrated in Python FastAPI with async asyncpg connections to a PostgreSQL database with PostGIS extensions. A Redis pub/sub layer pushes real-time WebSocket diffs to connected clients with sub-100ms latency.',
    keyFeatures: [
      {
        title: 'Reactive Corridor Rebalancing',
        desc: 'Autonomous algorithm that evaluates traffic telemetry and recalculates optimal route alternatives in under 200ms.',
      },
      {
        title: 'Sub-100ms Telemetry Sync',
        desc: 'Websocket streaming architecture pushing state changes across 2,400+ concurrent simulated units with zero thread blocking.',
      },
      {
        title: 'Geofence Breach Interception',
        desc: 'Automated corridor deviation alerts triggering instant operator review and SMS fallback dispatch.',
      },
      {
        title: 'Offline-Tolerant State Queue',
        desc: 'Local IndexedDB persistence buffering operator actions during intermittent connectivity and auto-reconciling on reconnect.',
      },
    ],
    result:
      'Delivered a fully validated production architecture demonstrating deterministic real-time telemetry synchronization, zero unhandled dispatch conflicts during synthetic peak-load simulations, and a unified operator cockpit ready for enterprise containerized deployment on AWS ECS.',
  },
  {
    id: 'aether',
    slug: 'spatial-architect',
    title: 'Spatial Architect',
    client: 'Aether Labs [Studio Exploration]',
    category: 'Real-Time Spatial Analytics',
    tags: ['WebGL', 'TypeScript', 'Python', 'Geospatial GIS', 'Redis'],
    year: '2025',
    oneLineOutcome: 'Smooth 60 FPS GPU-accelerated rendering over 14,000+ streaming urban sensor points with 12ms ingestion latency.',
    industry: 'Smart City Infrastructure & Spatial Computing',
    description: 'A 3D geospatial telemetry platform rendering complex urban sensor topologies with high frame rate fidelity.',
    coverImage: imgAether,
    featured: true,
    workType: 'STUDIO EXPLORATION',
    nextSlug: 'stratum-journal',
    context:
      'Municipal planning agencies and urban infrastructure operators collect millions of streaming telemetry packets per second from traffic cameras, environmental air quality sensors, building HVAC monitors, and power grids.',
    problem:
      'Existing GIS tools were built for static raster maps. Attempting to visualize high-density streaming sensor data in browser viewports caused severe main-thread lockups, frame rate collapses below 15 FPS, and fragmented operational context across disconnected tabs.',
    approach:
      'We treated the urban environment as an interactive 3D spatial scene. Rather than rendering individual SVG or DOM elements for thousands of sensors, we built a custom WebGL instanced geometry pipeline that delegates position calculation and color ramps directly to GPU shaders.',
    experience:
      'An architectural dark carbon interface that combines technical wireframe building meshes with luminous amber telemetry heatmaps. Users can smoothly tilt, rotate, and zoom the city viewport from an expansive macro district view down to a single building floor plan without visual jitter or UI freezing.',
    engineering:
      'Engineered with TypeScript and WebGL 2.0 with custom vertex and fragment shaders. Sensor telemetries are ingested via a high-throughput Python telemetry worker and stored in an in-memory Redis time-series database. WebSocket binary protocols transfer packed buffer arrays directly into GPU memory buffers.',
    keyFeatures: [
      {
        title: 'Instanced GPU Shader Pipeline',
        desc: 'Renders 14,000+ real-time telemetry nodes and complex 3D building outlines at steady 60 FPS.',
      },
      {
        title: 'Temporal Timeline Scrubber',
        desc: 'Allows planners to scrub back 72 hours of urban telemetry with instant frame-accurate playback.',
      },
      {
        title: 'Multi-Sensor Correlation View',
        desc: 'Overlay air quality indices, vehicle congestion, and power grid draw on a single synchronized canvas.',
      },
      {
        title: 'Sub-15ms Ingestion Latency',
        desc: 'Optimized binary message packing ensuring live sensor events reflect on screen within milliseconds.',
      },
    ],
    result:
      'Engineered a high-performance spatial intelligence prototype that eliminated browser memory crashes and proved that browser-based WebGL applications can handle municipal-scale streaming data with fluid, game-engine quality fidelity.',
  },
  {
    id: 'verve',
    slug: 'stratum-journal',
    title: 'Stratum Editorial & Objects',
    client: 'Stratum Studio [Product Exploration]',
    category: 'Editorial Commerce Platform',
    tags: ['Next.js', 'GSAP', 'Tailwind', 'Headless CMS', 'Stripe'],
    year: '2025',
    oneLineOutcome: 'High-craft editorial publication integrated seamlessly with contextual physical object commerce and sub-second page loads.',
    industry: 'Luxury Architecture, Design & Publishing',
    description: 'An architectural digital publication and commerce experience where editorial storytelling directly drives contextual object acquisition.',
    coverImage: imgVerve,
    featured: true,
    workType: 'PRODUCT EXPLORATION',
    nextSlug: 'axion-core',
    context:
      'Luxury design studios and high-end architectural publications struggle to monetize digital readers. Traditional solutions graft generic Shopify storefronts onto WordPress blogs, completely fracturing the refined aesthetic and driving high bounce rates.',
    problem:
      'Jarring layout shifts, generic shopping cart slide-overs, clunky page reloads, and template clutter completely destroy the sense of luxury exclusivity that high-end readers expect.',
    approach:
      'We engineered a unified architectural canvas where longform publication essays and tactile physical objects inhabit the exact same spatial grid. Readers can explore an architectural monograph on Finnish dwellings, inspect custom furniture pieces within the editorial layout, and acquire limited pieces without losing their reading progress.',
    experience:
      'Harmonious typographic pacing combining large editorial serifs, high-contrast imagery, smooth curtain clip reveals, and a persistent spatial drawer. Subtle magnetic interactions on buttons and bespoke cursor badges elevate the feeling of tactile craftsmanship.',
    engineering:
      'Built with Next.js utilizing React Server Components and edge caching for sub-300ms initial loads worldwide. Motion is orchestrated via GSAP and Lenis smooth momentum scrolling. Commerce inventory and checkout flows are securely powered by headless Stripe APIs and a custom headless CMS schema.',
    keyFeatures: [
      {
        title: 'Fluid Editorial Typography Scaling',
        desc: 'Bespoke CSS clamp algorithms that preserve strict typographic proportions across every viewport from 375px to 4K displays.',
      },
      {
        title: 'In-Context Object Drawer',
        desc: 'Allows readers to inspect material provenance, dimensions, and craftsmanship without navigating away from the article.',
      },
      {
        title: 'Sub-300ms Edge Performance',
        desc: 'Static generation and edge asset optimization yielding a perfect 100/100 Lighthouse performance rating.',
      },
      {
        title: 'Curtain Mask Image Transitions',
        desc: 'Signature GSAP clip-path wipe choreography creating a cinematic magazine browsing feel.',
      },
    ],
    result:
      'Created an aspirational digital flagship that bridges the gap between high-fashion print publication art direction and seamless modern digital commerce.',
  },
  {
    id: 'orbit',
    slug: 'axion-core',
    title: 'Axion Agentic Core',
    client: 'Distributed Systems Group [Studio Prototype]',
    category: 'Agentic Workflow Orchestrator',
    tags: ['React', 'FastAPI', 'LangGraph', 'Docker', 'PostgreSQL'],
    year: '2025',
    oneLineOutcome: 'Complete deterministic observability and sub-second error rollback across 14 concurrent autonomous agent nodes.',
    industry: 'Autonomous AI Infrastructure & Workflow Orchestration',
    description: 'A visual directed acyclic graph (DAG) execution console providing granular state inspection for autonomous agent pipelines.',
    coverImage: imgOrbit,
    featured: true,
    workType: 'INTERNAL R&D',
    nextSlug: 'kairos-fleet',
    context:
      'As engineering teams deploy autonomous multi-agent pipelines for complex tasks—such as code generation, financial audit, and multi-step data extraction—the execution flow becomes increasingly non-deterministic.',
    problem:
      'Traditional logging tools cannot visualize non-linear LLM agent decisions. When an agent enters an infinite loop, hallucinates a broken tool parameter, or leaks tokens, developers have no real-time way to inspect intermediate memory states or intervene.',
    approach:
      'We designed an interactive execution console centered around a real-time directed acyclic graph (DAG). Every agent step, tool invocation, token stream, and memory mutation is rendered as an inspectable node with live status telemetry and human-in-the-loop pause points.',
    experience:
      'A mission-critical console aesthetic featuring dark slate surfaces, glowing status chips, monospace execution traces, and instant search across millions of streamed tokens. Engineers can pause execution mid-flight, edit the agent’s scratchpad memory, and resume execution with a single click.',
    engineering:
      'Frontend built in React with a custom SVG/canvas node-graph engine optimized for smooth panning and zooming. Backend implemented in Python FastAPI with LangGraph, managing state persistence in PostgreSQL with JSONB delta snapshots. Real-time token streaming is multiplexed through Server-Sent Events (SSE).',
    keyFeatures: [
      {
        title: 'Visual DAG Execution Canvas',
        desc: 'Interactive node graph displaying parallel agent branching, tool calls, and state convergence in real time.',
      },
      {
        title: 'Human-in-the-Loop Interception',
        desc: 'Allows human supervisors to inspect high-risk decisions (e.g., database writes) and approve or override before execution.',
      },
      {
        title: 'Memory State Snapshot History',
        desc: 'Full time-travel debugging enabling engineers to step backward to any prior decision node and inspect prompt context.',
      },
      {
        title: 'Real-Time Token Telemetry',
        desc: 'Live cost, latency, and context window utilization gauges updating with every token stream packet.',
      },
    ],
    result:
      'Shipped a production-ready agent observability prototype that transforms opaque AI black boxes into inspectable, deterministic, and auditable production software.',
  },
]
