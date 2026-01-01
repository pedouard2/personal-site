import React from "react";
import { Chrono } from "react-chrono";

export default function TimelineWrapper({ items, contents }) {
  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <Chrono 
        items={items} 
        mode="VERTICAL_ALTERNATING"
      >
        {/* This wrapper handles the conversion from String -> React Node */}
        {contents.map((html, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: html }} />
        ))}
      </Chrono>
    </div>
  );
}