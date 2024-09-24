import "@testing-library/jest-dom/vitest";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

expect.extend(matchers);

afterEach(() => {
    // runs a cleanup after each test case (e.g. clearing jsdom)
    cleanup();
});
