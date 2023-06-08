import fs from 'node:fs';
import Configstore from 'configstore';

const createConfigStore = (configName, initialData = {}) => {
  const packageJson = JSON.parse(
    fs.readFileSync(process.cwd() + '/package.json', 'utf8')
  );
  return new Configstore(configName || packageJson.name, initialData);
};

const config = createConfigStore('githook', { emoji: false });

const getConfigValue = async (config, key) => {
  return config.get(key);
};

const setConfigValue = (config, key, value) => {
  config.set(key, value);
};

const deleteConfigValue = (config, key) => {
  config.delete(key);
};

const getAllConfigValues = (config) => {
  return config.all;
};

export {
  createConfigStore,
  getConfigValue,
  setConfigValue,
  deleteConfigValue,
  getAllConfigValues,
  config
};
