import { createMock } from "ts-auto-mock";
import { logSomething } from "./log-something";
import { Client, Presence, PresenceData } from "discord.js";

describe(`logSomething()`, (): void => {
  describe(`error with setPresenceMock and strong typing`, (): void => {
    let setPresenceMock: jest.Mock<Promise<Presence>>;
    let client: Client;

    let consoleLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      setPresenceMock = jest
        .fn()
        .mockRejectedValue(new Error(`setPresence: error`));
      client = createMock<Client>({
        // Error here
        user: {
          setPresence: setPresenceMock,
        },
      });

      consoleLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    it(`should log something`, (): void => {
      expect.assertions(3);

      logSomething();

      expect(client).toStrictEqual(client);
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith(`something`);
    });
  });

  describe(`error with setPresenceMock and no typing`, (): void => {
    let setPresenceMock: jest.Mock;
    let client: Client;

    let consoleLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      setPresenceMock = jest
        .fn()
        .mockRejectedValue(new Error(`setPresence: error`));
      client = createMock<Client>({
        // Error here
        user: {
          setPresence: setPresenceMock,
        },
      });

      consoleLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    it(`should log something`, (): void => {
      expect.assertions(3);

      logSomething();

      expect(client).toStrictEqual(client);
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith(`something`);
    });
  });

  describe(`error with setPresence fake data`, (): void => {
    let client: Client;

    let consoleLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      client = createMock<Client>({
        // Error here
        user: {
          setPresence: (_data: PresenceData): Promise<Presence> =>
            Promise.resolve(createMock<Presence>()),
        },
      });

      consoleLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    it(`should log something`, (): void => {
      expect.assertions(3);

      logSomething();

      expect(client).toStrictEqual(client);
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith(`something`);
    });
  });

  describe(`no error without setPresenceMock`, (): void => {
    let client: Client;

    let consoleLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      client = createMock<Client>({
        user: {},
      });

      consoleLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    it(`should log something`, (): void => {
      expect.assertions(3);

      logSomething();

      expect(client).toStrictEqual(client);
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith(`something`);
    });
  });
});
