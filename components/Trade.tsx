import { TradeData, Pokemon } from "../data";
import { Tooltip } from "./Tooltip";
import "./Trade.css";
import { useEntityMark, useHoverableTooltip } from "../hooks";
import { InteractablePolygon } from "./InteractablePolygon";
import React from "react";
import { EntityMarkIcon } from "./EntityMark";
import { useAppSelector } from "../state";
import TradeIcon from "../assets/TradeItem.svg";

export interface TradeProps extends TradeData {
  height: number;
  width: number;
}

const formatPokemon = (pokemon: Pokemon): string => {
  const held = pokemon.heldItem ? ` (holding ${pokemon.heldItem})` : "";
  return `Lv.${pokemon.level} ${pokemon.name}${held}`;
};

export const Trade = (props: TradeProps) => {
  const {
    x,
    y,
    height,
    width,
    receive,
    give,
    conditions,
    url,
    tooltipPosition,
  } = props;
  const marks = React.useRef<EntityMarkIcon[]>([
    "none",
    "checked",
    "crossed",
    "starred",
  ]);

  const { highlightTrades } = useAppSelector((state) => state.settings);
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
            className={`${highlightTrades ? "highlight" : ""} trade`}
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <img
              src={TradeIcon}
              alt="Trade"
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
        <div className="trade-name">Trade</div>
        <div className="trade-info">
          <div>Give: {formatPokemon(give)}</div>
          <div className="trade-arrow">&darr;</div>
          <div>Receive: {formatPokemon(receive)}</div>
          {conditions && <div className="trade-condition">{conditions}</div>}
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
