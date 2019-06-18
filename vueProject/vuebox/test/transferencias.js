 var Transferencias = artifacts.require('./Transferencias.sol')
  
 contract("Transferencias", function(accounts) {
    var electionInstance;
  
    it("inicializa com 0 transações", function() {
      return Transferencias.deployed().then(function(instance) {
        return instance.transacoesCount();
      }).then(function(count) {
        assert.equal(count, 0);
      });
    });

    it("federaçaõ inicializa com 1 ou 2", function() {
        return Transferencias.deployed().then(function(instance) {
          return instance.getFederationsLength();
        }).then(function(count) {
          assert.equal(count, 2);
        });
      });

})

