import React from "react";
import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";

// PrimeReact Styles
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function PrimeTimeline({ events }) {
  const customizeContent = (item) => {
    return (
      <Card className="shadow-sm mb-8 rounded-lg border-none">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-4">
          {/* Text Group */}
          <div>
            <h3 className="text-xl font-bold m-0 text-gray-900 leading-tight">
              {item.title}
            </h3>

            <div className="flex items-center gap-3 mt-1 text-sm text-gray-600 font-medium">
              <span>@ {item.company}</span>

              <span
                className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide
              ${
                item.type === "Work"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-pink-100 text-pink-800"
              }`}
              >
                {item.type}
              </span>
            </div>
          </div>

          {/* LOGO: Clean Tailwind classes */}
          {item.image && (
            <img
              src={item.image.src || item.image}
              alt={item.company}
              className="object-contain rounded bg-white p-0.5 border border-gray-100 w-[50px] h-[50px] shrink-0"
            />
          )}
        </div>

        <hr className="border-t border-gray-200 my-4" />

        {/* BODY */}
        <div
          className="prose prose-sm prose-blue max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: item.html }}
        />
      </Card>
    );
  };
  const customizeMarker = () => {
    return (
      <span className="w-4 h-4 bg-white border-2 border-blue-500 rounded-full block" />
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Timeline
        value={events}
        align="alternate"
        content={customizeContent}
        marker={customizeMarker}
        opposite={(item) => (
          <small className="text-gray-500 font-medium">{item.date}</small>
        )}
      />
    </div>
  );
}
