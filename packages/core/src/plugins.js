import global from 'global';

/**
 * @typedef {Object} DesignTokenPage
 * @prop {string} id
 * @prop {string} title
 * @prop {string} path
 * @prop {string} [description]
 * @prop {string[]} tokenCategories
 * @prop {Function<React.ReactElement>} render
 */

class PluginStore {
  constructor() {
    this.plugins = {};
    this.homePage = null;
    this.designTokensGroupPages = {};
  }

  /**
   * @return {DesignTokenPage[]}
   */
  get designTokensPages() {
    return Object.values(this.designTokensGroupPages);
  }

  /**
   * Register Bedrock plugin
   * @param {string} name - machine name of plugin; no spaces, lowercase
   * @param {Function} plugin - Plugin function
   * @return {null} - Adds plugin to internal set
   */
  register(name, plugin) {
    // console.log('plugin registered', { name });
    this.plugins[name] = plugin;
  }

  /**
   * @param {Object} options - Options to pass in
   * @param {Function} options.render - Render function that pass props to custom component
   * @return {null} - Sets the Home page
   */
  setHomePage({ render }) {
    this.homePage = { render };
  }

  /**
   * @param {DesignTokenPage} config
   * @return {null}
   */
  addDesignTokensGroupPage({
    id,
    title,
    description = '',
    tokenCategories,
    render,
  }) {
    this.designTokensGroupPages[id] = {
      id,
      title,
      description,
      path: `/design-tokens/${id}`,
      tokenCategories,
      render,
    };
  }

  loadPlugins(api) {
    Object.keys(this.plugins)
      .map(name => this.plugins[name])
      .forEach(plugin => plugin(api));
  }
}

// Enforce plugins store to be a singleton
const KEY = '__BEDROCK_PLUGINS';
function getPluginStore() {
  if (!global[KEY]) {
    global[KEY] = new PluginStore();
  }
  return global[KEY];
}

/** @type {PluginStore} */
export const plugins = getPluginStore();