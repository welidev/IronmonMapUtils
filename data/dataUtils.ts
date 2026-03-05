import { TooltipPosition } from "../components";

/**
 * Bounding Box
 */
export interface BoundingBoxCoords {
  x: number;
  y: number;
}

export interface BoundingBox {
  topLeft: BoundingBoxCoords;
  topRight: BoundingBoxCoords;
  bottomRight: BoundingBoxCoords;
  bottomLeft: BoundingBoxCoords;
}

export const buildBoundingBox = (
  topLeftCoords: BoundingBoxCoords,
  width: number,
  height: number
): BoundingBox => {
  return {
    topLeft: {
      x: topLeftCoords.x,
      y: topLeftCoords.y,
    },
    topRight: {
      x: topLeftCoords.x + width,
      y: topLeftCoords.y,
    },
    bottomRight: {
      x: topLeftCoords.x + width,
      y: topLeftCoords.y + height,
    },
    bottomLeft: {
      x: topLeftCoords.x,
      y: topLeftCoords.y + height,
    },
  };
};

export const convertBoundingBoxToPolygonPoints = (box: BoundingBox) => {
  const topLeftString = `${box.topLeft.x},${box.topLeft.y}`;
  const topRightString = `${box.topRight.x},${box.topRight.y}`;
  const bottomRightString = `${box.bottomRight.x},${box.bottomRight.y}`;
  const bottomLeftString = `${box.bottomLeft.x},${box.bottomLeft.y}`;

  return `${topLeftString} ${topRightString} ${bottomRightString} ${bottomLeftString} ${topLeftString}`;
};

/**
 * Trainer
 */
export interface TrainerData {
  x: number; // x coordinate of the top-left pixel of this trainer
  y: number; // y coordinate of the top-left pixel of this trainer
  // points: string; // "points" attr for the <polygon> element
  name: string; // name of the trainer
  numPokemon: number; // number of pokemon this trainer has
  pokemonLevels: number[]; // Array of levels for the pokemon this trainer has
  walker?: boolean; // T/F if the trainer walks around
  spinner?: boolean; // T/F if the trainer is a stationary spinner
  tooltipPosition?: TooltipPosition; // Optional custom position of tooltip, to avoid overlap. Defaults to Top
}

/**
 * Item
 */
export interface ItemData {
  x: number; // x coordinate of the top-left pixel of this item
  y: number; // y coordinate of the top-left pixel of this item
  type: ItemType; // Type of the item
  name?: string; // e.g. "Potion", "TM31 Brick Break"
  url?: string; // Bulbapedia link
  spawnInfo?: string; // Special spawn rate information
}

export enum ItemType {
  Normal = 0,
  TM = 1,
  Hidden = 2,
}

/**
 * Pokemon
 */
export type Pokemon = {
  name: string;
  level: number;
  heldItem?: string;
};

/**
 * Gift
 */
export type ItemCategory = "keyobj" | "medicine" | "general" | "berry" | "ball";

export type GiftItem = {
  name: string;
  category?: ItemCategory;
};

export type GiftReceivable = Pokemon | GiftItem[] | string;

export interface GiftData {
  x: number;
  y: number;
  receive: GiftReceivable;
  conditions?: string;
  url?: string;
  tooltipPosition?: TooltipPosition;
}

/**
 * Trade
 */
export interface TradeData {
  x: number;
  y: number;
  receive: Pokemon;
  give: Pokemon;
  conditions?: string;
  url?: string;
  tooltipPosition?: TooltipPosition;
}

/**
 * Room
 */
export interface RoomData {
  name: string;
  points: [[number, number], [number, number]]; // [[x1, y1], [x2, y2]]
  url?: string;
}

/**
 * Portals
 */
export interface MapPortalData {
  portal1: BoundingBoxCoords;
  portal2: BoundingBoxCoords;
}

export type MapPortalGroup = {
  color: string;
  area: string;
  portals: MapPortalData[];
};
