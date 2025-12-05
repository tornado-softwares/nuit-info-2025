import { Direction, EntitiesId, Entity, Position, SnakeSkin } from './types';

export class GameManager {
  public width: number;
  public height: number;
  public world: Entity[][];
  public prev_world: Entity[][] = []
  private assets_loader: AssetsLoader;

  public state: "auto-playing" | "playing" | "playing-end" | "auto-playing-end" = "auto-playing";
  public rendered_next_frame: boolean = false;

  public entities: Record<EntitiesId, Entity> = {
    "snake-body-corner-l-t": { id: EntitiesId.SNAKE_BODY_CORNER_LT, collision: true, score: 0, },
    "snake-body-corner-l-b": { id: EntitiesId.SNAKE_BODY_CORNER_LB, collision: true, score: 0, },
    "snake-body-corner-r-t": { id: EntitiesId.SNAKE_BODY_CORNER_RT, collision: true, score: 0, },
    "snake-body-corner-r-b": { id: EntitiesId.SNAKE_BODY_CORNER_RB, collision: true, score: 0, },
    "snake-body-corner-t-l": { id: EntitiesId.SNAKE_BODY_CORNER_TL, collision: true, score: 0, },
    "snake-body-corner-t-r": { id: EntitiesId.SNAKE_BODY_CORNER_TR, collision: true, score: 0, },
    "snake-body-corner-b-l": { id: EntitiesId.SNAKE_BODY_CORNER_BL, collision: true, score: 0, },
    "snake-body-corner-b-r": { id: EntitiesId.SNAKE_BODY_CORNER_BR, collision: true, score: 0, },
    "snake-body-x-l": { id: EntitiesId.SNAKE_BODY_X_L, collision: true, score: 0, },
    "snake-body-x-r": { id: EntitiesId.SNAKE_BODY_X_R, collision: true, score: 0, },
    "snake-body-y-t": { id: EntitiesId.SNAKE_BODY_Y_T, collision: true, score: 0, },
    "snake-body-y-b": { id: EntitiesId.SNAKE_BODY_Y_B, collision: true, score: 0, },
    "snake-head-up": { id: EntitiesId.SNAKE_HEAD_UP, collision: true, score: 0, },
    "snake-head-down": { id: EntitiesId.SNAKE_HEAD_DOWN, collision: true, score: 0, },
    "snake-head-left": { id: EntitiesId.SNAKE_HEAD_LEFT, collision: true, score: 0, },
    "snake-head-right": { id: EntitiesId.SNAKE_HEAD_RIGHT, collision: true, score: 0, },
    "snake-tail-up": { id: EntitiesId.SNAKE_TAIL_UP, collision: true, score: 0, },
    "snake-tail-down": { id: EntitiesId.SNAKE_TAIL_DOWN, collision: true, score: 0, },
    "snake-tail-left": { id: EntitiesId.SNAKE_TAIL_LEFT, collision: true, score: 0, },
    "snake-tail-right": { id: EntitiesId.SNAKE_TAIL_RIGHT, collision: true, score: 0, },
    "apple": { id: EntitiesId.APPLE, collision: false, score: 1 },
    "spicy": { id: EntitiesId.SPICY, collision: false, score: 2 },
    "border-x": { id: EntitiesId.BORDER_X, collision: true, score: 0 },
    "border-y-r": { id: EntitiesId.BORDER_Y_R, collision: true, score: 0 },
    "border-y-l": { id: EntitiesId.BORDER_Y_L, collision: true, score: 0 },
    "ground": { id: EntitiesId.GROUND, collision: false, score: 0 },
    "border-corner-tl": { id: EntitiesId.BORDER_CORNER_TL, collision: true, score: 0 },
    "border-corner-tr": { id: EntitiesId.BORDER_CORNER_TR, collision: true, score: 0 },
    "border-corner-bl": { id: EntitiesId.BORDER_CORNER_BL, collision: true, score: 0 },
    "border-corner-br": { id: EntitiesId.BORDER_CORNER_BR, collision: true, score: 0 },
  };

  private pending_snake_parts_count: number = 0;
  private base_snake_parts_count: number = 3
  public snake_parts_positions: Position[] = [];
  public prev_snake_parts_positions: Position[] = [];
  public snake_direction: Direction = "right";
  public last_rendered_snake_direction: Direction = "right";
  public snake_state: "normal" | "near_apple" | "bite_apple" = "normal";
  public last_render_time = 0;
  public render_interval = 1000 / 8;
  public score = 0;

  constructor({ width, height, assets_loader }: { width: number; height: number, assets_loader: AssetsLoader }) {
    this.width = width;
    this.height = height;
    this.assets_loader = assets_loader
    this.world = this.new_world();

  }

  end_game() {
    this.assets_loader.assets.music!.pause()
    this.assets_loader.playSound("die")
    this.state = "playing-end";
    this.world = this.prev_world
    setTimeout(() => { if (this.state != "playing") this.restart_autoplay() }, 3000);
  }

  end_auto_play() {
    this.assets_loader.assets.music!.pause()
    this.assets_loader.playSound("die")

    this.state = "auto-playing-end";
    this.world = this.prev_world
    setTimeout(() => { if (this.state = "playing") this.restart_autoplay() }, 3000);
  }

  restart_game() {
    this.assets_loader.assets.music!.loop = true
    this.assets_loader.assets.music!.currentTime = 0
    this.assets_loader.assets.music!.volume = 0.5
    this.assets_loader.assets.music!.play()


    this.snake_parts_positions = [];
    this.pending_snake_parts_count = 0;
    this.render_interval = 1000 / 8;
    this.world = this.new_world();
    this.state = "playing";
    this.score = 0;
    this.snake_direction = "right";
  }

  restart_autoplay() {
    this.restart_game();
    this.assets_loader.assets.music!.pause()
    this.state = "auto-playing";
  }

  new_world() {
    const world: Entity[][] = [];
    for (let y = 0; y < this.height; y++) {
      const entities_line: Entity[] = [];
      for (let x = 0; x < this.width; x++) {
        switch (true) {
          case (x === 0 && y === 0): entities_line.push(this.entities["border-corner-tr"]); break;
          case (x === this.width - 1 && y === 0): entities_line.push(this.entities["border-corner-tl"]); break;
          case (x === 0 && y === this.height - 1): entities_line.push(this.entities["border-corner-br"]); break;
          case (x === this.width - 1 && y === this.height - 1): entities_line.push(this.entities["border-corner-bl"]); break;
          case (x === 0): entities_line.push(this.entities["border-y-l"]); break;
          case (x === this.width - 1): entities_line.push(this.entities["border-y-r"]); break;
          case (y === 0): entities_line.push(this.entities["border-x"]); break;
          case (y === this.height - 1): entities_line.push(this.entities["border-x"]); break;
          default: entities_line.push(this.entities["ground"]); break;
        }
      }
      world.push(entities_line);
    }
    for (let i = 0; i < this.base_snake_parts_count; i++) this.snake_parts_positions.push({ y: this.height / 2, x: this.width / 2 - i });

    return world;
  }

  set_direction(direction: Direction) {
    if (this.state == "playing") {
      const is_not_opposite = (this.snake_direction == "right" && direction !== "left") || (this.snake_direction == "left" && direction !== "right") || (this.snake_direction == "up" && direction !== "down") || (this.snake_direction == "down" && direction !== "up");
      if (is_not_opposite && this.last_rendered_snake_direction != direction) {
        this.snake_direction = direction;
        this.render_next_frame();
        this.rendered_next_frame = true;
      }
    }
    return this.snake_direction;
  }

  private override_world_entitiy(x: number, y: number, EntityId: EntitiesId) {
    this.world[y][x] = this.entities[EntityId]
  }

  private add_random_eatables() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (
          Math.random() < (this.state == "auto-playing" ? 0.0001 : 0.00003) &&
          this.world[y]![x]!.id == EntitiesId.GROUND) {
          this.override_world_entitiy(x, y, EntitiesId.APPLE)
        }
          if (
          Math.random() < (this.state == "auto-playing" ? 0.0001 : 0.00003) &&
          this.world[y]![x]!.id == EntitiesId.GROUND) {
          this.override_world_entitiy(x, y, EntitiesId.SPICY)
        }
      }
    }
  }

  private update_snake_parts_positions(direction: Direction) {
    this.prev_snake_parts_positions = structuredClone(this.snake_parts_positions);
    for (let i = 0; i < this.snake_parts_positions.length; i++) {
      const snake_part = this.snake_parts_positions[i];
      this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.GROUND)
      if (i == 0) {
        switch (direction) {
          case 'down': snake_part.y += 1; break;
          case 'up': snake_part.y -= 1; break;
          case 'right': snake_part.x += 1; break;
          case 'left': snake_part.x -= 1; break;
        }
      } else {
        const previous_snake_part = this.prev_snake_parts_positions[i - 1]!;
        snake_part.x = previous_snake_part.x;
        snake_part.y = previous_snake_part.y;
      }
    }
  }

  private update_snake_state(head_position: Position) {
    this.snake_state = "normal";

    const headX = head_position.x;
    const headY = head_position.y;

    let frontX = headX;
    let frontY = headY;

    if (this.snake_direction === "up") frontY -= 1;
    if (this.snake_direction === "down") frontY += 1;
    if (this.snake_direction === "left") frontX -= 1;
    if (this.snake_direction === "right") frontX += 1;

    if (this.world[frontY]?.[frontX]?.id === EntitiesId.APPLE || this.world[frontY]?.[frontX]?.id === EntitiesId.SPICY) {
      this.snake_state = "bite_apple";
    } else {
      const neighbors = [
        { x: headX + 1, y: headY },
        { x: headX - 1, y: headY },
        { x: headX, y: headY + 1 },
        { x: headX, y: headY - 1 },
      ];

      for (const n of neighbors) {
        if (this.world[n.y]?.[n.x]?.id === EntitiesId.APPLE || this.world[n.y]?.[n.x]?.id === EntitiesId.SPICY) {
          this.snake_state = "near_apple";
          break;
        }
      }
    }
  }

  private refresh_world_entities() {
    for (let i = 0; i < this.snake_parts_positions.length; i++) {
      const snake_part = this.snake_parts_positions[i];
      const base_block = this.world[snake_part.y]![snake_part.x]!;

      this.score += base_block.score;
      this.pending_snake_parts_count += base_block.score;

      if (base_block.id == EntitiesId.APPLE) {
        this.assets_loader.playSound("eat")
      }

      if (base_block.id == EntitiesId.SPICY) {
        this.assets_loader.playSound("eat")
        if (this.render_interval > 1000/13) this.render_interval -= 2
      }

      if (base_block.collision) {
        if(this.state == "auto-playing") this.end_auto_play() 
        if(this.state == "playing") this.end_game() 
        return
      }

      if (i === 0) {
        this.update_snake_state(snake_part)
        switch (this.snake_direction) {
          case "up": this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.SNAKE_HEAD_UP); break;
          case "down": this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.SNAKE_HEAD_DOWN); break;
          case "left": this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.SNAKE_HEAD_LEFT); break;
          case "right": this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.SNAKE_HEAD_RIGHT); break;
        }
      } else if (i === this.snake_parts_positions.length - 1) {
        const prev = this.snake_parts_positions[i - 1];
        if (prev.x < snake_part.x) this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.SNAKE_TAIL_RIGHT);
        else if (prev.x > snake_part.x) this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.SNAKE_TAIL_LEFT);
        else if (prev.y < snake_part.y) this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.SNAKE_TAIL_DOWN);
        else this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.SNAKE_TAIL_UP);
      } else {
        const prev = this.snake_parts_positions[i - 1];
        const next = this.snake_parts_positions[i + 1];
        if (prev.x !== next.x && prev.y !== next.y) {
          const dx_prev = snake_part.x - prev.x;
          const dy_prev = snake_part.y - prev.y;
          const dx_next = next.x - snake_part.x;
          const dy_next = next.y - snake_part.y;
          if (dx_prev === 0 && dy_prev === -1 && dx_next === 1 && dy_next === 0) this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.SNAKE_BODY_CORNER_TR);
          else if (dx_prev === 0 && dy_prev === -1 && dx_next === -1 && dy_next === 0) this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.SNAKE_BODY_CORNER_TL);
          else if (dx_prev === 0 && dy_prev === 1 && dx_next === 1 && dy_next === 0) this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.SNAKE_BODY_CORNER_BR);
          else if (dx_prev === 0 && dy_prev === 1 && dx_next === -1 && dy_next === 0) this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.SNAKE_BODY_CORNER_BL);
          else if (dx_prev === -1 && dy_prev === 0 && dx_next === 0 && dy_next === -1) this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.SNAKE_BODY_CORNER_LT);
          else if (dx_prev === -1 && dy_prev === 0 && dx_next === 0 && dy_next === 1) this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.SNAKE_BODY_CORNER_LB);
          else if (dx_prev === 1 && dy_prev === 0 && dx_next === 0 && dy_next === -1) this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.SNAKE_BODY_CORNER_RT);
          else if (dx_prev === 1 && dy_prev === 0 && dx_next === 0 && dy_next === 1) this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.SNAKE_BODY_CORNER_RB);
        } else {
          if (prev.y === next.y) {
            if (next.x > snake_part.x) this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.SNAKE_BODY_X_R);
            else this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.SNAKE_BODY_X_L);
          } else if (prev.x === next.x) {
            if (next.y > snake_part.y) this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.SNAKE_BODY_Y_B);
            else this.override_world_entitiy(snake_part.x, snake_part.y, EntitiesId.SNAKE_BODY_Y_T);
          }
        }
      }
    }
  }
 
 

  private get_nearest_eatable(): Position | null {
    let best: Position | null = null;
    let bestDist = Infinity;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.world[y][x].id === EntitiesId.APPLE || this.world[y][x].id === EntitiesId.SPICY) {
          const d = Math.abs(x - this.snake_parts_positions[0].x) + Math.abs(y - this.snake_parts_positions[0].y);
          if (d < bestDist) {
            best = { x, y };
            bestDist = d;
          }
        }
      }
    }
    return best;
  }



  private get_safe_random_direction(): Direction {
    const directions: Direction[] = ["up", "down", "left", "right"];
    const safe = directions.filter((dir) => {
      const isSafe = (() => {
        const head = this.snake_parts_positions[0];
        let x = head.x;
        let y = head.y;
        if (dir === "up") y--;
        if (dir === "down") y++;
        if (dir === "left") x--;
        if (dir === "right") x++;
        const next = this.world[y]?.[x];
        return next && !next.collision;
      })();
      return isSafe
    });

    if (safe.length === 0) {
      return this.snake_direction;
    }
    
   const apple = this.get_nearest_eatable();
    if (apple) {
      const head = this.snake_parts_positions[0];
      const appleDirs: Direction[] = [];
      if (apple.x < head.x) appleDirs.push("left");
      if (apple.x > head.x) appleDirs.push("right");
      if (apple.y < head.y) appleDirs.push("up");
      if (apple.y > head.y) appleDirs.push("down");
      const best = appleDirs.filter(  d => safe.includes(d)  );
      if (best.length > 0) {
        return best[Math.floor(Math.random() * best.length)];
      }
    }

    if (safe.includes(this.snake_direction) && Math.random() < 0.8) return this.snake_direction;
 

    return safe[Math.floor(Math.random() * safe.length)];
  }




  render_next_frame() {
    if (!this.rendered_next_frame && this.state !== "playing-end" || !this.rendered_next_frame && this.state !== "auto-playing-end") {
      this.last_render_time = performance.now();
      this.prev_world = structuredClone(this.world);

      if (this.pending_snake_parts_count > 0) {
        this.snake_parts_positions.push({ y: 1, x: 1 });
        this.pending_snake_parts_count--;
      }

      if (this.state == "playing") this.update_snake_parts_positions(this.snake_direction);
      if (this.state == "auto-playing") {
        this.snake_direction = this.get_safe_random_direction();
        this.update_snake_parts_positions(this.snake_direction);
      }
      this.refresh_world_entities();
      this.add_random_eatables();

      this.last_rendered_snake_direction = this.snake_direction;
    }

    this.rendered_next_frame = false;
  }
}

export class AssetsLoader {
  assets = {
    ground_1: null as HTMLImageElement | null,
    ground_2: null as HTMLImageElement | null,

    apple: null as HTMLImageElement | null,
    spicy: null as HTMLImageElement | null,

    classic_body: null as HTMLImageElement | null,
    classic_corner: null as HTMLImageElement | null,
    classic_head: null as HTMLImageElement | null,
    classic_head_tongue: null as HTMLImageElement | null,
    classic_head_bite: null as HTMLImageElement | null,
    classic_head_dead: null as HTMLImageElement | null,
    classic_tail: null as HTMLImageElement | null,

    robot_body: null as HTMLImageElement | null,
    robot_corner: null as HTMLImageElement | null,
    robot_head: null as HTMLImageElement | null,
    robot_head_tongue: null as HTMLImageElement | null,
    robot_head_bite: null as HTMLImageElement | null,
    robot_head_dead: null as HTMLImageElement | null,
    robot_tail: null as HTMLImageElement | null,

    nuit_body: null as HTMLImageElement | null,
    nuit_corner: null as HTMLImageElement | null,
    nuit_head: null as HTMLImageElement | null,
    nuit_head_tongue: null as HTMLImageElement | null,
    nuit_head_bite: null as HTMLImageElement | null,
    nuit_head_dead: null as HTMLImageElement | null,
    nuit_tail: null as HTMLImageElement | null,

    france_body: null as HTMLImageElement | null,
    france_corner: null as HTMLImageElement | null,
    france_head: null as HTMLImageElement | null,
    france_head_tongue: null as HTMLImageElement | null,
    france_head_bite: null as HTMLImageElement | null,
    france_head_dead: null as HTMLImageElement | null,
    france_tail: null as HTMLImageElement | null,

    blood_body: null as HTMLImageElement | null,
    blood_corner: null as HTMLImageElement | null,
    blood_head: null as HTMLImageElement | null,
    blood_head_tongue: null as HTMLImageElement | null,
    blood_head_bite: null as HTMLImageElement | null,
    blood_head_dead: null as HTMLImageElement | null,
    blood_tail: null as HTMLImageElement | null,

    king_joss_body: null as HTMLImageElement | null,
    king_joss_corner: null as HTMLImageElement | null,
    king_joss_head: null as HTMLImageElement | null,
    king_joss_head_tongue: null as HTMLImageElement | null,
    king_joss_head_bite: null as HTMLImageElement | null,
    king_joss_head_dead: null as HTMLImageElement | null,
    king_joss_tail: null as HTMLImageElement | null,


    star: null as HTMLImageElement | null,
    border_y: null as HTMLImageElement | null,
    border_x: null as HTMLImageElement | null,
    border_corner: null as HTMLImageElement | null,
    border_corner_top: null as HTMLImageElement | null,

    music: null as HTMLAudioElement | null,
    eat: null as HTMLAudioElement | null,
    die: null as HTMLAudioElement | null,

  };

  skins: SnakeSkin[] = []

  loaded: boolean = false


  async load() {
    const load_image = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
      });
    };

    const load_audio = (src: string): Promise<HTMLAudioElement> => {
      return new Promise((resolve) => {
        const audio = new Audio();
        audio.src = src;
        resolve(audio)
        //audio.onload = () => resolve(audio);
        //audio.onerror = (err) => reject(err);
      });
    };

    this.assets.music = await load_audio("/snake/sound/music.mp3")
    this.assets.eat = await load_audio("/snake/sound/eat.mp3")
    this.assets.die = await load_audio("/snake/sound/die.mp3")

    this.assets.apple = await load_image("/snake/eatable/apple.png");
    this.assets.spicy = await load_image("/snake/eatable/spicy.png");

    this.assets.classic_body = await load_image("/snake/skins/classic/body.png");
    this.assets.classic_corner = await load_image("/snake/skins/classic/corner.png");
    this.assets.classic_head = await load_image("/snake/skins/classic/head.png");
    this.assets.classic_head_tongue = await load_image("/snake/skins/classic/head-tongue.png");
    this.assets.classic_head_bite = await load_image("/snake/skins/classic/head-bite.png");
    this.assets.classic_head_dead = await load_image("/snake/skins/classic/head-dead.png");
    this.assets.classic_tail = await load_image("/snake/skins/classic/tail.png");

    this.assets.robot_body = await load_image("/snake/skins/robot/body.png");
    this.assets.robot_corner = await load_image("/snake/skins/robot/corner.png");
    this.assets.robot_head = await load_image("/snake/skins/robot/head.png");
    this.assets.robot_head_tongue = await load_image("/snake/skins/robot/head-tongue.png");
    this.assets.robot_head_bite = await load_image("/snake/skins/robot/head-bite.png");
    this.assets.robot_head_dead = await load_image("/snake/skins/robot/head-dead.png");
    this.assets.robot_tail = await load_image("/snake/skins/robot/tail.png");

    this.assets.nuit_body = await load_image("/snake/skins/nuit/body.png");
    this.assets.nuit_corner = await load_image("/snake/skins/nuit/corner.png");
    this.assets.nuit_head = await load_image("/snake/skins/nuit/head.png");
    this.assets.nuit_head_tongue = await load_image("/snake/skins/nuit/head-tongue.png");
    this.assets.nuit_head_bite = await load_image("/snake/skins/nuit/head-bite.png");
    this.assets.nuit_head_dead = await load_image("/snake/skins/nuit/head-dead.png");
    this.assets.nuit_tail = await load_image("/snake/skins/nuit/tail.png");

    this.assets.france_body = await load_image("/snake/skins/france/body.png");
    this.assets.france_corner = await load_image("/snake/skins/france/corner.png");
    this.assets.france_head = await load_image("/snake/skins/france/head.png");
    this.assets.france_head_tongue = await load_image("/snake/skins/france/head-tongue.png");
    this.assets.france_head_bite = await load_image("/snake/skins/france/head-bite.png");
    this.assets.france_head_dead = await load_image("/snake/skins/france/head-dead.png");
    this.assets.france_tail = await load_image("/snake/skins/france/tail.png");

    this.assets.blood_body = await load_image("/snake/skins/blood/body.png");
    this.assets.blood_corner = await load_image("/snake/skins/blood/corner.png");
    //this.assets.blood_head = await load_image("/snake/skins/blood/head.png");
    //this.assets.blood_head_tongue = await load_image("/snake/skins/blood/head-tongue.png");
    //this.assets.blood_head_bite = await load_image("/snake/skins/blood/head-bite.png");
    //this.assets.blood_head_dead = await load_image("/snake/skins/blood/head-dead.png");
    this.assets.blood_tail = await load_image("/snake/skins/blood/tail.png");


    this.assets.king_joss_body = await load_image("/snake/skins/king-joss/body.png");
    this.assets.king_joss_corner = await load_image("/snake/skins/king-joss/corner.png");
    this.assets.king_joss_head = await load_image("/snake/skins/king-joss/head.png");
    this.assets.king_joss_head_tongue = await load_image("/snake/skins/king-joss/head-tongue.png");
    this.assets.king_joss_head_bite = await load_image("/snake/skins/king-joss/head-bite.png");
    this.assets.king_joss_head_dead = await load_image("/snake/skins/king-joss/head-dead.png");
    this.assets.king_joss_tail = await load_image("/snake/skins/king-joss/tail.png");




    this.assets.ground_1 = await load_image("/snake/world/ground-1.png");
    this.assets.ground_2 = await load_image("/snake/world/ground-2.png");

    this.assets.star = await load_image("/snake/particles/star.png");

    this.assets.border_y = await load_image("/snake/world/border-y.png");
    this.assets.border_x = await load_image("/snake/world/border-x.png");
    this.assets.border_corner = await load_image("/snake/world/border-corner.png");
    this.assets.border_corner_top = await load_image("/snake/world/border-corner-top.png");

    this.skins = this.get_skins()

    this.loaded = true
  }

  playSound(name: keyof typeof this.assets) {
    const audio = this.assets[name];
    if (audio && audio instanceof HTMLAudioElement) {
      const eatSound = audio.cloneNode(true) as HTMLAudioElement;
      eatSound.currentTime = 0;
      eatSound.play();
    }
  }


  getAsset(name: keyof typeof this.assets): HTMLImageElement {
    const img = this.assets[name];
    if (img && img instanceof HTMLImageElement) return img;
    const size = 32;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const colors = ["#c300ff", "#000000"];
    const blockSize = size / 4;
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        ctx.fillStyle = colors[(x + y) % 2];
        ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
      }
    }
    const placeholder = new Image();
    placeholder.src = canvas.toDataURL();
    return placeholder;
  }

  /* private apply_hue(img: HTMLImageElement, hue: number): HTMLImageElement {
     const canvas = document.createElement("canvas");
     canvas.width = img.width;
     canvas.height = img.height;
 
     const ctx = canvas.getContext("2d")!;
     ctx.filter = `hue-rotate(${hue}deg)`;
     ctx.drawImage(img, 0, 0);
 
     const out = new Image();
     out.src = canvas.toDataURL();
     return out;
   }
 
 
   private clone_skin_and_rotate_hue(skin: SnakeSkin, hue_rotation: number): SnakeSkin {
     return {
       body: this.apply_hue(skin.body, hue_rotation),
       corner: this.apply_hue(skin.corner, hue_rotation),
       tail: this.apply_hue(skin.tail, hue_rotation),
       head: this.apply_hue(skin.head, hue_rotation),
       head_bite: this.apply_hue(skin.head_bite, hue_rotation),
       head_dead: this.apply_hue(skin.head_dead, hue_rotation),
       head_tongue: this.apply_hue(skin.head_tongue, hue_rotation)
     };
 
   }
 */

  private get_skins() {
    const classic: SnakeSkin = {
      body: this.getAsset("classic_body"),
      corner: this.getAsset("classic_corner"),
      tail: this.getAsset("classic_tail"),
      head: this.getAsset("classic_head"),
      head_bite: this.getAsset("classic_head_bite"),
      head_dead: this.getAsset("classic_head_dead"),
      head_tongue: this.getAsset("classic_head_tongue"),
    }

    const robot: SnakeSkin = {
      body: this.getAsset("robot_body"),
      corner: this.getAsset("robot_corner"),
      tail: this.getAsset("robot_tail"),
      head: this.getAsset("robot_head"),
      head_bite: this.getAsset("robot_head_bite"),
      head_dead: this.getAsset("robot_head_dead"),
      head_tongue: this.getAsset("robot_head_tongue"),
    }

    const nuit: SnakeSkin = {
      body: this.getAsset("nuit_body"),
      corner: this.getAsset("nuit_corner"),
      tail: this.getAsset("nuit_tail"),
      head: this.getAsset("nuit_head"),
      head_bite: this.getAsset("nuit_head_bite"),
      head_dead: this.getAsset("nuit_head_dead"),
      head_tongue: this.getAsset("nuit_head_tongue"),
    }

    const france: SnakeSkin = {
      body: this.getAsset("france_body"),
      corner: this.getAsset("france_corner"),
      tail: this.getAsset("france_tail"),
      head: this.getAsset("france_head"),
      head_bite: this.getAsset("france_head_bite"),
      head_dead: this.getAsset("france_head_dead"),
      head_tongue: this.getAsset("france_head_tongue"),
    }

    const blood: SnakeSkin = {
      body: this.getAsset("blood_body"),
      corner: this.getAsset("blood_corner"),
      tail: this.getAsset("blood_tail"),
      head: this.getAsset("classic_head"),
      head_bite: this.getAsset("classic_head_bite"),
      head_dead: this.getAsset("classic_head_dead"),
      head_tongue: this.getAsset("classic_head_tongue"),
    }

     const king_joss: SnakeSkin = {
      body: this.getAsset("king_joss_body"),
      corner: this.getAsset("king_joss_corner"),
      tail: this.getAsset("king_joss_tail"),
      head: this.getAsset("king_joss_head"),
      head_bite: this.getAsset("king_joss_head_bite"),
      head_dead: this.getAsset("king_joss_head_dead"),
      head_tongue: this.getAsset("king_joss_head_tongue"),
    }

    const skins: SnakeSkin[] = [
      classic,
      robot,
      nuit,
      france,
      blood,
      king_joss
    ]
    return skins
  }
}


export class GameRenderer {
  private game: GameManager;
  private assets_loader: AssetsLoader;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cellSize: number;
  public snake_skin: SnakeSkin
  private time = 0;



  constructor(assets: AssetsLoader, game: GameManager, canvas: HTMLCanvasElement, cellSize = 25) {
    this.game = game;
    this.assets_loader = assets
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: true })!;
    this.cellSize = cellSize;

    this.snake_skin = this.assets_loader.skins[0]
  }





  lerp(a: number, b: number, t: number) {
    return a + (b - a) * t
  }

  interpolatePosition(prev: Position, curr: Position, t: number) {
    return {
      x: this.lerp(prev.x, curr.x, t),
      y: this.lerp(prev.y, curr.y, t)
    }
  }



  draw() {
    const ctx = this.ctx;
    const cell = this.cellSize;
    const world = this.game.world;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.imageSmoothingQuality = "low";


    this.time += 0.5;
    const t = this.time;

    for (let y = 0; y < world.length; y++) {
      for (let x = 0; x < world[y].length; x++) {
        const img = (x + y) % 2 === 0 ? this.assets_loader.getAsset("ground_1") : this.assets_loader.getAsset("ground_2");
        ctx.drawImage(img, x * cell, y * cell, cell, cell);
      }
    }


    for (let y = 0; y < world.length; y++) {
      for (let x = 0; x < world[y].length; x++) {
        const entity = world[y][x];
        const id = entity.id;
        const px = x * cell;
        const py = y * cell;

        if (this.game.state === "playing-end" || this.game.state === "auto-playing-end") {
          const cx = this.game.prev_snake_parts_positions[0].x * this.cellSize + this.cellSize / 2;
          const cy = this.game.prev_snake_parts_positions[0].y * this.cellSize + this.cellSize / 2;
          this.drawStars(cx, cy, this.time);
        }

        if (this.game.state === "playing-end" || this.game.state === "auto-playing-end") {
          const cx = this.game.prev_snake_parts_positions[0].x * this.cellSize + this.cellSize / 2;
          const cy = this.game.prev_snake_parts_positions[0].y * this.cellSize + this.cellSize / 2;
          this.drawStars(cx, cy, this.time);
        }

        const partIndex = this.game.snake_parts_positions.findIndex(p => p.x === x && p.y === y);

        if (partIndex !== -1) {
          const prev = this.game.prev_snake_parts_positions[partIndex];
          const curr = this.game.snake_parts_positions[partIndex];

          const now = performance.now();
          const tInterp = Math.min((now - this.game.last_render_time) / this.game.render_interval, 1);

          const { x: interpolated_x, y: interpolated_y } = this.interpolatePosition(prev, curr, tInterp);

          // INTERPOLATION IMPOSSIBLE AAAAAAAAAAAAAAAAAARRRRRRRRRRRRRRR

          console.log(tInterp, interpolated_x, interpolated_y)





          if (
            id === EntitiesId.SNAKE_BODY_X_L ||
            id === EntitiesId.SNAKE_BODY_X_R ||
            id === EntitiesId.SNAKE_BODY_Y_T ||
            id === EntitiesId.SNAKE_BODY_Y_B
          ) {
            this.drawThinBody(x, y, id);
            //this.drawThinBody(interpolated_x, interpolated_y, id);
            continue;
          }

          if (
            id === EntitiesId.SNAKE_BODY_CORNER_LT ||
            id === EntitiesId.SNAKE_BODY_CORNER_LB ||
            id === EntitiesId.SNAKE_BODY_CORNER_RT ||
            id === EntitiesId.SNAKE_BODY_CORNER_RB ||
            id === EntitiesId.SNAKE_BODY_CORNER_TL ||
            id === EntitiesId.SNAKE_BODY_CORNER_TR ||
            id === EntitiesId.SNAKE_BODY_CORNER_BL ||
            id === EntitiesId.SNAKE_BODY_CORNER_BR
          ) {
            this.drawCorner(x, y, id);
            continue;
          }
        }

        if (id === EntitiesId.APPLE) {
          const scale = 0.7 + 0.1 * Math.sin(t * 0.3)
          const size = cell * scale;
          const offset = (cell - size) / 2;

          ctx.drawImage(this.assets_loader.getAsset("apple"), px + offset, py + offset, size, size);
          continue;
        }

          if (id === EntitiesId.SPICY) {
          const scale = 0.7 + 0.1 * Math.sin(t * 0.3)
          const size = cell * scale;
          const offset = (cell - size) / 2;

          ctx.drawImage(this.assets_loader.getAsset("spicy"), px + offset, py + offset, size, size);
          continue;
        }

        if (id === EntitiesId.BORDER_X) {
          const scale = 1
          const size = cell * scale;
          const offset = (cell - size) / 2;

          ctx.drawImage(this.assets_loader.getAsset("border_x"), px + offset, py + offset, size, size);
          continue;
        }

        if (id === EntitiesId.BORDER_Y_L) {
          const scale = 1
          const size = cell * scale;
          const offset = (cell - size) / 2;

          ctx.drawImage(this.assets_loader.getAsset("border_y"), px + offset, py + offset, size, size);
          continue;
        }

        if (id === EntitiesId.BORDER_Y_R) {
          const scale = 1;
          const size = cell * scale;
          const offset = (cell - size) / 2;

          ctx.save();
          ctx.translate(px + size / 2 + offset, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(this.assets_loader.getAsset("border_y"), -size / 2, py + offset, size, size);
          ctx.restore();

          continue;
        }




        if (id === EntitiesId.BORDER_CORNER_BL ||
          id === EntitiesId.BORDER_CORNER_BR ||
          id === EntitiesId.BORDER_CORNER_TL ||
          id === EntitiesId.BORDER_CORNER_TR
        ) {
          this.drawBorderCorner(x, y, id);

          continue;
        }




        if (
          id === EntitiesId.SNAKE_TAIL_UP ||
          id === EntitiesId.SNAKE_TAIL_DOWN ||
          id === EntitiesId.SNAKE_TAIL_LEFT ||
          id === EntitiesId.SNAKE_TAIL_RIGHT
        ) {
          this.drawTail(x, y, id);
          //this.drawTail(interpolated_x, interpolated_y, id);
          continue;
        }

        if (
          id === EntitiesId.SNAKE_HEAD_UP ||
          id === EntitiesId.SNAKE_HEAD_DOWN ||
          id === EntitiesId.SNAKE_HEAD_LEFT ||
          id === EntitiesId.SNAKE_HEAD_RIGHT
        ) {
          this.drawHead(x, y, id);
          //this.drawHead(interpolated_x, interpolated_y, id);
          continue;
        }

        const EntityToColor: Partial<Record<EntitiesId, string>> = {
          "ground": "rgba(255,255,255,0)",
        };

        ctx.fillStyle = EntityToColor[id] ?? "rgba(255,0,0,0)";
        ctx.fillRect(px, py, cell, cell);




      }
    }
  }

  private drawBorderCorner(x: number, y: number, id: EntitiesId) {
    const ctx = this.ctx;
    const cell = this.cellSize;

    const cx = x * cell + cell / 2;
    const cy = y * cell + cell / 2;

    ctx.save();
    ctx.translate(cx, cy);

    let rotation = 0;
    let scaleX = 1,
      scaleY = 1;
    switch (id) {
      case EntitiesId.BORDER_CORNER_BL:
        scaleX = -1;
        break;

      case EntitiesId.BORDER_CORNER_TL:
        scaleX = -1;
        break;
    }

    ctx.rotate(rotation);
    ctx.scale(scaleX, scaleY);

    const w = cell * 1;
    const h = cell * 1;

    ctx.drawImage((id == EntitiesId.BORDER_CORNER_BR || id == EntitiesId.BORDER_CORNER_BL) ? this.assets_loader.getAsset("border_corner") : this.assets_loader.getAsset("border_corner_top"), -w / 2, -h / 2, w, h);

    ctx.restore();
  }

  private drawStars(cx: number, cy: number, t: number) {

    const ctx = this.ctx;
    const cell = this.cellSize;

    const starCount = 5;
    const radius = cell;
    const speed = 0.05;

    for (let i = 0; i < starCount; i++) {
      const angle = t * speed + (i * (2 * Math.PI / starCount));
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;

      const size = cell * 0.5;
      ctx.drawImage(this.assets_loader.getAsset("star"), x - size / 2, y - size / 2, size, size);
    }
  }


  private drawHead(x: number, y: number, id: EntitiesId) {
    const ctx = this.ctx;
    const cell = this.cellSize;

    const cx = x * cell + cell / 2;
    const cy = y * cell + cell / 2;

    ctx.save();
    ctx.translate(cx, cy);

    let rotation = 0;
    if (id === EntitiesId.SNAKE_HEAD_DOWN) rotation = Math.PI;
    if (id === EntitiesId.SNAKE_HEAD_LEFT) rotation = -Math.PI / 2;
    if (id === EntitiesId.SNAKE_HEAD_RIGHT) rotation = Math.PI / 2;

    ctx.rotate(rotation);

    const size = cell * 1.2;

    ctx.drawImage(
      (this.game.state == "playing-end" || this.game.state === "auto-playing-end") ? this.snake_skin.head_dead : this.game.snake_state == "near_apple"
        ? this.snake_skin.head_tongue
        : this.game.snake_state == "bite_apple"
          ? this.snake_skin.head_bite
          : this.snake_skin.head,
      -size / 2,
      -size / 2,
      size,
      size
    );



    ctx.restore();


  }

  private drawTail(x: number, y: number, id: EntitiesId) {
    const ctx = this.ctx;
    const cell = this.cellSize;

    const cx = x * cell + cell / 2;
    const cy = y * cell + cell / 2;

    ctx.save();
    ctx.translate(cx, cy);

    let rotation = 0;
    let flipX = 1;
    let flipY = 1;

    if (id === EntitiesId.SNAKE_TAIL_LEFT) rotation = Math.PI / 2;
    if (id === EntitiesId.SNAKE_TAIL_RIGHT) rotation = -Math.PI / 2;
    flipX = -1;
    if (id === EntitiesId.SNAKE_TAIL_UP) rotation = Math.PI;
    flipY = -1;

    ctx.rotate(rotation);
    ctx.scale(flipX, flipY);

    const w = cell * 1;
    const h = cell;

    ctx.drawImage(this.snake_skin.tail, -w / 2, -h / 2, w, h);

    ctx.restore();
  }

  private drawThinBody(x: number, y: number, id: EntitiesId) {
    const ctx = this.ctx;
    const cell = this.cellSize;

    const cx = x * cell + cell / 2;
    const cy = y * cell + cell / 2;

    ctx.save();
    ctx.translate(cx, cy);

    let rotation = 0;
    let flipX = 1;
    let flipY = 1;

    if (id === EntitiesId.SNAKE_BODY_X_L) rotation = Math.PI / 2;
    if (id === EntitiesId.SNAKE_BODY_X_R) {
      rotation = -Math.PI / 2;
      flipX = -1;
    }
    if (id === EntitiesId.SNAKE_BODY_Y_T) flipY = -1;

    ctx.rotate(rotation);
    ctx.scale(flipX, flipY);

    const w = cell * 1;
    const h = cell;

    ctx.drawImage(this.snake_skin.body, -w / 2, -h / 2, w, h);

    ctx.restore();
  }

  private drawCorner(x: number, y: number, id: EntitiesId) {
    const ctx = this.ctx;
    const cell = this.cellSize;

    const cx = x * cell + cell / 2;
    const cy = y * cell + cell / 2;

    ctx.save();
    ctx.translate(cx, cy);

    let rotation = 0;
    let scaleX = 1,
      scaleY = 1;
    switch (id) {
      case EntitiesId.SNAKE_BODY_CORNER_TL:
        rotation = Math.PI;
        scaleX = -1;
        break;
      case EntitiesId.SNAKE_BODY_CORNER_LT:
        rotation = Math.PI / 2;
        break;
      case EntitiesId.SNAKE_BODY_CORNER_TR:
        rotation = Math.PI;
        break;
      case EntitiesId.SNAKE_BODY_CORNER_RT:
        rotation = -Math.PI / 2;
        scaleX = -1;
        break;
      case EntitiesId.SNAKE_BODY_CORNER_BL:
        rotation = Math.PI * 2;
        break;
      case EntitiesId.SNAKE_BODY_CORNER_LB:
        rotation = -Math.PI / 2;
        scaleY = -1;
        break;
      case EntitiesId.SNAKE_BODY_CORNER_BR:
        rotation = Math.PI;
        scaleX = 1;
        scaleY = -1;
        break;
      case EntitiesId.SNAKE_BODY_CORNER_RB:
        rotation = -Math.PI / 2;
        break;
    }

    ctx.rotate(rotation);
    ctx.scale(scaleX, scaleY);

    const w = cell * 1;
    const h = cell * 1;
    ctx.drawImage(this.snake_skin.corner, -w / 2, -h / 2, w, h);

    ctx.restore();
  }
}
