import React, { useState } from "react";
import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function PrimeTimeline({ events }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const customizeContent = (item) => {
    // LOGIC: Only show first 4 in the preview
    const visibleSkills = item.skills ? item.skills.slice(0, 4) : [];
    const remainingCount = item.skills ? item.skills.length - 4 : 0;

    return (
      <div
        onClick={() => setSelectedEvent(item)}
        className="transform transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
      >
        <Card className="shadow-sm mb-8 rounded-lg border border-gray-100 group-hover:shadow-md group-hover:border-blue-200 transition-colors pt-2 pb-2">
          {/* HEADER (Role & Company) */}
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1 pr-2">
              <h3 className="text-lg font-bold m-0 text-gray-900 leading-tight">
                {item.title}
              </h3>
              <div className="text-sm text-gray-600 font-semibold mt-1">
                @ {item.company}
              </div>
            </div>
            {item.image && (
              <img
                src={item.image.src || item.image}
                alt={item.company}
                className="object-contain rounded bg-white p-0.5 border border-gray-100 w-[40px] h-[40px] shrink-0"
              />
            )}
          </div>

          {/* BODY PREVIEW */}
          {/* <div className="relative mb-3">
            <div
              className="prose prose-sm max-w-none text-gray-600 line-clamp-2 leading-snug"
              dangerouslySetInnerHTML={{ __html: item.html }}
            />
          </div> */}

          {/* FOOTER: PREVIEW SKILLS (Max 4) */}
          {visibleSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-50">
              {visibleSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] font-bold px-2 py-1 rounded bg-blue-50 text-blue-600 tracking-wide border border-blue-100"
                >
                  {skill}
                </span>
              ))}

              {/* The "+X" Badge */}
              {remainingCount > 0 && (
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-100 text-gray-500 tracking-wide border border-gray-200">
                  +{remainingCount}
                </span>
              )}
            </div>
          )}
        </Card>
      </div>
    );
  };

  const customizeMarker = (item) => {
    const colorClass =
      item.type === "Work"
        ? "bg-cyan-400 border-cyan-200"
        : "bg-pink-400 border-pink-200";
    return (
      <span
        className={`w-4 h-4 rounded-full block border-2 ring-2 ring-white ${colorClass}`}
      />
    );
  };

  const renderDialogHeader = () => {
    if (!selectedEvent) return null;
    return (
      <div className="flex items-center gap-3 pr-8">
        {selectedEvent.image && (
          <img
            src={selectedEvent.image.src || selectedEvent.image}
            className="w-12 h-12 object-contain border rounded-md"
          />
        )}
        <div>
          <h2 className="text-xl font-bold m-0">{selectedEvent.title}</h2>
          <p className="text-sm text-gray-500 m-0">@ {selectedEvent.company}</p>
        </div>
      </div>
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
          <small className="text-gray-400 font-medium text-xs uppercase tracking-widest">
            {item.date}
          </small>
        )}
      />

      <Dialog
        visible={!!selectedEvent}
        header={renderDialogHeader}
        style={{ width: "50vw", minWidth: "350px" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        onHide={() => setSelectedEvent(null)}
        dismissableMask={true}
        draggable={false}
        className="p-fluid"
      >
        {selectedEvent && (
          <div className="mt-2">
            {/* Full Description */}
            <div
              className="prose prose-blue max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: selectedEvent.html }}
            />

            {/* FULL SKILLS LIST (All of them) */}
            {selectedEvent.skills && selectedEvent.skills.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-gray-50 text-gray-700 px-3 py-1 rounded-md text-sm font-medium border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Dialog>
    </div>
  );
}
