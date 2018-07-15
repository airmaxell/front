import { TestModuleModule } from './test-module.module';

describe('TestModuleModule', () => {
  let testModuleModule: TestModuleModule;

  beforeEach(() => {
    testModuleModule = new TestModuleModule();
  });

  it('should create an instance', () => {
    expect(testModuleModule).toBeTruthy();
  });
});
