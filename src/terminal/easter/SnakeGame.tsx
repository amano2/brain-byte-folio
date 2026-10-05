import React, { useEffect, useRef, useState } from "react";
import { X, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

interface SnakeGameProps {
  onClose: () => void;
}

export default function SnakeGame({ onClose }: SnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Direction state ref so game loop has immediate access
  const directionRef = useRef<"UP" | "DOWN" | "LEFT" | "RIGHT">("RIGHT");
  const nextDirectionRef = useRef<"UP" | "DOWN" | "LEFT" | "RIGHT">("RIGHT");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gridSize = 15;
    const tileCountX = Math.floor(canvas.width / gridSize);
    const tileCountY = Math.floor(canvas.height / gridSize);

    let snake = [
      { x: 5, y: 10 },
      { x: 4, y: 10 },
      { x: 3, y: 10 }
    ];

    let food = {
      x: Math.floor(Math.random() * tileCountX),
      y: Math.floor(Math.random() * tileCountY)
    };

    let gameInterval: number;

    const spawnFood = () => {
      food = {
        x: Math.floor(Math.random() * tileCountX),
        y: Math.floor(Math.random() * tileCountY)
      };
    };

    const update = () => {
      directionRef.current = nextDirectionRef.current;
      const head = { ...snake[0] };

      if (directionRef.current === "UP") head.y--;
      if (directionRef.current === "DOWN") head.y++;
      if (directionRef.current === "LEFT") head.x--;
      if (directionRef.current === "RIGHT") head.x++;

      // Check wall collision
      if (
        head.x < 0 ||
        head.x >= tileCountX ||
        head.y < 0 ||
        head.y >= tileCountY
      ) {
        setGameOver(true);
        clearInterval(gameInterval);
        return;
      }

      // Check self collision
      for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
          setGameOver(true);
          clearInterval(gameInterval);
          return;
        }
      }

      snake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((s) => s + 10);
        spawnFood();
      } else {
        snake.pop();
      }

      // Draw
      ctx.fillStyle = "rgba(13, 17, 23, 0.95)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw food
      ctx.fillStyle = "#22d3ee";
      ctx.fillRect(food.x * gridSize + 1, food.y * gridSize + 1, gridSize - 2, gridSize - 2);

      // Draw snake
      ctx.fillStyle = "#00ff66";
      for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(
          snake[i].x * gridSize + 1,
          snake[i].y * gridSize + 1,
          gridSize - 2,
          gridSize - 2
        );
      }
    };

    gameInterval = window.setInterval(update, 110);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "q" || e.key === "Q" || e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        if (directionRef.current !== "DOWN") nextDirectionRef.current = "UP";
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        if (directionRef.current !== "UP") nextDirectionRef.current = "DOWN";
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        if (directionRef.current !== "RIGHT") nextDirectionRef.current = "LEFT";
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        if (directionRef.current !== "LEFT") nextDirectionRef.current = "RIGHT";
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      clearInterval(gameInterval);
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const setDir = (d: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
    if (d === "UP" && directionRef.current !== "DOWN") nextDirectionRef.current = "UP";
    if (d === "DOWN" && directionRef.current !== "UP") nextDirectionRef.current = "DOWN";
    if (d === "LEFT" && directionRef.current !== "RIGHT") nextDirectionRef.current = "LEFT";
    if (d === "RIGHT" && directionRef.current !== "LEFT") nextDirectionRef.current = "RIGHT";
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[var(--term-bg)] border border-[var(--term-border)] rounded-xl shadow-2xl p-4 max-w-sm w-full font-mono flex flex-col items-center space-y-3">
        <div className="w-full flex justify-between items-center text-xs border-b border-[var(--term-border)] pb-2">
          <span className="text-[var(--term-accent)] font-bold">TERMINAL SNAKE</span>
          <span className="text-[var(--term-fg)]">Score: {score}</span>
          <button
            onClick={onClose}
            className="text-[var(--term-muted)] hover:text-[var(--term-error)] cursor-pointer"
            title="Quit (Q)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="border border-[var(--term-border)] rounded bg-black block"
          />
          {gameOver && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center space-y-2 text-center">
              <p className="text-[var(--term-error)] font-bold text-sm">GAME OVER</p>
              <p className="text-xs text-[var(--term-fg)]">Final Score: {score}</p>
              <button
                onClick={onClose}
                className="px-3 py-1 bg-[var(--term-code-bg)] border border-[var(--term-border)] text-[var(--term-accent)] rounded text-xs hover:bg-[var(--term-accent)]/10"
              >
                Exit to Terminal
              </button>
            </div>
          )}
        </div>

        {/* Mobile D-Pad controls */}
        <div className="md:hidden flex flex-col items-center gap-1 pt-2 w-full">
          <button
            type="button"
            onClick={() => setDir("UP")}
            className="p-2 bg-[var(--term-header-bg)] border border-[var(--term-border)] rounded"
          >
            <ArrowUp className="w-4 h-4 text-[var(--term-accent)]" />
          </button>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setDir("LEFT")}
              className="p-2 bg-[var(--term-header-bg)] border border-[var(--term-border)] rounded"
            >
              <ArrowLeft className="w-4 h-4 text-[var(--term-accent)]" />
            </button>
            <button
              type="button"
              onClick={() => setDir("RIGHT")}
              className="p-2 bg-[var(--term-header-bg)] border border-[var(--term-border)] rounded"
            >
              <ArrowRight className="w-4 h-4 text-[var(--term-accent)]" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setDir("DOWN")}
            className="p-2 bg-[var(--term-header-bg)] border border-[var(--term-border)] rounded"
          >
            <ArrowDown className="w-4 h-4 text-[var(--term-accent)]" />
          </button>
        </div>

        <p className="text-[10px] text-[var(--term-muted)] text-center hidden md:block">
          Use Arrow Keys or WASD &bull; Press 'Q' or Esc to quit
        </p>
      </div>
    </div>
  );
}
