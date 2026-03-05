import { RoomData } from "../data";
import { Tooltip } from "./Tooltip";
import "./Room.css";
import { useHoverableTooltip } from "../hooks";
import React from "react";
import { useAppSelector } from "../state";

export interface RoomProps extends RoomData {}

export const Room = (props: RoomProps) => {
  const { name, points, url } = props;
  const [[x1, y1], [x2, y2]] = points;
  const w = x2 - x1;
  const h = y2 - y1;

  const showRooms = useAppSelector((state) => state.settings).showRooms;

  const { shouldShowTooltip, showTooltipOnHover, hideTooltipOnHover } =
    useHoverableTooltip(false);

  if (!showRooms) {
    return null;
  }

  return (
    <>
      <rect
        x={x1}
        y={y1}
        width={w}
        height={h}
        className={`room-rect ${showRooms ? "visible" : ""}`}
        onMouseEnter={showTooltipOnHover}
        onMouseLeave={hideTooltipOnHover}
      />
      <Tooltip
        x={x1}
        y={y1}
        show={shouldShowTooltip}
        targetWidth={w}
        targetHeight={h}
      >
        <div className="room-name">{name}</div>
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
