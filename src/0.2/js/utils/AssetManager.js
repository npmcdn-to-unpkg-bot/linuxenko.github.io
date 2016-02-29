class AssetManager {

  static load(assets, cb) {
    return new AssetManager(assets, cb);
  }

  constructor(assets, cb) {
    if (arguments.length < 2) {
      throw new Error('Wrong arguments');
    }

    this.cb = cb;
    this.assets = {};

    Object.keys(assets).forEach((k) => {
      this.assets[k] = {
        url : assets[k],
        isComplete : false
      }
    });

    this.queue();
  }

  queue() {
    Object.keys(this.assets).forEach((k) => {
      let asset = this.assets[k];
      asset.el = document.createElement('img');
      asset.el.onload = this.onLoad.bind(this, asset);
      asset.el.src = asset.url;
    });
  }

  onLoad(asset) {
    let isAssetsComplete = true;
    asset.isComplete = true;

    Object.keys(this.assets).forEach((k) => {
      if (this.assets[k].isComplete === false) {
        isAssetsComplete = false;
      }
    });

    if (isAssetsComplete === true) {
      this.onComplete();
    }
  }

  onComplete () {
    this.cb(this.assets);
  }
}

export default AssetManager;
