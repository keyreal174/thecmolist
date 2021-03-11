import { init } from "@rematch/core";
import fileModel from "./file";

describe("fileModel model", () => {
  it("reducer: updateFile", () => {
    const store = init({
      models: { fileModel },
    });
    const MOCKED_FILE = "MOCKED_FILE";

    store.dispatch.fileModel.updateFile(MOCKED_FILE);
    const fileModelData = store.getState().fileModel;

    expect(fileModelData.file).toEqual("MOCKED_FILE");
  });
});
