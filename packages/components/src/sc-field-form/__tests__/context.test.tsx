import { render } from '@solidjs/testing-library';
import type { FormInstance } from '..';
import Form, { FormProvider } from '../';
import InfoField from './common/InfoField';
import { changeValue, matchError, getInput } from './common';
import { timeout } from './common/timeout';
import { Component } from 'solid-js';
import { vi } from 'vitest';

describe('Form.Context', () => {
    it('validateMessages', async () => {
        const { container } = render(() => (
            <FormProvider validateMessages={{ required: "I'm global" }}>
                <Form>
                    <InfoField name="username" rules={[{ required: true }]} />
                </Form>
            </FormProvider>
        ));

        await changeValue(getInput(container), ['bamboo', '']);
        matchError(container, "I'm global");
    });

    it('change event', async () => {
        const onFormChange = vi.fn();

        const { container } = render(() => (
            <FormProvider onFormChange={onFormChange}>
                <Form name="form1">
                    <InfoField name="username" rules={[{ required: true }]} />
                </Form>
            </FormProvider>
        ));

        await changeValue(getInput(container), 'Light');
        expect(onFormChange).toHaveBeenCalledWith(
            'form1',
            expect.objectContaining({
                changedFields: [
                    {
                        errors: [],
                        warnings: [],
                        name: ['username'],
                        touched: true,
                        validating: false,
                        value: 'Light',
                        validated: false,
                    },
                ],
                forms: {
                    form1: expect.objectContaining({}),
                },
            }),
        );
        expect(onFormChange).toHaveBeenCalledWith(
            'form1',
            expect.objectContaining({
                changedFields: [
                    {
                        errors: [],
                        warnings: [],
                        name: ['username'],
                        touched: true,
                        validating: false,
                        value: 'Light',
                        validated: true,
                    },
                ],
                forms: {
                    form1: expect.objectContaining({}),
                },
            }),
        );
    });

    describe('adjust sub form', () => {
        it('basic', async () => {
            const onFormChange = vi.fn();

            const { container } = render(() => (
                <FormProvider onFormChange={onFormChange}>
                    <Form name="form1" />
                </FormProvider>
            ));

            render(() => (
                <FormProvider onFormChange={onFormChange}>
                    <Form name="form2">
                        <InfoField name="test" />
                    </Form>
                </FormProvider>
            ));

            await changeValue(getInput(container), 'Bamboo');
            const { forms } = onFormChange.mock.calls[0][1];
            expect(Object.keys(forms)).toEqual(['form2']);
        });

        it('multiple context', async () => {
            const onFormChange = vi.fn();

            const Demo: Component<{ changed?: boolean }> = props => (
                <FormProvider onFormChange={onFormChange}>
                    <FormProvider>
                        {!props.changed ? (
                            <Form name="form1" />
                        ) : (
                            <Form name="form2">
                                <InfoField name="test" />
                            </Form>
                        )}
                    </FormProvider>
                </FormProvider>
            );

            const { container } = render(() => <Demo />);

            render(() => <Demo changed />);

            const input = getInput(container);
            await changeValue(input, 'Bamboo');
            const { forms } = onFormChange.mock.calls[0][1];
            expect(Object.keys(forms)).toEqual(['form2']);
        });
    });

    it('submit', async () => {
        const onFormFinish = vi.fn();
        let form: FormInstance;

        const { container } = render(() => (
            <div>
                <FormProvider onFormFinish={onFormFinish}>
                    <Form name="form1" ref={form}>
                        <InfoField name="name" rules={[{ required: true }]} />
                    </Form>
                    <Form name="form2" />
                </FormProvider>
            </div>
        ));

        await changeValue(getInput(container), ['bamboo', '']);
        form?.submit();
        await timeout();
        expect(onFormFinish).not.toHaveBeenCalled();

        await changeValue(getInput(container), 'Light');
        form?.submit();
        await timeout();
        expect(onFormFinish).toHaveBeenCalled();

        expect(onFormFinish.mock.calls[0][0]).toEqual('form1');
        const info = onFormFinish.mock.calls[0][1];
        expect(info.values).toEqual({ name: 'Light' });
        expect(Object.keys(info.forms).sort()).toEqual(['form1', 'form2'].sort());
    });

    it('do nothing if no Provider in use', () => {
        render(() => (
            <div>
                <Form name="no" />
            </div>
        ));
        render(() => <div>{null}</div>);
    });
});
