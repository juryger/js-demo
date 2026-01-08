import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest'
import { debounce } from "./debounce.js";

describe('debounce', async () => {
    const DEBOUNCE_TIMEOUT_100_MS = 100;
    const DEBOUNCE_TIMEOUT_150_MS = 150;

    let start;
    let end;
    let count = 0;

    const logInstrumented = (...args) => {
        end = Date.now();
        count++;
        console.log(...args);
    };

    beforeEach(() => {
        count = 0;
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        //vi.useRealTimers();
    });

    test(`debounce calls for ${DEBOUNCE_TIMEOUT_100_MS}ms`, async () => {
        const log = debounce(logInstrumented, DEBOUNCE_TIMEOUT_100_MS);

        start = Date.now();
        log("Hello");
        log("Hello 2");
        log("Hello 3"); // Logged at t=100ms
        vi.advanceTimersByTime(DEBOUNCE_TIMEOUT_100_MS);

        expect(count).toBe(1);
        expect(end - start).toBeCloseTo(DEBOUNCE_TIMEOUT_100_MS);
    });

    test(`debounce calls for ${DEBOUNCE_TIMEOUT_150_MS}ms`, async () => {
        const log = debounce(logInstrumented, DEBOUNCE_TIMEOUT_150_MS);

        start = Date.now();
        log("Hello");
        setInterval(() => {}, 50);
        vi.advanceTimersToNextTimer();
        log("Hello 2");
        vi.advanceTimersByTime(DEBOUNCE_TIMEOUT_150_MS); // Logged at t=200ms

        expect(count).toBe(1);
        expect(end - start).toBeCloseTo(DEBOUNCE_TIMEOUT_150_MS + 50);
    });
});
