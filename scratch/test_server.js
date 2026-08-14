import { join } from 'path';
import { pathToFileURL } from 'url';

async function test() {
  try {
    const handlerPath = join(process.cwd(), '.vercel', 'output', 'functions', '__server.func', 'index.mjs');
    console.log('Loading handler from:', handlerPath);
    const mod = await import(pathToFileURL(handlerPath).href);
    console.log('Handler imported successfully!');
    console.log('Keys:', Object.keys(mod));
    console.log('Default export:', mod.default);
    
    // Simulate a request
    if (mod.default && typeof mod.default.fetch === 'function') {
      console.log('Simulating fetch request for / ...');
      let req = new Request('http://localhost/');
      let res = await mod.default.fetch(req, {});
      console.log('Status /:', res.status);

      console.log('Simulating fetch request for /menu/waffles ...');
      req = new Request('http://localhost/menu/waffles');
      res = await mod.default.fetch(req, {});
      console.log('Status /menu/waffles:', res.status);

      console.log('Simulating fetch request for /menu/beverages ...');
      req = new Request('http://localhost/menu/beverages');
      res = await mod.default.fetch(req, {});
      console.log('Status /menu/beverages:', res.status);
    } else {
      console.log('Default export is not a fetch handler');
    }
  } catch (err) {
    console.error('Error during test:', err);
  }
}

test();
