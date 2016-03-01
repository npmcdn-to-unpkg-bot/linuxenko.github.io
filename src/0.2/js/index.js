//import 'babel-polyfill';   // I can write code even without it :P
import AssetManager from './utils/AssetManager';
import DSC from './screen/dsc';
import BG from './screen/bg';


let bscAssets = {
  logo : 'assets/img/bsc-logo.png'
};


function onAssetsLoaded(assets) {
  DSC.getInstance({
    assets : assets,
    canvas : document.getElementById('dsc-logo')
  });

  BG.getInstance({
    assets : assets,
    canvas : document.getElementById('screen-background')
  });
}

AssetManager.load(bscAssets, onAssetsLoaded);
