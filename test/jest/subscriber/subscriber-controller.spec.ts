/* eslint-disable @typescript-eslint/no-explicit-any */
import controller from '../../../src/model/subscriber/subscriber-controller';

describe('subscriber controller', () => {
  const resStub:any = {
    status: () => ({ json: (obj: any) => Promise.resolve(obj) }),
  };
  const reqStub:any = { body: { email: 'foo@example.com' } };  
  it('catches error on newSubscriber', async () => {
    controller.model.create = jest.fn(() => Promise.reject(new Error('bad')));
    const r:any = await controller.newSubscriber(reqStub, resStub);
    expect(r.error.includes('failed to create')).toBe(true);
  });
});
