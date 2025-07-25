import {
  formatTimeFromSecondsToHHMMSS,
  formatTimeFromSecondsToMMSS,
} from "../formatTime";

describe("formatTimeFromSecondsToHHMMSS", () => {
  it("should format 0 seconds correctly", () => {
    expect(formatTimeFromSecondsToHHMMSS(0)).toBe("00:00:00");
  });

  it("should format seconds less than 60 correctly", () => {
    expect(formatTimeFromSecondsToHHMMSS(30)).toBe("00:00:30");
    expect(formatTimeFromSecondsToHHMMSS(59)).toBe("00:00:59");
  });

  it("should format minutes correctly", () => {
    expect(formatTimeFromSecondsToHHMMSS(60)).toBe("00:01:00");
    expect(formatTimeFromSecondsToHHMMSS(90)).toBe("00:01:30");
    expect(formatTimeFromSecondsToHHMMSS(3599)).toBe("00:59:59");
  });

  it("should format hours correctly", () => {
    expect(formatTimeFromSecondsToHHMMSS(3600)).toBe("01:00:00");
    expect(formatTimeFromSecondsToHHMMSS(3661)).toBe("01:01:01");
    expect(formatTimeFromSecondsToHHMMSS(7325)).toBe("02:02:05");
  });

  it("should format large time values correctly", () => {
    expect(formatTimeFromSecondsToHHMMSS(86399)).toBe("23:59:59");
    expect(formatTimeFromSecondsToHHMMSS(86400)).toBe("24:00:00");
    expect(formatTimeFromSecondsToHHMMSS(90000)).toBe("25:00:00");
  });

  it("should handle decimal values by flooring them", () => {
    expect(formatTimeFromSecondsToHHMMSS(30.7)).toBe("00:00:30");
    expect(formatTimeFromSecondsToHHMMSS(90.9)).toBe("00:01:30");
    expect(formatTimeFromSecondsToHHMMSS(3661.5)).toBe("01:01:01");
  });

  it("should handle negative values", () => {
    expect(formatTimeFromSecondsToHHMMSS(-30)).toBe("00:00:00");
    expect(formatTimeFromSecondsToHHMMSS(-90)).toBe("00:00:00");
  });
});

describe("formatTimeFromSecondsToMMSS", () => {
  it("should format 0 seconds correctly", () => {
    expect(formatTimeFromSecondsToMMSS(0)).toBe("00:00");
  });

  it("should format seconds less than 60 correctly", () => {
    expect(formatTimeFromSecondsToMMSS(30)).toBe("00:30");
    expect(formatTimeFromSecondsToMMSS(59)).toBe("00:59");
  });

  it("should format minutes correctly", () => {
    expect(formatTimeFromSecondsToMMSS(60)).toBe("01:00");
    expect(formatTimeFromSecondsToMMSS(90)).toBe("01:30");
    expect(formatTimeFromSecondsToMMSS(3599)).toBe("59:59");
  });

  it("should format hours correctly (showing as minutes)", () => {
    expect(formatTimeFromSecondsToMMSS(3600)).toBe("60:00");
    expect(formatTimeFromSecondsToMMSS(3661)).toBe("61:01");
    expect(formatTimeFromSecondsToMMSS(7325)).toBe("122:05");
  });

  it("should format large time values correctly", () => {
    expect(formatTimeFromSecondsToMMSS(86399)).toBe("1439:59");
    expect(formatTimeFromSecondsToMMSS(86400)).toBe("1440:00");
    expect(formatTimeFromSecondsToMMSS(90000)).toBe("1500:00");
  });

  it("should handle decimal values by flooring them", () => {
    expect(formatTimeFromSecondsToMMSS(30.7)).toBe("00:30");
    expect(formatTimeFromSecondsToMMSS(90.9)).toBe("01:30");
    expect(formatTimeFromSecondsToMMSS(3661.5)).toBe("61:01");
  });

  it("should handle negative values", () => {
    expect(formatTimeFromSecondsToMMSS(-30)).toBe("00:00");
    expect(formatTimeFromSecondsToMMSS(-90)).toBe("00:00");
  });
});
