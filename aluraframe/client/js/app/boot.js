"use strict";

System.register(["./controllers/NegotiationController", "./polyfill/fetch"], function (_export, _context) {
  "use strict";

  var currentInstance, negotiationControler;
  return {
    setters: [function (_controllersNegotiationController) {
      currentInstance = _controllersNegotiationController.currentInstance;
    }, function (_polyfillFetch) {}],
    execute: function () {
      negotiationControler = new currentInstance();

      document.querySelector(".form").onsubmit = negotiationControler.add.bind(negotiationControler);
      document.querySelector("#btn-clear-list").onclick = negotiationControler.clearList.bind(negotiationControler);
    }
  };
});
//# sourceMappingURL=boot.js.map