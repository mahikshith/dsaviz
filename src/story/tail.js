
// Dot, the Start here companion (src/start/engine.js): new to coding, so she asks what a beginner would ask.
STORY_CAST.dot = { name: 'Dot', initial: 'D', color: 'accent', radius: '999px' };
// Bolt, the Start here robot who does exactly what it is told.
STORY_CAST.bolt = { name: 'Bolt', initial: 'B', color: 'right', radius: '8px' };
const SCENE_LIST = [lanternScene(), mirrorScene(), waterScene(), facesScene(), paintScene(), stockScene(), coatScene(), guestScene(), scrabbleScene(), ...SCENE_REGISTRY.map((make) => make())];
const SCENES = {};
SCENE_LIST.forEach((sc) => { SCENES[sc.id] = sc; });
const SCENE_ORDER = SCENE_LIST.map((sc) => sc.id);
// Per-pattern kit: which quiz answer is right, and the question the "Why this pattern" fold asks.
const KIT = {
  'Two Pointers': { right: 1, spot: 'Why two friends, not one?', ask: 'How should Lumi and Roo search?' },
  'Sliding Window': { right: 2, spot: 'Why a window, not every stretch?', ask: 'How should Wren search?' },
  'Hash Map': { right: 3, spot: 'Why a notebook, not a second loop?', ask: 'How should Cleo search?' },
  ...PATTERN_KITS
};
const QUIZ = [['Check every pair', 'Try each one with every other'], ['Two friends from both ends', 'One at each end, walking inward'], ['A sliding window', 'A frame glides along neighbours'], ['A notebook of everything seen', 'Write down every value you pass']];
