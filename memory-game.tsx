"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { GlitchText } from "@/components/glitch-text"
import { difficulties, Difficulty, generateGameBoard } from "@/utils/game-utils"
import confetti from "canvas-confetti"

type Card = {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

export default function MemoryGame() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
  const [cards, setCards] = useState<Card[]>([])
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [lastMatchedPair, setLastMatchedPair] = useState<string | null>(null)

  const initializeGame = (selectedDifficulty: Difficulty) => {
    const emojis = generateGameBoard(selectedDifficulty)
    setCards(
      emojis.map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }))
    )
    setDifficulty(selectedDifficulty)
    setSelectedCards([])
    setMoves(0)
    setMatchedPairs(0)
    setLastMatchedPair(null)
  }

  const handleCardClick = (index: number) => {
    if (selectedCards.length >= 2) return
    if (cards[index].isMatched || selectedCards.includes(index)) return

    const newCards = [...cards]
    newCards[index].isFlipped = true
    setCards(newCards)
    setSelectedCards([...selectedCards, index])
  }

  useEffect(() => {
    if (selectedCards.length === 2) {
      setMoves((prev) => prev + 1)
      const [first, second] = selectedCards
      
      if (cards[first].emoji === cards[second].emoji) {
        setTimeout(() => {
          const newCards = [...cards]
          newCards[first].isMatched = true
          newCards[second].isMatched = true
          setCards(newCards)
          setMatchedPairs((prev) => {
            if (prev + 1 === difficulty!.pairs) {
              confetti({
                particleCount: 200,
                spread: 70,
                origin: { y: 0.6 }
              })
            }
            return prev + 1
          })
          setLastMatchedPair(cards[first].emoji)
          setSelectedCards([])
        }, 500)
      } else {
        setTimeout(() => {
          const newCards = [...cards]
          newCards[first].isFlipped = false
          newCards[second].isFlipped = false
          setCards(newCards)
          setSelectedCards([])
        }, 1000)
      }
    }
  }, [selectedCards, cards, difficulty])

  if (!difficulty) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <h1 className="mb-8 text-3xl font-bold">Choose Difficulty</h1>
        <div className="grid grid-cols-2 gap-4">
          {difficulties.map((diff) => (
            <Button
              key={diff.name}
              onClick={() => initializeGame(diff)}
              className="w-40 h-20 text-lg"
            >
              {diff.name}
              <span className="block text-sm mt-1">
                {diff.gridSize[0]}x{diff.gridSize[1]} ({diff.pairs} pairs)
              </span>
            </Button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-6 flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Match the pairs 🎮</h1>
        <div className="flex gap-4">
          <div className="rounded-lg bg-card px-3 py-1">
            <p className="text-sm font-medium">
              Pairs: {matchedPairs}/{difficulty.pairs}
            </p>
          </div>
          <div className="rounded-lg bg-card px-3 py-1">
            <p className="text-sm font-medium">Moves: {moves}</p>
          </div>
        </div>
      </div>

      {lastMatchedPair && (
        <div className="mb-4">
          <GlitchText>
            <span className="text-2xl">Matched: {lastMatchedPair}</span>
          </GlitchText>
        </div>
      )}

      <div
        className={`grid gap-2 sm:gap-4`}
        style={{
          gridTemplateColumns: `repeat(${difficulty.gridSize[1]}, minmax(0, 1fr))`,
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={card.id}
            className={`h-16 w-16 cursor-pointer transition-all duration-300 sm:h-24 sm:w-24
              ${card.isFlipped || card.isMatched ? "bg-primary" : "bg-accent"}
              ${!card.isMatched && !card.isFlipped ? "hover:bg-accent/80" : ""}
            `}
            onClick={() => handleCardClick(index)}
          >
            <div className="flex h-full items-center justify-center">
              {(card.isFlipped || card.isMatched) && (
                <span className="text-2xl sm:text-4xl">{card.emoji}</span>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <Button onClick={() => initializeGame(difficulty)} variant="default">
          Reset game
        </Button>
        <Button variant="secondary" onClick={() => setDifficulty(null)}>
          Change difficulty
        </Button>
      </div>
    </div>
  )
}

