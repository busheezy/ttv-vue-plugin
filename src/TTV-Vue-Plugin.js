const callbacks = [
  'onApiStatusChange',
  'onPageChange',
  'onPlaylistChange',
  'onGeoChange',
  'onOverrideStart',
  'onOverrideEnd',
  'onSerialMessage',
];

const TTVVuePlugin = {
  install(Vue) {
    Vue.prototype.$ttvSDK = null;

    Vue.mixin({
      mounted() {
        window.onloadTelemetryTV = (ttvSDK) => {
          Vue.prototype.$ttvSDK = Vue.observable(ttvSDK);

          if (!this.$options.ttv) {
            return;
          }

          if (this.$options.ttv.onloadTelemetryTV) {
            this.$options.ttv.onloadTelemetryTV.bind(this)();
          }

          callbacks.forEach((callbackName) => {
            if (this.$options.ttv[callbackName]) {
              ttvSDK[callbackName](this.$options.ttv[callbackName].bind(this));
            }
          });
        };
      },
    });
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(TTVVuePlugin);
}

module.exports = TTVVuePlugin;
