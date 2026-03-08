import { Block } from '../block';

export type RouteConfig = {
  pathname?: string;
  block?: new () => Block;
  isPublic?: boolean;
};
