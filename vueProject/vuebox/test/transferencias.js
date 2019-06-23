 var Transferencias = artifacts.require('./Transferencias.sol')
  
 contract("Transferencias", function(accounts) {
    let catchRevertAccInUse = require("./exceptions.js").catchRevertAccInUse;
    let catchInvalidAddress = require("./exceptions.js").catchInvalidAddress;
    let catchOpNotAvailable = require("./exceptions.js").catchOpNotAvailable;
    let catchRevertAddrInUse = require("./exceptions.js").catchRevertAddrInUse;
    var TransferenciaInstance;

    it("Inicializa com 0 federações", function() {
      return Transferencias.deployed().then(function(instance) {
        return instance.getFederationsLength();
      }).then(function(count) {
        assert.equal(count, 0);
      });
    });

    it("Inicializa com 0 bancos", function() {
      return Transferencias.deployed().then(function(instance) {
        return instance.getBanksLength();
      }).then(function(count) {
        assert.equal(count, 0);
      });
    });

    it("Inicializa com 0 equipas", function() {
      return Transferencias.deployed().then(function(instance) {
        return instance.getTeamsLength();
      }).then(function(count) {
        assert.equal(count, 0);
      });
    });
  
    it("inicializa com 0 transações", function() {
      return Transferencias.deployed().then(function(instance) {
        return instance.transacoesCount();
      }).then(function(count) {
        assert.equal(count, 0);
      });
    });

    it("Adiciona uma federação corretamente", function() {
      return Transferencias.deployed().then(function(instance) {
        TransferenciaInstance = instance;
        return TransferenciaInstance.getFederationsLength();
      }).then(function(count) {
        CountI = count;
        return TransferenciaInstance.adicionarFederacao('0xbA0e7D8CDFD38aC8514F4fEe64c2bE387A946D31');
      }).then(function(federacao) {
        return TransferenciaInstance.getFederationsLength();
      }).then(function(count) {
        assert.equal(parseInt(CountI)+1,count, "adicionou uma e uma só federação");
      });
    });

    it("Adiciona um banco corretamente", function() {
      return Transferencias.deployed().then(function(instance) {
        TransferenciaInstance = instance;
        return TransferenciaInstance.getBanksLength();
      }).then(function(count) {
        CountI = count;
        return TransferenciaInstance.adicionarBanco('0x10b5F2B9Ed1ec8BeAfE3Fa74e50EE740B283B649');
      }).then(function(banco) {
        return TransferenciaInstance.getBanksLength();
      }).then(function(count) {
        assert.equal(parseInt(CountI)+1,count, "adicionou um e um só banco");
      });
    });

    it("Adiciona uma equipa corretamente", function() {
      return Transferencias.deployed().then(function(instance) {
        TransferenciaInstance = instance;
        return TransferenciaInstance.getTeamsLength();
      }).then(function(count) {
        CountI = count;
        return TransferenciaInstance.adicionarEquipa('0x2B478D4A4009AD7E8651fC059847B0172cf1D40B');
      }).then(function(equipa) {
        return TransferenciaInstance.getTeamsLength();
      }).then(function(count) {
        assert.equal(parseInt(CountI)+1,count, "adicionou uma e uma só equipa");
      });
    });

    it("Adiciona uma transação corretamente", function() {
      return Transferencias.deployed().then(function(instance) {
        TransferenciaInstance = instance;
        return TransferenciaInstance.transacoesCount();
      }).then(function(count) {
        CountI = count;
        return TransferenciaInstance.adicionaFatura('28322000','17/06/2019','0xf778b86fa74e846c4f0a1fbd1335fe81c00a0c91');
      }).then(function(fatura) {
        return TransferenciaInstance.transacoesCount();
      }).then(function(count) {
        assert.equal(parseInt(CountI)+1,count, "adicionou uma e uma só transação!");
       
      });
    });

    it("Transação apresenta o estado inicial correto", function() {
      return Transferencias.deployed().then(function(instance) {
        TransferenciaInstance = instance;
        return TransferenciaInstance.adicionaFatura('63500000','17/06/2019','0x0d8775f648430679a709e98d2b0cb6250d2887e1');
      }).then(function(fatura) {
        return TransferenciaInstance.getEstado('0x0d8775f648430679a709e98d2b0cb6250d2887e1');
      }).then(function(estado) {
        assert.equal(estado,1, "Tem o estado inicial!");
       
      });
    });

    it("Transação atinge o estado 'recebida' corretamente", function() {
      return Transferencias.deployed().then(function(instance) {
        TransferenciaInstance = instance;
        return TransferenciaInstance.adicionaFatura('63500000','17/06/2019','0x0d8775f648430679a709e98d2b0cb6250d2887e2');
      }).then(function(fatura) {
        return TransferenciaInstance.recebeFatura('0x0d8775f648430679a709e98d2b0cb6250d2887e2');
      }).then(function(fatura) {
        return TransferenciaInstance.getEstado('0x0d8775f648430679a709e98d2b0cb6250d2887e2')
      }).then(function(estado) {
          assert.equal(estado,2, "Tem o estado recebida!");
      })
    });

    it("Transação atinge o estado 'rejeitada' corretamente", function() {
        return Transferencias.deployed().then(function(instance) {
          TransferenciaInstance = instance;
          return TransferenciaInstance.adicionaFatura('0xfffd933a0bc612844eaf0c6fe3e5b8e9b6c1d19c','17/06/2019','0xfffd933a0bc612844eaf0c6fe3e5b8e9b6c1d19c');
        }).then(function(fatura) {
          return TransferenciaInstance.recebeFatura('0xfffd933a0bc612844eaf0c6fe3e5b8e9b6c1d19c');
        }).then(function(fatura) {
          return TransferenciaInstance.validaFatura('0xfffd933a0bc612844eaf0c6fe3e5b8e9b6c1d19c',false)
        }).then(function(estado) {
          return TransferenciaInstance.getEstado('0xfffd933a0bc612844eaf0c6fe3e5b8e9b6c1d19c')
        }).then(function(estado) {
            assert.equal(estado,0, "Tem o estado rejeitada!");
        })
    });

    it("Transação atinge o estado 'aceite' corretamente", function() {
      return Transferencias.deployed().then(function(instance) {
        TransferenciaInstance = instance;
        return TransferenciaInstance.adicionaFatura('63500000','17/06/2019','0x0d8775f648430679a709e98d2b0cb6250d2887e3');
      }).then(function(fatura) {
        return TransferenciaInstance.recebeFatura('0x0d8775f648430679a709e98d2b0cb6250d2887e3');
      }).then(function(fatura) {
        return TransferenciaInstance.validaFatura('0x0d8775f648430679a709e98d2b0cb6250d2887e3',true)
      }).then(function(estado) {
        return TransferenciaInstance.getEstado('0x0d8775f648430679a709e98d2b0cb6250d2887e3')
      }).then(function(estado) {
          assert.equal(estado,3, "Tem o estado aceite!");
      })
    });

    it("Transação atinge o estado 'emPagamento' corretamente", function() {
        return Transferencias.deployed().then(function(instance) {
          TransferenciaInstance = instance;
        return TransferenciaInstance.adicionaFatura('63500000','17/06/2019','0x0d8775f648430679a709e98d2b0cb6250d2887e4');
      }).then(function(fatura) {
        return TransferenciaInstance.recebeFatura('0x0d8775f648430679a709e98d2b0cb6250d2887e4');
      }).then(function(fatura) {
        return TransferenciaInstance.validaFatura('0x0d8775f648430679a709e98d2b0cb6250d2887e4',true)
      }).then(function(estado) {
          return TransferenciaInstance.pagaFatura('0x0d8775f648430679a709e98d2b0cb6250d2887e4')
        }).then(function(estado) {
            return TransferenciaInstance.getEstado('0x0d8775f648430679a709e98d2b0cb6250d2887e4');
        }).then(function(estado) {
            assert.equal(estado,4, "Tem o estado em Pagamento!");
        })
    });

    it("Transação atinge o estado 'paga' corretamente", function() {
      return Transferencias.deployed().then(function(instance) {
        TransferenciaInstance = instance;
        return TransferenciaInstance.adicionaFatura('63500000','17/06/2019','0x0d8775f648430679a709e98d2b0cb6250d2887e5');
      }).then(function(fatura) {
        return TransferenciaInstance.recebeFatura('0x0d8775f648430679a709e98d2b0cb6250d2887e5');
      }).then(function(fatura) {
        return TransferenciaInstance.validaFatura('0x0d8775f648430679a709e98d2b0cb6250d2887e5',true)
      }).then(function(estado) {
        return TransferenciaInstance.pagaFatura('0x0d8775f648430679a709e98d2b0cb6250d2887e5')
      }).then(function(estado) {
        return TransferenciaInstance.validaPagamento('0x0d8775f648430679a709e98d2b0cb6250d2887e5');
      }).then(function(estado) {
          return TransferenciaInstance.getEstado('0x0d8775f648430679a709e98d2b0cb6250d2887e5');
      }).then(function(estado) {
          assert.equal(estado,5, "Tem o estado em Paga");
      })
    });

    it("Transação atinge o estado 'completa' corretamente", function() {
      return Transferencias.deployed().then(function(instance) {
        TransferenciaInstance = instance;
        return TransferenciaInstance.adicionaFatura('63500000','17/06/2019','0x0d8775f648430679a709e98d2b0cb6250d2887e6');
      }).then(function(fatura) {
        return TransferenciaInstance.recebeFatura('0x0d8775f648430679a709e98d2b0cb6250d2887e6');
      }).then(function(fatura) {
        return TransferenciaInstance.validaFatura('0x0d8775f648430679a709e98d2b0cb6250d2887e6',true)
      }).then(function(estado) {
        return TransferenciaInstance.pagaFatura('0x0d8775f648430679a709e98d2b0cb6250d2887e6')
      }).then(function(estado) {
        return TransferenciaInstance.validaPagamento('0x0d8775f648430679a709e98d2b0cb6250d2887e6');
      }).then(function(estado) {
        return TransferenciaInstance.pagaPercentagem('0x0d8775f648430679a709e98d2b0cb6250d2887e6');
      }).then(function(estado) {
        return TransferenciaInstance.getEstado('0x0d8775f648430679a709e98d2b0cb6250d2887e6');
      }).then(function(estado) {
          assert.equal(estado,6, "Tem o estado em Completa");
      })
    });

    it("Método isMember (equipa) retorna true", function() {
      return Transferencias.deployed().then(function(instance) {
        TransferenciaInstance = instance;
        return TransferenciaInstance.adicionarEquipa('0x343c43a37d37dff08ae8c4a11544c718abb4fca1');
      }).then(function(equipa) {
        return TransferenciaInstance.isMember('0x343c43a37d37dff08ae8c4a11544c718abb4fca1');
      }).then(function(res) {
        assert.equal(res,true, "É membro!");
      });
    });

    it("Método isMember (banco) retorna true", function() {
      return Transferencias.deployed().then(function(instance) {
        TransferenciaInstance = instance;
        return TransferenciaInstance.adicionarBanco('0x343c43a37d37dff08ae8c4a11544c718abb4fca2');
      }).then(function(equipa) {
        return TransferenciaInstance.isMember('0x343c43a37d37dff08ae8c4a11544c718abb4fca2');
      }).then(function(res) {
        assert.equal(res,true, "É membro!");
      });
    });

    it("Método isMember (federação) retorna true", function() {
      return Transferencias.deployed().then(function(instance) {
        TransferenciaInstance = instance;
        return TransferenciaInstance.adicionarFederacao('0x343c43a37d37dff08ae8c4a11544c718abb4fca3');
      }).then(function(equipa) {
        return TransferenciaInstance.isMember('0x343c43a37d37dff08ae8c4a11544c718abb4fca3');
      }).then(function(res) {
        assert.equal(res,true, "É membro!");
      });
    });

    it("Método isMember (outro) retorna false", function() {
      return Transferencias.deployed().then(function(instance) {
        TransferenciaInstance = instance;
        return TransferenciaInstance.isMember('0x343c43a37d37dff08ae8c4a11544c718abb4fca4');
      }).then(function(res) {
        assert.equal(res,false, "Não é membro!");
      });
    });

    it("Método typeA (equipa) retorna 1", function() {
      return Transferencias.deployed().then(function(instance) {
        TransferenciaInstance = instance;
        return TransferenciaInstance.adicionarEquipa('0x343c43a37d37dff08ae8c4a11544c718abb4fcd1');
      }).then(function(equipa) {
        return TransferenciaInstance.typeA('0x343c43a37d37dff08ae8c4a11544c718abb4fcd1');
      }).then(function(res) {
        assert.equal(res,1, "É equipa!");
      });
    });

    it("Método typeA (banco) retorna 2", function() {
      return Transferencias.deployed().then(function(instance) {
        TransferenciaInstance = instance;      
        return TransferenciaInstance.adicionarBanco('0x343c43a37d37dff08ae8c4a11544c718abb4fcd2');
      }).then(function(equipa) {
        return TransferenciaInstance.typeA('0x343c43a37d37dff08ae8c4a11544c718abb4fcd2');
      }).then(function(res) {
        assert.equal(res,2, "É banco!");
      });
    });

    it("Método typeA (federação) retorna 3", function() {
      return Transferencias.deployed().then(function(instance) {
        TransferenciaInstance = instance;
        return TransferenciaInstance.adicionarFederacao('0x343c43a37d37dff08ae8c4a11544c718abb4fcd3');
      }).then(function(equipa) {
        return TransferenciaInstance.typeA('0x343c43a37d37dff08ae8c4a11544c718abb4fcd3');
      }).then(function(res) {
        assert.equal(res,3, "É Federação!");
      });
    });

    it("Método typeA (outro) retorna 0", function() {
      return Transferencias.deployed().then(function(instance) {
        TransferenciaInstance = instance;
        return TransferenciaInstance.typeA('0x343c43a37d37dff08ae8c4a11544c718abb4fcd4');
      }).then(function(res) {
        assert.equal(res,0, "Não é membro!");
      });
    });

    it("Dá erro ao adicionar uma conta com um address já atribuído a uma federação", function() {
      return Transferencias.deployed().then(function(instance) {

        TransferenciaInstance = instance;
        return TransferenciaInstance.adicionarEquipa('0x423Ab9663eeABE67187186FCCFb678b7510e61a5');

      }).then(async function(equipa) {
        await catchRevertAccInUse(TransferenciaInstance.adicionarEquipa('0x423Ab9663eeABE67187186FCCFb678b7510e61a5')); 
        await catchRevertAccInUse(TransferenciaInstance.adicionarBanco('0x423Ab9663eeABE67187186FCCFb678b7510e61a5')); 
        await catchRevertAccInUse(TransferenciaInstance.adicionarFederacao('0x423Ab9663eeABE67187186FCCFb678b7510e61a5')); 
      });
    });

    it("Dá erro ao adicionar uma conta com um address já atribuído a um banco", function() {
      return Transferencias.deployed().then(function(instance) {

        TransferenciaInstance = instance;
        return TransferenciaInstance.adicionarEquipa('0xFB16A8B83479283B25b037E39e9beac15aD67E77');

      }).then(async function(equipa) {
        await catchRevertAccInUse(TransferenciaInstance.adicionarEquipa('0xFB16A8B83479283B25b037E39e9beac15aD67E77')); 
        await catchRevertAccInUse(TransferenciaInstance.adicionarBanco('0xFB16A8B83479283B25b037E39e9beac15aD67E77')); 
        await catchRevertAccInUse(TransferenciaInstance.adicionarFederacao('0xFB16A8B83479283B25b037E39e9beac15aD67E77')); 
      });
    });

    it("Dá erro ao adicionar uma conta com um address já atribuído a uma equipa", function() {
      return Transferencias.deployed().then(function(instance) {

        TransferenciaInstance = instance;
        return TransferenciaInstance.adicionarEquipa('0xcBF609AB06783f1F6e4DaA8111C31065402ea9bA');

      }).then(async function(equipa) {
        await catchRevertAccInUse(TransferenciaInstance.adicionarEquipa('0xcBF609AB06783f1F6e4DaA8111C31065402ea9bA')); 
        await catchRevertAccInUse(TransferenciaInstance.adicionarBanco('0xcBF609AB06783f1F6e4DaA8111C31065402ea9bA')); 
        await catchRevertAccInUse(TransferenciaInstance.adicionarFederacao('0xcBF609AB06783f1F6e4DaA8111C31065402ea9bA')); 
      });
    });

    it("Dá erro ao adicionar uma transação com um address já atribuído", function() {
      return Transferencias.deployed().then(function(instance) {
        TransferenciaInstance = instance;
        return TransferenciaInstance.adicionaFatura('63500000','10/06/2019','0xf778b86fa74e846c4f0a1fbd1325fe81c00a0c91');
      }).then(async function(fatura) {
        await catchRevertAddrInUse(TransferenciaInstance.adicionaFatura('28322000','17/06/2019','0xf778b86fa74e846c4f0a1fbd1325fe81c00a0c91')); 
      });
    });

    it("Dá erro ao alterar estado de faturas inexistentes", function() {
      return Transferencias.deployed().then(async function(instance) {
        TransferenciaInstance = instance;
        await catchInvalidAddress(TransferenciaInstance.recebeFatura('0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d')); 
        await catchInvalidAddress(TransferenciaInstance.validaFatura('0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d', true)); 
        await catchInvalidAddress(TransferenciaInstance.validaFatura('0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d', false)); 
        await catchInvalidAddress(TransferenciaInstance.pagaFatura('0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d')); 
        await catchInvalidAddress(TransferenciaInstance.validaPagamento('0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d')); 
        await catchInvalidAddress(TransferenciaInstance.pagaPercentagem('0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d')); 
      });
    });

    it("Dá erro ao alterar estado da fatura para 1", function() {
        return Transferencias.deployed().then(function(instance) {
          TransferenciaInstance = instance;
          return TransferenciaInstance.adicionaFatura('129484201','17/06/2019','0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d');
        }).then(function(fatura) {
          return TransferenciaInstance.recebeFatura('0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d');
        }).then(async function(fatura) {
          await catchRevertAddrInUse(TransferenciaInstance.adicionaFatura('27330000','17/06/2019','0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d'));
          return TransferenciaInstance.validaFatura('0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d', true);
        }).then(async function(fatura) {
          await catchRevertAddrInUse(TransferenciaInstance.adicionaFatura('9857000','17/06/2019','0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d'));
          return TransferenciaInstance.pagaFatura('0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d');
        }).then(async function(fatura) {
          await catchRevertAddrInUse(TransferenciaInstance.adicionaFatura('82574000','17/06/2019','0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d'));
          return TransferenciaInstance.validaPagamento('0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d');
        }).then(async function(fatura) {
          await catchRevertAddrInUse(TransferenciaInstance.adicionaFatura('1639830','17/06/2019','0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d'));
          return TransferenciaInstance.pagaPercentagem('0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d');
        }).then(async function(fatura) {
          await catchRevertAddrInUse(TransferenciaInstance.adicionaFatura('6580000','17/06/2019','0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d'));
      });
    });

    it("Dá erro ao alterar estado de faturas rejeitadas (estado 0)", function() {
      return Transferencias.deployed().then(function(instance) {
          TransferenciaInstance = instance;
          return TransferenciaInstance.adicionaFatura('39892940','17/06/2019','0x343c43a37d37dff08ae8c4a11544c718abb4fcf8');
        }).then(function(fatura) {
          return TransferenciaInstance.recebeFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf8');
        }).then(function(fatura) {
          return TransferenciaInstance.validaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf8',false)
        }).then(async function(estado) {
          await catchOpNotAvailable(TransferenciaInstance.recebeFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf8')); 
          await catchOpNotAvailable(TransferenciaInstance.validaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf8', true)); 
          await catchOpNotAvailable(TransferenciaInstance.validaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf8', false)); 
          await catchOpNotAvailable(TransferenciaInstance.pagaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf8')); 
          await catchOpNotAvailable(TransferenciaInstance.validaPagamento('0x343c43a37d37dff08ae8c4a11544c718abb4fcf8')); 
          await catchOpNotAvailable(TransferenciaInstance.pagaPercentagem('0x343c43a37d37dff08ae8c4a11544c718abb4fcf8')); 
      });
    });

    it("Dá erro ao alterar estado da fatura de x para 2 (recebida) tal que x!=1 (emitida)", function() {
        return Transferencias.deployed().then(async function(instance) {
          TransferenciaInstance = instance;
          return TransferenciaInstance.adicionaFatura('129484201','17/06/2019','0x343c43a37d37dff08ae8c4a11544c718abb4fcf1');
        }).then(function(fatura) {
          return TransferenciaInstance.recebeFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf1');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.recebeFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf1'));
          return TransferenciaInstance.validaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf1', true);
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.recebeFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf1'));
          return TransferenciaInstance.pagaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf1');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.recebeFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf1'));
          return TransferenciaInstance.validaPagamento('0x343c43a37d37dff08ae8c4a11544c718abb4fcf1');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.recebeFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf1'));
          return TransferenciaInstance.pagaPercentagem('0x343c43a37d37dff08ae8c4a11544c718abb4fcf1');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.recebeFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf1'));
      });
    });

    it("Dá erro ao alterar estado da fatura de x para 3 (aceite) ou 0 (rejeitada) tal que x!=2 (recebida)", function() {
        return Transferencias.deployed().then(async function(instance) {
          TransferenciaInstance = instance;
          return TransferenciaInstance.adicionaFatura('129484201','17/06/2019','0x343c43a37d37dff08ae8c4a11544c718abb4fcf2');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.validaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf2', true));
          await catchOpNotAvailable(TransferenciaInstance.validaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf2', false));
          return TransferenciaInstance.recebeFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf2');
        }).then(function(fatura) {
          return TransferenciaInstance.validaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf2', true);
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.validaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf2', true));
          await catchOpNotAvailable(TransferenciaInstance.validaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf2', false));
          return TransferenciaInstance.pagaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf2');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.validaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf2', true));
          await catchOpNotAvailable(TransferenciaInstance.validaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf2', false));
          return TransferenciaInstance.validaPagamento('0x343c43a37d37dff08ae8c4a11544c718abb4fcf2');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.validaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf2', true));
          await catchOpNotAvailable(TransferenciaInstance.validaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf2', false));
          return TransferenciaInstance.pagaPercentagem('0x343c43a37d37dff08ae8c4a11544c718abb4fcf2');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.validaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf2', true));
          await catchOpNotAvailable(TransferenciaInstance.validaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf2', false));
      });
    });

    it("Dá erro ao alterar estado da fatura de x para 4 (emPagamento) tal que x!=3 (aceite)", function() {
        return Transferencias.deployed().then(async function(instance) {
          TransferenciaInstance = instance;
          return TransferenciaInstance.adicionaFatura('129484201','17/06/2019','0x343c43a37d37dff08ae8c4a11544c718abb4fcf3');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.pagaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf3'));
          return TransferenciaInstance.recebeFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf3');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.pagaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf3'));
          return TransferenciaInstance.validaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf3', true);
        }).then(function(fatura) {
          return TransferenciaInstance.pagaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf3');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.pagaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf3'));
          return TransferenciaInstance.validaPagamento('0x343c43a37d37dff08ae8c4a11544c718abb4fcf3');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.pagaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf3'));
          return TransferenciaInstance.pagaPercentagem('0x343c43a37d37dff08ae8c4a11544c718abb4fcf3');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.pagaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf3'));
      });
    });


    it("Dá erro ao alterar estado da fatura de x para 5 (pago) tal que x!=4 (emPagamento)", function() {
        return Transferencias.deployed().then(async function(instance) {
          TransferenciaInstance = instance;
          return TransferenciaInstance.adicionaFatura('129484201','17/06/2019','0x343c43a37d37dff08ae8c4a11544c718abb4fcf4');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.validaPagamento('0x343c43a37d37dff08ae8c4a11544c718abb4fcf4'));
          return TransferenciaInstance.recebeFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf4');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.validaPagamento('0x343c43a37d37dff08ae8c4a11544c718abb4fcf4'));
          return TransferenciaInstance.validaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf4', true);
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.validaPagamento('0x343c43a37d37dff08ae8c4a11544c718abb4fcf4'));
          return TransferenciaInstance.pagaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf4');
        }).then(function(fatura) {
          return TransferenciaInstance.validaPagamento('0x343c43a37d37dff08ae8c4a11544c718abb4fcf4');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.validaPagamento('0x343c43a37d37dff08ae8c4a11544c718abb4fcf4'));
          return TransferenciaInstance.pagaPercentagem('0x343c43a37d37dff08ae8c4a11544c718abb4fcf4');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.validaPagamento('0x343c43a37d37dff08ae8c4a11544c718abb4fcf4'));
      });
    });

    it("Dá erro ao alterar estado da fatura de x para 6 (completa) tal que x!=5 (pago)", function() {
        return Transferencias.deployed().then(async function(instance) {
          TransferenciaInstance = instance;
          return TransferenciaInstance.adicionaFatura('129484201','17/06/2019','0x343c43a37d37dff08ae8c4a11544c718abb4fcf5');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.pagaPercentagem('0x343c43a37d37dff08ae8c4a11544c718abb4fcf5'));
          return TransferenciaInstance.recebeFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf5');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.pagaPercentagem('0x343c43a37d37dff08ae8c4a11544c718abb4fcf5'));
          return TransferenciaInstance.validaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf5', true);
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.pagaPercentagem('0x343c43a37d37dff08ae8c4a11544c718abb4fcf5'));
          return TransferenciaInstance.pagaFatura('0x343c43a37d37dff08ae8c4a11544c718abb4fcf5');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.pagaPercentagem('0x343c43a37d37dff08ae8c4a11544c718abb4fcf5'));
          return TransferenciaInstance.validaPagamento('0x343c43a37d37dff08ae8c4a11544c718abb4fcf5');
        }).then(function(fatura) {
          return TransferenciaInstance.pagaPercentagem('0x343c43a37d37dff08ae8c4a11544c718abb4fcf5');
        }).then(async function(fatura) {
          await catchOpNotAvailable(TransferenciaInstance.pagaPercentagem('0x343c43a37d37dff08ae8c4a11544c718abb4fcf5'));
      });
    });

})

