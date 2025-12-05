export enum EntitiesId {
    GROUND      = "ground",
    
    SNAKE_BODY_X_L = "snake-body-x-l",
    SNAKE_BODY_X_R = "snake-body-x-r",
    SNAKE_BODY_Y_T = "snake-body-y-t",
    SNAKE_BODY_Y_B = "snake-body-y-b",

    SNAKE_BODY_CORNER_LT = "snake-body-corner-l-t", 
    SNAKE_BODY_CORNER_LB = "snake-body-corner-l-b", 
    SNAKE_BODY_CORNER_RT = "snake-body-corner-r-t",
    SNAKE_BODY_CORNER_RB = "snake-body-corner-r-b",
    SNAKE_BODY_CORNER_TL = "snake-body-corner-t-l", 
    SNAKE_BODY_CORNER_TR = "snake-body-corner-t-r", 
    SNAKE_BODY_CORNER_BL = "snake-body-corner-b-l", 
    SNAKE_BODY_CORNER_BR = "snake-body-corner-b-r", 
 

    SNAKE_HEAD_UP = "snake-head-up",
    SNAKE_HEAD_DOWN = "snake-head-down",
    SNAKE_HEAD_LEFT = "snake-head-left",
    SNAKE_HEAD_RIGHT = "snake-head-right",

    SNAKE_TAIL_UP = "snake-tail-up",
    SNAKE_TAIL_DOWN = "snake-tail-down",
    SNAKE_TAIL_LEFT = "snake-tail-left",
    SNAKE_TAIL_RIGHT = "snake-tail-right",
    
    BORDER_Y_R    = "border-y-r",
    BORDER_Y_L    = "border-y-l",
    BORDER_X    = "border-x",
    BORDER_CORNER_TL   = "border-corner-tl",
    BORDER_CORNER_TR   = "border-corner-tr",
    BORDER_CORNER_BL   = "border-corner-bl",
    BORDER_CORNER_BR   = "border-corner-br",
    
    APPLE       = "apple",
    SPICY       = "spicy",
    
}

export type EntityId = `${EntitiesId}`

export type Entity = {
    id:EntitiesId
    collision:boolean,
    score:number,
}

export type Position = {
    y: number,
    x: number,
}

export type Direction = "left" | "right" | "up" | "down" 

export type SnakeSkin = {
    body:HTMLImageElement
    corner:HTMLImageElement
    tail:HTMLImageElement
    head:HTMLImageElement
    head_tongue:HTMLImageElement
    head_bite:HTMLImageElement
    head_dead:HTMLImageElement
}  