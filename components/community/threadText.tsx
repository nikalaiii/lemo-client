"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

interface ExtractionText {
  type: "link" | "text";
  content: string;
  anchor?: string;
}

// функция парсера силок в тексті. якщо ми натискаємся на структуру /$link)title)path то добавляєм її як силку, все осталне - обичний текст

const ThreadText = ({ text }: { text: string }) => {
  const exctractLinks = useCallback((text: string): ExtractionText[] => {
    const exctracted: ExtractionText[] = [];

    const extractRegexp = new RegExp(/^\/\$link\)([^=]+)\)(.+)$/);

    const splitted = text.split(" ");

    for (const word of splitted) {
      if (word.match(extractRegexp)) {
        const splittedLink = word.split(")");
        exctracted.push({
          type: "link",
          content: splittedLink[1],
          anchor: splittedLink[2],
        });
      } else {
        exctracted.push({ type: "text", content: word });
      }
    }

    return exctracted;
  }, []);

  const extracted = useMemo(() => exctractLinks(text), [text]);

  return (
    <Typography variant="body2">
      {extracted.map((item, index) =>
        item.type === "link" ? (
          <a style={{ color: "green"}} key={index} href={item.anchor!} target="blank">
            {item.content} {" "}
          </a>
        ) : (
          <span key={index}>{item.content} </span>
        ),
      )}
    </Typography>
  );
};

export default ThreadText;
