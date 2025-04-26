import "@testing-library/jest-dom";
import { chrome as mockedChrome } from "./__mocks__/chrome";

(globalThis as unknown as { chrome: typeof mockedChrome }).chrome =
  mockedChrome;
