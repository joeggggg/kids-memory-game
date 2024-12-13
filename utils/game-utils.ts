export const emojiLibrary = [
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
  "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
  "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩",
  "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣",
  "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬",
  "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗",
  "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯",
  "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐",
  "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈",
  "👶", "👧", "🧒", "👦", "👩", "🧑", "👨", "👵", "🧓", "👴",
  "👮", "🕵️", "👷", "👸", "🤴", "🦸", "🦹", "🧙", "🧚", "🧛",
  "🐵", "🐒", "🦍", "🦧", "🐶", "🐕", "🦴", "🐺", "🦊", "🦝",
  "🐱", "🐈", "🦁", "🐯", "🐅", "🐆", "🐴", "🐎", "🦄", "🦓",
  "🦌", "🐮", "🐂", "🧞‍♂️", "🐄", "🐷", "🐖", "🐗", "🐽", "🐏",
  "🐑", "🐐", "🐪", "🐫", "🦙", "🦒", "🐘", "🦏", "🦛", "🐭",
  "🐁", "🐀", "🐹", "🐰", "🐇", "🐿️", "🦔", "🦇", "🐻", "🐨",
  "🐼", "🦥", "🦦", "🦨", "🦘", "🦡", "🐾", "🦃", "🐔", "🐓",
  "🐣", "🐤", "🐥", "🐦", "🐧", "🕊️", "🦅", "🦆", "🦢", "🦉",
  "🦩", "🦚", "🦜", "🐸", "🐊", "🐢", "🦎", "🐍", "🐲", "🐉",
  "🦕", "🦖", "🐳", "🐋", "🐬", "🐟", "🐠", "🐡", "🦈", "🐙",
  "🐟", "🕊️", "🐶", "🦍", "❤️", "😶‍🌫️", "👹", "💀", "🐲", "🐔", 
  "🫏", "🫎", "🦧", "🦮", "🦬", "🦏", "🦛", "🐄", "🐖", "🐏", 
  "🐈‍⬛", "🐐", "🐇", "🐿️", "🦣", "🐀", "🐘", "🐊", "🦎", "🦖", 
  "🦭", "🦃", "🦀", "🪼", "🐧", "🦉", "🪱", "🪳", "🦋", "🐌", 
  "🪰", "🪲", "🦠", "👩‍🏫", "👰‍♀️", "🧚‍♀️", "🧚‍♀️", "🧚‍♂️", "🪂", "⛵", 
  "🚤", "🎆", "🎃", "🎄", "🧧"
]

export type Difficulty = {
  name: string;
  gridSize: [number, number];
  pairs: number;
}

export const difficulties: Difficulty[] = [
  { name: "Easy", gridSize: [3, 4], pairs: 6 },
  { name: "Medium", gridSize: [4, 4], pairs: 8 },
  { name: "Hard", gridSize: [4, 5], pairs: 10 },
  { name: "Expert", gridSize: [5, 6], pairs: 15 },
]

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export function generateGameBoard(difficulty: Difficulty): string[] {
  const shuffledEmojis = shuffleArray(emojiLibrary)
  const selectedEmojis = shuffledEmojis.slice(0, difficulty.pairs)
  return shuffleArray([...selectedEmojis, ...selectedEmojis])
}

