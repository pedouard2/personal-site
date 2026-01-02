import "@testing-library/jest-dom";
import { vi } from "vitest";

// 1. Mock IntersectionObserver
// FIX: Use a standard function so 'new IntersectionObserver()' works
const IntersectionObserverMock = vi.fn(function (cb, options) {
  return {
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
  };
});

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

// 2. Mock HTMLMediaElement (Audio) functions
window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
window.HTMLMediaElement.prototype.pause = vi.fn();
