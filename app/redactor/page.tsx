"use client";
import { Candle, CandleProps } from "@/components/redactor/candle";
import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

type CandleType = CandleProps & { id: number };

const candleSlotWidth = 30;

interface DragStateInterface {
  startY: number;
  slotIndex: number;
  rect: DOMRect;
}

const TOP_BAR_HEIGHT = 64;
const SIDE_BAR_WIDTH = 64;

type EditKey = "open" | "close" | "wickTop" | "wickBottom";

/**
 * Apply edit to candle coordinates with dependency rules:
 * - Body: when close reaches open → flip direction and continue; when open/close reaches wick → move tail with body. Tail cannot be smaller than body.
 * - Tail: when wick reaches body → move body with tail. Body cannot be larger than tail.
 */
function applyCandleEdit(
  candle: CandleType,
  key: EditKey,
  y: number,
): CandleType {
  let { open, close, wickTop, wickBottom } = candle;

  if (key === "open") {
    const crossesClose =
      (open < close && y > close) || (open > close && y < close);
    if (crossesClose) {
      open = candle.close;
      close = y;
      wickTop = Math.min(wickTop, Math.min(open, close));
      wickBottom = Math.max(wickBottom, Math.max(open, close));
    } else {
      open = y;
      if (y < wickTop) wickTop = y;
      if (y > wickBottom) wickBottom = y;
    }
  } else if (key === "close") {
    const crossesOpen =
      (close < open && y > open) || (close > open && y < open);
    if (crossesOpen) {
      close = candle.open;
      open = y;
      wickTop = Math.min(wickTop, Math.min(open, close));
      wickBottom = Math.max(wickBottom, Math.max(open, close));
    } else {
      close = y;
      if (y < wickTop) wickTop = y;
      if (y > wickBottom) wickBottom = y;
    }
  } else if (key === "wickTop") {
    wickTop = Math.min(y, wickBottom);
    const bodyTop = Math.min(open, close);
    if (wickTop > bodyTop) {
      if (open <= close) open = wickTop;
      else close = wickTop;
    }
  } else if (key === "wickBottom") {
    wickBottom = Math.max(y, wickTop);
    const bodyBottom = Math.max(open, close);
    if (wickBottom < bodyBottom) {
      if (open >= close) open = wickBottom;
      else close = wickBottom;
    }
  }

  return { ...candle, open, close, wickTop, wickBottom };
}

const RedactorPage = () => {
  const [candlesCount, setCandlesCount] = useState(0);
  const [slots, setSlots] = useState<(CandleType | null)[]>([]);
  const [spawningCandle, setSpawningCandle] = useState<CandleType | null>(null);
  const [dragState, setDragState] = useState<DragStateInterface | null>(null);

  useEffect(() => {
    setCandlesCount(Math.floor(window.innerWidth / candleSlotWidth));
  }, []);

  useEffect(() => {
    const count = Math.floor(candlesCount);
    const emptySlots = Array.from({ length: count - 1 }, () => null);
    setSlots([...emptySlots]);
  }, [candlesCount]);

  function handleClickSlot(e: React.MouseEvent<HTMLDivElement>, index: number) {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;

    if (!spawningCandle) {
      if (slots[index]) {
        setSlots((prev) => {
          const copy = prev.map((c) => (c ? { ...c, isEditing: false } : null));
          const existing = copy[index];
          if (existing) {
            copy[index] = {
              ...existing,
              onChangeOpen: handleEditCandle,
              onChangeClose: handleEditCandle,
              onChangeWickTop: handleEditCandle,
              onChangeWickBottom: handleEditCandle,
              isEditing: true,
            };
            // одразу оновлюємо dragState для цього слота
            setDragState({
              slotIndex: index,
              startY: rect.top,
              rect: rect,
            });
          }
          return copy;
        });
      } else {
        setSlots((prev) => {
          const copy = prev.map((c) => (c ? { ...c, isEditing: false } : null));
          return copy;
        });
        setDragState({
          slotIndex: index,
          startY: clickY,
          rect,
        });
        setSpawningCandle({
          id: Date.now(),
          width: candleSlotWidth,
          centerX: candleSlotWidth / 2,
          open: clickY,
          close: clickY,
          wickTop: clickY,
          wickBottom: clickY,
          bodyWidth: 18,
          height: rect.height,
          isEditing: false,
        });
        return;
      }
    }

    if (spawningCandle && dragState) {
      setSlots((prev) => {
        const copy = [...prev];
        copy[dragState.slotIndex] = spawningCandle;
        return copy;
      });
      setSpawningCandle(null);
      setDragState(null);
    }
  }

  useEffect(() => {
    if (!spawningCandle || !dragState) return;

    const handleMouseMove = (e: MouseEvent) => {
      const slotList = document.querySelectorAll(".candleSlot");
      const slot = slotList[dragState.slotIndex];
      if (!slot) return;

      const rect = slot.getBoundingClientRect();
      const currentY = e.clientY - rect.top;
      const startY = dragState.startY;

      setSpawningCandle((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          open: startY,
          close: currentY,
          wickTop: Math.min(prev.wickTop, currentY),
          wickBottom: Math.max(prev.wickBottom, currentY),
        };
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [dragState, spawningCandle]);

  function handleEditCandle(y: number, key: EditKey) {
    const editingIndex = slots.findIndex((c) => c?.isEditing === true);
    if (editingIndex === -1) return;

    setSlots((prev) => {
      const copy = [...prev];
      const candle = copy[editingIndex];
      if (!candle) return prev;
      copy[editingIndex] = applyCandleEdit(candle, key, y);
      return copy;
    });
  }

  return (
    <Box sx={{ height: "100vh", width: "100vw", background: "#000" }}>
      <Box
        sx={{
          position: "absolute",
          top: TOP_BAR_HEIGHT,
          left: SIDE_BAR_WIDTH,
          right: 0,
          bottom: 0,
          backgroundColor: "#000",
          overflow: "hidden",
          display: "flex",
        }}
      >
        <Typography
          variant="h3"
          sx={{ position: "absolute", top: "10%", left: "30%" }}
        >
          Create candles
        </Typography>
        {slots.length > 0 ? (
          slots.map((candle, index) => (
            <CandleSlot
              key={index}
              width={candleSlotWidth}
              handleClick={(e) => handleClickSlot(e, index)}
            >
              {candle && <Candle {...candle} />}
              {spawningCandle && dragState?.slotIndex === index && (
                <Candle {...spawningCandle} />
              )}
              {candle && candle.isEditing && dragState?.slotIndex === index && (
                <Candle {...candle} />
              )}
            </CandleSlot>
          ))
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Box>
  );
};

export default RedactorPage;

const CandleSlot = ({
  width,
  children,
  handleClick,
}: {
  width: number;
  children: React.ReactNode | null;
  handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}) => (
  <div
    className="candleSlot"
    onClick={handleClick}
    style={{
      minWidth: width,
      height: "100%",
    }}
  >
    {children}
  </div>
);
