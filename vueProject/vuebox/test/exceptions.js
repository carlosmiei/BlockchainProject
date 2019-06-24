const PREFIX = "Returned error: VM Exception while processing transaction: ";

async function tryCatch(promise, message) {
    try {
        await promise;
        throw null;
    }
    catch (error) {
        assert(error, "Expected an error but did not get one");
        assert(error.message.startsWith(PREFIX + message), "Expected an error starting with '" + PREFIX + message + "' but got '" + error.message + "' instead");
    }
};

module.exports = {
    catchRevertAccInUse    : async function(promise) {await tryCatch(promise, "revert Account already in use"     );},
    catchInvalidAddress    : async function(promise) {await tryCatch(promise, "revert Invalid Address"            );},
    catchOpNotAvailable    : async function(promise) {await tryCatch(promise, "revert Operation not available"    );},
    catchRevertAddrInUse   : async function(promise) {await tryCatch(promise, "revert Transaction already exists" );},
};