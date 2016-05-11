/**
 * Created by luhtonen on 11/05/16.
 */

'use strict';

module.exports = function () {
  var element = document.createElement('h1');

  element.className = 'pure-button';
  element.innerHTML = 'Hello World';

  return element;
};