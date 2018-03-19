import chai from 'chai';
import chaiThings from 'chai-things';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';


chai.config.includeStack = true;
chai.use(chaiThings);
chai.use(sinonChai);

global.assert = chai.assert;
global.expect = chai.expect;
global.sinon = sinon;

global.jestExpect = global.expect;
