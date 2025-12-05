import { useWindowSize } from "@/hooks/use-window-size";
import { AssetsLoader, GameManager, GameRenderer } from '../lib';
import { useEffect, useRef, useState } from "react";
import { Button } from '../components/button';
import { Direction, Position } from "../types";
import { SnakeSkinPreview } from '../components/skin-preview';


export function SnakeGamePage({ assets_loader }: { assets_loader: AssetsLoader }) {
    const gameRef = useRef<GameManager | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rendererRef = useRef<GameRenderer | null>(null);
    const [windowWidth, windowHeight] = useWindowSize();
    const [cellSize, setCellSize] = useState(100)
    const [startWidth, startHeight] = get_size(windowWidth, windowHeight, cellSize)
    const [width, setWidth] = useState(startWidth);
    const [height, setHeight] = useState(startHeight);
    if (!gameRef.current) {
        gameRef.current = new GameManager({
            width,
            height,
            assets_loader
        });
    }
    const game = gameRef.current;
    const renderer = rendererRef.current;

    const [score, setScore] = useState(game.score);
    const [direction, setDirection] = useState(game.snake_direction);
    const [state, setState] = useState(game.state);
    const [logicalLoopInterval, setlogicalLoopInterval] = useState(game.render_interval);
    const [renderingLoopInterval] = useState(1000 / 30);

    const [skinSelect, setSkinSelect] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [lastScore, setLastScore] = useState<number>();

    function get_size(windowWidth: number, windowHeight: number, cellSize: number) {
        const gap = 4
        const gameWidthCells = Math.floor(windowWidth / cellSize) + gap;
        const gameHeightCells = Math.floor(windowHeight / cellSize) + gap;
        const width = gameWidthCells % 2 === 0 ? gameWidthCells : gameWidthCells - 1;
        const height = gameHeightCells % 2 === 0 ? gameHeightCells : gameHeightCells - 1;
        return [width, height]
    }

    useEffect(() => {
        const is_mobile = windowWidth < 640
        const is_tablet = windowWidth >= 640 && windowWidth < 1024
        const cell_size = is_mobile ? 30 : is_tablet ? 40 : 50
        setCellSize(cell_size)
        const [newWidth, newHeight] = get_size(windowWidth, windowHeight, cell_size)
        game.width = newWidth
        game.height = newHeight
        setWidth(newWidth)
        setHeight(newHeight)
        if (state == "playing") game.restart_game()
        if (state == "auto-playing") game.restart_autoplay()
    }, [windowWidth, windowHeight])

    useEffect(() => {
        if (!canvasRef.current) return;
        rendererRef.current = new GameRenderer(assets_loader, game, canvasRef.current, cellSize);
    }, [cellSize]);

    useEffect(() => {
        if (!canvasRef.current) return;

        const loop = setInterval(() => {
            rendererRef.current!.draw();
        }, 1000 / 30);

        return () => {
            clearInterval(loop);
        }
    }, []);

    useEffect(() => {
        const loop = setInterval(() => {
            game.render_next_frame();
            updateData();
            rendererRef.current!.draw();
        }, game.render_interval);
        return () => {
            clearInterval(loop);
        }
    }, [game.render_interval]);

    const updateData = () => {
        setScore(game.score);
        setDirection(game.snake_direction);
        setState(game.state);
        setlogicalLoopInterval(game.render_interval);
        if (game.state == "playing-end") setLastScore(game.score)
    };

    const newDirection = (direction: Direction) => {
        game.set_direction(direction);
        setShowControls(false)
        updateData();
    };

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp" || e.key === "z") newDirection("up");
            if (e.key === "ArrowDown" || e.key === "s") newDirection("down");
            if (e.key === "ArrowLeft" || e.key === "q") newDirection("left");
            if (e.key === "ArrowRight" || e.key === "d") newDirection("right");
            if (e.key === "r") {
                game.restart_game();
                updateData();
            }
            if (e.key === "p") {
                game.restart_autoplay();
                updateData();
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    const [touchStart, setTouchStart] = useState<Position | null>(null);

    function handleTouchStart(e: React.TouchEvent) {
        const touch = e.touches[0];
        setTouchStart({ x: touch.clientX, y: touch.clientY });
    }

    function handleTouchEnd(e: React.TouchEvent) {
        if (!touchStart) return;
        const touch = e.changedTouches[0];
        const dx = touch.clientX - touchStart.x;
        const dy = touch.clientY - touchStart.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) newDirection("right");
            else newDirection("left");
        }
        else {
            if (dy > 0) newDirection("down");
            else newDirection("up");
        }
        setTouchStart(null);
    }



    return (
        <div className="bg-black text-white w-full h-screen overflow-hidden flex flex-col items-center justify-center">
            <div data-playing={state == "playing"} className="data-[playing=true]:scale-75 transition-all duration-300">
                {state == "playing" && <div data-playing={state == "playing"} className="hidden md:flex text-white p-2 gap-3 font-mono">
                    <p>Score : {score}</p>
                    <p>Direction : {direction}</p>
                    <p>State : {state}</p>
                    <p>Width : {width}</p>
                    <p>Height : {height}</p>
                    <p>Logical Loop : {(1000 / logicalLoopInterval).toFixed(2)}Hz</p>
                    <p>Rendering Loop : {(1000 / renderingLoopInterval).toFixed(2)}Hz</p>
                </div>}

                <canvas
                    ref={canvasRef}
                    width={width * cellSize}
                    height={height * cellSize}
                    style={{ imageRendering: "pixelated" }}
                    className="bg-black rounded-md touch-none"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                />

                <div data-show={state == "playing" && showControls} className="data-[show=false]:opacity-0 transition-all duration-300  pointer-events-none w-full items-center justify-center flex h-40 top-2/3  absolute ">
                    <img src="/snake/controls-mobile.png" alt="Mobile Controls" className="h-full sm:hidden block" />
                    <img src="/snake/controls-desktop.png" alt="Desktop Controls" className="h-full sm:block hidden" />
                </div>
            </div>


            <div data-playing={state == "playing"} className=" data-[playing=true]:opacity-0 data-[playing=true]:pointer-events-none transition-all duration-500 absolute h-screen w-full flex flex-col gap-20 items-center justify-start py-20">
                <video src="/snake/title.webm" className="max-w-xl w-full px-4 pointer-events-none outline-none" poster="/snake/title.png" autoPlay muted playsInline />


                {skinSelect == false && <div className="clamp-[w,200px,300px] flex flex-col gap-6">

                    {lastScore != undefined && <div className="font-pixel  text-center w-full text-2xl">
                        Last score : {lastScore}
                    </div>}

                    <Button onClick={() => {
                        game.restart_game()
                        setShowControls(true)
                    }} >
                        Start
                    </Button>

                    <Button onClick={() => setSkinSelect(true)}>
                        Skins
                    </Button>

                    <Button className="hidden">
                        Crazy
                    </Button>
                </div>}

                {skinSelect && <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {assets_loader.skins.map((skin, i) => (
                        <Button key={i} onClick={() => {
                            if (renderer) renderer.snake_skin = skin
                            setSkinSelect(false)
                        }}>
                            <SnakeSkinPreview skin={skin} />
                        </Button>
                    ))}

                </div>}

            </div>
        </div>
    );
}
