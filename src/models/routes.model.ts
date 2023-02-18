import React from 'react';

export interface IRouteParams {
  id: string;
  value: string;
}

export interface IRoute {
  title: string;
  path: string;
  content: string | React.ReactNode;
  containParam?: boolean;
  params?: Array<IRouteParams>
}
