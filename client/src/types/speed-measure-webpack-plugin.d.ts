declare module 'speed-measure-webpack-plugin' {
  import webpack from 'webpack';

  export default class SpeedMeasureWebpackPlugin {
    options?: {
      disable?: boolean;
      outputFormat?: string | Function;
      outputTarget?: string | Function;
      pluginNames?: { [key: string]: string };
      granularLoaderData?: boolean;
    };

    wrap(config: webpack.Configuration): void;
  }
}
