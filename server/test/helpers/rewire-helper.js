const sinon = require('sinon');

function createSinonSpyOnDependency(myModule, dependencyName) {
  const dependency = myModule.__get__(dependencyName);
  const dependencySpy = sinon.spy(dependency);
  myModule.__set__(dependencyName, dependencySpy);

  return dependencySpy;
}

function createSinonSpyOnDependencyFunction(myModule, dependencyName, func) {
  const dependency = myModule.__get__(dependencyName);
  const funcSpy = sinon.spy(dependency, func);

  return funcSpy;
}

module.exports = {
  createSinonSpyOnDependency,
  createSinonSpyOnDependencyFunction,
};
