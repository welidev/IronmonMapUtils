import { GiftData, GiftReceivable, Pokemon } from "../data";
import { Tooltip } from "./Tooltip";
import "./Gift.css";
import { useEntityMark, useHoverableTooltip } from "../hooks";
import { InteractablePolygon } from "./InteractablePolygon";
import React from "react";
import { EntityMarkIcon } from "./EntityMark";
import { useAppSelector } from "../state";
import GiftIcon from "../assets/GiftItem.svg";

export interface GiftProps extends GiftData {
  height: number;
  width: number;
}

const formatReceive = (receive: GiftReceivable): string => {
  if (typeof receive === "string") {
    return receive;
  }
  if (Array.isArray(receive)) {
    return receive.map((item) => item.name).join(", ");
  }
  const pokemon = receive as Pokemon;
  const held = pokemon.heldItem ? ` (holding ${pokemon.heldItem})` : "";
  return `Lv.${pokemon.level} ${pokemon.name}${held}`;
};

export const Gift = (props: GiftProps) => {
  const { x, y, height, width, receive, conditions, url, tooltipPosition } =
    props;
  const marks = React.useRef<EntityMarkIcon[]>([
    "none",
    "checked",
    "crossed",
    "starred",
  ]);

  const { highlightGifts } = useAppSelector((state) => state.settings);
  const showTooltip = useAppSelector((state) => state.settings).showItemData;

  const { currentMark, incrementMark, EntityMark } = useEntityMark(
    marks.current
  );

  const { shouldShowTooltip, showTooltipOnHover, hideTooltipOnHover } =
    useHoverableTooltip(showTooltip);

  return (
    <>
      <InteractablePolygon
        onClick={incrementMark}
        onMouseEnter={showTooltipOnHover}
        onMouseLeave={hideTooltipOnHover}
        x={x}
        y={y}
        height={height}
        width={width}
      >
        <foreignObject
          x={x - 2}
          y={y - 2}
          width={16}
          height={16}
          style={{ overflow: "visible" }}
        >
          <span
            className={`${highlightGifts ? "highlight" : ""} gift`}
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <img
              src={GiftIcon}
              alt="Gift"
              style={{ width: "100%", height: "100%" }}
            />
          </span>
        </foreignObject>
        <EntityMark x={x + 1} y={y} size={12} mark={currentMark} />
      </InteractablePolygon>
      <Tooltip
        x={x}
        y={y}
        show={shouldShowTooltip}
        targetWidth={width}
        targetHeight={height}
        tooltipPosition={tooltipPosition}
      >
        <div className="gift-name">Gift</div>
        <div className="gift-info">
          <div>{formatReceive(receive)}</div>
          {conditions && <div className="gift-condition">{conditions}</div>}
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: "7px" }}
          >
            Bulbapedia
          </a>
        )}
      </Tooltip>
    </>
  );
};
