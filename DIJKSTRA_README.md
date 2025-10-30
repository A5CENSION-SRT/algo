# Dijkstra's Algorithm Visualization with Re:Zero Theme

## Overview

This implementation creates an interactive 3D visualization of Dijkstra's shortest path algorithm with a Re:Zero anime theme. Subaru (the character) navigates through a graph network while the algorithm finds the optimal path.

## Features

### 🎵 Audio System
- **Background Music**: Plays "Animation Musicals Network.mp3" during normal gameplay
- **Death Sound**: Plays "ReZero Return By Death Sound Effect.mp3" when Subaru loses all lives
- **Seamless Integration**: Music pauses during death sequences and resumes after reset

### 🎮 Game Mechanics
- **Lives System**: Subaru starts with 3 lives (❤️❤️❤️)
- **Death & Respawn**: When lives reach 0, triggers "Return by Death" with sound effect
- **Automatic Reset**: After death sound plays, the timeline resets

### 🔷 Dijkstra Visualization

#### Graph Structure
The algorithm visualizes a 7-node weighted graph:
- **Node A** (Start): Green - Distance 0
- **Node B**: Blue - Connected to A, C, D
- **Node C**: Blue - Central hub
- **Node D**: Blue - Alternative path
- **Node E**: Blue - Near target
- **Node F**: Blue - Lower route
- **Node G** (Target): Red - Final destination

#### Visual Indicators
- **Current Node**: Cyan color with pulsing animation
- **Visited Nodes**: Orange color
- **Unvisited Nodes**: Blue color
- **Start Node**: Green
- **Target Node**: Red
- **Edge Weights**: White numbers displayed on connections
- **Visited Paths**: Green highlighted edges

#### Algorithm Flow
1. Starts at Node A with distance 0
2. Explores neighbors and updates distances
3. Always selects unvisited node with minimum distance
4. Marks nodes as visited (orange)
5. Continues until reaching target Node G
6. Updates every 2 seconds for clear visualization

### 🏃 Character Movement
- **Animated Movement**: Subaru moves smoothly between nodes
- **Running Animation**: Legs and arms swing realistically
- **Direction Facing**: Character rotates to face movement direction
- **Bob Motion**: Natural up-down motion while running

### 🎨 Visual Design

#### Node Appearance
- Spherical 3D nodes
- Node ID labels (A-G)
- Distance values displayed below nodes
- Emissive materials for glow effects

#### Scene Elements
- **Grid Floor**: 30x30 grid for spatial reference
- **Directional Lighting**: Creates realistic shadows
- **Point Lights**: Colored accent lighting (cyan, pink, blue)
- **Fog Effect**: Atmospheric depth
- **Shadows**: Real-time shadow casting

### 🎛️ Controls
- **Orbit Camera**: Mouse drag to rotate view
- **Zoom**: Mouse wheel to zoom in/out
- **Pan**: Middle mouse button (disabled for focused view)
- **Mode Toggle**: Switch between Infinite Run and Dijkstra modes

## File Structure

```
src/
├── components/
│   ├── DijkstraVisualization.tsx    # Core algorithm visualization
│   ├── DijkstraScene.tsx            # Main scene with audio & lives
│   ├── CharacterWithMovement.tsx    # Animated character with pathfinding
│   ├── AudioManager.tsx             # Background music & death sound
│   ├── HUDOverlay.tsx              # Top UI with algorithm info
│   └── StartScreen.tsx             # Initial Re:Zero themed screen
├── app/
│   └── experience/
│       └── page.tsx                # Main experience page
public/
└── Sounds/
    ├── Animation Musicals Network.mp3
    └── ReZero Return By Death Sound Effect - Indigo Montoya.mp3
```

## How It Works

### Algorithm Implementation

```typescript
// Dijkstra's core logic
1. Initialize all nodes with distance = Infinity (except start = 0)
2. While unvisited nodes exist:
   a. Select node with minimum distance
   b. Mark as visited
   c. For each neighbor:
      - Calculate new distance = current.distance + edge.weight
      - If new distance < neighbor.distance:
        * Update neighbor.distance
3. Path is complete when target node is visited
```

### Audio Flow

```typescript
// Background Music
Start Experience → Play Animation Musicals Network.mp3 (loop)
                → Volume: 30%, Continuous

// Death Sequence
Lives = 0 → Pause Background Music
         → Play Return By Death Sound (volume: 70%)
         → Show "RETURN BY DEATH" overlay
         → On sound end → Reset game state
         → Resume background music
```

### Movement System

```typescript
// Character navigation
1. Algorithm selects next node
2. Character calculates direction vector
3. Moves at 0.05 units/frame toward target
4. Rotates to face direction
5. Plays running animation
6. On arrival → Trigger node reached callback
```

## Customization

### Modify Graph Structure
Edit `DijkstraVisualization.tsx`:
```typescript
const initialNodes: Node[] = [
  { id: 'A', position: [-6, 0, -5], distance: 0, ... },
  // Add more nodes
];

const initialEdges: Edge[] = [
  { from: 'A', to: 'B', weight: 4 },
  // Add more edges
];
```

### Adjust Animation Speed
```typescript
// In DijkstraVisualization.tsx
const interval = setInterval(() => {
  // Algorithm step
}, 2000); // Change this value (milliseconds)

// In CharacterWithMovement.tsx
const moveSpeed = 0.05; // Adjust movement speed
```

### Change Lives
```typescript
// In DijkstraScene.tsx
const [lives, setLives] = useState(3); // Change starting lives
```

## Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000/experience
```

## Technologies Used
- **Next.js 16**: React framework
- **Three.js**: 3D rendering
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers (Text, Camera, Controls)
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Styling

## Future Enhancements
- [ ] Multiple graph configurations
- [ ] User-selectable start/end nodes
- [ ] Step-by-step manual control
- [ ] Path highlighting animation
- [ ] Alternative algorithms (A*, BFS, DFS)
- [ ] Graph editor mode
- [ ] Performance metrics display
- [ ] Sound effect variations
- [ ] Difficulty levels

## Re:Zero Theme Integration
The visualization draws inspiration from Re:Zero's "Return by Death" mechanic:
- Lives represent Subaru's attempts
- Death triggers timeline reset
- Sound effects enhance emotional impact
- Character design matches Subaru's appearance
- UI styling evokes anime aesthetic

---

**Note**: Make sure audio files are properly placed in `public/Sounds/` directory for the sound system to work correctly.
