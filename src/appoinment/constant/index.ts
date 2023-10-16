import { StringArrayBox } from '@/global/graphql/input/string-array-box.input';
import { StringBox } from '@/global/graphql/input/string-box.input';
import { createUnionType } from '@nestjs/graphql';

export const StringOrArrayStringUnion = createUnionType({
  name: 'StringOrArrayStringUnion',
  types: () => [StringBox, StringArrayBox] as const,
});

export type ServicesResult = {
  services: string[];
};
