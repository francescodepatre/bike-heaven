/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

async function waitForSuccess(paymentId) {
  while (true) {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    
    if (paymentIntent.status === 'succeeded') {
      console.log('Pagamento completato con successo!');
      return{
        success: true
      }
    }
    else if (paymentIntent.status === 'canceled') {
        console.log('Pagamento completato con successo!');
        return{
          success: false
        }
      } else {
      console.log('Il pagamento è ancora in corso...');
      await setTimeoutPromise(5000); // Attendi 5 secondi prima di verificare nuovamente
    }
  }
}

module.exports = waitForSuccess