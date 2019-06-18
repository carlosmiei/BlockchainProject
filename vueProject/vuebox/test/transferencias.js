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

    it("Federação inicializa com 1 ou 2", function() {
        return Transferencias.deployed().then(function(instance) {
          return instance.getFederationsLength();
        }).then(function(count) {
            //na versão final pomos aqui 1
          assert.equal(count, 2);
        });
      });


      it("Adicionar equipa", function() {
        return Transferencias.deployed().then(function(instance) {

          electionInstance = instance;
          return electionInstance.adicionarEquipa('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(equipa) {

          return electionInstance.getTeamsLength();
        }).then(function(equipas) {
          assert.equal(equipas.length,1, "contem uma equipa");
         
        });
    });

    it("Adicionar banco", function() {
        return Transferencias.deployed().then(function(instance) {

          electionInstance = instance;
          return electionInstance.adicionarBanco('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(equipa) {

          return electionInstance.getBanksLength();
        }).then(function(equipas) {
          assert.equal(equipas.length,1, "contem um banco");
         
        });
    });

    it("Adicionar fatura", function() {
        return Transferencias.deployed().then(function(instance) {
          electionInstance = instance;
          return electionInstance.adicionaFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B','17/06/2019','0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(equipa) {
          return electionInstance.transacoesCount();
        }).then(function(equipas) {
          assert.equal(equipas,1, "Contem uma transação!");
         
        });
    });

    it("Fatura: estado inicial correto", function() {
        return Transferencias.deployed().then(function(instance) {
          electionInstance = instance;
          return electionInstance.adicionaFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B','17/06/2019','0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(equipa) {
          return electionInstance.getEstado('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(estado) {
          assert.equal(estado,1, "Tem o estado inicial!");
         
        });
    });

    it("Fatura: estado recebida", function() {
        return Transferencias.deployed().then(function(instance) {
          electionInstance = instance;
          return electionInstance.adicionaFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B','17/06/2019','0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(equipa) {
          return electionInstance.recebeFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(fatura) {
          return electionInstance.getEstado('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B')
        }).then(function(estado) {
            assert.equal(estado,2, "Tem o estado recebida!");
        })
    });

    it("Fatura: estado aceite", function() {
        return Transferencias.deployed().then(function(instance) {
          electionInstance = instance;
          return electionInstance.adicionaFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B','17/06/2019','0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(equipa) {
          return electionInstance.recebeFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(fatura) {
          return electionInstance.validaFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B',true)
        }).then(function(estado) {
          return electionInstance.getEstado('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B')
        }).then(function(estado) {
            assert.equal(estado,3, "Tem o estado aceite!");
        })
    });
    it("Fatura: estado rejeitada", function() {
        return Transferencias.deployed().then(function(instance) {
          electionInstance = instance;
          return electionInstance.adicionaFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B','17/06/2019','0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(equipa) {
          return electionInstance.recebeFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(fatura) {
          return electionInstance.validaFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B',false)
        }).then(function(estado) {
          return electionInstance.getEstado('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B')
        }).then(function(estado) {
            assert.equal(estado,0, "Tem o estado rejeitada!");
        })
    });
    it("Fatura: estado EmPagamento", function() {
        return Transferencias.deployed().then(function(instance) {
          electionInstance = instance;
          return electionInstance.adicionaFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B','17/06/2019','0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(equipa) {
          return electionInstance.recebeFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(fatura) {
          return electionInstance.validaFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B',true)
        }).then(function(estado) {
          return electionInstance.pagaFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B')
        }).then(function(estado) {
            return electionInstance.getEstado('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(estado) {
            assert.equal(estado,4, "Tem o estado em Pagamento!");
        })
    });

    it("Fatura: estado Paga", function() {
        return Transferencias.deployed().then(function(instance) {
          electionInstance = instance;
          return electionInstance.adicionaFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B','17/06/2019','0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(equipa) {
          return electionInstance.recebeFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(fatura) {
          return electionInstance.validaFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B',true)
        }).then(function(estado) {
          return electionInstance.pagaFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B')
        }).then(function(estado) {
          return electionInstance.validaPagamento('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(estado) {
            return electionInstance.getEstado('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(estado) {
            assert.equal(estado,5, "Tem o estado em Paga");
        })
    });
    it("Fatura: estado Completa", function() {
        return Transferencias.deployed().then(function(instance) {
          electionInstance = instance;
          return electionInstance.adicionaFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B','17/06/2019','0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(equipa) {
          return electionInstance.recebeFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(fatura) {
          return electionInstance.validaFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B',true)
        }).then(function(estado) {
          return electionInstance.pagaFatura('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B')
        }).then(function(estado) {
          return electionInstance.validaPagamento('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(estado) {
          return electionInstance.pagaPercentagem('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(estado) {
          return electionInstance.getEstado('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
        }).then(function(estado) {
            assert.equal(estado,6, "Tem o estado em Completa");
        })
    });
    
    

})
