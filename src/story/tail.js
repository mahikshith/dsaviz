
const SCENE_LIST = [lanternScene(), mirrorScene(), waterScene(), facesScene(), paintScene(), stockScene(), coatScene(), guestScene(), scrabbleScene(), ...SCENE_REGISTRY.map((make) => make())];
const SCENES = {};
SCENE_LIST.forEach((sc) => { SCENES[sc.id] = sc; });
const SCENE_ORDER = SCENE_LIST.map((sc) => sc.id);
// Per-pattern kit: which quiz answer is right, and the question the "Why this pattern" fold asks.
const KIT = {
  'Two Pointers': { right: 1, spot: 'Why two friends, not one?', ask: 'How should the two markers search?' },
  'Sliding Window': { right: 2, spot: 'Why a window, not every stretch?', ask: 'How should the window-keeper search?' },
  'Hash Map': { right: 3, spot: 'Why a notebook, not a second loop?', ask: 'How should the shopkeeper search?' },
  ...PATTERN_KITS
};
const QUIZ = [['Check every pair', 'Try each one with every other'], ['Two friends from both ends', 'One at each end, walking inward'], ['A sliding window', 'A frame glides along neighbours'], ['A notebook of everything seen', 'Write down every value you pass']];
