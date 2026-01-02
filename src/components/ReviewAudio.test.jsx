import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ReviewAudioController from "./ReviewAudio";

// Mock Playlist Data
const mockPlaylist = [
  { title: "Intro", src: "/intro.mp3" },
  { title: "Hook", src: "/hook.mp3" },
];

describe("ReviewAudioController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the first track initially", () => {
    render(
      <ReviewAudioController playlist={mockPlaylist}>
        <div className="track-trigger" data-track-index="0">
          Text 1
        </div>
      </ReviewAudioController>,
    );

    // Check if Title matches first track
    expect(screen.getByText("Intro")).toBeInTheDocument();
    expect(screen.getByText("Track 1 / 2")).toBeInTheDocument();
  });

  it("plays audio when Play button is clicked", () => {
    render(
      <ReviewAudioController playlist={mockPlaylist}>
        <div />
      </ReviewAudioController>,
    );

    const playBtn = screen.getByText("PLAY");
    const audio = document.querySelector("audio");

    fireEvent.click(playBtn);

    expect(audio.play).toHaveBeenCalled();
    expect(screen.getByText("PAUSE")).toBeInTheDocument();
  });

  it("changes track when scrolling (IntersectionObserver triggers)", () => {
    // 1. Render component with triggers
    render(
      <ReviewAudioController playlist={mockPlaylist}>
        <div className="track-trigger" data-track-index="0">
          Part 1
        </div>
        <div className="track-trigger" data-track-index="1">
          Part 2
        </div>
      </ReviewAudioController>,
    );

    // 2. Get the Observer callback that was registered in the component
    // (We mocked the global IntersectionObserver, so we can access its calls)
    const observerCallback = window.IntersectionObserver.mock.calls[0][0];

    // 3. Simulate "Scrolling" to the second element
    // We manually invoke the callback with an "isIntersecting: true" entry
    const mockEntry = {
      isIntersecting: true,
      target: document.querySelector('[data-track-index="1"]'), // The second div
      getAttribute: (name) => "1", // Mock the attribute getter
    };

    act(() => {
      observerCallback([mockEntry]);
    });

    // 4. Assert that the Player updated
    expect(screen.getByText("Hook")).toBeInTheDocument(); // Title changed?
    expect(screen.getByText("Track 2 / 2")).toBeInTheDocument(); // Counter changed?

    // 5. Assert Audio Source updated
    const audio = document.querySelector("audio");
    expect(audio.getAttribute("src")).toBe("/hook.mp3");
  });

  it("does NOT auto-play on scroll if user has not clicked Play yet", () => {
    render(
      <ReviewAudioController playlist={mockPlaylist}>
        <div className="track-trigger" data-track-index="1">
          Part 2
        </div>
      </ReviewAudioController>,
    );

    const observerCallback = window.IntersectionObserver.mock.calls[0][0];
    const mockEntry = {
      isIntersecting: true,
      target: document.querySelector('[data-track-index="1"]'),
    };

    // Simulate Scroll
    act(() => {
      observerCallback([mockEntry]);
    });

    // Track changed visually...
    expect(screen.getByText("Hook")).toBeInTheDocument();

    // ...but Audio.play should NOT have been called yet
    const audio = document.querySelector("audio");
    expect(audio.play).not.toHaveBeenCalled();
  });
});
