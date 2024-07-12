import { GlobalConfig } from "../common/types/global-config.interface";

export const globalConfig = (): GlobalConfig => ({
  port: parseInt(process.env['PORT']) || 3000
});
