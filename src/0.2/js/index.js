import 'babel-polyfill';
import AssetManager from './utils/AssetManager';
import DSC from './screen/dsc';


let bscAssets = {
  logo : 'assets/img/bsc-logo.png'
};


function onAssetsLoaded(assets) {
  DSC.getInstance({
    assets : assets,
    canvas : document.getElementById('dsc-logo')
  });
}

AssetManager.load(bscAssets, onAssetsLoaded);
