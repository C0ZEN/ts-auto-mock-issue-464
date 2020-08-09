import { createMock } from "ts-auto-mock";
import { logSomething } from "./log-something";
import { Client, Presence } from "discord.js";

describe(`logSomething()`, (): void => {
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
