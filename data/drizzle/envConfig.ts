import { loadEnvConfig } from '@next/env';

const projectDir = process.cwd();
// It's stupid that dev needs to be passed in, but it isn't actually handled internally
loadEnvConfig(projectDir, process.env.NODE_ENV === "development");
