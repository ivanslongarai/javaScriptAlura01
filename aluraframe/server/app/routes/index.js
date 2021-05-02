/* Código simplório, apenas para fornecer o serviço para a aplicação */

var api = require('../api');

module.exports  = function(app) {
    
    app.route('/negotiations/week')
        .get(api.listWeek);
        
    app.route('/negotiations/previous')
        .get(api.listPrevious);
        
    app.route('/negotiations/delayed')
        .get(api.listDelayed);  
        
    app.route('/negotiations')
        .post(api.insertNegotiation);          
};