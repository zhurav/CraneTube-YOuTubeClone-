"use client";

import { trpc } from '../../trpc/client';

export const PageClient = () => {
    const [data] = trpc.hello.useSuspenseQuery({ text: 'Alexander' });
    return (
        <div>
            Page Client says: {data.greeting}
        </div>
    );
}