import 'isomorphic-fetch';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';


// Configure Chai
chai.config.includeStack = true;
chai.use(chaiAsPromised);
chai.use(sinonChai);

// Keep a reference to Jest's expect() so that we can use it for snapshot testing.
global.jestExpect = global.expect;

// I prefer Chai over Jest's assertions, so let's use that.
global.assert = chai.assert;
global.expect = chai.expect;

// I prefer Sinon over Jest's mocking capabilities, so let's use that.
global.sinon = sinon;
